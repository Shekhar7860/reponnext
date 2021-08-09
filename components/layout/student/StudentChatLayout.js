import React from "react"
import Calendar from 'react-calendar';
import ChatUserList from "../../ui/chat/ChatUserList"
import ChatAcceptedByUsRow1 from "../../ui/chat_list/ChatAcceptedByUsRow1"
import ChatNormalByUsRow1 from "../../ui/chat_list/ChatNormalByUsRow1"
import ChatNormalByMeRow1 from "../../ui/chat_list/ChatNormalByMeRow1"
import ChatPaymentDoneByMe1 from "../../ui/chat_list/ChatPaymentDoneByMe1"
import agent from "../../../utils/agent";
import BootstrapSpinner2 from "../../ui/spinner/BootstrapSpinner2";
import BootstrapSpinner from "../../ui/spinner/BootstrapSpinner";
import { capitalizeFirstLetter } from "../../../utils/validation_contant";
import { manamusuDateFormatter, timeDateByUser, timestampToYyyyMmDd } from "../../../utils/date_contant";
import { hhmmToampm } from "../../../utils/work_contant";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../ui/stripe_payment/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import actions from "../../../store/actions";
import { setCookie } from "nookies";

const SERVER = "http://13.208.129.181:3001";
const io = require('socket.io-client');
const stripeKey = loadStripe("pk_test_51JAVmXG8oPs9xsvB9tfF4WIKgauYbXViulEXIm9iiccKCHHYeOJDen1pH6XnBl0RFc3BPVupfRetZc42gmG2w44b00N8qXAuun");

let socket;

class StudentChatLayout extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user: props.user_info ? props.user_info.user : {},
            calendar_date: new Date(),
            accepted_time_slots: [],
            pending_time_slots: [],
            cancelled_time_slots: [],
            booking_detail: null,
            sideUserList: [],
            messageList: [],
            msg: "",
            newHourlyRate: "",
            selectedUser: null,
            loading: false,
            editSchedule: false,
            booking_amount: null,

            duration: "30",
            start_time: "00:00",
            end_time: "00:30",
            duration_time: "00:30",
            selectedTimeSlot: new Map(),
            clientSecret: null,
            defaultSidebarStatus: "1",
            chat_id: ""
        }
        this.messagesEnd = React.createRef()

    }

    editHourlyRate = () => {
        const { newHourlyRate, booking_detail } = this.state
        if (Number(newHourlyRate)) {
            this.setState({
                ...this.state,
                loading: true
            }, () => {
                agent.Student.editMakeOffer({
                    "booking_id": booking_detail.id,
                    "hourly_rate": Number(newHourlyRate)
                }).then(res => {
                    document.getElementById("closeChangeAmountModal").click()
                    console.log("editHourlyRate res", res);
                    if (booking_detail.id) {
                        this.initialiseBookingDetails(booking_detail.id)
                    }

                }).catch(err => {
                    console.log("editHourlyRate err", err);
                    this.setState({
                        ...this.state,
                        loading: false
                    })
                })
            })

        }
    }
    semdNewMessage = () => {
        const { msg, user, booking_detail } = this.state
        if (msg) {
            console.log("user.id", user.id, "booking_detail.user_id", booking_detail.user_id);

            this.socket.emit(`message_sent`, { user_from: user.id, user_to: booking_detail.teacher_id, message: msg, booking_id: booking_detail.id })
            this.setState({ ...this.state, msg: "" })
        } else {
            console.log("Booking msg", msg);
        }
    }
    onClickSlideBar = (element) => {
        console.log("onClickSlideBar", element);
        const { router } = this.props
        router.replace({
            pathname: '',
            query: { booking_id: element.booking_id, conversation_id: element.conversation_id },
        })
        // this.setState({ ...this.state, selectedUser: element }, () => {
        //     this.initialiseOneToOneMessage(element.conversation_id)
        //     this.initialiseBookingDetails(element.booking_id)
        // })
    }
    render() {
        const { accepted_time_slots, pending_time_slots, cancelled_time_slots, booking_detail, calendar_date, sideUserList, msg, messageList,
            loading, newHourlyRate, editSchedule, start_time, end_time, duration_time, booking_amount, chat_id, duration, defaultSidebarStatus } = this.state
        const { router } = this.props
        return <section>
            <div className="chat">
                <div className="row g-0">
                    <div className="col-xl-3 col-lg-4 border-end">
                        <div className="chat-head">
                            <div className="main-heading me-3">
                                {/* <h2 className="sub-heading mb-0 fs-20 circular-book">Messages </h2> */}
                            </div>
                            <div className="flex-grow-1 d-flex justify-content-end">
                                <div className="search-box">
                                    <button className="btn-search"><i className="fas fa-search"></i></button>
                                    <input type="text" className="input-search" placeholder="Type to Search..." />
                                </div>
                            </div>
                        </div>
                        <select class="form-select" aria-label="Default select example" value={defaultSidebarStatus} onChange={(e) => this.setState({ ...this.state, defaultSidebarStatus: e.target.value }, () => this.initialiseSidebarUser(1))}>
                            <option value="1">Payment Pending</option>
                            <option value="2">Accepted</option>
                            <option value="3">Declined</option>
                            <option value="4">Ongoing</option>
                            <option value="5">Completed</option>
                        </select>
                        <div className="profile-list">
                            {/* <div className="profile-menu active">
                                <div className="position-relative me-3">
                                    <img className="profile-image" src="/images/teacher_signup.jpg" data-bs-toggle="modal" data-bs-target="#profileModal" />
                                    <span className="active-dots"></span>
                                </div>
                                <div className="flex-grow-1">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <b className="single-ellipsis fs-18">Physics B.sc ready</b>
                                        <span className="badge bg-primary ms-3">4</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <p className="single-ellipsis text-third mb-0">Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor</p>
                                        <span className="light-heading space-nowrap ms-3">Just now</span>
                                    </div>
                                </div>
                            </div> */}
                            {sideUserList.map((res) => {
                                return <ChatUserList key={res.id} {...res} active={res.conversation_id == router.query.conversation_id} onClickSlideBar={this.onClickSlideBar} />
                            })}

                            {/* <ChatUserList /> */}
                            {/* <div className="profile-menu">
                                <div className="position-relative me-3">
                                    <img className="profile-image" src="/images/teacher_signup.jpg" />
                                    <span className="active-dots"></span>
                                </div>
                                <div className="flex-grow-1">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <b className="single-ellipsis fs-18">Physics B.sc ready</b>
                                        <span className="light-heading ms-3">Yesterday</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <p className="single-ellipsis text-third mb-0">Lorem ipsum dolor</p>
                                        <span className="light-heading space-nowrap ms-3">9:30am</span>
                                    </div>
                                </div>
                            </div>
                            <div className="profile-menu">
                                <div className="position-relative me-3">
                                    <img className="profile-image" src="/images/teacher_signup.jpg" />
                                    <span className="active-dots"></span>
                                </div>
                                <div className="flex-grow-1">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <b className="single-ellipsis fs-18">Physics B.sc ready</b>
                                        <span className="badge bg-primary ms-3">4</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <p className="single-ellipsis text-third mb-0">Lorem ipsum dolor</p>
                                        <span className="light-heading space-nowrap ms-3">Just now</span>
                                    </div>
                                </div>
                            </div>
                            <div className="profile-menu">
                                <div className="position-relative me-3">
                                    <img className="profile-image" src="/images/teacher_signup.jpg" />
                                    <span className="active-dots"></span>
                                </div>
                                <div className="flex-grow-1">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <b className="single-ellipsis fs-18">Physics B.sc ready</b>
                                        <span className="light-heading ms-3">Yesterday</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <p className="single-ellipsis text-third mb-0">Lorem ipsum dolor</p>
                                        <span className="light-heading space-nowrap ms-3">9:30am</span>
                                    </div>
                                </div>
                            </div>
                            <div className="profile-menu">
                                <div className="position-relative me-3">
                                    <img className="profile-image" src="/images/teacher_signup.jpg" />
                                    <span className="active-dots"></span>
                                </div>
                                <div className="flex-grow-1">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <b className="single-ellipsis fs-18">Physics B.sc ready</b>
                                        <span className="badge bg-primary ms-3">4</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <p className="single-ellipsis text-third mb-0">Lorem ipsum dolor</p>
                                        <span className="light-heading space-nowrap ms-3">Just now</span>
                                    </div>
                                </div>
                            </div>
                         */}
                        </div>
                    </div>
                    <div className="col-xl-5 col-lg-8">
                        <div className="chat-head">
                            {booking_detail ?
                                <div className="d-flex align-items-md-center align-items-start flex-grow-1">
                                    <div className="position-relative me-3">
                                        <img className="profile-image" src={this.getProfileIconByUrl(booking_detail ? booking_detail.teacher_profile_image : "")} alt={booking_detail ? booking_detail.teacher_profile_image : ""} />
                                        <span className="active-dots"></span>
                                    </div>
                                    <div className="flex-grow-1">
                                        <b className="detail-text">{booking_detail ? booking_detail.post_title : <BootstrapSpinner2 />}</b>
                                        <div className="d-flex align-items-center justify-content-between flex-wrap">
                                            <p className="text-third mb-0 space-nowrap me-3 mt-1"><span className="text-light">ID :</span>&nbsp;{booking_detail ? booking_detail.id : <BootstrapSpinner2 />}</p>
                                            <a className="text-third text-primary space-nowrap cursor-pointer mt-1" onClick={() => { (booking_detail.post_type == "post") ? router.push(`/${router.query.lang}/teacher/${booking_detail.teacher_id}`) : router.push(`/${router.query.lang}/student/${booking_detail.user_id}`) }}>View Details<i className="fas fa-chevron-right ms-2 fs-12"></i></a>
                                        </div>
                                    </div>
                                </div>
                                : <></>}
                        </div>
                        <div className="chat-bg pb-2">
                            <div className="message-area">
                                {/* <ChatNormalByMeRow1 />
                                <ChatNormalByUsRow1 />
                                <ChatAcceptedByUsRow1 />
                                <ChatPaymentDoneByMe1 /> */}
                                {messageList.map((res) => {
                                    return res
                                })}
                                <div ref={(el) => { this.messagesEnd = el; }}></div>

                            </div>
                            <div className="row justify-content-center">
                                <div className="col-lg-8">
                                    <form onSubmit={(e) => { e.preventDefault(); this.semdNewMessage() }}>
                                        <div className="message-send-bar my-3 mx-3">
                                            <input type="text" className="form-control border-0" placeholder="Type message here and press enter" value={msg} onChange={(e) => this.setState({ ...this.state, msg: e.target.value })} />
                                            <button className="send-btn" type="submit"><span className="send-btn"><i className="fas fa-paper-plane"></i></span></button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-5">
                        <div className="chat-third-section">
                            {booking_detail ?
                                <div className="row">
                                    <div className="col-xl-9 col-lg-12">
                                        <div>
                                            <h3 className="sub-heading fs-20 circular-book">{capitalizeFirstLetter(booking_detail ? booking_detail.teacher_first_name : "")} {capitalizeFirstLetter(booking_detail ? booking_detail.teacher_last_name : "")}</h3>
                                            {booking_detail ?
                                                <p><span className="text-light">Current Amount:</span>&nbsp;USD {loading ? <BootstrapSpinner2 /> : booking_detail.hourly_rate}/hr {accepted_time_slots.length === 0 ? <a class="text-primary cursor-pointer pl-5" ><i class="fas fa-pencil-alt me-2" data-bs-toggle="modal" data-bs-target="#changeAmountModal"></i></a> : <></>}</p>
                                                : <BootstrapSpinner2 />}
                                        </div>
                                        {/* <h3 className="sub-heading fs-20">Change Amount</h3>
                                    <div className="d-flex align-items-center">
                                        <input type="text" className="form-control" placeholder="Enter Amount" value={newHourlyRate} onChange={(e) => this.setState({ ...this.state, newHourlyRate: e.target.value })} />
                                        <span className="ms-3 me-4">/hr</span>
                                        <button type="button" className="btn btn-primary" onClick={() => this.editHourlyRate()}>{loading ? <BootstrapSpinner2 /> : "APPLY"}</button>
                                    </div> */}
                                        <div class="d-flex align-items-center mt-4 justify-content-between">
                                            <h5 class="space-nowrap">Classes</h5>
                                            {editSchedule ?
                                                <a class="text-primary cursor-pointer pl-5" onClick={() => this.setState({ ...this.state, editSchedule: !editSchedule })}>Done</a>
                                                :
                                                <a class="text-primary cursor-pointer pl-5" onClick={() => this.setState({ ...this.state, editSchedule: !editSchedule })}><i class="fas fa-pencil-alt me-2"></i>Edit</a>
                                            }</div>
                                        <div class="accordion" id="accordionExample">
                                            {accepted_time_slots.length > 0 ?
                                                <div className="card mt-1 shadow-lg" style={{ maxHeight: "250px" }} >
                                                    <div className="card-body">
                                                        <div class="accordion-item">
                                                            <div class="accordion-button collapsed px-0" data-bs-toggle="collapse" data-bs-target="#collapseScheduleClass" aria-expanded="false" aria-controls="collapseScheduleClass">
                                                                <h5 className="mb-0">Class Schedule</h5>
                                                            </div>
                                                            <div id="collapseScheduleClass" class="accordion-collapse collapse " aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                                {this.getClassesList(accepted_time_slots)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                : <></>}

                                            {pending_time_slots.length > 0 ?
                                                <div className="card mt-1 shadow-lg" style={{ maxHeight: "250px" }}>
                                                    <div className="card-body">
                                                        <div class="accordion-item">
                                                            <div class="accordion-button  px-0" data-bs-toggle="collapse" data-bs-target="#collapsePendingClass" aria-expanded="false" aria-controls="collapsePendingClass">
                                                                <h5 className="mb-0">Pending Class</h5>
                                                            </div>
                                                            <div id="collapsePendingClass" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                                {this.getClassesList(pending_time_slots)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                : <></>}

                                            {/* <div className="text-center">
                                        <button type="button" className="btn btn-primary px-4 me-4 mt-2">ACCEPT</button>
                                        <button type="button" className="btn btn-danger px-4 mt-2">DECLINE</button>
                                    </div> */}
                                            {editSchedule ?

                                                <div class="card mt-4 shadow-lg">
                                                    <div class="card-body">
                                                        <Calendar
                                                            onChange={(e) => this.setState({ ...this.state, "calendar_date": new Date(e) })}
                                                            value={calendar_date}
                                                            minDate={new Date()}
                                                        />
                                                        <div class="row justify-content-between">
                                                            {this.createTimeChips()}
                                                        </div>
                                                        <button type="button" id="selectDateModalBtn" class=" btn btn-ouline mt-1" data-bs-toggle="modal" data-bs-target="#selectTimeModalTarget" >SELECT TIME</button>

                                                    </div>

                                                    {loading ?
                                                        <BootstrapSpinner />
                                                        : editSchedule ?
                                                            <button type="button" class="btn btn-primary " onClick={() => { this.applyNowMethod() }}>UPDATE CLASS SCHEDULE</button>
                                                            : <></>}
                                                </div>
                                                : <></>}
                                            {cancelled_time_slots.length > 0 ?
                                                <div className="card mt-1 shadow-lg" style={{ maxHeight: "250px" }}>
                                                    <div className="card-body">
                                                        <div class="accordion-item">
                                                            <div class="accordion-button collapsed px-0" data-bs-toggle="collapse" data-bs-target="#collapseDeclineClass" aria-expanded="false" aria-controls="collapseDeclineClass">
                                                                <h5 className="mb-0">Declined Classes</h5>
                                                            </div>
                                                            <div id="collapseDeclineClass" class="accordion-collapse collapse " aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                                {this.getClassesList(cancelled_time_slots)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                : <></>}
                                        </div>
                                    </div>
                                </div>
                                : <></>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}


            <div className="modal fade" id="editModal" tabindex="-1" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <i className="fas fa-times close-button" data-bs-dismiss="modal" aria-label="Close"></i>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-lg-6 mt-4">
                                    <div className="card mt-4 shadow-lg">
                                        <div className="card-body">
                                            <Calendar
                                                onChange={(e) => this.setState({ ...this.state, calendar_date: e })}
                                                value={calendar_date}
                                                minDate={new Date()}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 mt-4">
                                    <div className="card mt-4 shadow-lg">
                                        <div className="card-body">
                                            <div className="row justify-content-between">
                                                {this.createTimeChips()}
                                                {/* {createCustomTimeChips(customTimeSlot)} */}
                                            </div>
                                            <button type="button" id="selectDateModalBtn" className=" btn btn-ouline mt-1" data-bs-toggle="modal" data-bs-target="#selectTimeModalTarget" >+ Customize Time</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mt-4">
                                <button type="button" className="btn btn-primary px-5">Done</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}

            <div class="modal fade" id="selectTimeModalTarget" tabIndex="-1" aria-labelledby="selectTimeModal" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header border-0">
                            <i class="fas fa-times close-button" data-bs-dismiss="modal" aria-label="Close"></i>
                        </div>
                        <form onSubmit={(e) => { e.preventDefault(); }} >
                            <div class="modal-body">
                                <div class="text-center mb-4">
                                    <h4 class="modal-title">Select Time for {manamusuDateFormatter(calendar_date.getTime())}</h4>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Duration (minutes)</label>
                                    <input type="number" placeholder="Select Duration" className="form-control" step="30" name="start_time" min="30" max="1800" value={duration} onChange={(e) => this.changeDurationTime(e.target.value)} />

                                    {/* <input type="time" placeholder="Select Duration" pattern="[0-9]{2}:[3]{2}" className="form-control" name="start_time" min="00:30" value={duration_time} onChange={(e) => this.changeDurationTime(e.target.value)} /> */}
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Start Time</label>
                                    <input type="time" placeholder="Start Time" className="form-control" name="start_time" value={start_time} onChange={(e) => { this.setState({ ...this.state, start_time: e.target.value, start_time_number: e.target.valueAsNumber }, () => this.getEndTime()) }} />
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">End Time</label>
                                    <input type="time" placeholder="End Time" className="form-control" name="end_time" value={end_time} onChange={(e) => { this.setState({ ...this.state, end_time: e.target.value, end_time_number: e.target.valueAsNumber }) }} disabled />
                                </div>
                            </div>
                            <div class="modal-footer justify-content-center py-4 border-0">
                                <button type="button" id="selectDateModalBtnClose" class="btn btn-primary py-2 px-5" data-bs-dismiss="modal" onClick={() => this.initialiseSlot(start_time, end_time)}  >CONFIRM</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="profileModal" tabindex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <i className="fas fa-times close-button" data-bs-dismiss="modal" aria-label="Close"></i>
                        </div>
                        <div className="modal-body">
                            Profile here...
                        </div>
                    </div>
                </div>
            </div>

            {/* modal */}

            <div class="modal fade" id={booking_amount ? "paymentModal" : ""} tabindex="-1" aria-labelledby="addTimeLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header border-0">
                            <i id="closeCardModal" class="fas fa-times close-button" data-bs-dismiss="modal" aria-label="Close"></i>
                        </div>
                        <div class="modal-body ">
                            <div class="text-center">
                                {booking_amount ?
                                    <h4 class="modal-title mb-2">Total Amount is {booking_detail ? booking_detail.currency : ""} {booking_amount}</h4>
                                    : <BootstrapSpinner2 />}
                                <Elements stripe={stripeKey}>
                                    <CheckoutForm booking_amount={booking_amount} currency={booking_detail ? booking_detail.currency : ""} booking_id={booking_detail ? booking_detail.id : ""} chat_id={chat_id} changeMessageToDonePayment={this.changeMessageToDonePayment} />
                                </Elements>
                                <br />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            {/* modal */}

            <div class="modal fade" id="changeAmountModal" tabindex="-1" aria-labelledby="addTimeLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header border-0">
                            <i id="closeChangeAmountModal" class="fas fa-times close-button" data-bs-dismiss="modal" aria-label="Close"></i>
                        </div>
                        <div class="modal-body ">
                            <div class="text-center">
                                <h5 class="modal-title text-center mb-4" id="exampleModalLabel">Change Amount</h5>
                                <form onSubmit={(e) => { e.preventDefault(); this.editHourlyRate() }}>
                                    <div class="mb-3">
                                        <input type="text" class="form-control" placeholder="Enter Amount" name="newHourlyRate" value={newHourlyRate} onChange={(e) => this.setState({ ...this.state, newHourlyRate: e.target.value })} required />
                                    </div>
                                    <button type="submit" className="btn btn-primary"> {loading ? <BootstrapSpinner2 /> : "APPLY"}</button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    }
    changeMessageToDonePayment = (msgDetails, chat_id) => {
        console.log("changeMessageToDonePayment", msgDetails, "chat_id", chat_id);
        this.initialiseOneToOneMessage(msgDetails.conversation_id)
        // booking_id: 133
        // booking_type: 3
        // conversation_id: "6_31"
        // created_at: "2021-08-02T12:32:07.000Z"
        // deleted_by: null
        // deleted_for_me: 0
        // id: 110
        // is_read: 1
        // message: "Please make payment to continue..."
        // type: 0
        // user_from: 31

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
    getEndTime = () => {
        let extra = 0
        const { start_time, duration_time } = this.state
        let startArr = start_time.split(":")
        let durationTimeArr = duration_time.split(":")
        let st2 = Number(startArr[1]) + Number(durationTimeArr[1])
        if (st2 >= 60) {
            st2 -= 60
            extra = 1
        }
        let st1 = Number(startArr[0]) + Number(durationTimeArr[0]) + extra
        this.setState({
            ...this.state,
            end_time: `${(st1 > 9) ? st1 : `0${st1}`}:${(st2 > 9) ? st2 : `0${st2}`}`
        })
    }

    initialiseSlot = (start_time, end_time) => {
        console.log("initialiseSlot start_time", start_time, "end_time", end_time);

        const { selectedTimeSlot, calendar_date } = this.state
        let timeDateBy = timeDateByUser(calendar_date)

        let rowSelectedTimeSlot = selectedTimeSlot

        let mapKey = `${timeDateBy.getTime()}|${start_time}|${end_time}`
        if (rowSelectedTimeSlot.has(mapKey)) {
            rowSelectedTimeSlot.delete(mapKey)
        } else {
            rowSelectedTimeSlot.set(mapKey, { date: timeDateBy, start: start_time, end: end_time })
        }
        this.setState({
            ...this.state,
            selectedTimeSlot: rowSelectedTimeSlot,
            start_time: "00:00",
            duration: "30",
            end_time: "00:30"
        })
    }

    createTimeChips = () => {
        const { selectedTimeSlot } = this.state
        console.log("selectedTimeSlot", selectedTimeSlot);
        let rowData = []
        selectedTimeSlot.forEach(res => {
            rowData.push(<div class="col-6 col-sm-6 mt-4">
                <span class={`btn-ouline btn-primary`} onClick={() => this.initialiseSlot(res.start, res.end)}>{hhmmToampm(res.start)} - {hhmmToampm(res.end)}</span>
            </div>)
        })
        return rowData
    }
    applyNowMethod = () => {
        const { selectedTimeSlot, booking_detail } = this.state
        let time_slot = []
        selectedTimeSlot.forEach(element => {
            time_slot.push({
                date: timestampToYyyyMmDd(element.date),
                start_time: element.start,
                end_time: element.end
            })
        });
        if (time_slot.length > 0) {
            this.setState({
                ...this.state,
                loading: true
            }, () => {
                const info = {
                    "booking_id": booking_detail.id,
                    "time_slot": time_slot
                }
                agent.Student.addTimeSlotByBookingId(info).then(res => {
                    console.log("applyNowMethod res", res);
                    this.setState({
                        ...this.state,
                        ...res.booking,
                        editSchedule: false,
                        loading: false,
                        selectedTimeSlot: new Map(),
                    }, () => {
                        console.log("addTimeSlotByBookingId state", this.state, info);

                    })
                }).catch(err => {
                    console.log("addTimeSlotByBookingId err", info, err);
                    this.setState({
                        ...this.state,
                        loading: false
                    })
                })
            })
        } else {
            console.log("Empty addManagedTimeSlot");
        }
    }

    getClassesList = (list) => {
        let rowData = []
        list.forEach(element => {
            // console.log("getClassesList element", element);
            rowData.push(<div className="d-flex align-items-start flex-wrap justify-content-between">
                {/* <span className="me-3 mt-3">Feb 16, 2021</span>
                <time className="me-2 text-light space-nowrap mt-3">8:00am - 9:00am</time> */}
                <span class="me-3 mt-3">{manamusuDateFormatter(element.date)}</span>
                {/* <time class="me-2 text-light space-nowrap mt-3">{(element.start_time > 12) ? (Number(element.start_time)) - 12 : element.start_time}:00{(element.start_time > 11) ? "pm" : "am"} - {(element.end_time > 12) ? (Number(element.end_time)) - 12 : element.end_time}:00{(element.end_time > 11) ? "pm" : "am"}</time> */}
                <time class="me-2 text-light space-nowrap mt-3">{hhmmToampm(element.start_time)} - {hhmmToampm(element.end_time)}</time>

            </div>)
        });
        return rowData
    }

    getProfileIconByUrl = (teacher_profile_image) => {
        return teacher_profile_image ? `${agent.API_FILE_ROOT_MEDIUM}${teacher_profile_image}` : "/images/teacher_profile.svg"
    }

    getProfileIconOfStudent = (profile_image) => {
        return profile_image ? `${agent.API_FILE_ROOT_MEDIUM}${profile_image}` : "/images/teacher_profile.svg"
    }
    initialiseOneToOneMessage = (conversation_id) => {
        const { booking_detail } = this.state
        if (conversation_id) {
            agent.Chat.getMessageByConversion(conversation_id, 1).then(res => {
                console.log("getMessageByConversion res", res);
                const { user, booking_amount } = this.state
                let data = []
                res.message.forEach(element => {
                    if (user.id == element.user_from) {
                        data.push(<ChatNormalByMeRow1 {...element} icon={this.getProfileIconOfStudent(user ? user.profile_image : "")} />)
                    } else {
                        if (element.booking_type == 1) {
                            this.initialiseGetBookingAmount("")
                            data.push(<ChatAcceptedByUsRow1  {...element} initialiseGetBookingAmount={this.initialiseGetBookingAmount} icon={this.getProfileIconByUrl(booking_detail ? booking_detail.teacher_profile_image : "")} />)
                        } else if (element.booking_type == 3) {
                            data.push(<ChatPaymentDoneByMe1  {...element} iconMe={this.getProfileIconOfStudent(user ? user.profile_image : "")} iconUs={this.getProfileIconByUrl(booking_detail ? booking_detail.teacher_profile_image : "")} />)
                        } else {
                            data.push(<ChatNormalByUsRow1 {...element} icon={this.getProfileIconByUrl(booking_detail ? booking_detail.teacher_profile_image : "")} />)
                        }
                    }
                });
                this.setState({ ...this.state, messageList: data })


            }).catch(err => {
                console.log("getMessageByConversion err", err);
            })
        }
    }
    initialiseBookingDetails = booking_id => {
        const { router } = this.props
        const conversationIdProps = router.query ? router.query.conversation_id : undefined
        agent.Student.getBookingDetailsByBookingId(booking_id).then(res => {
            console.log("getBookingDetails res", res);
            setCookie(this, actions.GET_LAST_CHAT_BOOKING_ID, booking_id, {
                maxAge: 30 * 24 * 60 * 60,
                path: "/",
            });
            this.setState({
                ...this.state,
                ...res,
                loading: false,
                newHourlyRate: "",
                booking_amount: null,
            }, () => {
                if (conversationIdProps === undefined) {
                    this.initialiseOneToOneMessage(res.conversation_id);
                    router.replace({
                        pathname: '',
                        query: { booking_id: booking_id, conversation_id: res.conversation_id },
                    })
                } else {
                    this.initialiseOneToOneMessage(res.conversation_id);
                }
            })
        }).catch(err => {
            console.log("getBookingDetails err", err);
            this.setState({
                ...this.state,
                loading: false
            })
        })
    }
    initialiseSidebarUser = page => {
        const { defaultSidebarStatus } = this.state
        const { router } = this.props
        let bookingId = router.query ? router.query.booking_id : undefined
        agent.Chat.getUserSidebar(page, defaultSidebarStatus).then(res => {
            console.log("getUserSidebar res", res);
            if (bookingId === undefined && res.length > 0) {
                this.onClickSlideBar({ booking_id: res[0].booking_id, conversation_id: res[0].conversation_id })
            }
            this.setState({ ...this.state, sideUserList: res })
        }).catch(err => {
            console.log("getUserSidebar error", err);
        })
    }

    configureSidebarUser = (message_received) => {
        const { sideUserList } = this.state
        let users = sideUserList
        let index = users.findIndex(res => res.conversation_id == message_received.conversation_id)
        if (index > -1) {
            users[index].message = message_received.message
            this.setState({ ...this.state, sideUserList: users })
        } else {
            // this.initialiseSidebarUser(1)
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
        socket.on('connect', (socket) => {
            console.log('Connected!', socket);
        });
        socket.on('message_received', socketMessage => {
            const { messageList, user, booking_detail } = this.state
            const { router } = this.props
            this.configureSidebarUser(socketMessage)

            const conversationIdProps = router.query.conversation_id
            const bookingIdProps = router.query.booking_id
            // booking_id: 90
            // conversation_id: "101_102"
            // created_at: "2021-07-23T07:11:37.000Z"
            // deleted_by: null
            // deleted_for_me: 0
            // id: 34
            // is_read: 0
            // message: "ss"
            // type: 0
            // user_from: 102
            // user_to: 101
            if (socketMessage.conversation_id == conversationIdProps && socketMessage.booking_id == bookingIdProps) {
                if (user.id == socketMessage.user_from) {
                    let data = messageList
                    data.push(<ChatNormalByMeRow1 {...socketMessage} icon={this.getProfileIconOfStudent(user ? user.profile_image : "")} />)
                    this.setState({ ...this.state, messageList: data })
                } else {
                    let data = messageList
                    if (socketMessage.booking_type == 1) {
                        this.initialiseGetBookingAmount("")
                        data.push(<ChatAcceptedByUsRow1  {...socketMessage} initialiseGetBookingAmount={this.initialiseGetBookingAmount} icon={this.getProfileIconByUrl(booking_detail ? booking_detail.teacher_profile_image : "")} />)
                    } else if (socketMessage.booking_type == 3) {
                        this.initialiseGetBookingAmount("")
                        data.push(<ChatPaymentDoneByMe1  {...socketMessage} iconMe={this.getProfileIconOfStudent(user ? user.profile_image : "")} iconUs={this.getProfileIconByUrl(booking_detail ? booking_detail.teacher_profile_image : "")} />)
                    } else {
                        data.push(<ChatNormalByUsRow1 {...socketMessage} icon={this.getProfileIconByUrl(booking_detail ? booking_detail.teacher_profile_image : "")} />)
                    }
                    this.setState({ ...this.state, messageList: data })
                }
            }
            console.log("configureSocket message_received", socketMessage);
            // if (selectedUser) {
            //     if (selectedUser.conversation_id == socketMessage.conversation_id) {

            //     }

            // } else {
            //     if (user.id == socketMessage.user_from) {
            //         let data = messageList
            //         data.push(<ChatNormalByMeRow1 {...socketMessage} icon={this.getProfileIconOfStudent(user ? user.profile_image : "")} />)
            //         this.setState({ ...this.state, messageList: data })
            //     } else {
            //         let data = messageList
            //         if (socketMessage.booking_type == 1) {
            //             this.initialiseGetBookingAmount("")
            //             data.push(<ChatAcceptedByUsRow1 {...socketMessage} initialiseGetBookingAmount={this.initialiseGetBookingAmount} icon={this.getProfileIconByUrl(booking_detail ? booking_detail.teacher_profile_image : "")} />)
            //         } else if (socketMessage.booking_type == 3) {
            //             this.initialiseGetBookingAmount("")
            //             data.push(<ChatPaymentDoneByMe1  {...socketMessage} iconMe={this.getProfileIconOfStudent(user ? user.profile_image : "")} iconUs={this.getProfileIconByUrl(booking_detail ? booking_detail.teacher_profile_image : "")} />)
            //         } else {
            //             data.push(<ChatNormalByUsRow1 {...socketMessage} icon={this.getProfileIconByUrl(booking_detail ? booking_detail.teacher_profile_image : "")} />)
            //         }
            //         this.setState({ ...this.state, messageList: data })
            //     }
            // }
        });
        this.socket = socket;
    }

    initialiseGetBookingAmount = (chat_id) => {
        console.log("initialise getBookingAmount called");
        const { router } = this.props
        if (router.query.booking_id) {
            agent.Student.getBookingAmount({
                booking_id: router.query.booking_id
            }).then(res => {
                console.log("getBookingAmount res", res);
                this.setState({
                    ...this.state,
                    ...res,
                    chat_id: chat_id
                })
            }).catch(err => {
                console.log("getBookingAmount err", err);
            })
        }
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
    componentDidMount() {
        console.log("componentDidMountcalled", this.props);
        const { router, user_info } = this.props
        if (user_info) {
            let booking_id = router.query.booking_id

            agent.setToken(user_info.token)
            this.initialiseBookingDetails(booking_id)
            this.initialiseSidebarUser(1)

            this.configureSocket();
            this.scrollToBottom();
        } else {
            router.push(`/${router.query.lang}/profile}`)
        }

    }

    componentDidUpdate() {
        this.scrollToBottom();
        const { router } = this.props
        const { booking_detail } = this.state
        const bookingIdQuery = router.query.booking_id
        const bookingIdState = booking_detail ? booking_detail.id : ""

        if (bookingIdQuery == bookingIdState) {
            console.log("componentDidUpdate called match bookingIdQuery", bookingIdQuery, "bookingIdState", bookingIdState);

        } else {
            console.log("booking id not match");
            if (bookingIdQuery) {
                this.initialiseBookingDetails(bookingIdQuery)
            }
        }
    }
    componentDidCatch() {
        console.log("componentDidCatch called");
    }

}
export default StudentChatLayout