import { Container } from "next/app"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"

// import FullCalendar from '@fullcalendar/react'
// import dayGridPlugin from '@fullcalendar/daygrid'
// import timeGridPlugin from '@fullcalendar/timegrid'
// import interactionPlugin from '@fullcalendar/interaction'

let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
let mSelectInfo;

export default () => {
    useEffect(() => {
        setMeetEvent(
            [{
                id: 0,
                title: 'All-day event',
                start: todayStr
            },
            {
                id: 1,
                title: 'Timed event',
                start: todayStr + 'T12:00:00'
            }])
    }, [])

    const calendarRef = useRef(null);
    const [start_time, setStartTime] = useState("00:00")
    const [end_time, setEndTime] = useState("00:00")
    const [title, setTitle] = useState("")
    const [meetEvent, setMeetEvent] = useState(null)
    const [currentEvents, setCurrentEvents] = useState(null)


    function handleDateSelect(selectInfo) {
        mSelectInfo = selectInfo
        document.getElementById("selectDateModalBtn").click()
    }
    function handleEvents(events) {
        console.log("handleEvents", events);
        setCurrentEvents(events)
    }

    function handleEventClick(clickInfo) {
        clickInfo.event.remove()
    }

    function addNewCalendarData() {
        let calendarApi = calendarRef.current.getApi()

        calendarApi.unselect() // clear date selection

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
                calendarApi.addEvent({
                    id: new Date().getTime(),
                    title: title,
                    start: freshStartDate,
                    end: freshEndDate,
                    allDay: false
                })

                document.getElementById("selectDateModalBtnClose").click()
                this.setState({
                    start_time: "00:00",
                    end_time: "00:00",
                    title: ""
                })

            }
        }
    }
    return (<Container>
        <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
                left: 'prev',
                center: 'title',
                right: 'next'
            }}
            initialView='dayGridMonth'
            // editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            initialEvents={meetEvent} // alternatively, use the `events` setting to fetch from a feed
            select={handleDateSelect}
            eventContent={(e) => <CalendarRenderEventContent eventInfo={e} />} // custom render function
            eventClick={(e) => handleEventClick(e)}
            eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            // you can update a remote database when these fire:
            eventAdd={(arg) => console.log("eventAdd", arg.event.startStr)}
            eventChange={(arg) => console.log("eventChange", arg.event)}
            eventRemove={(arg) => console.log("eventRemove", arg.event)}
        />
        <button type="button" id="selectDateModalBtn" class="invisible" data-bs-toggle="modal" data-bs-target="#selectTimeModalTarget" />

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

    </Container>)
}