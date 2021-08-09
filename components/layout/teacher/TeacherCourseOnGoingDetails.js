import React, { useState } from 'react'
import agent from '../../../utils/agent'
import { manamusuDateFormatter } from '../../../utils/date_contant'
import { capitalizeFirstLetter } from '../../../utils/validation_contant'
import { hhmmToampm } from '../../../utils/work_contant'
import BootstrapSpinner2 from '../../ui/spinner/BootstrapSpinner2'

const SERVER = "http://13.208.129.181:3001";
const io = require('socket.io-client');
let globalMinute = null;
class TeacherCourseOnGoingDetails extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedClass: null,
            duration_time: null,
            loading: false
        }
    }
    getProfileIcon = (profile_image) => {
        if (profile_image) {
            return (profile_image) ? `${agent.API_FILE_ROOT_MEDIUM}${profile_image}` : "/images/student_profile.svg"
        } else {
            return "/images/student_profile.svg"
        }
    }

    createTimeSchedule = (timeSlot) => {
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
                        </div>
                    </div>
                </div>
            </div>)
        });
        return rowData
    }
    goToLink = (params) => {
        let router = this.props.router
        router.push(`/${router.query.lang}/${params}`)
    }

    initialiseTimeDuration = (mins) => {
        console.log("initialiseTimeDuration", mins);
        let h = Math.floor(mins / 60);
        let m = mins % 60;
        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        const duration_time = `${h}:${m}`
        this.setState({
            ...this.state,
            duration_time: duration_time,
        })
        return duration_time
    }
    initialiseDuration = () => {
        if (globalMinute != null) {
            this.initialiseTimeDuration(globalMinute)
            globalMinute += 1
            setTimeout(this.initialiseDuration, 60000);
        }
    }
    startClassNow = () => {
        globalMinute = 0
        const { selectedClass } = this.state
        if (selectedClass) {
            console.log("selectedClass", selectedClass);

            const item = {
                time_slot_id: selectedClass.id,
                type: "start"
            }

            console.log("selectedClass item", item);
            this.setState({
                ...this.state,
                loading: true
            }, () => {
                agent.Teacher.createClassLogs(item).then(res => {
                    this.initialiseDuration()

                    selectedClass.start_log_time = new Date().toISOString()
                    console.log("createClassLogs res", res);
                    this.setState({
                        ...this.state,
                        loading: false,
                        selectedClass: selectedClass
                    })
                }).catch(err => {
                    console.log("createClassLogs err", err);
                    this.setState({
                        ...this.state,
                        loading: false
                    })
                })
            })


        }
    }
    endClassNow = () => {

        const { selectedClass } = this.state
        if (selectedClass) {
            console.log("selectedClass", selectedClass);
            const item = {
                time_slot_id: selectedClass.id,
                type: "end"
            }

            console.log("selectedClass item", item);
            this.setState({
                ...this.state,
                loading: true
            }, () => {
                agent.Teacher.createClassLogs(item).then(res => {
                    console.log("createClassLogs res", res);
                    globalMinute = null
                    selectedClass.end_log_time = new Date().toISOString()
                    this.setState({
                        ...this.state,
                        loading: false,
                        selectedClass: selectedClass
                    })
                }).catch(err => {
                    console.log("createClassLogs err", err);
                    this.setState({
                        ...this.state,
                        loading: false
                    })
                })
            })


        }
    }
    render() {
        console.log("TeacherCourseOnGoingDetails state", this.state);
        const { postDetail, booking_detail, pending_time_slots, accepted_time_slots, cancelled_time_slots, language, selectedClass, duration_time, loading } = this.state
        const { languages, subjects, router, teaching_standards } = this.props
        const acceptedTimeSlot = accepted_time_slots ? accepted_time_slots : []
        const pendingTimeSlot = pending_time_slots ? pending_time_slots : []
        const cancelledTimeSlot = cancelled_time_slots ? cancelled_time_slots : []
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
                                                    <h4 class="me-4 mb-0">{booking_detail ? capitalizeFirstLetter(booking_detail.student_first_name) : ""} {booking_detail ? capitalizeFirstLetter(booking_detail.student_last_name) : ""}</h4>
                                                    <span class="text-primary cursor-pointer space-nowrap fs-18" onClick={() => this.goToLink(`student/${postDetail ? postDetail.user_id : ""}`)}>View Profile <i class="fas fa-chevron-right fs-12 ms-2"></i></span>
                                                </div>
                                                <div class="d-flex align-items-center mb-2">
                                                    <img class="me-2" src="/images/icons/stars.jpg" />
                                                    <span class="text-yello fs-24">{booking_detail ? booking_detail.user_rating ? booking_detail.user_rating : "0.0" : "0.0"}</span>
                                                </div>
                                                <a class="text-primary text-decoration-underline cursor-pointer" onClick={() => this.goToLink(`chat?booking_id=${router.query.course_id}`)}><i class="fas fa-comment me-2"></i>chat</a>
                                            </div>
                                        </div>
                                        <span class="text-black fs-24">{booking_detail ? booking_detail.currency : '$'}{booking_detail ? booking_detail.hourly_rate : 0}/hr</span>
                                    </div>
                                    <div class="mt-5">
                                        <div class="main-heading me-4">
                                            <h2 class="sub-heading mb-0 fs-24">{booking_detail ? booking_detail.post_title : ''} </h2>
                                        </div>
                                        <div class="mt-4">
                                            <img class="icon-size-2 me-3" src="/images/icons/books.svg" alt="" />
                                            <span class="text-third text-secondary">{postDetail ? this.getValueFromDropdown(subjects, postDetail.subject) : ""}</span>
                                        </div>
                                        <div class="mt-4">
                                            <img class="icon-size-2 me-3" src="/images/icons/class.svg" alt="" />
                                            <span class="text-third text-secondary">{postDetail ? this.getValueFromDropdown(teaching_standards, postDetail.teaching_standard) : ""}</span>
                                        </div>
                                        <div class="mt-4">
                                            <img class="icon-size-2 me-3" src="/images/icons/language.svg" alt="" />
                                            <span class="text-third text-secondary">{this.getPostLanguage(language)}</span>
                                        </div>
                                    </div>
                                    <div class="mt-5">
                                        <div class="main-heading me-4">
                                            <h2 class="sub-heading mb-0 fs-24">description</h2>
                                        </div>
                                        <p class="mt-4 mb-0">
                                            {postDetail ? postDetail.description : ""}
                                        </p>
                                        {/* <div class="mt-5">
                                            <button type="button" class="btn btn-danger px-5 text-uppercase" data-bs-toggle="modal" data-bs-target="#complainModal">COMPLAIN</button>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            <div class="col-auto pt-5">
                                <div class="overflow-section">

                                    {acceptedTimeSlot.length > 0 ?
                                        <div class="card mt-4 shadow-lg">
                                            <div class="card-body">
                                                <h5>Class Schedule</h5>
                                                {this.createTimeSchedule(acceptedTimeSlot)}
                                            </div>
                                        </div>
                                        : <></>}
                                    {selectedClass ?
                                        <div class="card mt-4 shadow-lg">
                                            <div class="card-body">
                                                <h5>Today's Class</h5>

                                                <div class="d-flex align-items-start flex-wrap justify-content-between">
                                                    <div class="accordion mb-3" id="accordionExample">
                                                        <div class="accordion-item">
                                                            <div class="accordion-header" >
                                                                {/* <span class="me-3">{manamusuDateFormatter(selectedClass.date0)}</span> */}
                                                                <span class="me-3">{hhmmToampm(selectedClass.start_time)}</span>
                                                                <br />
                                                                <time class="me-2 text-light">{duration_time ? duration_time : "00:00"}</time>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <button type="button" class="btn btn-primary px-5 me-4 mt-2" onClick={() => this.startClassNow()} disabled={selectedClass.start_log_time}>{loading ? <BootstrapSpinner2 /> : "START"}</button>
                                                <button type="button" class="btn btn-danger px-5 mt-2" onClick={() => this.endClassNow()} disabled={selectedClass.end_log_time}>{loading ? <BootstrapSpinner2 /> : "END"}</button>
                                            </div>
                                        </div>
                                        : <></>}
                                    {pendingTimeSlot.length > 0 ?
                                        <div class="card mt-4 shadow-lg">
                                            <div class="card-body">
                                                <h5>Pending Class</h5>
                                                {this.createTimeSchedule(pendingTimeSlot)}
                                            </div>
                                        </div>
                                        : <></>}

                                    {cancelledTimeSlot.length > 0 ?
                                        <div class="card mt-4 shadow-lg">
                                            <div class="card-body">
                                                <h5>Declined Classes</h5>
                                                {this.createTimeSchedule(cancelled_time_slots ? cancelled_time_slots : [])}
                                            </div>
                                        </div>
                                        : <></>}
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

            </section>


        )
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
        console.log("configureSocket called");
        var socket = io(SERVER, {
            transports: ['websocket', 'polling', 'flashsocket']
        })
        socket.on('connection', (e) => {
            console.log("configureSocket connection", e);
        });
        socket.on('connect', () => {
            console.log('Connected!');
        });
        socket.on('message_received', socketMessage => {
            console.log("configureSocket socketMessage", socketMessage);
        });
        this.socket = socket;
    }
    componentDidMount() {
        const { router, user_info } = this.props
        let course_id = router.query.course_id

        if (user_info) {
            agent.setToken(user_info.token)
            // this.configureSocket();

            agent.Teacher.getBookingDetails(course_id).then(res => {

                // console.log("getBookingDetails res", res);
                const newDate = new Date()
                const today = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDay() + 1, newDate.getHours(), newDate.getMinutes(), 0)
                let selectedClassDate = null
                let duration_time = null
                let timemap = []
                res.accepted_time_slots.forEach(element => {
                    let startHhMmArr = String(element.start_time).split(":")
                    let endHhMmArr = String(element.end_time).split(":")
                    let slotDate = new Date(element.date)
                    const startClassTime = new Date(slotDate.getFullYear(), slotDate.getMonth(), slotDate.getDay() + 1, startHhMmArr[0], startHhMmArr[1], 0)
                    const endClassTime = new Date(slotDate.getFullYear(), slotDate.getMonth(), slotDate.getDay() + 1, endHhMmArr[0], endHhMmArr[1], 0)
                    // console.log("selectedClassDate \n today", today, "\n startClassTime", startClassTime);
                    if (startClassTime.getTime() > today.getTime()) {

                        timemap.push({
                            time0: startClassTime.getTime(),
                            date0: startClassTime,
                            ...element
                        })

                        timemap.sort((a, b) => { return a.time0 - b.time0 })
                        // console.log("timemap", timemap[0]);
                        if (timemap[0]) {
                            selectedClassDate = timemap[0]
                        }

                    }
                });
                if (selectedClassDate) {
                    const start_log_time = selectedClassDate.start_log_time
                    const end_log_time = selectedClassDate.end_log_time
                    if (start_log_time && !end_log_time) {

                        const start_log_time_date = new Date(start_log_time);
                        const end_log_time_date = new Date()

                        const date1 = new Date(start_log_time_date.getFullYear(), start_log_time_date.getMonth(), start_log_time_date.getDay(), start_log_time_date.getHours(), start_log_time_date.getMinutes(), 0);
                        const date2 = new Date(end_log_time_date.getFullYear(), end_log_time_date.getMonth(), end_log_time_date.getDay(), end_log_time_date.getHours(), end_log_time_date.getMinutes(), 0);
                        const diffTime = Math.abs(date2 - date1);

                        console.log("first date1", date1, "date2", date2, end_log_time_date);
                        var minDiff = diffTime / 60 / 1000; //in minutes
                        globalMinute = minDiff
                        this.initialiseDuration()
                    } else if (start_log_time && end_log_time) {

                        const start_log_time_date = new Date(start_log_time);
                        const end_log_time_date = new Date(end_log_time);
                        const date1 = new Date(start_log_time_date.getFullYear(), start_log_time_date.getMonth(), start_log_time_date.getDay(), start_log_time_date.getHours(), start_log_time_date.getMinutes(), 0);
                        const date2 = new Date(end_log_time_date.getFullYear(), end_log_time_date.getMonth(), end_log_time_date.getDay(), end_log_time_date.getHours(), end_log_time_date.getMinutes(), 0);

                        console.log("second date1", date1, "date2", date2);
                        const diffTime = Math.abs(date2 - date1);

                        var minDiff = diffTime / 60 / 1000; //in minutes
                        duration_time = this.initialiseTimeDuration(minDiff)
                    }

                }
                // console.log("selectedClassDate selected", selectedClassDate);


                agent.Auth.getPostById(res.booking_detail ? res.booking_detail.post_id : "").then(resPost => {
                    this.setState({
                        ...this.state,
                        ...res,
                        ...resPost,
                        selectedClass: selectedClassDate,
                        duration_time
                    })
                }).catch(err => {
                    console.log("getBookingDetailsByBookingId error", err);
                })

            }).catch(err => {
                console.log("getBookingDetailsByBookingId error", err);
            })

            agent.Common.staticData().then(res => {
                this.setState({ ...this.state, ...res })
            }).catch(err => {
                console.log("Common.staticData() error", err);
            })
        } else {
            router.push(`/${router.query.lang}/sign-in`)
        }
    }
}

export default TeacherCourseOnGoingDetails