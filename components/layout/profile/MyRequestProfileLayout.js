import React from "react"
import agent from "../../../utils/agent"
import language_contant from "../../../utils/language_contant"
import StudentRequestLayout from "../../ui/student/StudentRequestLayout"
class MyRequestProfileLayout extends React.Component {
    constructor(props) {
        super(props)
        // console.log("MyRequestProfileLayout props", props);
        this.state = {
            token: props.user_info ? props.user_info.token : null,
            populerFilter: [],
            populerFilterCount: 0,
            populerFilterPage: 1,
            subjects: [],
        }
    }
    getUserRequest = () => {
        const { populerFilter } = this.state
        const posts = populerFilter ? populerFilter : []
        let rowDate = []
        posts.forEach((element, index) => {
            rowDate.push(<StudentRequestLayout key={index} {...element} subjects={this.state.subjects} teaching_standards={this.state.teaching_standards} />)
        });
        return rowDate
    }
    prepearQuery = async () => {
        const { populerFilterPage } = this.state
        let query = "?"
        query += `page=${populerFilterPage ? populerFilterPage : "1"}&`
        this.initialiseFilter(query)
    }
    initialiseFilter = async (query) => {
        const { currency } = this.props
        const items = await agent.Auth.getRequest(`${query}&currency=${currency}&`)
        console.log("componentDidMount query", query, "items", items);

        this.setState(
            {
                ...this.state,
                populerFilter: items.requests,
                populerFilterCount: items.count,
            }, () => {
                console.log("StudentFilter", items);
            }
        )
    }
    setMyState = (name, value) => {
        console.log("setMyState called", name, value);
        this.setState({ ...this.state, [name]: value }, () => {
            this.prepearQuery()
        })
    }

    goToLink = (params) => {
        const { router } = this.props
        router.push(`/${router.query.lang}/${params}`)
    }
    render() {
        const { populerFilterPage, populerFilter, populerFilterCount } = this.state
        const currentListSize = ((populerFilterPage - 1) * 10) + populerFilter.length
        console.log("currentListSize", currentListSize);
        return (populerFilterCount !== 0) ? <>
            <div class="d-flex justify-content-between align-items-center flex-wrap">
                <div class="d-flex align-items-center mt-2 mt-sm-0">
                    <div class="main-heading me-4">
                        <h2 class="sub-heading mb-0 fs-24">My Requests</h2>
                    </div>
                </div>
                <button type="button" class="btn btn-primary px-4 py-2 mt-2 mt-sm-0" onClick={() => this.goToLink("create-request")}>{language_contant.Common.createRequest()}</button>
            </div>
            <div class="card card-section mb-0">
                <div class="card-body pb-0">
                    <div class="row">
                        {this.getUserRequest()}
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-center mt-4">
                <nav aria-label="...">
                    <ul class="pagination"><li class="page-item btn-round" onClick={() => (populerFilterPage !== 1) ? this.setMyState("populerFilterPage", populerFilterPage - 1) : ""}>
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
        const { user_info, router } = this.props
        if (user_info) {
            agent.setToken(user_info.token)
            this.initialiseFilter("?page=1&")
        } else {
            router.push(`/${router.query.lang}/sign-in`)
        }
    }
}
export default MyRequestProfileLayout