import React from "react"
import agent from "../../../utils/agent"
import { manamusuDateFormatter } from "../../../utils/date_contant"
import { capitalizeFirstLetter } from "../../../utils/validation_contant"
class DeclineProfileRequestResponsesLayout extends React.Component {
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
                endDate: manamusuDateFormatter(time_slots[0].date),
                startTime: `${startTime1 > 11 ? `${startTime1}pm` : `0${startTime1}am`} - ${endTime1 > 11 ? `${endTime1}pm` : `0${endTime1}am`}`,
                endTime: `${startTime1 > 11 ? `${startTime1}pm` : `0${startTime1}am`} - ${endTime1 > 11 ? `${endTime1}pm` : `0${endTime1}am`}`,
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
                startTime: `${startTime1 > 11 ? `${startTime1}pm` : `${startTime1}am`} - ${endTime1 > 11 ? `${endTime1}pm` : `${endTime1}am`}`,
                endTime: `${startTime2 > 11 ? `${startTime2}pm` : `${startTime2}am`} - ${endTime2 > 11 ? `${endTime2}pm` : `${endTime2}am`}`,

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
            return (profile_image) ? `${agent.API_FILE_ROOT_MEDIUM}${profile_image}` : "/images/student_profile.svg"
        } else {
            return "/images/student_profile.svg"
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
            console.log("populerFilter element", element);
            // let data = this.getTimeSlotTime(element.time_slots)
            rowDate.push(<div key={index} class="card mt-4">
                <div class="row align-items-center g-0">
                    <div class="col-xl-2 col-md-4">
                        <img class="course-profile" src={this.getProfileIcon(element.profile_image)} alt={element.profile_image} />
                    </div>
                    <div class="col-xl-10 col-md-8">
                        <div class="card-second h-100 d-flex flex-column justify-content-center">
                            <div class="d-flex justify-content-between align-items-center">
                                <h5 class="mb-0">{element.title}</h5>
                                <span class="text-primary fs-20">{element.currency}  {element.hourly_rate}</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-end flex-wrap">
                                <div class="mt-2">
                                    <time class="d-block mb-1">
                                        {/* <span class="text-light">Date :</span>{data.startDate} - {data.endDate} */}
                                    </time>
                                    <time class="d-block mb-1">
                                        {/* <span class="text-light">Time :</span>{data.startTime}, {data.endTime} */}
                                    </time>
                                    <b><span class="text-light fw-500">Student's Name :</span>{capitalizeFirstLetter(element.first_name)} {capitalizeFirstLetter(element.last_name)}</b>
                                </div>
                                {/* <div>
                                    <button type="button" class="btn btn-outline-primary px-4 me-4 mt-2" onClick={() => this.goToLink(`my-courses/${element.id}`)}>View Details</button>
                                    <button type="button" class="btn btn-primary px-5 mt-2" onClick={() => this.goToLink(`chat/${element.id}`)}>Chat</button>
                                </div> */}
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
        const items = await agent.Teacher.declineReqRes(query)
        console.log("initialiseFilter query", query);

        this.setState(
            {
                ...this.state,
                populerFilter: items.responses,
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
        return (populerFilterCount !== 0) ? <>
            <div class="main-heading mb-5">
                <h2 class="sub-heading mb-0 fs-24">My Student / Applications</h2>
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
        console.log("token", token);
        if (token) {
            agent.setToken(token)
            this.initialiseFilter("1")
        } else {
            console.log("token not found", token);
        }
    }
}
export default DeclineProfileRequestResponsesLayout