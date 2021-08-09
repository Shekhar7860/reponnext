import React, { useState } from 'react'
import agent from '../../../utils/agent'
import { manamusuDateFormatter } from '../../../utils/date_contant'
import { capitalizeFirstLetter } from '../../../utils/validation_contant'
import { hhmmToampm } from '../../../utils/work_contant'

const SERVER = "http://13.208.129.181:3001";
const io = require('socket.io-client');
class StudentBookingDetailsByTeacher extends React.Component {

    constructor(props) {
        super(props)
        console.log("StudentBookingDetailsByTeacher props", props);
        this.state = {
            token: props.user_info ? props.user_info.token : null,
            booking: null

        }
    }
    getProfileIcon = (profile_image) => {
        if (profile_image) {
            return (profile_image) ? `${agent.API_FILE_ROOT_MEDIUM}${profile_image}` : "/images/student_profile.svg"
        } else {
            return "/images/student_profile.svg"
        }
    }
    goToLink = (params) => {
        let router = this.props.router
        router.push(`/${router.query.lang}/${params}`)
    }
    initialiseBookingDetails = (booking_id) => {

        agent.Teacher.getBookingDetails(booking_id).then(res => {
            this.setState({
                ...this.state,
                booking: res
            }, () => {
                console.log("initialiseBookingDetails getBookingDetails res", res);
            })
        }).catch(err => {
            console.log("initialiseBookingDetails getBookingDetails error", err);
        })
    }
    acceptBooking = () => {
        const { router } = this.props
        let booking_id = router.query.booking_id
        if (booking_id) {
            agent.setToken(this.props.user_info.token)
            if (typeof window !== "undefined") {
                if (window.confirm("Do you really want to accept?")) {
                    agent.Teacher.acceptBooking({
                        "booking_id": booking_id
                    }).then(res => {
                        console.log("acceptBooking", res);
                        this.initialiseBookingDetails(booking_id)
                        this.configureSocket()
                        // this.props.router.back()
                    })
                }
            } else {
                agent.Teacher.acceptBooking({
                    "booking_id": booking_id
                }).then(res => {
                    console.log("acceptBooking", res);
                    // this.props.router.back()
                    this.initialiseBookingDetails(booking_id)

                })
            }
        } else {
            console.log("acceptBooking booking id", booking_id);
        }
    }
    acceptClassSlot = () => {
        const { router } = this.props
        let booking_id = router.query.booking_id
        if (booking_id) {
            agent.setToken(this.props.user_info.token)
            if (typeof window !== "undefined") {
                if (window.confirm("Do you really want to accept?")) {
                    agent.Teacher.acceptTimeSlot({
                        "booking_id": booking_id
                    }).then(res => {
                        console.log("acceptTimeSlot", res);
                        this.initialiseBookingDetails(booking_id)
                        // this.props.router.back()
                    })
                }
            } else {
                agent.Teacher.acceptTimeSlot({
                    "booking_id": booking_id
                }).then(res => {
                    console.log("acceptTimeSlot", res);
                    // this.props.router.back()
                    this.initialiseBookingDetails(booking_id)

                })
            }
        } else {
            console.log("acceptClassSlot booking id", booking_id);
        }
    }
    rejectBooking = () => {
        const { router } = this.props
        let booking_id = router.query.booking_id
        if (booking_id) {
            agent.setToken(this.props.user_info.token)
            if (typeof window !== "undefined") {
                if (window.confirm("Do you really want to decline?")) {
                    agent.Teacher.declineBooking({
                        "booking_id": booking_id
                    }).then(res => {
                        console.log("declineBooking", res);
                        this.initialiseBookingDetails(booking_id)
                        // this.props.router.back()

                    })
                }
            } else {
                agent.Teacher.declineBooking({
                    "booking_id": booking_id
                }).then(res => {
                    console.log("declineBooking", res);
                    // this.props.router.back()
                    this.initialiseBookingDetails(booking_id)

                })
            }
        } else {
            console.log("rejectBooking booking id", booking_id);
        }
    }
    rejectClassSlot = () => {
        const { router } = this.props
        let booking_id = router.query.booking_id
        if (booking_id) {
            agent.setToken(this.props.user_info.token)
            if (typeof window !== "undefined") {
                if (window.confirm("Do you really want to decline?")) {
                    agent.Teacher.declineTimeSlot({
                        "booking_id": booking_id
                    }).then(res => {
                        console.log("declineTimeSlot", res);
                        this.initialiseBookingDetails(booking_id)
                        // this.props.router.back()

                    })
                }
            } else {
                agent.Teacher.declineTimeSlot({
                    "booking_id": booking_id
                }).then(res => {
                    console.log("declineTimeSlot", res);
                    // this.props.router.back()
                    this.initialiseBookingDetails(booking_id)

                })
            }
        } else {
            console.log("rejectClassSlot booking id", booking_id);
        }
    }
    render() {
        console.log("StudentBookingDetailsByTeacher state", this.state);
        const { postDetail, booking } = this.state
        const { post_language, subjects, teaching_standards, router, booking_detail, pending_time_slots, accepted_time_slots, cancelled_time_slots } = this.props

        let acceptedTimeSlot = booking ? booking.accepted_time_slots : accepted_time_slots ? accepted_time_slots : []
        let pendingTimeSlot = booking ? booking.pending_time_slots : pending_time_slots ? pending_time_slots : []
        let cancelledTimeSlot = booking ? booking.cancelled_time_slots : cancelled_time_slots ? cancelled_time_slots : []
        let bookingStatus = booking ? booking.booking_detail.status : booking_detail ? booking_detail.status : 0
        return (
            <section>
                <div>
                    <div class="container">
                        <div class="row g-lg-5">
                            <div class="col border-end border-md-0 py-5">
                                <div class="my-3">
                                    <div class="d-flex align-items-center justify-content-between flex-wrap">
                                        <div class="d-flex align-items-start">
                                            <img class="profile-rectangle me-3" src={this.getProfileIcon(booking_detail ? booking_detail.student_profile_image : "")} />
                                            <div>
                                                <div class="d-flex align-items-center flex-wrap">
                                                    <h4 class="me-4 mb-0">{booking_detail ? capitalizeFirstLetter(booking_detail.student_first_name) : "Hyunwoong"} {booking_detail ? capitalizeFirstLetter(booking_detail.student_last_name) : "Kim"}</h4>
                                                    <span class="text-primary cursor-pointer space-nowrap fs-18" onClick={() => this.goToLink(`student/${booking_detail ? booking_detail.user_id : ""}`)}>View Profile <i class="fas fa-chevron-right fs-12 ms-2"></i></span>
                                                </div>
                                                <div class="d-flex align-items-center mb-2">
                                                    <img class="me-2" src="/images/icons/stars.jpg" />
                                                    <span class="text-yello fs-24">{booking_detail ? booking_detail.user_rating ? booking_detail.user_rating : "0.0" : "0.0"}</span>
                                                </div>
                                                <a class="text-primary text-decoration-underline cursor-pointer" onClick={() => this.goToLink(`chat?booking_id=${router.query.booking_id}`)}><i class="fas fa-comment me-2"></i>chat</a>
                                            </div>
                                        </div>
                                        <span class="text-black fs-24">{booking_detail ? booking_detail.currency : '$'} {booking_detail ? booking_detail.hourly_rate : 0}/hr</span>
                                    </div>
                                    <div class="mt-5">
                                        <div class="main-heading me-4">
                                            <h2 class="sub-heading mb-0 fs-24">{booking_detail ? booking_detail.post_title : ""}</h2>
                                        </div>
                                        <div class="mt-4">
                                            <img class="icon-size-2 me-3" src="/images/icons/books.svg" alt="" />
                                            <span class="text-third text-secondary">{booking_detail ? this.getValueFromDropdown(subjects, booking_detail.subject) : ""}</span>
                                        </div>
                                        <div class="mt-4">
                                            <img class="icon-size-2 me-3" src="/images/icons/class.svg" alt="" />
                                            <span class="text-third text-secondary">{booking_detail ? this.getValueFromDropdown(teaching_standards, booking_detail.teaching_standard) : ""}</span>
                                        </div>
                                        <div class="mt-4">
                                            <img class="icon-size-2 me-3" src="/images/icons/language.svg" alt="" />
                                            <span class="text-third text-secondary">{this.getPostLanguage(post_language)}</span>
                                        </div>
                                    </div>
                                    <div class="mt-5">
                                        <div class="main-heading me-4">
                                            <h2 class="sub-heading mb-0 fs-24">description</h2>
                                        </div>
                                        <p class="mt-4 mb-0">
                                            {postDetail ? postDetail.description : ""}
                                        </p>
                                        <div class="mt-5">
                                            {bookingStatus === 1 ?
                                                <>
                                                    <button type="button" class="btn btn-primary px-5 me-4 mt-2" onClick={() => this.acceptBooking()}>ACCEPT</button>
                                                    <button type="button" class="btn btn-danger px-5 mt-2" onClick={() => this.rejectBooking()}>DECLINE</button>
                                                </>
                                                : <></>}
                                            {bookingStatus === 2 ?
                                                <>
                                                    <button type="button" class="btn btn-primary px-5 me-4 mt-2" >ACCEPTED</button>
                                                </>
                                                : <></>}
                                            {bookingStatus === 3 ?
                                                <>
                                                    <button type="button" class="btn btn-danger px-5 mt-2" >DECLINED</button>
                                                </>
                                                : <></>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-auto">
                                <div class="accordion" id="accordionExample">
                                    <div class="overflow-section">
                                        {acceptedTimeSlot.length > 0 ?
                                            <div class="card mt-4 shadow-lg" style={{ maxHeight: "250px" }}>
                                                <div class="card-body">
                                                    <div class="accordion-item">
                                                        <div class="accordion-button px-0" data-bs-toggle="collapse" data-bs-target="#collapseScheduleClass" aria-expanded="false" aria-controls="collapseScheduleClass">
                                                            <h5 className="mb-0">Class Schedule</h5>
                                                        </div>
                                                        <div id="collapseScheduleClass" class="accordion-collapse collapse show " aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                            {this.createTimeSchedule(acceptedTimeSlot)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            : <></>}

                                        {pendingTimeSlot.length > 0 ?
                                            <div class="card mt-4 shadow-lg" style={{ maxHeight: "250px" }}>
                                                <div class="card-body">
                                                    <div class="accordion-item">
                                                        <div class="accordion-button collapsed px-0" data-bs-toggle="collapse" data-bs-target="#collapseRequestClass" aria-expanded="false" aria-controls="collapseRequestClass">
                                                            <h5 className="mb-0">Requested Class</h5>
                                                        </div>
                                                        <div id="collapseRequestClass" class="accordion-collapse collapse " aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                            {this.createTimeSchedule(pendingTimeSlot)}
                                                            {bookingStatus === 2 ?
                                                                <div class="mt-1">
                                                                    <button type="button" class="btn btn-primary me-4" onClick={() => this.acceptClassSlot()}>ACCEPT</button>
                                                                    <button type="button" class="btn btn-danger" onClick={() => this.rejectClassSlot()}>DECLINE</button>
                                                                </div>
                                                                : <></>}
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>

                                            : <></>}

                                        {cancelledTimeSlot.length > 0 ?
                                            < div class="card mt-4 shadow-lg" style={{ maxHeight: "250px" }}>
                                                <div class="card-body">
                                                    <div class="accordion-item">
                                                        <div class="accordion-button collapsed px-0" data-bs-toggle="collapse" data-bs-target="#collapseDeclineClass" aria-expanded="false" aria-controls="collapseDeclineClass">
                                                            <h5 className="mb-0">Declined Classes</h5>
                                                        </div>
                                                        <div id="collapseDeclineClass" class="accordion-collapse collapse " aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                            {this.createTimeSchedule(cancelledTimeSlot, "cancel")}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            : <></>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Modal */}
                <div class="modal fade" id="complainModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header border-0">
                                <i class="fas fa-times close-button" data-bs-dismiss="modal" aria-label="Close"></i>
                            </div>
                            <div class="modal-body">
                                <h5 class="modal-title text-center mb-4" id="exampleModalLabel">Complain Form</h5>
                                <form>
                                    <div class="mb-3">
                                        <label class="form-label">Subject</label>
                                        <select class="form-select">
                                            <option selected>Select subject</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Write here</label>
                                        <textarea class="form-control" placeholder="Sort Description" rows="4"></textarea>
                                    </div>
                                </form>
                                <div class="d-flex flex-column justify-content-center align-items-center py-3">
                                    <button type="button" class="btn btn-primary px-5 py-2">SEND</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section >


        )
    }
    createTimeSchedule = (timeSlot, comeFrom) => {
        console.log("createTimeSchedule", timeSlot, comeFrom);
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
                            {/* <time class="me-2 text-light">{(item.start_time > 12) ? (Number(item.start_time)) - 12 : item.start_time}:00{(item.start_time > 11) ? "pm" : "am"} - {(item.end_time > 12) ? (Number(item.end_time)) - 12 : item.end_time}:00{(item.end_time > 11) ? "pm" : "am"} {(comeFrom === "cancel") ? <img src={(item.status === 2) ? "/images/student_profile.svg" : "/images/teacher_profile.svg"} width="25px" height="30px" /> : ""}</time> */}
                        </div>
                    </div>
                </div>
            </div>)
            // console.log("timeSlotLoop.forEach", item, "index", index);
        });
        return rowData
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
    getValueFromDropdown = (list, key) => {
        // console.log("getValueFromDropdown list", list, "key", key);
        const lisItems = list ? list : []
        let subjectArr = lisItems.filter(res => res.id == key)
        if (subjectArr.length > 0) {
            return subjectArr[0].name ? subjectArr[0].name : subjectArr[0].year
        } else {
            return key
        }
    }

    configureSocket = () => {
        const { user_info } = this.props
        const { booking } = this.state
        const booking_detail = booking ? booking.booking_detail : {}
        console.log("configureSocket called");
        var socket = io(SERVER, {
            transports: ['websocket', 'polling', 'flashsocket']
        })
        socket.on('connection', (e) => {
            console.log("configureSocket connection", e);
        });
        socket.on('connect', () => {
            console.log('Connected!', "socket");
            if (booking_detail && user_info) {
                this.socket.emit(`make_payment`, { user_from: user_info.user ? user_info.user.id : "", user_to: booking_detail.user_id, booking_type: 1, booking_id: booking_detail.id })
            }
        });
        socket.on('message_received', message => {
            console.log("configureSocket called message", message);
        });
        this.socket = socket;
    }

    componentDidMount() {
        const { token } = this.state
        const { router } = this.props
        let booking_id = router.query.booking_id

        if (token && booking_id) {
            agent.setToken(token)
            this.initialiseBookingDetails(booking_id)
        } else {
            console.log("token not found", token);
        }
    }
}

export default StudentBookingDetailsByTeacher