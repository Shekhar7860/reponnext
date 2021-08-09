import { setCookie } from "nookies"
import React from "react"
import actions from "../../../store/actions"
import agent from "../../../utils/agent"
import { manamusuDateFormatter } from "../../../utils/date_contant"
import { capitalizeFirstLetter } from "../../../utils/validation_contant"
import { hhmmToampm } from "../../../utils/work_contant"
import ChatUserList from "../../ui/chat/ChatUserList"
import ChatNormalByMeRow1 from "../../ui/chat_list/ChatNormalByMeRow1"
import ChatNormalByUsRow1 from "../../ui/chat_list/ChatNormalByUsRow1"
import ChatPaymentDoneByUs1 from "../../ui/chat_list/ChatPaymentDoneByUs1"
import BootstrapSpinner2 from "../../ui/spinner/BootstrapSpinner2"

const SERVER = "http://13.208.129.181:3001";
const io = require('socket.io-client');

let socket;
class TeacherChatLayout extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user: props.user_info ? props.user_info.user : {},
            accepted_time_slots: [],
            pending_time_slots: [],
            cancelled_time_slots: [],
            booking_detail: null,
            sideUserList: [],
            messageList: [],
            msg: "",
            defaultSidebarStatus: "1",
            selectedUser: null,
        }
        this.messagesEnd = React.createRef()
    }
    acceptPendingClass = () => {
        const { booking_detail, user } = this.state
        if (booking_detail) {
            if (typeof window !== "undefined") {
                if (window.confirm("Do you really want to accept?")) {
                    agent.Teacher.acceptTimeSlot({
                        "booking_id": booking_detail.id
                    }).then(res => {
                        console.log("acceptTimeSlot", res);
                        this.socket.emit(`make_payment`, { user_from: user.id, user_to: booking_detail.user_id, booking_type: 1, booking_id: booking_detail.id })
                        this.initialiseBookingDetails(booking_detail.id)
                    })
                }
            } else {
                agent.Teacher.acceptTimeSlot({
                    "booking_id": booking_detail.id
                }).then(res => {
                    console.log("acceptTimeSlot", res);
                    this.initialiseBookingDetails(booking_detail.id)

                })
            }
        }
    }
    deslinePendingClass = () => {
        const { booking_detail } = this.state

        if (typeof window !== "undefined") {
            if (window.confirm("Do you really want to decline?")) {
                agent.Teacher.declineTimeSlot({
                    "booking_id": booking_detail.id
                }).then(res => {
                    console.log("declineTimeSlot", res);
                    this.initialiseBookingDetails(booking_detail.id)

                })
            }
        } else {
            agent.Teacher.declineTimeSlot({
                "booking_id": booking_detail.id
            }).then(res => {
                console.log("declineTimeSlot", res);
                this.initialiseBookingDetails(booking_detail.id)

            })
        }
    }

    semdNewMessage = () => {
        const { msg, user, booking_detail, selectedUser } = this.state
        if (msg) {
            console.log("user.id", user.id, "booking_detail.user_id", booking_detail.user_id);
            this.socket.emit(`message_sent`, { user_from: user.id, user_to: booking_detail.user_id, message: msg, booking_id: booking_detail.id })
            this.setState({ ...this.state, msg: "" })
        } else {
            console.log("msg", msg);
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
        const { accepted_time_slots, pending_time_slots, cancelled_time_slots, booking_detail, sideUserList, msg, selectedUser, messageList } = this.state
        const { router } = this.props
        return <section>
            <div className="chat">
                <div className="row g-0">
                    <div className="col-xl-3 col-lg-4 border-end">
                        <div className="chat-head">
                            {/* <div className="main-heading me-3">
                                <h2 className="sub-heading mb-0 fs-20 circular-book">Messages Teacher</h2>
                            </div> */}
                            <div className="flex-grow-1 d-flex justify-content-end">
                                <div className="search-box">
                                    <button className="btn-search"><i className="fas fa-search"></i></button>
                                    <input type="text" className="input-search" placeholder="Type to Search..." />
                                </div>
                            </div>
                        </div>

                        <select class="form-select" aria-label="Default select example" onChange={(e) => this.setState({ ...this.state, defaultSidebarStatus: e.target.value }, () => this.initialiseSidebarUser(1))}>
                            <option value="1">Payment Pending</option>
                            <option value="2">Accepted</option>
                            <option value="3">Declined</option>
                            <option value="3">Ongoing</option>
                            <option value="4">Completed</option>
                        </select>
                        <div className="profile-list">
                            {sideUserList.map((res) => {
                                return <ChatUserList key={res.id} {...res} active={res.conversation_id == router.query.conversation_id} onClickSlideBar={this.onClickSlideBar} />
                            })}
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
                            </div>
                            <ChatUserList />
                            <ChatUserList />
                            <ChatUserList />
                            <ChatUserList />
                            <ChatUserList />
                            <ChatUserList />
                            <ChatUserList />
                            <ChatUserList />
                            <ChatUserList />
                            <ChatUserList />
                            <ChatUserList />
                            <ChatUserList />
                            <ChatUserList />
                            <ChatUserList />
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
                            </div> */}
                        </div>
                    </div>
                    <div className="col-xl-5 col-lg-8">
                        <div className="chat-head">
                            {booking_detail ?
                                <div className="d-flex align-items-md-center align-items-start flex-grow-1">
                                    <div className="position-relative me-3">
                                        <img className="profile-image" src={this.getProfileIconByUrl(booking_detail ? booking_detail.student_profile_image : "")} alt={this.getProfileIconByUrl(booking_detail ? booking_detail.student_profile_image : "")} />
                                        <span className="active-dots"></span>
                                    </div>
                                    <div className="flex-grow-1">
                                        <b className="detail-text">{booking_detail ? booking_detail.post_title : <BootstrapSpinner2 />}</b>
                                        <div className="d-flex align-items-center justify-content-between flex-wrap">
                                            <p className="text-third mb-0 space-nowrap me-3 mt-1"><span className="text-light">ID :</span>&nbsp;{booking_detail ? booking_detail.id : <BootstrapSpinner2 />}</p>
                                            <a className="text-third text-primary space-nowrap cursor-pointer mt-1">View Details<i className="fas fa-chevron-right ms-2 fs-12"></i></a>
                                        </div>
                                    </div>
                                </div>
                                : <></>}
                        </div>
                        <div className="chat-bg pb-2">
                            <div className="message-area">

                                {messageList.map((res) => {
                                    return res
                                })}
                                <div ref={(el) => { this.messagesEnd = el; }}></div>

                                {/* <div className="d-flex align-items-start flex-row-reverse">
                                    <img className="message-profile" src="/images/teacher_signup.jpg" />
                                    <div className="mt-5">
                                        <span className="message-bg-two">Hey! I want to study from you on Feb 16, 2021 at 5:30 - 6:30 in USD 8/hr</span>
                                    </div>
                                </div>
                                <div className="d-flex align-items-start">
                                    <img className="message-profile" src="/images/teacher_signup.jpg" />
                                    <div className="mt-5">
                                        <span className="message-bg">Hey! I am available on Feb 16, 2021 at 5:30 - 6:30 in USD 9/hr</span>
                                    </div>
                                </div>
                                <div className="d-flex align-items-start">
                                    <img className="message-profile" src="/images/teacher_signup.jpg" />
                                    <div className="mt-5">
                                        <span className="message-bg text-primary fs-16"><img className="icon-size me-2" src="/images/icons/verified.png" />Accepted</span>
                                        <span className="message-bg text-center">
                                            <span className="single-ellipsis d-block">Please make payment to continue...</span>
                                            <span className="btn btn-outline-primary btn-round d-inline-block mt-2 py-2">Make Payment</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="d-flex align-items-start flex-row-reverse">
                                    <img className="message-profile" src="/images/teacher_signup.jpg" />
                                    <div className="mt-5">
                                        <span className="message-bg-two text-white fs-16"><img className="icon-size me-2" src="/images/icons/verified_white_small.png" />Payment Done</span>
                                    </div>
                                </div> */}
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

                                        <div class="accordion" id="accordionExample">
                                            <div>
                                                <h3 className="sub-heading fs-20 circular-book">{capitalizeFirstLetter(booking_detail ? booking_detail.student_first_name : "")} {capitalizeFirstLetter(booking_detail ? booking_detail.student_last_name : "")}</h3>
                                                {booking_detail ?
                                                    <p><span className="text-light">Current Amount:</span>&nbsp;USD {booking_detail.hourly_rate}/hr</p>
                                                    : <BootstrapSpinner2 />}
                                            </div>
                                            {/* <h3 className="sub-heading fs-20">Make Offer</h3>
                                    <div className="d-flex align-items-center">
                                        <input type="text" className="form-control" placeholder="Enter Amount" />
                                        <span className="ms-3 me-4">/hr</span>
                                        <button type="button" className="btn btn-primary">APPLY</button>
                                    </div> */}
                                            {accepted_time_slots.length > 0 ?
                                                <div className="card mt-4 shadow-lg mt-2" style={{ maxHeight: "250px" }}>
                                                    <div className="card-body">
                                                        <div class="accordion-item">
                                                            <div class="accordion-button px-0" data-bs-toggle="collapse" data-bs-target="#collapseScheduleClass" aria-expanded="false" aria-controls="collapseScheduleClass">
                                                                <h5 className="mb-0">Class Schedule</h5>
                                                            </div>
                                                            <div id="collapseScheduleClass" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                                {this.getClassesList(accepted_time_slots)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                : <></>}

                                            {pending_time_slots.length > 0 ?
                                                <>
                                                    <div className="card mt-4 shadow-lg mt-1" style={{ maxHeight: "250px" }}>
                                                        <div className="card-body">
                                                            <div class="accordion-item">
                                                                <div class="accordion-button collapsed px-0" data-bs-toggle="collapse" data-bs-target="#collapsePendingClass" aria-expanded="false" aria-controls="collapsePendingClass">
                                                                    <h5 className="mb-0">Requested Class</h5>
                                                                </div>
                                                                <div id="collapsePendingClass" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                                    {this.getClassesList(pending_time_slots)}
                                                                    <div className="text-center">
                                                                        <button type="button" className="btn btn-primary px-4 me-4 mt-2" onClick={() => this.acceptPendingClass()}>ACCEPT</button>
                                                                        <button type="button" className="btn btn-danger px-4 mt-2" onClick={() => this.deslinePendingClass()}>DECLINE</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                </>
                                                : <></>}

                                            {cancelled_time_slots.length > 0 ?
                                                <div className="card mt-4 shadow-lg mt-1" style={{ maxHeight: "250px" }}>
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
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <i className="fas fa-times close-button" data-bs-dismiss="modal" aria-label="Close"></i>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-lg-6 mt-4">
                                    <div className="card mt-4 shadow-lg">
                                        <div className="card-body">
                                            {/* <Calendar
                                                onChange={setCalendarData}
                                                value={calendar_data}
                                                minDate={new Date()}
                                            /> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 mt-4">
                                    <div className="card mt-4 shadow-lg">
                                        <div className="card-body">
                                            {/* <div className="row justify-content-between">
                                                {createTimeChips(props.timeSlot)}
                                                {createCustomTimeChips(customTimeSlot)}
                                            </div>
                                            <button type="button" id="selectDateModalBtn" className=" btn btn-ouline mt-1" data-bs-toggle="modal" data-bs-target="#selectTimeModalTarget" >+ Customize Time</button> */}
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
        </section>

    }
    getClassesList = (list) => {
        let rowData = []
        list.forEach(element => {
            // console.log("getClassesList element", element);
            rowData.push(<div className="d-flex align-items-start flex-wrap justify-content-between">
                {/* <span className="me-3 mt-3">Feb 16, 2021</span>
                <time className="me-2 text-light space-nowrap mt-3">8:00am - 9:00am</time> */}
                <span class="me-3 mt-3">{manamusuDateFormatter(element.date)}</span>
                <time class="me-2 text-light space-nowrap mt-3">{hhmmToampm(element.start_time)} - {hhmmToampm(element.end_time)}</time>

            </div>)
        });
        return rowData
    }

    getProfileIconByUrl = (teacher_profile_image) => {
        return teacher_profile_image ? `${agent.API_FILE_ROOT_MEDIUM}${teacher_profile_image}` : "/images/teacher_icon.svg"
    }
    getProfileIconOfStudent = (teacher_profile_image) => {
        return teacher_profile_image ? `${agent.API_FILE_ROOT_MEDIUM}${teacher_profile_image}` : "/images/student_profile.svg"
    }

    initialiseOneToOneMessage = (conversation_id) => {
        const { booking_detail, user } = this.state
        agent.Chat.getMessageByConversion(conversation_id, 1).then(res => {
            console.log("getMessageByConversion res", res);
            let data = []
            res.message.forEach(element => {
                if (user.id == element.user_from) {
                    if (element.booking_type == 3) {
                        data.push(<ChatPaymentDoneByUs1  {...element} iconMe={this.getProfileIconOfStudent(booking_detail ? booking_detail.student_profile_image : "")} iconUs={this.getProfileIconByUrl(user ? user.profile_image : "")} />)
                    } else {
                        data.push(<ChatNormalByMeRow1 {...element} icon={this.getProfileIconByUrl(user ? user.profile_image : "")} />)
                    }
                } else {
                    data.push(<ChatNormalByUsRow1 {...element} icon={this.getProfileIconOfStudent(booking_detail ? booking_detail.student_profile_image : "")} />)
                }
            });
            this.setState({ ...this.state, messageList: data })


        }).catch(err => {
            console.log("getMessageByConversion err", err);
        })
    }
    initialiseBookingDetails = booking_id => {
        const { router } = this.props
        const conversationIdProps = router.query ? router.query.conversation_id : undefined

        agent.Teacher.getBookingDetails(booking_id).then(res => {
            console.log("getBookingDetails res", res);
            setCookie(this, actions.GET_LAST_CHAT_BOOKING_ID, booking_id, {
                maxAge: 30 * 24 * 60 * 60,
                path: "/",
            });
            this.setState({
                ...this.state,
                ...res
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
            console.log("configureSocket message_received", socketMessage);

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
            if (conversationIdProps == socketMessage.conversation_id && socketMessage.booking_id == bookingIdProps) {
                if (user.id == socketMessage.user_from) {
                    let data = messageList
                    if (socketMessage.booking_type == 3) {
                        data.push(<ChatPaymentDoneByUs1  {...socketMessage} iconMe={this.getProfileIconOfStudent(booking_detail ? booking_detail.student_profile_image : "")} iconUs={this.getProfileIconByUrl(user ? user.profile_image : "")} />)
                    } else {
                        data.push(<ChatNormalByMeRow1 {...socketMessage} icon={this.getProfileIconByUrl(user ? user.profile_image : "")} />)
                    }
                    this.setState({ ...this.state, messageList: data })
                } else {
                    let data = messageList
                    data.push(<ChatNormalByUsRow1 {...socketMessage} icon={this.getProfileIconOfStudent(booking_detail ? booking_detail.student_profile_image : "")} />)
                    this.setState({ ...this.state, messageList: data })
                }
            }

            // if (user.id == socketMessage.user_from) {
            //     let data = messageList
            //     if (socketMessage.booking_type == 3) {
            //         data.push(<ChatPaymentDoneByUs1  {...socketMessage} iconMe={this.getProfileIconOfStudent(booking_detail ? booking_detail.student_profile_image : "")} iconUs={this.getProfileIconByUrl(user ? user.profile_image : "")} />)
            //     } else {
            //         data.push(<ChatNormalByMeRow1 {...socketMessage} icon={this.getProfileIconByUrl(user ? user.profile_image : "")} />)
            //     }
            //     this.setState({ ...this.state, messageList: data })
            // } else {
            //     let data = messageList
            //     data.push(<ChatNormalByUsRow1 {...socketMessage} icon={this.getProfileIconOfStudent(booking_detail ? booking_detail.student_profile_image : "")} />)
            //     this.setState({ ...this.state, messageList: data })
            // }
        });
        this.socket = socket;
    }

    componentDidMount() {
        console.log("componentDidMount called TeacherChatLayout");

        const { router, user_info } = this.props
        if (user_info) {
            const booking_id = router.query.booking_id
            agent.setToken(user_info.token)

            if (booking_id) {
                this.initialiseBookingDetails(booking_id)
                this.initialiseSidebarUser(1)

                this.configureSocket();
                this.scrollToBottom();
            }
        } else {
            router.push(`/${router.query.lang}/profile}`)
        }
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
    componentDidUpdate() {
        this.scrollToBottom();
        const { router, user_info } = this.props
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
}
export default TeacherChatLayout