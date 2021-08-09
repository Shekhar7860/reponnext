import React, { useRef, useState } from 'react';

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);
let mSelectInfo;

export default (props) => {
    // console.log("CalendarUi2 props", props);

    const calendarRef = useRef(null)
    const [start_time, setStartTime] = useState("00:00")
    const [end_time, setEndTime] = useState("00:00")
    const [title, setTitle] = useState("")
    const [events, setEvent] = useState(props.event);
    function handleDateSelect(e) {
        mSelectInfo = e

        document.getElementById("selectDateModalBtn").click()

    }
    function addNewCalendarData() {
        let startDate = new Date(mSelectInfo.start)
        let endDate = new Date(mSelectInfo.end)

        if (start_time && end_time) {
            let startTimeArray = String(start_time).split(":")
            let endTimeArray = String(end_time).split(":")
            if (startTimeArray.length === 2 && endTimeArray.length === 2) {
                const freshStartDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startTimeArray[0], startTimeArray[1], 0)
                console.log("freshDate", freshStartDate);
                const freshEndDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() - 1, endTimeArray[0], endTimeArray[1], 0)
                console.log("freshEndDate", freshEndDate);
                const eve = events
                eve.push({
                    start: freshStartDate,
                    end: freshEndDate,
                    title: title
                })
                setEvent(eve)

                document.getElementById("selectDateModalBtnClose").click()
                setStartTime("00:00")
                setEndTime("00:00")
                setTitle("")

            }
        }

    }
    return (<>
        <Calendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={events}
            style={{ height: "100vh" }}
            selectable={true}
            onChange={(res) => {
                console.log("date", res);
            }}
            onSelectEvent={(e) => {
                console.log("onSelectEvent", e);
            }}
            onSelectSlot={(e) => {
                console.log("onSelectSlot", e);
                // handleDateSelect(e)
                props.onSelectDate(e)

            }}
            onSelecting={(e) => {
                console.log("onSelecting", e);
            }}
            ref={calendarRef}

        />
        {/* {events.map((res) => {
            console.log("event res", res);
            return <h1 key={res.start}>{res.title}</h1>
        })} */}

        <button type="button" id="selectDateModalBtn" class=" invisible" data-bs-toggle="modal" data-bs-target="#selectTimeModalTarget" />

        <div class="modal fade" id="selectTimeModalTarget" tabIndex="-1" aria-labelledby="selectTimeModal" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="selectTimeModal"></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={(e) => { e.preventDefault(); addNewCalendarData() }} >
                        <div class="modal-body">

                            <input type="input" placeholder="Title" className="form-control" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                            <br />
                            <input type="time" className="form-control" name="start_time" value={start_time} onChange={(e) => setStartTime(e.target.value)} />
                            <br />
                            <input type="time" className="form-control" name="end_time" value={end_time} onChange={(e) => setEndTime(e.target.value)} />
                        </div>
                        <div class="modal-footer">
                            <button type="button" id="selectDateModalBtnClose" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Save changes</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>


    </>)
}