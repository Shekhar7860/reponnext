import React, { useState } from 'react'
import agent from '../../../utils/agent'
import { manamusuDateFormatter } from '../../../utils/date_contant'
import { capitalizeFirstLetter } from '../../../utils/validation_contant'
import { hhmmToampm } from '../../../utils/work_contant'

class StudentCoursePendingPaymentDetails extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            token: props.user_info ? props.user_info.token : null,

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
                            {/* <time class="me-2 text-light">{(item.start_time > 12) ? (Number(item.start_time)) - 12 : item.start_time}:00{(item.start_time > 11) ? "pm" : "am"} - {(item.end_time > 12) ? (Number(item.end_time)) - 12 : item.end_time}:00{(item.end_time > 11) ? "pm" : "am"}</time> */}
                        </div>
                    </div>
                </div>
            </div>)
            // console.log("timeSlotLoop.forEach", item, "index", index);
        });
        return rowData
    }
    goToLink = (params) => {
        let router = this.props.router
        router.push(`/${router.query.lang}/${params}`)
    }
    render() {
        console.log("StudentCoursePendingPaymentDetails state", this.state);
        const { postDetail, booking_detail, pending_time_slots, accepted_time_slots, cancelled_time_slots } = this.state
        const { languages, subjects, router } = this.props

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
                                            <img class="profile-rectangle me-3" src={this.getProfileIcon(booking_detail ? booking_detail.teacher_profile_image : "")} />
                                            <div>
                                                <div class="d-flex align-items-center flex-wrap">
                                                    <h4 class="me-4 mb-0">{booking_detail ? capitalizeFirstLetter(booking_detail.teacher_first_name) : "Hyunwoong"} {booking_detail ? capitalizeFirstLetter(booking_detail.teacher_last_name) : "Kim"}</h4>
                                                    <span class="text-primary cursor-pointer space-nowrap fs-18" onClick={() => this.goToLink(`teacher/${postDetail ? postDetail.user_id : ""}`)}>View Profile <i class="fas fa-chevron-right fs-12 ms-2"></i></span>
                                                </div>
                                                <div class="d-flex align-items-center mb-2">
                                                    <img class="me-2" src="/images/icons/stars.jpg" />
                                                    <span class="text-yello fs-24">{booking_detail ? booking_detail.user_rating ? booking_detail.user_rating : "0.0" : "0.0"}</span>
                                                </div>
                                                <div class="d-flex">
                                                    <a class="text-primary cursor-pointer me-3" onClick={() => this.goToLink(`chat?booking_id=${router.query.course_id}`)}><i class="fas fa-comment me-2"></i>chat</a>
                                                    <a class="text-primary cursor-pointer" onClick={() => this.goToLink(`teacher/${postDetail.user_id}/post/${postDetail.id}`)}><i class="fas fa-pencil-alt me-2"></i>edit</a>
                                                </div>

                                            </div>
                                        </div>
                                        <span class="text-black fs-24">{booking_detail ? booking_detail.currency : '$'} {booking_detail ? booking_detail.hourly_rate : 0}/hr</span>
                                    </div>
                                    <div class="mt-5">
                                        <div class="main-heading me-4">
                                            <h2 class="sub-heading mb-0 fs-24">Physics B.Sc ready to tutor IB students.</h2>
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
                {/* <div class="modal fade" id="complainModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                </div> */}

            </section>


        )
    }
    getPostLanguage = (langs) => {
        console.log("getPostLanguage", langs);
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
        console.log("getValueFromDropdown list", list, "key", key);
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
        const { router } = this.props
        let course_id = router.query.course_id

        if (token && course_id) {
            agent.setToken(token)
            agent.Student.getBookingDetailsByBookingId(course_id).then(res => {

                agent.Auth.getPostById(res.booking_detail ? res.booking_detail.post_id : "").then(resPost => {
                    this.setState({
                        ...this.state,
                        ...res,
                        ...resPost
                    })
                }).catch(err => {
                    console.log("getBookingDetailsByBookingId error", err);
                })

            }).catch(err => {
                console.log("getBookingDetailsByBookingId error", err);
            })
        } else {
            console.log("token not found", token);
        }
    }
}

export default StudentCoursePendingPaymentDetails