import React from 'react'
const SERVER = "http://13.208.129.181:3001";
const io = require('socket.io-client');

class ChatLayout extends React.Component {
    socket;

    constructor(props) {
        super(props)
        this.state = {
            channels: null,
            socket: null,
            channel: null,
            msg: "",
            messageList: []
        }
        this.messagesEnd = React.createRef()
    }


    handleChannelSelect = id => {
        let channel = this.state.channels.find(c => {
            return c.id === id;
        });
        this.setState({ channel });
        this.socket.emit('channel-join', id, ack => {
        });
    }

    handleSendMessage = (channel_id, text) => {
        console.log("handleSendMessage socket connected", this.socket.connected, "socket.id", this.socket.id);
        this.socket.emit(`message_sent`, { user_from: 1, user_to: 2, message: ` ${text}` })
        this.setState({ ...this.state, msg: "" })
    }
    render() {
        const { messageList } = this.state
        return (
            <section>
                <div class="chat">
                    <div class="row g-0">
                        <div class="col-xl-3 col-lg-4 border-end">
                            <div class="chat-head">
                                <div class="main-heading me-3">
                                    <h2 class="sub-heading mb-0 fs-20 circular-book">Messages</h2>
                                </div>
                                <div class="flex-grow-1 d-flex justify-content-end">
                                    <div class="search-box">
                                        <button class="btn-search"><i class="fas fa-search"></i></button>
                                        <input type="text" class="input-search" placeholder="Type to Search..." />
                                    </div>
                                </div>
                            </div>
                            <div class="profile-list">
                                <div class="profile-menu active">
                                    <div class="position-relative me-3">
                                        <img class="profile-image" src="/images/teacher_signup.jpg" data-bs-toggle="modal" data-bs-target="#profileModal" />
                                        <span class="active-dots"></span>
                                    </div>
                                    <div class="flex-grow-1">
                                        <div class="d-flex align-items-center justify-content-between">
                                            <b class="single-ellipsis fs-18">Physics B.sc ready</b>
                                            <span class="badge bg-primary ms-3">4</span>
                                        </div>
                                        <div class="d-flex align-items-center justify-content-between">
                                            <p class="single-ellipsis text-third mb-0">Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor</p>
                                            <span class="light-heading space-nowrap ms-3">Just now</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="profile-menu">
                                    <div class="position-relative me-3">
                                        <img class="profile-image" src="/images/teacher_signup.jpg" />
                                        <span class="active-dots"></span>
                                    </div>
                                    <div class="flex-grow-1">
                                        <div class="d-flex align-items-center justify-content-between">
                                            <b class="single-ellipsis fs-18">Physics B.sc ready</b>
                                            <span class="light-heading ms-3">Yesterday</span>
                                        </div>
                                        <div class="d-flex align-items-center justify-content-between">
                                            <p class="single-ellipsis text-third mb-0">Lorem ipsum dolor</p>
                                            <span class="light-heading space-nowrap ms-3">9:30am</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="profile-menu">
                                    <div class="position-relative me-3">
                                        <img class="profile-image" src="/images/teacher_signup.jpg" />
                                        <span class="active-dots"></span>
                                    </div>
                                    <div class="flex-grow-1">
                                        <div class="d-flex align-items-center justify-content-between">
                                            <b class="single-ellipsis fs-18">Physics B.sc ready</b>
                                            <span class="badge bg-primary ms-3">4</span>
                                        </div>
                                        <div class="d-flex align-items-center justify-content-between">
                                            <p class="single-ellipsis text-third mb-0">Lorem ipsum dolor</p>
                                            <span class="light-heading space-nowrap ms-3">Just now</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="profile-menu">
                                    <div class="position-relative me-3">
                                        <img class="profile-image" src="/images/teacher_signup.jpg" />
                                        <span class="active-dots"></span>
                                    </div>
                                    <div class="flex-grow-1">
                                        <div class="d-flex align-items-center justify-content-between">
                                            <b class="single-ellipsis fs-18">Physics B.sc ready</b>
                                            <span class="light-heading ms-3">Yesterday</span>
                                        </div>
                                        <div class="d-flex align-items-center justify-content-between">
                                            <p class="single-ellipsis text-third mb-0">Lorem ipsum dolor</p>
                                            <span class="light-heading space-nowrap ms-3">9:30am</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="profile-menu">
                                    <div class="position-relative me-3">
                                        <img class="profile-image" src="/images/teacher_signup.jpg" />
                                        <span class="active-dots"></span>
                                    </div>
                                    <div class="flex-grow-1">
                                        <div class="d-flex align-items-center justify-content-between">
                                            <b class="single-ellipsis fs-18">Physics B.sc ready</b>
                                            <span class="badge bg-primary ms-3">4</span>
                                        </div>
                                        <div class="d-flex align-items-center justify-content-between">
                                            <p class="single-ellipsis text-third mb-0">Lorem ipsum dolor</p>
                                            <span class="light-heading space-nowrap ms-3">Just now</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-5 col-lg-8">
                            <div class="chat-head">
                                <div class="d-flex align-items-md-center align-items-start flex-grow-1">
                                    <div class="position-relative me-3">
                                        <img class="profile-image" src="/images/teacher_signup.jpg" />
                                        <span class="active-dots"></span>
                                    </div>
                                    <div class="flex-grow-1">
                                        <b class="detail-text">Physics B.Sc ready to tutor IB students</b>
                                        <div class="d-flex align-items-center justify-content-between flex-wrap">
                                            <p class="text-third mb-0 space-nowrap me-3 mt-1"><span class="text-light">ID :</span>&nbsp;ADF12345</p>
                                            <a class="text-third text-primary space-nowrap cursor-pointer mt-1">View Details<i class="fas fa-chevron-right ms-2 fs-12"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="chat-bg pb-2">
                                <div class="message-area">
                                    <div class="d-flex align-items-start my-4 flex-row-reverse">
                                        <img class="message-profile" src="/images/teacher_signup.jpg" />
                                        <div class="mt-5">
                                            <span class="message-bg-two">Hey! I want to study from you on Feb 16, 2021 at 5:30 - 6:30 in USD 8/hr</span>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-start my-4">
                                        <img class="message-profile" src="/images/teacher_signup.jpg" />
                                        <div class="mt-5">
                                            <span class="message-bg">Hey! I am available on Feb 16, 2021 at 5:30 - 6:30 in USD 9/hr</span>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-start my-4">
                                        <img class="message-profile" src="/images/teacher_signup.jpg" />
                                        <div class="mt-5">
                                            <span class="message-bg text-primary fs-16"><img class="icon-size me-2" src="/images/icons/verified.png" />Accepted</span>
                                            <span class="message-bg text-center">
                                                <span class="single-ellipsis d-block">Please make payment to continue...</span>
                                                <span class="btn btn-outline-primary btn-round d-inline-block mt-2 py-2">Make Payment</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-start my-4 flex-row-reverse">
                                        <img class="message-profile" src="/images/teacher_signup.jpg" />
                                        <div class="mt-5">
                                            <span class="message-bg-two text-white fs-16"><img class="icon-size me-2" src="/images/icons/verified_white_small.png" />Payment Done</span>
                                        </div>
                                    </div>
                                    {/* {messageList.map((res) => {
                                        console.log("messageList", res);
                                        return <div key={res.message} class="d-flex align-items-start my-4 flex-row-reverse">
                                            <img class="message-profile" src="/images/teacher_signup.jpg" />
                                            <div class="mt-5">
                                                <span class="message-bg-two">{res.message}</span>
                                            </div>
                                        </div>
                                    })} */}
                                    <div ref={(el) => { this.messagesEnd = el; }}></div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-lg-8">
                                        <div class="message-send-bar my-3 mx-3">
                                            <input type="text" class="form-control border-0" placeholder="Type message here and press enter" value={this.state.msg} onChange={(e) => this.setState({ ...this.state, msg: e.target.value })} />
                                            <span class="send-btn" onClick={() => this.handleSendMessage("chann", this.state.msg)}><i class="fas fa-paper-plane"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-4 col-lg-5">
                            <div class="chat-third-section">
                                <div class="row">
                                    <div class="col-xl-9 col-lg-12">
                                        <div>
                                            <h3 class="sub-heading fs-20 circular-book">Hyunwoong Kim</h3>
                                            <p><span class="text-light">Current Amount:</span>&nbsp;USD 10/hr</p>
                                        </div>
                                        {/* <h3 class="sub-heading fs-20">Make Offer</h3>
                                        <div class="d-flex align-items-center">
                                            <input type="text" class="form-control" placeholder="Enter Amount" />
                                            <span class="ms-3 me-4">/hr</span>
                                            <button type="button" class="btn btn-primary">APPLY</button>
                                        </div> */}
                                        <div class="card mt-4 shadow-lg mt-5">
                                            <div class="card-body">
                                                <div class="d-flex align-items-center justify-content-between">
                                                    <h5 class="mb-0">Class Schedule</h5>
                                                    <a class="text-primary cursor-pointer" data-bs-toggle="modal" data-bs-target="#editModal"><i class="fas fa-pencil-alt me-2"></i>Edit</a>
                                                </div>
                                                <div class="d-flex align-items-start flex-wrap justify-content-between">
                                                    <span class="me-3 mt-3">Feb 16, 2021</span>
                                                    <time class="me-2 text-light space-nowrap mt-3">8:00am - 9:00am</time>
                                                </div>
                                                <div class="d-flex align-items-start flex-wrap justify-content-between">
                                                    <span class="me-3 mt-3">Feb 16, 2021</span>
                                                    <time class="me-2 text-light space-nowrap mt-3">8:00am - 9:00am</time>
                                                </div>
                                                <div class="d-flex align-items-start flex-wrap justify-content-between">
                                                    <span class="me-3 mt-3">Feb 16, 2021</span>
                                                    <time class="me-2 text-light space-nowrap mt-3">8:00am - 9:00am</time>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="text-center">
                                            <button type="button" class="btn btn-primary px-4 me-4 mt-2">ACCEPT</button>
                                            <button type="button" class="btn btn-danger px-4 mt-2">DECLINE</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modals */}


                <div class="modal fade" id="editModal" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header border-0">
                                <i class="fas fa-times close-button" data-bs-dismiss="modal" aria-label="Close"></i>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-lg-6 mt-4">
                                        <div class="card mt-4 shadow-lg">
                                            <div class="card-body">
                                                {/* <Calendar
                                                    onChange={setCalendarData}
                                                    value={calendar_data}
                                                    minDate={new Date()}
                                                /> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 mt-4">
                                        <div class="card mt-4 shadow-lg">
                                            <div class="card-body">
                                                {/* <div class="row justify-content-between">
                                                    {createTimeChips(props.timeSlot)}
                                                    {createCustomTimeChips(customTimeSlot)}
                                                </div>
                                                <button type="button" id="selectDateModalBtn" class=" btn btn-ouline mt-1" data-bs-toggle="modal" data-bs-target="#selectTimeModalTarget" >+ Customize Time</button> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-center mt-4">
                                    <button type="button" class="btn btn-primary px-5">Done</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="modal fade" id="profileModal" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-lg">
                        <div class="modal-content">
                            <div class="modal-header border-0">
                                <i class="fas fa-times close-button" data-bs-dismiss="modal" aria-label="Close"></i>
                            </div>
                            <div class="modal-body">
                                Profile here...
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
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
        socket.on('message_received', message => {
            const { messageList } = this.state
            let data = messageList
            data.push(message)
            console.log("configureSocket message_received", message);
            this.setState({ ...this.state, messageList: data })
        });
        console.log("configureSocket socket", socket);
        this.socket = socket;
    }
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
    componentDidMount() {
        const { router, chatBookingId } = this.props
        // this.configureSocket();
        // this.scrollToBottom();
        router.push(`/${router.query.lang}/chat/${chatBookingId}`)

    }
    componentDidUpdate() {
        this.scrollToBottom();
    }
}
export default ChatLayout
