import React from "react"

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { getMonthFirstDate, manamusuDateFormatter } from "../../../utils/date_contant";
import agent from "../../../utils/agent";
import { hhmmToampm } from "../../../utils/work_contant";

const localizer = momentLocalizer(moment);

class CalendarProfileLayout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            classes: [],
            calenderEvents: []
        }
        this.calendarRef = React.createRef();
    }
    goToLink = (id) => {
        const { router } = this.props
        document.getElementById("closeClassesModal").click()
        router.push(`/${router.query.lang}/my-courses/ongoing/${id}`)
    }
    render() {
        const { calenderEvents, classes } = this.state
        const { user_info, router } = this.props
        return <>
            <Calendar
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="month"
                events={calenderEvents}
                style={{ height: "100vh" }}
                selectable={true}
                onChange={(res) => {
                    console.log("date", res);
                }}
                onSelectEvent={(e) => {
                    console.log("onSelectEvent", e);
                    if (e.id) {
                        this.goToLink(e.id)
                    } else {
                        this.setState({
                            ...this.state,
                            classes: e.classes
                        }, () => {
                            document.getElementById("openClassesModal").click()
                        })
                    }
                }}
                onSelectSlot={(e) => {
                    console.log("onSelectSlot", e);
                }}
                onSelecting={(e) => {
                    console.log("onSelecting", e);
                }}
                onNavigate={(e) => {
                    console.log("onNavigate e", e);
                    const getCalender = getMonthFirstDate(e)
                    agent.Student.getCalenderData(getCalender.getMonth() + 1, getCalender.getFullYear()).then(res => {
                        console.log("getCalenderData res", res);
                    }).catch(err => {
                        console.log("getCalenderData err", err);
                    })
                    console.log("onNavigate getMonthFirstDate month", getCalender.getMonth() + 1, "year", getCalender.getFullYear());
                    this.requestDataFromAPI(user_info ? user_info.user : {}, getCalender.getMonth() + 1, getCalender.getFullYear())

                }}
                ref={this.calendarRef}

            />
            <input id="openClassesModal" type="hidden" data-bs-toggle="modal" data-bs-target="#moreClassesModal" />
            <div class="modal fade" id="moreClassesModal" tabindex="-1" aria-labelledby="addTimeLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header border-0">
                            <i id="closeClassesModal" class="fas fa-times close-button" data-bs-dismiss="modal" aria-label="Close"></i>
                        </div>
                        <div class="modal-body">
                            {classes.map((res) => {
                                console.log("map", res);
                                return <div class="card-second h-100 d-flex flex-column justify-content-center">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <h5 class="mb-0">{res.post_title}</h5>
                                        {/* <span class="text-primary fs-20">{element.currency} {element.hourly_rate}</span> */}
                                    </div>
                                    <div class="d-flex justify-content-between align-items-end flex-wrap">
                                        <div class="mt-2">
                                            <time class="d-block mb-1">
                                                <span class="text-light">Date :</span>{manamusuDateFormatter(res.date)}
                                            </time>
                                            <time class="d-block mb-1">
                                                <span class="text-light">Time :</span>{hhmmToampm(res.slots[0].start_time)} - {hhmmToampm(res.slots[0].end_time)}
                                            </time>
                                        </div>
                                        <button type="button" class="btn btn-outline-primary px-4 me-4 mt-2" onClick={() => this.goToLink(res.booking_request_id)}>View Details</button>
                                    </div>
                                </div>
                            })}

                        </div>
                    </div>
                </div>
            </div>
        </>
    }
    requestDataFromAPI = async (user, month, year) => {
        let calenderEvents = []
        if (user.user_type == 1) {
            calenderEvents = await agent.Student.getCalenderData(month, year)
        } else if (user.user_type == 2) {
            calenderEvents = await agent.Teacher.getCalenderData(month, year)
        } else {
            calenderEvents = []
        }
        this.manageCalenderData(calenderEvents)

    }
    manageCalenderData = (calenderEvents) => {
        let rowData = []
        console.log("manageCalenderData", calenderEvents);
        calenderEvents.forEach(item => {
            if (item.classes.length > 2) {
                for (let index = 0; index < 2; index++) {
                    const element = item.classes[index];
                    let booking_request_id = element.booking_request_id
                    let post_title = element.post_title
                    let startDate = new Date(element.date)
                    let endDate = new Date(element.date)
                    let startHhMmArr;
                    let endHhMmArr;
                    element.slots.forEach(slotElement => {
                        startHhMmArr = String(slotElement.start_time).split(":")
                        endHhMmArr = String(slotElement.end_time).split(":")
                    });
                    console.log("loop element", element, booking_request_id);

                    if (startHhMmArr.length == 2 && endHhMmArr.length == 2) {
                        rowData.push(
                            {
                                id: booking_request_id,
                                title: post_title,
                                allDay: false,
                                start: new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDay() + 1, startHhMmArr[0], startHhMmArr[1], 0),
                                end: new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDay() + 1, endHhMmArr[0], endHhMmArr[1], 0),
                                booking_request_id: booking_request_id,

                            },
                        )
                    }
                }

                let element = item.classes[0]
                let startDate = new Date(element.date)
                let endDate = new Date(element.date)
                let startHhMmArr;
                let endHhMmArr;
                element.slots.forEach(slotElement => {
                    startHhMmArr = String(slotElement.start_time).split(":")
                    endHhMmArr = String(slotElement.end_time).split(":")
                });
                rowData.push(
                    {
                        id: null,
                        title: "More",
                        allDay: false,
                        start: new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDay() + 1, startHhMmArr[0], startHhMmArr[1], 0),
                        end: new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDay() + 1, endHhMmArr[0], endHhMmArr[1], 0),
                        classes: item.classes
                    },
                )
            } else {
                item.classes.forEach(element => {
                    let booking_request_id = element.booking_request_id
                    let post_title = element.post_title
                    let startDate = new Date(element.date)
                    let endDate = new Date(element.date)
                    let startHhMmArr;
                    let endHhMmArr;
                    element.slots.forEach(slotElement => {
                        startHhMmArr = String(slotElement.start_time).split(":")
                        endHhMmArr = String(slotElement.end_time).split(":")
                    });
                    if (startHhMmArr.length == 2 && endHhMmArr.length == 2) {
                        rowData.push(
                            {
                                id: booking_request_id,
                                title: post_title,
                                allDay: false,
                                start: new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDay() + 1, startHhMmArr[0], startHhMmArr[1], 0),
                                end: new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDay() + 1, endHhMmArr[0], endHhMmArr[1], 0),
                                booking_request_id: booking_request_id,
                                element
                            },
                        )
                    }
                });
            }

            // {
            //     "id": 192,
            //     "booking_request_id": 126,
            //     "date": "2021-08-01T00:00:00.000Z",
            //     "start_time": "01:00",
            //     "end_time": "01:30",
            //     "hourly_rate": "5",
            //     "status": 1,
            //     "payment_status": 1,
            //     "group": 0,
            //     "payment_id": null,
            //     "created_at": "2021-07-29T10:48:09.000Z",
            //     "updated_at": null,
            //     "post_id": 192,
            //     "user_id": 101,
            //     "currency": "jpy",
            //     "deleted_at": null,
            //     "title": "test for booking currency",
            //     "subject": "1",
            //     "teaching_standard": "1",
            //     "description": "aaa",
            //     "type": "post"
            //   }

        });
        this.setState({
            ...this.state,
            calenderEvents: rowData
        })


    }
    componentDidMount() {
        const { user_info, router } = this.props
        const rbcBtnGroup = document.getElementsByClassName("rbc-btn-group")
        for (let index = 0; index < rbcBtnGroup.length; index++) {
            if (index > 0) {
                const element = rbcBtnGroup[index];
                console.log("rbcBtnGroup", element, index);
                element.style.display = "none"
            }
        }
        if (user_info) {
            const date = new Date()
            const month = date.getMonth() + 1
            const year = date.getFullYear()
            this.requestDataFromAPI(user_info.user, month, year)
        }

    }
}
export default CalendarProfileLayout