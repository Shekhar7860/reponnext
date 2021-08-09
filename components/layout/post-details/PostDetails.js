import { setCookie } from 'nookies';
import React from 'react'
import Calendar from 'react-calendar';
import actions from '../../../store/actions';
import agent from '../../../utils/agent';
import { defaultSlot } from '../../../utils/constant_value';
import { manamusuDateFormatter, timeDateByUser, timestampToYyyyMmDd } from '../../../utils/date_contant';
import { capitalizeFirstLetter, NumberValidation } from '../../../utils/validation_contant';
import { hhmmToampm } from '../../../utils/work_contant';
import BootstrapSpinner from '../../ui/spinner/BootstrapSpinner';
import BootstrapSpinner2 from '../../ui/spinner/BootstrapSpinner2';

class PostDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            duration: "30",
            duration_time: "00:30",
            start_time: "00:00",
            end_time: "00:30",

            start_time_number: 0,
            end_time_number: 0,
            calendar_date: new Date(),
            selectedTimeSlot: new Map(),
            selectedCustomTimeSlot: new Map(),
            make_offer: null,
            temp_make_offer: "",
            hourly_rate: "",
            editSchedule: false,
            booking: null,
            loading: false,
            error_info: { name: "", msg: "" }
        }
    }
    getUserId = (user_info) => {
        return user_info ? user_info.user ? user_info.user.id : "0" : "0"
    }
    getUserType = (user_info) => {
        return user_info ? user_info.user ? user_info.user.user_type : "0" : "0"
    }
    getPostUserId = (postDetail) => {
        return postDetail ? postDetail.user_id : ""
    }
    initialiseSlot = (params) => {
        console.log("initialiseSlot params", params);

        const { selectedTimeSlot, calendar_date } = this.state
        const { booking_detail } = this.props
        let yyyyMmDd = timestampToYyyyMmDd(calendar_date)
        const mapKey = `${yyyyMmDd}${params.start_time}${params.end_time}`


        let rowSelectedTimeSlot = selectedTimeSlot

        if (booking_detail && booking_detail.post_type === "request") {
            let mapKey = `${yyyyMmDd}|${params.start_time}|${params.end_time}`
            if (rowSelectedTimeSlot.has(mapKey)) {
                rowSelectedTimeSlot.delete(mapKey)
            } else {
                rowSelectedTimeSlot.set(mapKey, { date: yyyyMmDd, start_time: params.start_time, end_time: params.end_time })
            }
            this.setMyState("selectedTimeSlot", rowSelectedTimeSlot)

        } else {
            if (rowSelectedTimeSlot.has(mapKey)) {
                rowSelectedTimeSlot.delete(mapKey)
            } else {
                rowSelectedTimeSlot.set(mapKey, { date: yyyyMmDd, start_time: params.start_time, end_time: params.end_time })
            }
            this.setMyState("selectedTimeSlot", rowSelectedTimeSlot)

        }
    }
    initialiseCustomSlot = (params) => {
        console.log("initialiseSlot params", params);

        const { selectedCustomTimeSlot, calendar_date } = this.state
        let yyyyMmDd = timestampToYyyyMmDd(calendar_date)
        const mapKey = `${yyyyMmDd}${params.start_time}${params.end_time}`


        let rowTimeSlot = selectedCustomTimeSlot
        if (rowTimeSlot.has(mapKey)) {
            rowTimeSlot.delete(mapKey)
        } else {
            rowTimeSlot.set(mapKey, { date: yyyyMmDd, start_time: params.start_time, end_time: params.end_time })
        }
        this.setState({
            ...this.state,
            selectedCustomTimeSlot: rowTimeSlot,
            start_time: "00:00",
            duration: "30",
            end_time: "00:30"
        })
        // this.setMyState("selectedCustomTimeSlot", rowTimeSlot)
    }
    setMyState = (name, value) => {
        this.setState({
            ...this.state,
            [name]: value
        })
    }
    updateClassSchedule = () => {
        let managedTimeSlot = []

        const { selectedTimeSlot, selectedCustomTimeSlot } = this.state
        const { booking_detail } = this.props

        console.log("selectedTimeSlot", selectedTimeSlot);
        selectedTimeSlot.forEach(element => {
            console.log("element", element);
            managedTimeSlot.push({
                date: element.date,
                start_time: element.start_time,
                end_time: element.end_time
            })
        });
        selectedCustomTimeSlot.forEach(element => {
            managedTimeSlot.push({
                date: element.date,
                start_time: element.start_time,
                end_time: element.end_time
            })
        });

        if (this.props.user_info) {
            this.setState({
                ...this.state,
                loading: true
            }, () => {
                if (managedTimeSlot.length > 0) {
                    agent.Student.addTimeSlotByBookingId({
                        "booking_id": booking_detail.id,
                        "time_slot": managedTimeSlot
                    }).then(res => {
                        console.log("addTimeSlotByBookingId res", res);
                        this.setState({
                            ...this.state,
                            ...res,
                            editSchedule: false,
                            loading: false,
                            selectedTimeSlot: new Map(),
                            selectedCustomTimeSlot: new Map(),
                        }, () => {
                            console.log("addTimeSlotByBookingId state", this.state);

                        })
                    }).catch(err => {
                        console.log("addTimeSlotByBookingId err", err);
                        this.setState({
                            ...this.state,
                            loading: false
                        })
                    })
                } else {
                    console.log("Empty addManagedTimeSlot");
                }
            })
        } else {
            setCookie(this, actions.ALLOW_BACK, true, {
                maxAge: 1 * 1 * 2 * 60,
                path: "/",
            });
            this.props.router.push(`/${this.props.router.query.lang}/sign-in`)

        }
    }

    createBooking = (hourly_rate) => {
        let managedTimeSlot = []
        let managedTimeMap = new Map()

        const { selectedTimeSlot, selectedCustomTimeSlot } = this.state
        let postDetail = this.props.postDetail
        let user_info = this.props.user_info
        const user_to = this.getPostUserId(postDetail)
        const user_from = this.getUserId(user_info)

        console.log("selectedTimeSlot", selectedTimeSlot);
        selectedTimeSlot.forEach(element => {
            console.log("element", element);
            managedTimeSlot.push({
                date: element.date,
                start_time: element.start_time,
                end_time: element.end_time
            })
        });
        selectedCustomTimeSlot.forEach(element => {
            managedTimeSlot.push({
                date: element.date,
                start_time: element.start_time,
                end_time: element.end_time
            })
        });
        managedTimeSlot.forEach(element => {
            console.log("managedTimeSlot element", element);
            let key = element.date
            if (managedTimeMap.has(key)) {
                let data = managedTimeMap.get(key)
                data.push({
                    "start_time": element.start_time,
                    "end_time": element.end_time
                })
                managedTimeMap.set(key, data)
            } else {
                managedTimeMap.set(key, [{
                    "start_time": element.start_time,
                    "end_time": element.end_time
                }])
            }
        });

        let finalTimeSlot = []
        managedTimeMap.forEach((element, key) => {
            finalTimeSlot.push({
                date: key,
                time: element
            })
        });

        if (finalTimeSlot.length > 0) {

            const info = {
                "post_id": postDetail.id,
                "hourly_rate": Number(hourly_rate),
                "currency": postDetail.currency,
                "time_slot": finalTimeSlot
            }
            this.setState({
                ...this.state,
                loading: true
            }, () => {
                agent.Student.createBooking(info).then(res => {
                    console.log("createBooking res", res, info);
                    const msgInfo = {
                        user_to: user_to,
                        user_from: user_from,
                        message: `I am request for this course.`,
                        booking_id: res.booking.booking_detail.id
                    }
                    agent.Chat.sendMessage(msgInfo).then(msgRes => {
                        console.log("sendMessage res", msgRes);
                        this.props.router.push(`/${this.props.router.query.lang}/chat?booking_id=${res.booking.booking_detail.id}`)
                    }).catch(err => {
                        this.props.router.push(`/${this.props.router.query.lang}/chat?booking_id=${res.booking.booking_detail.id}`)
                    })
                    this.setState({
                        ...this.state,
                        loading: false
                    })
                }).catch(err => {
                    console.log("createBooking err", err, info);
                    this.setState({
                        ...this.state,
                        loading: false
                    })
                })
            })

        } else {
            console.log("Create booking finalTimeSlot length", finalTimeSlot.length);
            this.setMyState("error_info", { name: "class_schedule", mag: "Empty class schedule" })
        }
    }

    deleteTimeSlot = (booking_id, time_slot_id) => {
        if (typeof window !== "undefined") {
            if (window.confirm("Do you really want to delete?")) {
                agent.Student.deleteTimeSlotByBookingId({
                    "booking_id": booking_id,
                    "time_slot_id": time_slot_id
                }).then(res => {
                    console.log("deleteTimeSlotByBookingId", res);
                    this.setState({
                        ...this.state,
                        ...res,
                        editSchedule: false,
                    })
                })
            }
        } else {
            agent.Student.deleteTimeSlotByBookingId({
                "booking_id": booking_id,
                "time_slot_id": time_slot_id
            }).then(res => {
                console.log("deleteTimeSlotByBookingId", res);
                this.setState({
                    ...this.state,
                    ...res,
                    editSchedule: false,
                })
            })
        }
    }

    goToEdit = () => {
        let router = this.props.router
        console.log(router);
        router.push(`/${router.query.lang}/teacher/${router.query.teacher_id}/post/${router.query.post_id}/edit`)
    }

    onClickDeletePost = () => {
        const postdetails = this.props.postDetail
        if (typeof window !== "undefined") {
            if (window.confirm("Do you really want to delete?")) {
                agent.Auth.deletePostById({
                    "post_id": postdetails.id
                }).then(res => {
                    console.log("deletePostById", res);
                    this.props.router.back()
                })
            }
        } else {
            agent.Auth.deletePostById({
                "post_id": postdetails.id
            }).then(res => {
                console.log("deletePostById", res);
                this.props.router.back()

            })
        }
    }
    createTimeSchedule = (timeSlot, editSchedule, comeFrom) => {
        // console.log("createTimeSchedule", timeSlot);
        const timeSlotLoop = timeSlot ? timeSlot : []
        let rowData = []
        timeSlotLoop.sort((a, b) => { return new Date(a.date).getTime() - new Date(b.date).getTime() })
        timeSlotLoop.forEach((item, index) => {
            rowData.push(<div key={index} class="d-flex align-items-start flex-wrap justify-content-between">
                <div class="accordion mb-3" id="accordionExample">
                    <div class="accordion-item">
                        <div class="accordion-header" id={`headingOne${index}`}>
                            <span class="me-3">{manamusuDateFormatter(item.date)}</span>
                            <time class="me-2 text-light">{hhmmToampm(item.start_time)} - {hhmmToampm(item.end_time)}</time>
                            {editSchedule ?
                                <a class="text-danger cursor-pointer" onClick={() => this.deleteTimeSlot(item.booking_request_id, item.id)}><i class="fas fa-trash me-2"></i></a>
                                : <></>}
                        </div>
                    </div>
                </div>
            </div>)
            // console.log("timeSlotLoop.forEach", item, "index", index);
        });
        return rowData
    }
    render() {
        const { calendar_date, duration_time, start_time, end_time, temp_make_offer, make_offer, editSchedule, booking, loading, duration } = this.state
        const { postDetail, user_info, booking_detail, pending_time_slots, accepted_time_slots, cancelled_time_slots, router } = this.props
        const acceptedTimeSlot = booking ? booking.accepted_time_slots : accepted_time_slots
        const pendingTimeSlot = booking ? booking.pending_time_slots : pending_time_slots
        const cancelltedTimeSlot = booking ? booking.cancelled_time_slots : cancelled_time_slots
        console.log("booking_detail", this.props);
        const { conversation_id } = this.props
        return <section>
            <div>
                <div class="container">
                    <div class="row g-lg-5">
                        <div class="col-lg-8 border-end border-md-0 py-5">
                            <div class="my-3">
                                <div class="d-flex align-items-center justify-content-between flex-wrap">
                                    <div class="d-flex align-items-center">
                                        <img class="profile-rectangle me-3" src={this.getProfileIcon(postDetail)} />
                                        <div>
                                            <div class="d-flex align-items-center flex-wrap">
                                                <h4 class="me-4 mb-0">{postDetail ? capitalizeFirstLetter(postDetail.first_name) : "Hyunwoong"} {postDetail ? capitalizeFirstLetter(postDetail.last_name) : "Kim"}</h4>
                                                {(this.getUserId(user_info) === this.getPostUserId(postDetail)) ? <></> :
                                                    <span class="text-primary cursor-pointer space-nowrap fs-18" onClick={() => router.push(`/${router.query.lang}/teacher/${postDetail.user_id}`)
                                                    }>View Profile <i class="fas fa-chevron-right fs-12 ms-2"></i></span>
                                                }
                                            </div>
                                            <div class="d-flex align-items-center">
                                                <img class="me-2" src="/images/icons/stars.jpg" />
                                                <span class="text-yello fs-24">{postDetail ? postDetail.user_rating ? postDetail.user_rating : "0.0" : "0.0"}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <span class="text-black fs-24">{postDetail ? postDetail.currency : '$'} {postDetail ? postDetail.hourly_rate : 0}/hr</span>
                                </div>
                                <div class="mt-5">
                                    <div class="main-heading me-4">
                                        <h2 class="sub-heading mb-0 fs-24">{postDetail ? postDetail.title : ""}</h2>
                                    </div>
                                    <div class="mt-4">
                                        <img class="icon-size-2 me-3" src="/images/icons/books.svg" alt="" />
                                        <span class="text-third text-secondary">{this.getValueFromDropdown(this.props.subjects, postDetail ? postDetail.subject : "")}</span>
                                    </div>
                                    <div class="mt-4">
                                        <img class="icon-size-2 me-3" src="/images/icons/class.svg" alt="" />
                                        <span class="text-third text-secondary">{this.getValueFromDropdown(this.props.teaching_standards, postDetail ? postDetail.teaching_standard : "")} </span>
                                    </div>
                                    <div class="mt-4">
                                        <img class="icon-size-2 me-3" src="/images/icons/language.svg" alt="" />
                                        <span class="text-third text-secondary">{this.getPostLanguage(this.props.language)}</span>
                                    </div>
                                </div>
                                <div class="mt-5">
                                    <div class="main-heading me-4">
                                        <h2 class="sub-heading mb-0 fs-24">description</h2>
                                    </div>
                                    <p class="mt-4 mb-0">
                                        {postDetail ? postDetail.description : ""}
                                    </p>
                                    <div class="mt-4">
                                        {(this.getUserId(user_info) === this.getPostUserId(postDetail)) ?
                                            <>
                                                <button type="button" class="btn btn-primary px-5 py-2 me-4" onClick={() => this.goToEdit()}>EDIT</button>
                                                <button type="button" class="btn btn-danger px-5 py-2 me-4" onClick={() => this.onClickDeletePost()}>DELETE</button>
                                            </>
                                            : (booking_detail) ?
                                                <button type="button" class="btn btn-primary px-5 py-2 me-4" onClick={() => { router.push(`/${router.query.lang}/chat?booking_id=${booking_detail.id}${conversation_id ? `&conversation_id=${conversation_id}` : ""}`) }}>CHAT</button>
                                                : (this.getUserType(user_info) == 2) ? <></>
                                                    : <>
                                                        <button type="button" class="btn btn-primary px-5 py-2 me-4" onClick={() => { this.createBooking(postDetail.hourly_rate) }}>{loading ? <BootstrapSpinner2 /> : "APPLY"} {make_offer ? `(${make_offer}/hr)` : ""} {make_offer ? <i class="fa fa-check"></i> : <></>}</button>
                                                        <button type="button" class="btn btn-outline-primary px-5 py-2 me-4" data-bs-toggle="modal" data-bs-target="#makeoffer">{make_offer ? "CHANGE OFFER" : "MAKE OFFER"}  </button>
                                                        {make_offer ? <button type="button" class="btn btn-outline-danger px-5 py-2" onClick={() => this.setMyState("make_offer", null)} >REMOVE OFFER  </button> : <></>}
                                                    </>

                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        {booking_detail ?
                            <div class="col-lg-4 pt-5  text-center">
                                <div class="accordion" id="accordionExample">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <h5 class="mb-3 space-nowrap">Classes</h5>
                                        {editSchedule ?
                                            <a class="text-primary cursor-pointer pl-5" onClick={() => this.setState({ ...this.state, editSchedule: !editSchedule })}>Done</a>
                                            :
                                            <a class="text-primary cursor-pointer pl-5" onClick={() => this.setState({ ...this.state, editSchedule: !editSchedule })}><i class="fas fa-pencil-alt me-2"></i>Edit</a>
                                        }
                                    </div>
                                    {acceptedTimeSlot.length > 0 ?
                                        <div class="card mt-4 shadow-lg" style={{ maxHeight: "250px" }}>
                                            <div class="card-body">
                                                <div class="accordion-item">
                                                    <div class="accordion-button px-0" data-bs-toggle="collapse" data-bs-target="#collapseScheduleClass" aria-expanded="false" aria-controls="collapseScheduleClass">
                                                        <h5 className="mb-0">Class Schedule</h5>
                                                    </div>
                                                    <div id="collapseScheduleClass" class="accordion-collapse collapse show " aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                        {this.createTimeSchedule(acceptedTimeSlot, editSchedule)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        : <></>}
                                    {pendingTimeSlot.length > 0 ?
                                        <div class="card mt-4 shadow-lg" style={{ maxHeight: "250px" }}>
                                            <div class="card-body">
                                                <div class="accordion-item">
                                                    <div class="accordion-button collapsed px-0" data-bs-toggle="collapse" data-bs-target="#collapsePendingClass" aria-expanded="false" aria-controls="collapsePendingClass">
                                                        <h5 className="mb-0">Pending Class</h5>
                                                    </div>
                                                    <div id="collapsePendingClass" class="accordion-collapse collapse " aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                        {this.createTimeSchedule(pendingTimeSlot, editSchedule)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        : <></>}

                                    {editSchedule ?

                                        <div class="card mt-4 shadow-lg">
                                            <div class="card-body">
                                                <Calendar
                                                    onChange={(e) => this.setMyState("calendar_date", new Date(e))}
                                                    value={calendar_date}
                                                    minDate={new Date()}
                                                />
                                                <div class="row justify-content-between">
                                                    {this.createTimeChips()}
                                                    {this.createCustomTimeChips()}
                                                </div>
                                                <button type="button" id="selectDateModalBtn" class=" btn btn-ouline mt-1" data-bs-toggle="modal" data-bs-target="#addTime" >+ Customize Time</button>

                                            </div>

                                            {loading ?
                                                <BootstrapSpinner />
                                                : editSchedule ?
                                                    <button type="button" class="btn btn-primary " onClick={() => { this.updateClassSchedule() }}>UPDATE CLASS SCHEDULE</button>
                                                    : <></>}
                                        </div>
                                        : <></>}


                                    {cancelltedTimeSlot.length > 0 ?
                                        <div class="card mt-4 shadow-lg" style={{ maxHeight: "250px" }}>
                                            <div class="card-body">
                                                <div class="accordion-item">
                                                    <div class="accordion-button collapsed px-0" data-bs-toggle="collapse" data-bs-target="#collapseDeclineClass" aria-expanded="false" aria-controls="collapseDeclineClass">
                                                        <h5 className="mb-0">Declined Classes</h5>
                                                    </div>
                                                    <div id="collapseDeclineClass" class="accordion-collapse collapse " aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                        {this.createTimeSchedule(cancelltedTimeSlot ? cancelltedTimeSlot : [], false, "cancel")}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        : <></>}
                                </div>
                            </div>
                            :
                            <div class="col-lg-4 pt-5  text-center">
                                <div class="card mt-4 shadow-lg">
                                    <div class="card-body">
                                        <Calendar
                                            onChange={(e) => this.setMyState("calendar_date", new Date(e))}
                                            value={calendar_date}
                                            minDate={new Date()}
                                        />

                                    </div>
                                </div>
                                <div class="card mt-4 shadow-lg">
                                    <div class="card-body">
                                        <div class="row justify-content-between">
                                            {this.createTimeChips()}
                                            {this.createCustomTimeChips()}
                                        </div>
                                        <button type="button" id="selectDateModalBtn" class=" btn btn-ouline btn-primary mt-1" data-bs-toggle="modal" data-bs-target="#addTime" >+ Customize Time</button>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>


            {/* Modal */}
            <div class="modal fade" id="addTime" tabindex="-1" aria-labelledby="addTimeLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header border-0">
                            <i class="fas fa-times close-button" data-bs-dismiss="modal" aria-label="Close"></i>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={(e) => { e.preventDefault(); }} >
                                <div class="modal-body">
                                    <div class="text-center mb-4">
                                        <h4 class="modal-title">Select Time </h4>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Duration (minutes)</label>
                                        <input type="number" placeholder="Select Duration" className="form-control" step="30" name="start_time" min="30" max="1800" value={duration} onChange={(e) => this.changeDurationTime(e.target.value)} />
                                        {/* <input type="time" placeholder="Select Duration" className="form-control" name="start_time" min="00:30" value={duration_time} onChange={(e) => this.changeDurationTime(e.target.value)} /> */}
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Start Time</label>
                                        <input type="time" placeholder="Start Time" className="form-control" name="start_time" value={start_time} onChange={(e) => this.changeStartTime(e.target.value)} />
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">End Time</label>
                                        <input type="time" placeholder="End Time" className="form-control" name="end_time" value={end_time} disabled />
                                    </div>
                                </div>
                                <div class="modal-footer justify-content-center py-4 border-0">
                                    <button type="button" id="selectDateModalBtnClose" class="btn btn-primary py-2 px-5" data-bs-dismiss="modal" onClick={() => this.initialiseCustomSlot({ start_time, end_time })}  >CONFIRM</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


            <div class="modal fade" id="makeoffer" tabindex="-1" aria-labelledby="makeofferLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-sm">
                    <div class="modal-content">
                        <div class="modal-header border-0">
                            <i class="fas fa-times close-button" data-bs-dismiss="modal" aria-label="Close"></i>
                        </div>
                        <div class="modal-body">
                            <div class="text-center mb-4">
                                <h5 class="modal-title text-center mb-4">MAKE OFFER</h5>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Enter the Amount</label>
                                <div class="d-flex align-items-center">
                                    <input type="text" class="form-control" placeholder="Enter amount" name="temp_make_offer" value={temp_make_offer} onChange={(e) => NumberValidation(e.target.value) ? this.setMyState("temp_make_offer", e.target.value) : ""} />
                                    <span class="ms-2">/hr</span>
                                </div>
                            </div>
                            <div class="text-center py-3">
                                <button type="button" class="btn btn-primary px-4 py-2" data-bs-dismiss="modal" onClick={() => this.createBooking(temp_make_offer)}> OFFER</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </section >

    }
    getSecondCustomeTimeSlot = (value) => {
        console.log("getSecondCustomeTimeSlot get value", value);
        const strArr = String(value).split(":")
        const hh = Number(strArr[0]) + 1
        const data = `${(hh > 9) ? hh : `0${hh}`}:${strArr[1]}`
        console.log("getSecondCustomeTimeSlot set value", data);
        return data

    }
    getProfileIcon = (postDetail) => {
        if (postDetail) {
            return (postDetail.profile_image) ? `${agent.API_FILE_ROOT_SMALL}${postDetail.profile_image}` : "/images/teacher_profile.svg"
        } else {
            return "/images/teacher_profile.svg"
        }
    }

    getValueFromDropdown = (list, key) => {
        const lisItems = list ? list : []
        let subjectArr = lisItems.filter(res => res.id == key)
        if (subjectArr.length > 0) {
            return subjectArr[0].name ? subjectArr[0].name : subjectArr[0].year
        } else {
            return key
        }
    }
    getPostLanguage = (langs) => {
        // console.log("getPostLanguage", langs);
        const languages = langs ? langs : []
        let rowStr = ""
        languages.forEach((element, index) => {
            if (index === languages.length - 1) {
                rowStr += element.name
            } else {
                rowStr += `${element.name}, `
            }
        });
        return rowStr
    }

    createTimeChips = () => {
        let rowData = [];

        const { timeSlot } = this.props
        const { calendar_date, selectedTimeSlot, booking } = this.state
        const acceptedTimeSlot = booking ? booking.accepted_time_slots : this.props.accepted_time_slots
        const pendingTimeSlots = booking ? booking.pending_time_slots : this.props.pending_time_slots
        const currentCalenderYyyyMmDd = timestampToYyyyMmDd(calendar_date)

        let rowAlreadyTimeSlot = new Map();
        if (acceptedTimeSlot) {
            acceptedTimeSlot.forEach(element => {
                let yyyyMmDd = timestampToYyyyMmDd(new Date(element.date))
                let mapKey = `${yyyyMmDd}${element.start_time}${element.end_time}`
                rowAlreadyTimeSlot.set(mapKey, { date: yyyyMmDd, start_time: element.start_time, end_time: element.end_time })
            });
        }
        if (pendingTimeSlots) {
            pendingTimeSlots.forEach(element => {
                console.log("pendingTimeSlots", element);
                let yyyyMmDd = timestampToYyyyMmDd(new Date(element.date))
                let mapKey = `${yyyyMmDd}${element.start_time}${element.end_time}`
                rowAlreadyTimeSlot.set(mapKey, { date: yyyyMmDd, start_time: element.start_time, end_time: element.end_time })
            });
        }

        const selectedDay = calendar_date.getDay() + 1

        const items = timeSlot ? timeSlot : []
        const filteredItems = items.filter(res => res.days == selectedDay)
        let postDefaultSlot = new Map()
        if (filteredItems.length > 0) {
            const timeslots = filteredItems[0].time_slot
            if (timeslots.length > 0) {
                timeslots.forEach(element => {
                    let mapKey = `${currentCalenderYyyyMmDd}${element.start_time}${element.end_time}`
                    postDefaultSlot.set(mapKey, element)
                });
            }
        }

        postDefaultSlot.forEach((res, key) => {
            if (rowAlreadyTimeSlot.has(key)) {
                rowData.push(<div key={key} class="col-6 col-sm-6 mt-4">
                    <span class={`btn-ouline btn-primary`} >{hhmmToampm(res.start_time)} - {hhmmToampm(res.end_time)}</span>
                </div>)
            } else {
                rowData.push(<div key={key} class="col-6 col-sm-6 mt-4">
                    <span class={`btn-ouline ${selectedTimeSlot.has(key) ? "btn-primary" : ""} `} onClick={() => this.initialiseSlot(res)}>{hhmmToampm(res.start_time)} - {hhmmToampm(res.end_time)}</span>
                </div>)
            }
        })


        // defaultSlot.forEach(res => {
        //     let timeDateBy = timeDateByUser(calendar_date)
        //     let mapKey = `${timeDateBy.getTime()}|${res.start_time}|${res.end_time}`

        //     if (rowAcceptedTimeSlot.has(mapKey)) {
        //         console.log("rowAcceptedTimeSlot.has", mapKey);

        //         rowData.push(<div class="col-6 col-sm-4 mt-4">
        //             <span class={`btn-ouline ${postDefaultSlot.has(`${res.start_time}${res.end_time}`) ? "" : "my-disabled"} btn-primary `} >{res.title}</span>
        //         </div>)
        //     } else {
        //         if (booking_detail && booking_detail.post_type === "request") {
        //             rowData.push(<div class="col-6 col-sm-4 mt-4">
        //                 <span class={`btn-ouline ${selectedTimeSlot.has(mapKey) ? "btn-primary" : ""} `} onClick={() => this.initialiseSlot(res, postDefaultSlot)}>{res.title}</span>
        //             </div>)
        //         } else {
        //             rowData.push(<div class="col-6 col-sm-4 mt-4">
        //                 <span class={`btn-ouline ${postDefaultSlot.has(`${res.start_time}${res.end_time}`) ? "" : "my-disabled"} ${selectedTimeSlot.has(mapKey) ? "btn-primary" : ""} `} onClick={() => this.initialiseSlot(res, postDefaultSlot)}>{res.title}</span>
        //             </div>)
        //         }
        //     }

        // })
        return rowData
    }

    changeDurationTime = (mins) => {
        let h = Math.floor(mins / 60);
        let m = mins % 60;
        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        const duration_time = `${h}:${m}`
        this.setState({
            ...this.state,
            duration_time: duration_time,
            duration: mins
        }, () => {
            this.getEndTime()
        })
    }
    changeStartTime = (value) => {
        this.setState({
            ...this.state,
            start_time: value
        }, () => {
            this.getEndTime()
        })
    }
    getEndTime = () => {
        const { start_time, duration_time } = this.state
        let extra = 0
        let startArr = start_time.split(":")
        let durationTimeArr = duration_time.split(":")
        let st2 = Number(startArr[1]) + Number(durationTimeArr[1])
        if (st2 >= 60) {
            st2 -= 60
            extra = 1
        }
        let st1 = Number(startArr[0]) + Number(durationTimeArr[0]) + extra
        this.setMyState("end_time", `${(st1 > 9) ? st1 : `0${st1}`}:${(st2 > 9) ? st2 : `0${st2}`}`)
    }
    createCustomTimeChips = () => {
        let rowData = []
        const { selectedCustomTimeSlot, calendar_date } = this.state
        let yyyyMmDd = timestampToYyyyMmDd(calendar_date)

        selectedCustomTimeSlot.forEach((res, key) => {
            if (res.date === yyyyMmDd) {
                rowData.push(<div key={key} class="col-6 col-sm-6 mt-4">
                    <span class={`btn-ouline btn-primary`} onClick={() => this.initialiseCustomSlot(res)}>{hhmmToampm(res.start_time)} - {hhmmToampm(res.end_time)}</span>
                </div>)
            }
        })
        return rowData
    }

    componentDidMount() {
        const { user_info } = this.props
        if (user_info) {
            agent.setToken(user_info.token)
        }

    }
}
export default PostDetails
