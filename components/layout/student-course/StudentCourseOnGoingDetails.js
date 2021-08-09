import React, { useState } from 'react'
import agent from '../../../utils/agent'
import { manamusuDateFormatter } from '../../../utils/date_contant'
import { capitalizeFirstLetter } from '../../../utils/validation_contant'
import { hhmmToampm } from '../../../utils/work_contant'
import BootstrapSpinner2 from '../../ui/spinner/BootstrapSpinner2'
import BootstrapSpinner from '../../ui/spinner/BootstrapSpinner'

const SERVER = "http://13.208.129.181:3001";
const io = require('socket.io-client');

let globalMinute;

class StudentCourseOnGoingDetails extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            subject: "",
            description: "",
            message: "",
            loading: false,
            pending_time_slots: [],
            accepted_time_slots: [],
            cancelled_time_slots: [],
            language: [],
            complain: null,
            duration_time: null,
        }
    }
    getProfileIcon = (profile_image) => {
        if (profile_image) {
            return (profile_image) ? `${agent.API_FILE_ROOT_MEDIUM}${profile_image}` : "/images/teacher_signup.jpg"
        } else {
            return "/images/teacher_signup.jpg"
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
    createTimeScheduleWithComplain = (timeSlot) => {
        console.log("createTimeScheduleWithComplain", timeSlot);
        const timeSlotLoop = timeSlot ? timeSlot : []
        let rowData = []
        timeSlotLoop.sort((a, b) => { return new Date(a.date).getTime() - new Date(b.date).getTime() })
        timeSlotLoop.forEach((item, index) => {
            rowData.push(<div key={index} class="d-flex align-items-start flex-wrap justify-content-between">
                <div class="accordion mb-3" id="accordionExample">
                    <div class="accordion-item">
                        <div class="accordion-header" id="headingTwo">
                            <div class="accordion-button p-0 collapsed" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls={`collapse${index}`}>
                                <span class="me-3">{manamusuDateFormatter(item.date)}</span>
                                <time class="me-2 text-light">{hhmmToampm(item.start_time)} - {hhmmToampm(item.end_time)}</time>
                            </div>
                        </div>
                        {/* <div id={`collapse${index}`} class="accordion-collapse collapse" aria-labelledby={`heading${index}`} data-bs-parent="#accordionExample">
                            <div class="accordion-body d-flex flex-column pb-0 pt-2">
                                <time><span class="text-light">Start time :</span>&nbsp;5:33pm</time>
                                <time><span class="text-light">End time :</span>&nbsp;6:36pm</time>
                                <time><span class="text-light">Total time :</span>&nbsp;1hr 1min</time>
                            </div>
                        </div> */}
                    </div>
                </div>
                {item.complain_subject_id ? <></> :
                    <a class="text-danger text-decoration-underline mb-3 cursor-pointer" data-bs-toggle="modal" data-bs-target="#timeslotComplainModal" onClick={() => this.setState({ ...this.state, complain: item })}>Complain</a>
                }
            </div>)
        });
        return rowData
    }
    goToLink = (params) => {
        let router = this.props.router
        router.push(`/${router.query.lang}/${params}`)
    }

    setMyState = (name, value) => {
        this.setState({
            ...this.state,
            [name]: value,
            error_info: { name: "", msg: "" }
        })
    }
    onBookingComplain = () => {
        const { subject, description } = this.state
        const { router } = this.props
        let course_id = router.query.course_id

        const item = {
            booking_id: course_id,
            subject_id: subject,
            description: description
        }
        if (subject) {
            this.setState({
                ...this.state,
                loading: true
            }, () => {
                agent.Student.createBookingComplain(item).then(res => {
                    document.getElementById("closeComplainModal").click()
                    this.setState({
                        ...this.state,
                        ...res,
                        subject: "",
                        description: "",
                        loading: false,
                    })
                    console.log('createBookingComplain res', res);
                }).catch(err => {
                    console.log('createBookingComplain err', err);
                    this.setState({
                        ...this.state,
                        loading: false,
                    })
                })
            })
        }

    }
    onTimeSlotComplain = () => {
        const { subject, description, complain } = this.state
        // const { router } = this.props
        // let course_id = router.query.course_id

        console.log("complain", complain);
        const item = {
            time_slot_id: complain.id,
            subject_id: subject,
            description: description
        }

        if (subject) {
            this.setState({
                ...this.state,
                loading: true
            }, () => {
                agent.Student.createTimeSlotComplain(item).then(res => {
                    document.getElementById("closetimeslotComplainModal").click()
                    this.setState({
                        ...this.state,
                        subject: "",
                        description: "",
                        loading: false,
                    })
                    console.log('createTimeSlotComplain res', res);
                }).catch(err => {
                    console.log('createTimeSlotComplain err', err);
                    this.setState({
                        ...this.state,
                        loading: false,
                    })
                })
            })
        }


    }
    render() {
        const { postDetail, booking_detail, pending_time_slots, accepted_time_slots, cancelled_time_slots, subject, description, message, loading, language, complain, duration_time } = this.state
        const { languages, subjects, teaching_standards, complain_subject, router } = this.props

        const acceptedTimeSlot = accepted_time_slots ? accepted_time_slots : []
        const pendingTimeSlot = pending_time_slots ? pending_time_slots : []
        const cancelledTimeSlot = cancelled_time_slots ? cancelled_time_slots : []
        // console.log("state complain", this.state.complain);
        return (
            <section>
                <div>
                    <div class="container">
                        <div class="row g-lg-5">
                            <div class="col border-end border-md-0 py-5">
                                <div class="my-3">
                                    <div class="d-flex align-items-center justify-content-between flex-wrap">
                                        <div class="d-flex align-items-start">
                                            <img class="profile-rectangle me-3" src={this.getProfileIcon(booking_detail ? booking_detail.teacher_profile_image : "")} />
                                            <div>
                                                <div class="d-flex align-items-center flex-wrap">
                                                    <h4 class="me-4 mb-0">{booking_detail ? capitalizeFirstLetter(booking_detail.teacher_first_name) : ""} {booking_detail ? capitalizeFirstLetter(booking_detail.teacher_last_name) : ""}</h4>
                                                    <span class="text-primary cursor-pointer space-nowrap fs-18" onClick={() => this.goToLink(`teacher/${postDetail ? postDetail.user_id : ""}`)}>View Profile <i class="fas fa-chevron-right fs-12 ms-2"></i></span>
                                                </div>
                                                <div class="d-flex align-items-center mb-2">
                                                    <img class="me-2" src="/images/icons/stars.jpg" />
                                                    <span class="text-yello fs-24">{booking_detail ? booking_detail.user_rating ? booking_detail.user_rating : "0.0" : "0.0"}</span>
                                                </div>
                                                <div class="d-flex">
                                                    <a class="text-primary cursor-pointer me-3" onClick={() => this.goToLink(`chat?booking_id=${router.query.course_id}`)}><i class="fas fa-comment me-2"></i>chat</a>
                                                </div>

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
                                        <div class="mt-5">
                                            {message ?
                                                <button type="button" class="btn btn-danger px-5 text-uppercase">{message}</button>
                                                : <button type="button" class="btn btn-danger px-5 text-uppercase" data-bs-toggle="modal" data-bs-target="#complainModal">COMPLAIN</button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-auto pt-5">
                                <div class="overflow-section">
                                    {acceptedTimeSlot.length > 0 ?
                                        <div class="card mt-4 shadow-lg">
                                            <div class="card-body">
                                                <h5>Class Schedule</h5>
                                                {this.createTimeScheduleWithComplain(acceptedTimeSlot)}
                                            </div>
                                        </div>
                                        : <></>}
                                    {duration_time ?
                                        <div class="card mt-4 shadow-lg">
                                            <div class="card-body">
                                                <h5>Today's Class</h5>

                                                <div class="d-flex align-items-start flex-wrap justify-content-between">
                                                    <div class="accordion mb-3" id="accordionExample">
                                                        <div class="accordion-item">
                                                            <div class="accordion-header" >
                                                                <span class="me-3">{manamusuDateFormatter(new Date())}</span>
                                                                <br />
                                                                <time class="me-2 text-light">{duration_time}</time>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
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
                                <i id="closeComplainModal" class="fas fa-times close-button" data-bs-dismiss="modal" aria-label="Close"></i>
                            </div>
                            <form onSubmit={(e) => { e.preventDefault(); this.onBookingComplain() }}>
                                <div class="modal-body">
                                    <h5 class="modal-title text-center mb-4" id="exampleModalLabel">Complain Form</h5>
                                    <div class="mb-3">
                                        <label class="form-label">Subject</label>
                                        <select class="form-select" name="subject" value={subject} onChange={(e) => this.setMyState(e.target.name, e.target.value)} required>
                                            <option value="">Select Subject</option>
                                            {complain_subject.map((res) => { return <option value={res.id}>{res.name}</option> })}
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Description</label>
                                        <textarea class="form-control" placeholder="Sort Description" rows="4" name="description" value={description} onChange={(e) => this.setMyState(e.target.name, e.target.value)} required></textarea>
                                    </div>
                                    <div class="d-flex flex-column justify-content-center align-items-center py-3">
                                        <button type="submit" class="btn btn-primary px-5 py-2">{loading ? <BootstrapSpinner2 /> : "SEND"}</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="timeslotComplainModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header border-0">
                                <i id="closetimeslotComplainModal" class="fas fa-times close-button" data-bs-dismiss="modal" aria-label="Close"></i>
                            </div>
                            <form onSubmit={(e) => { e.preventDefault(); this.onTimeSlotComplain() }}>
                                <div class="modal-body">
                                    <h5 class="modal-title text-center mb-4" id="exampleModalLabel">Complain Form</h5>
                                    <div class="mb-3">
                                        <label class="form-label">Subject</label>
                                        <select class="form-select" name="subject" value={subject} onChange={(e) => this.setMyState(e.target.name, e.target.value)} required>
                                            <option value="">Select Subject</option>
                                            {complain_subject.map((res) => { return <option value={res.id}>{res.name}</option> })}
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Description</label>
                                        <textarea class="form-control" placeholder="Sort Description" rows="4" name="description" value={description} onChange={(e) => this.setMyState(e.target.name, e.target.value)} required></textarea>
                                    </div>
                                    <div class="d-flex flex-column justify-content-center align-items-center py-3">
                                        <button type="submit" class="btn btn-primary px-5 py-2">{loading ? <BootstrapSpinner2 /> : "SEND"}</button>
                                    </div>
                                </div>
                            </form>
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
    }
    initialiseDuration = () => {
        this.initialiseTimeDuration(globalMinute)
        globalMinute += 1
        setTimeout(this.initialiseDuration, 60000);
    }
    componentDidMount() {
        const { router, user_info } = this.props
        if (user_info) {
            agent.setToken(user_info.token)
            this.configureSocket();

            let course_id = router.query.course_id
            agent.Student.getBookingDetailsByBookingId(course_id).then(res => {

                agent.Auth.getPostById(res.booking_detail ? res.booking_detail.post_id : "").then(resPost => {

                    const today = new Date()
                    const date1 = new Date(today.getFullYear(), today.getMonth() + 1, today.getDay() + 1, 0, 0, 0);
                    const date2 = new Date(today.getFullYear(), today.getMonth() + 1, today.getDay() + 1, today.getHours(), today.getMinutes(), 0);
                    const diffTime = Math.abs(date2 - date1);

                    console.log("getFullYear", today.getFullYear(), today.getMonth() + 1, today.getDay() + 1, today.getHours(), today.getMinutes(), 0);

                    var minDiff = diffTime / 60 / 1000; //in minutes
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    console.log("initialiseTimeDuration diffDays", diffDays + " days");
                    console.log("initialiseTimeDuration minDiff", minDiff + " minute");

                    globalMinute = minDiff
                    this.initialiseDuration()
                    this.setState({
                        ...this.state,
                        ...res,
                        ...resPost,
                    })
                }).catch(err => {
                    console.log("getBookingDetailsByBookingId error", err);
                })

            }).catch(err => {
                console.log("getBookingDetailsByBookingId error", err);
            })
        } else {
            router.push(`/${router.query.lang}/sign-in`)
        }
    }
}

export default StudentCourseOnGoingDetails