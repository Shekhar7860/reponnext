import React from "react"
import agent from "../../../utils/agent";
import { manamusuDateFormatter } from "../../../utils/date_contant";
import { capitalizeFirstLetter } from "../../../utils/validation_contant";
import { hhmmToampm } from "../../../utils/work_contant";
class OnGoingProfileMyCoursesLayout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            token: props.user_info ? props.user_info.token : null,
            populerFilter: [],
            populerFilterCount: 0,
            populerFilterPage: 1,
            subjects: [],
        }
    }
    getTimeSlotTime = (time_slots) => {
        console.log("time_slots", time_slots);
        if (time_slots.length === 1) {
            let startTime1 = time_slots[0].start_time
            return {
                startDate: manamusuDateFormatter(time_slots[0].date),
                endDate: "",
                startTime: `${hhmmToampm(startTime1)}`,
                endTime: ``,
            }
        } else if (time_slots.length > 0) {
            let end = time_slots.length - 1

            let startTime1 = time_slots[0].start_time
            let endTime1 = time_slots[0].end_time

            let startTime2 = time_slots[end].start_time
            let endTime2 = time_slots[end].end_time
            return {
                startDate: manamusuDateFormatter(time_slots[0].date),
                endDate: manamusuDateFormatter(time_slots[end].date),
                startTime: `${hhmmToampm(startTime1)} - ${hhmmToampm(endTime1)}`,
                endTime: `${hhmmToampm(startTime2)} - ${hhmmToampm(endTime2)}`,

            }
        } else {
            return {
                startDate: "",
                endDate: "Not available",
                startTime: "",
                endTime: "Not available"
            }
        }
    }
    getProfileIcon = (profile_image) => {
        if (profile_image) {
            return (profile_image) ? `${agent.API_FILE_ROOT_MEDIUM}${profile_image}` : "/images/teacher_profile.svg"
        } else {
            return "/images/teacher_profile.svg"
        }
    }
    goToLink = (params) => {
        let router = this.props.router
        router.push(`/${router.query.lang}/${params}`)
    }
    getRowList = () => {
        const { populerFilter } = this.state
        const posts = populerFilter ? populerFilter : []
        let rowDate = []
        posts.forEach((element, index) => {
            let data = this.getTimeSlotTime(element.time_slots)
            rowDate.push(<div key={index} class="card mt-4">
                <div class="row align-items-center g-0">
                    <div class="col-xl-2 col-md-4">
                        <img class="course-profile" src={this.getProfileIcon(element.teacher_profile_image)} alt={element.teacher_profile_image} />
                    </div>
                    <div class="col-xl-10 col-md-8">
                        <div class="card-second h-100 d-flex flex-column justify-content-center">
                            <div class="d-flex justify-content-between align-items-center">
                                <h5 class="mb-0">{element.post_title}</h5>
                                <span class="text-primary fs-20">{element.currency} {element.hourly_rate}</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-end flex-wrap">
                                <div class="mt-2">
                                    <time class="d-block mb-1">
                                        <span class="text-light">Date :</span>{data.startDate} {data.endDate ? ` - ${data.endDate}` : ""}
                                    </time>
                                    <time class="d-block mb-1">
                                        <span class="text-light">Time :</span>{data.startTime} {data.endTime ? `, ${data.endTime}` : ""}
                                    </time>
                                    <b><span class="text-light fw-500">Teacher's Name :</span>{capitalizeFirstLetter(element.teacher_first_name)} {capitalizeFirstLetter(element.teacher_last_name)}</b>
                                </div>
                                <div>
                                    <button type="button" class="btn btn-outline-primary px-4 me-4 mt-2" onClick={() => this.goToLink(`my-courses/ongoing/${element.id}`)}>View Details</button>
                                    <button type="button" class="btn btn-primary px-5 mt-2" onClick={() => this.goToLink(`chat?booking_id=${element.id}`)}>Open Chat</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
        });
        return rowDate
    }

    prepearQuery = async () => {
        const { populerFilterPage } = this.state
        this.initialiseFilter(`${populerFilterPage}`)
    }
    initialiseFilter = async (query) => {
        const items = await agent.Student.myCoursesOnGoing(query)
        console.log("initialiseFilter query", query, "items", items);

        this.setState(
            {
                ...this.state,
                populerFilter: items.booking,
                populerFilterCount: items.count,
            }, () => {

            }
        )
    }

    setMyState = (name, value) => {
        console.log("setMyState called", name, value);
        this.setState({ ...this.state, [name]: value }, () => {
            this.prepearQuery()
        })
    }
    render() {
        const { populerFilterPage, populerFilter, populerFilterCount } = this.state
        const currentListSize = ((populerFilterPage - 1) * 10) + populerFilter.length
        console.log("currentListSize", currentListSize);
        return (populerFilterCount !== 0) ? <>
            <div class="main-heading mb-5">
                <h2 class="sub-heading mb-0 fs-24">My Courses / Ongoing</h2>
            </div>
            {this.getRowList()}
            <div class="d-flex justify-content-center mt-4">
                <nav aria-label="...">
                    <ul class="pagination">
                        <li class="page-item btn-round" onClick={() => (populerFilterPage !== 1) ? this.setMyState("populerFilterPage", populerFilterPage - 1) : ""}>
                            <span class={`btn ${(populerFilterPage !== 1) ? "btn-outline-primary" : "btn-outline-danger"} pre-next-btn`}><i class="fas fa-chevron-left me-2"></i>Previous</span>
                        </li>

                        {(currentListSize < populerFilterCount) ?
                            <></> :
                            ((populerFilterPage - 4) > 0) ?
                                <li class="page-item" onClick={() => this.setMyState("populerFilterPage", populerFilterPage - 4)}><span class="page-link">{populerFilterPage - 4}</span></li>
                                : <></>
                        }
                        {((currentListSize + 10) < populerFilterCount) ?
                            <></> :
                            ((populerFilterPage - 3) > 0) ?
                                <li class="page-item" onClick={() => this.setMyState("populerFilterPage", populerFilterPage - 3)}><span class="page-link">{populerFilterPage - 3}</span></li>
                                : <></>
                        }

                        {((populerFilterPage - 2) > 0) ?
                            <li class="page-item" onClick={() => this.setMyState("populerFilterPage", populerFilterPage - 2)}><span class="page-link">{populerFilterPage - 2}</span></li>
                            : <></>}

                        {((populerFilterPage - 1) > 0) ?
                            <li class="page-item" onClick={() => this.setMyState("populerFilterPage", populerFilterPage - 1)}><span class="page-link">{populerFilterPage - 1}</span></li>
                            : <></>}

                        <li class="page-item active" aria-current="page">
                            <span class="page-link">{populerFilterPage}</span>
                        </li>

                        {(currentListSize < populerFilterCount) ?
                            <li class="page-item" onClick={() => this.setMyState("populerFilterPage", populerFilterPage + 1)}><span class="page-link">{populerFilterPage + 1}</span></li>
                            : <></>}

                        {((currentListSize + 10) < populerFilterCount) ?
                            <li class="page-item" onClick={() => this.setMyState("populerFilterPage", populerFilterPage + 2)}><span class="page-link">{populerFilterPage + 2}</span></li>
                            : <></>}

                        {((populerFilterPage - 1) > 0) ?
                            <></>
                            : ((currentListSize + 20) < populerFilterCount) ?
                                <li class="page-item" onClick={() => this.setMyState("populerFilterPage", populerFilterPage === 1 ? populerFilterPage + 3 : populerFilterPage + 4)}><span class="page-link">{populerFilterPage === 1 ? populerFilterPage + 3 : populerFilterPage + 4}</span></li>
                                : <></>}

                        {((populerFilterPage - 2) > 0) ?
                            <></>
                            : ((currentListSize + 30) < populerFilterCount) ?
                                <li class="page-item" onClick={() => this.setMyState("populerFilterPage", populerFilterPage === 1 ? populerFilterPage + 4 : populerFilterPage + 3)}><span class="page-link">{populerFilterPage === 1 ? populerFilterPage + 4 : populerFilterPage + 3}</span></li>
                                : <></>}

                        <li class="page-item" onClick={() => (currentListSize < populerFilterCount) ? this.setMyState("populerFilterPage", populerFilterPage + 1) : ""}>
                            <span class={`btn ${(currentListSize < populerFilterCount) ? "btn-outline-primary" : "btn-outline-danger"} pre-next-btn`}>Next<i class="fas fa-chevron-right ms-2" ></i></span>
                        </li>
                    </ul>
                </nav>
            </div>
        </> :
            <img src="/images/undraw_empty.png" />
    }
    componentDidMount() {
        const { token } = this.state

        if (token) {
            agent.setToken(token)
            this.initialiseFilter("1")

            agent.Common.staticData().then(res => {
                this.setState({ ...this.state, ...res })
            }).catch(err => {
                console.log("Common.staticData() error", err);
            })
        } else {
            console.log("token not found", token);
        }
    }
}
export default OnGoingProfileMyCoursesLayout