import React, { useState } from 'react'
import agent from '../../../utils/agent'
import { manamusuDateFormatter } from '../../../utils/date_contant'
import { capitalizeFirstLetter } from '../../../utils/validation_contant'
import { hhmmToampm } from '../../../utils/work_contant'

class TeacherCourseRequestDetails extends React.Component {

    constructor(props) {
        super(props)
        console.log("TeacherCourseRequestDetails props", props);
        this.state = {
            token: props.user_info ? props.user_info.token : null,
            booking: null

        }
    }
    getProfileIcon = (profile_image) => {
        if (profile_image) {
            return (profile_image ) ? `${agent.API_FILE_ROOT_MEDIUM}${profile_image}` : "/images/teacher_profile.svg"
        } else {
            return "/images/teacher_profile.svg"
        }
    }
    goToLink = (params) => {
        let router = this.props.router
        router.push(`/${router.query.lang}/${params}`)
    }
    initialiseBookingDetails = () => {
        const { booking_detail } = this.props

        agent.Teacher.getBookingDetails(booking_detail.id).then(res => {
            this.setState({
                ...this.state,
                booking: res
            }, () => {
                console.log("TeacherCourseRequestDetails getBookingDetails state", this.state);
            })
        }).catch(err => {

        })
    }
    acceptBooking = () => {
        const { booking_detail } = this.props
        agent.setToken(this.props.user_info.token)
        if (typeof window !== "undefined") {
            if (window.confirm("Do you really want to accept?")) {
                agent.Teacher.acceptBooking({
                    "booking_id": booking_detail.id
                }).then(res => {
                    console.log("acceptBooking", res);
                    this.initialiseBookingDetails()
                    // this.props.router.back()
                })
            }
        } else {
            agent.Teacher.acceptBooking({
                "booking_id": booking_detail.id
            }).then(res => {
                console.log("acceptBooking", res);
                // this.props.router.back()
                this.initialiseBookingDetails()

            })
        }
    }
    acceptClassSlot = () => {
        const { booking_detail } = this.props
        agent.setToken(this.props.user_info.token)
        if (typeof window !== "undefined") {
            if (window.confirm("Do you really want to accept?")) {
                agent.Teacher.acceptTimeSlot({
                    "booking_id": booking_detail.id
                }).then(res => {
                    console.log("acceptTimeSlot", res);
                    this.initialiseBookingDetails()
                    // this.props.router.back()
                })
            }
        } else {
            agent.Teacher.acceptTimeSlot({
                "booking_id": booking_detail.id
            }).then(res => {
                console.log("acceptTimeSlot", res);
                // this.props.router.back()
                this.initialiseBookingDetails()

            })
        }
    }
    rejectBooking = () => {
        const { booking_detail } = this.props
        agent.setToken(this.props.user_info.token)
        if (typeof window !== "undefined") {
            if (window.confirm("Do you really want to decline?")) {
                agent.Teacher.declineBooking({
                    "booking_id": booking_detail.id
                }).then(res => {
                    console.log("declineBooking", res);
                    this.initialiseBookingDetails()
                    // this.props.router.back()

                })
            }
        } else {
            agent.Teacher.declineBooking({
                "booking_id": booking_detail.id
            }).then(res => {
                console.log("declineBooking", res);
                // this.props.router.back()
                this.initialiseBookingDetails()

            })
        }
    }
    rejectClassSlot = () => {
        const { booking_detail } = this.props
        agent.setToken(this.props.user_info.token)
        if (typeof window !== "undefined") {
            if (window.confirm("Do you really want to decline?")) {
                agent.Teacher.declineTimeSlot({
                    "booking_id": booking_detail.id
                }).then(res => {
                    console.log("declineTimeSlot", res);
                    this.initialiseBookingDetails()
                    // this.props.router.back()

                })
            }
        } else {
            agent.Teacher.declineTimeSlot({
                "booking_id": booking_detail.id
            }).then(res => {
                console.log("declineTimeSlot", res);
                // this.props.router.back()
                this.initialiseBookingDetails()

            })
        }
    }
    render() {
        console.log("TeacherCourseRequestDetails state", this.state);
        const { postDetail, booking } = this.state
        const { languages, subjects, router, booking_detail, pending_time_slots, accepted_time_slots, cancelled_time_slots } = this.props

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
                                                    <span class="text-primary cursor-pointer space-nowrap fs-18" onClick={() => this.goToLink(`teacher/${postDetail ? postDetail.user_id : ""}`)}>View Profile <i class="fas fa-chevron-right fs-12 ms-2"></i></span>
                                                </div>
                                                <div class="d-flex align-items-center mb-2">
                                                    <img class="me-2" src="/images/icons/stars.jpg" />
                                                    <span class="text-yello fs-24">{booking_detail ? booking_detail.user_rating ? booking_detail.user_rating : "0.0" : "0.0"}</span>
                                                </div>
                                                <a class="text-primary text-decoration-underline" onClick={() => this.goToLink(`chat?booking_id=${router.query.course_id}`)}><i class="fas fa-comment me-2"></i>chat</a>
                                            </div>
                                        </div>
                                        <span class="text-black fs-24">{booking_detail ? booking_detail.currency : '$'} {booking_detail ? booking_detail.hourly_rate : 0}/hr</span>
                                    </div>
                                    <div class="mt-5">
                                        <div class="main-heading me-4">
                                            <h2 class="sub-heading mb-0 fs-24">{postDetail ? postDetail.title : ""}</h2>
                                        </div>
                                        <div class="mt-4">
                                            <img class="icon-size-2 me-3" src="/images/icons/books.svg" alt="" />
                                            <span class="text-third text-secondary">{postDetail ? this.getValueFromDropdown(subjects, postDetail.subject) : ""}</span>
                                        </div>
                                        <div class="mt-4">
                                            <img class="icon-size-2 me-3" src="/images/icons/class.svg" alt="" />
                                            <span class="text-third text-secondary">{postDetail ? postDetail.teaching_standard : ""}</span>
                                        </div>
                                        <div class="mt-4">
                                            <img class="icon-size-2 me-3" src="/images/icons/language.svg" alt="" />
                                            <span class="text-third text-secondary">{this.getPostLanguage(languages)}</span>
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
                            <div class="col-auto pt-5">
                                <div class="overflow-section">
                                    {acceptedTimeSlot.length > 0 ?
                                        <div class="card mt-4 shadow-lg">
                                            <div class="card-body">
                                                <h5>Class Schedule</h5>
                                                {/* <hr /> */}
                                                {/* <span>Pending</span> */}
                                                {this.createTimeSchedule(acceptedTimeSlot)}
                                                {/* <hr /> */}
                                                {/* <span>Accepted</span> */}
                                                {/* {this.createTimeSchedule(accepted_time_slots ? accepted_time_slots : [])} */}
                                                {/* <hr /> */}
                                                {/* <span>Cancellted</span> */}
                                                {/* {this.createTimeSchedule(cancelled_time_slots ? cancelled_time_slots : [])} */}

                                                {/* <div class="d-flex align-items-start flex-wrap justify-content-between">
                                                <div class="accordion mb-3" id="accordionExample">
                                                    <div class="accordion-item">
                                                        <div class="accordion-header" id="headingOne">
                                                            <div class="accordion-button p-0 collapsed" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                                                <span class="me-3">Feb 16, 2021</span>
                                                                <time class="me-2 text-light">5:30pm - 6:30pm</time>
                                                            </div>
                                                        </div>
                                                        <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                            <div class="accordion-body d-flex flex-column pb-0 pt-2">
                                                                <time><span class="text-light">Start time :</span>&nbsp;5:33pm</time>
                                                                <time><span class="text-light">End time :</span>&nbsp;6:36pm</time>
                                                                <time><span class="text-light">Total time :</span>&nbsp;1hr 1min</time>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <a class="text-danger text-decoration-underline mb-3">Complain</a>
                                            </div>
                                            <div class="d-flex align-items-start flex-wrap justify-content-between">
                                                <div class="accordion mb-3" id="accordionExample">
                                                    <div class="accordion-item">
                                                        <div class="accordion-header" id="headingTwo">
                                                            <div class="accordion-button p-0 collapsed" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                                <span class="me-3">Feb 16, 2021</span>
                                                                <time class="me-2 text-light">5:30pm - 6:30pm</time>
                                                            </div>
                                                        </div>
                                                        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                            <div class="accordion-body d-flex flex-column pb-0 pt-2">
                                                                <time><span class="text-light">Start time :</span>&nbsp;5:33pm</time>
                                                                <time><span class="text-light">End time :</span>&nbsp;6:36pm</time>
                                                                <time><span class="text-light">Total time :</span>&nbsp;1hr 1min</time>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <a class="text-danger text-decoration-underline mb-3">Complain</a>
                                            </div>
                                            <div class="d-flex align-items-start flex-wrap justify-content-between">
                                                <div class="accordion mb-3" id="accordionExample">
                                                    <div class="accordion-item">
                                                        <div class="accordion-header" id="headingThree">
                                                            <div class="accordion-button p-0 collapsed" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                <span class="me-3">Feb 16, 2021</span>
                                                                <time class="me-2 text-primary">5:30pm - 6:30pm</time>
                                                            </div>
                                                        </div>
                                                        <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                            <div class="accordion-body d-flex flex-column pb-0 pt-2">
                                                                <time><span class="text-light">Start time :</span>&nbsp;5:33pm</time>
                                                                <time><span class="text-light">End time :</span>&nbsp;6:36pm</time>
                                                                <time><span class="text-light">Total time :</span>&nbsp;1hr 1min</time>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
                                            </div>
                                        </div>
                                        : <></>}

                                    {pendingTimeSlot.length > 0 ?
                                        <div class="card mt-4 shadow-lg">
                                            <div class="card-body">
                                                <h5>Requested Class</h5>
                                                {this.createTimeSchedule(pendingTimeSlot)}
                                            </div>

                                            {bookingStatus === 2 ?
                                                <div class="mt-1">
                                                    <button type="button" class="btn btn-primary me-4" onClick={() => this.acceptClassSlot()}>ACCEPT</button>
                                                    <button type="button" class="btn btn-danger" onClick={() => this.rejectClassSlot()}>DECLINE</button>
                                                </div>
                                                : <></>}
                                        </div>

                                        : <></>}

                                    {cancelledTimeSlot.length > 0 ?
                                        < div class="card mt-4 shadow-lg">
                                            <div class="card-body">
                                                <h5>Declined Classes</h5>
                                                {this.createTimeSchedule(cancelledTimeSlot)}
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

            </section >


        )
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
                            {/* <time class="me-2 text-light">{(item.start_time > 12) ? (Number(item.start_time)) - 12 : item.start_time}:00{(item.start_time > 11) ? "pm" : "am"} - {(item.end_time > 12) ? (Number(item.end_time)) - 12 : item.end_time}:00{(item.end_time > 11) ? "pm" : "am"}</time> */}
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
    componentDidMount() {
        const { token } = this.state
        const { router, booking_detail } = this.props
        let course_id = router.query.course_id

        if (token && course_id) {
            agent.setToken(token)

            agent.Auth.getPostById(booking_detail.post_id).then(resPost => {
                this.setState({
                    ...this.state,
                    ...resPost
                })
            }).catch(err => {
                console.log("getBookingDetailsByBookingId error", err);
            })

        } else {
            console.log("token not found", token);
        }
    }
}

export default TeacherCourseRequestDetails