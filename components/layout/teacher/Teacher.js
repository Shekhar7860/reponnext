import React from 'react'
import agent from '../../../utils/agent'
import { defaultCurrency, getPartucularCurrency } from '../../../utils/constant_value';
import { manamusuDateFormatter } from '../../../utils/date_contant'
import { capitalizeFirstLetter } from '../../../utils/validation_contant';

const GOOGLE_MAP_API_KEY = 'AIzaSyD0fo5KQH8GdSqFCEEIEZ-_uHQwg0YAaCY';

class HomeTeacherLayout extends React.Component {
    constructor(props) {
        console.log("HomeTeacherLayout props", props);
        super(props)
        this.state = {
            language: "",
            subject: "",
            teach_stand: "",
            search_currency: "",
            nationality: "",
            latitude: "",
            longitude: "",
            gender: "",
            keyword: "",
            populerFilter: [],
            populerFilterCount: 0,
            populerFilterPage: 1,
            selectedFilter: new Map(),

        }
        this.placeInputRef = React.createRef();
    }

    goToLink = (params) => {
        this.props.router.push(`/${this.props.langRouter}/${params}`)
    }
    getSelectedLanguage = (params) => {
        const items = params ? params : []
        let rowData = []
        items.forEach(element => {
            rowData.push(<div class="accordion-body pt-0" onClick={() => this.setMyState("language", element.id)}>
                {element.name} {(element.id === this.state.language) ? <input class="form-check-input me-2" type="checkbox" checked /> : <></>}
            </div>)
        });
        return rowData
    }
    getSelectedNationality = (params) => {
        const items = params ? params : []
        let rowData = []
        items.forEach(element => {
            rowData.push(<div class="accordion-body pt-0" onClick={() => this.setMyState("nationality", element.id)}>
                {element.name} {(element.id == this.state.nationality) ? <input class="form-check-input me-2" type="checkbox" checked /> : <></>}
            </div>)
        });
        return rowData
    }
    getSubject = (params) => {
        const items = params ? params : []
        let rowData = []
        items.forEach(element => {
            rowData.push(<div class="accordion-body pt-0" onClick={() => this.setMyState("subject", element.id)}>
                {element.name} {(element.id === this.state.subject) ? <input class="form-check-input me-2" type="checkbox" checked /> : <></>}
            </div>)
        });
        return rowData
    }
    getTechStand = (params) => {
        const items = params ? params : []
        let rowData = []
        items.forEach(element => {
            rowData.push(<div class="accordion-body pt-0" onClick={() => this.setMyState("teach_stand", element.id)}>
                {element.name} {(element.id === this.state.teach_stand) ? <input class="form-check-input me-2" type="checkbox" checked /> : <></>}
            </div>)
        });
        return rowData
    }
    getGender = (params) => {
        const items = params ? params : []
        let rowData = []
        items.forEach(element => {
            rowData.push(<div class="accordion-body pt-0" onClick={() => this.setMyState("gender", element.name)} >
                {element.name} {(element.name === this.state.gender) ? <input class="form-check-input me-2" type="checkbox" checked /> : <></>}
            </div>)
        });
        return rowData
    }
    getCurrencyType = () => {
        let rowData = []
        defaultCurrency.forEach(element => {
            rowData.push(<div class="accordion-body pt-0" onClick={() => this.setMyState("search_currency", element.value)} >
                {element.name} {(element.value === this.state.search_currency) ? <input class="form-check-input me-2" type="checkbox" checked /> : <></>}
            </div>)
        });
        return rowData
    }

    setMyState = (name, value) => {
        console.log("setMyState called", name, value);
        this.setState({ ...this.state, [name]: value }, () => {
            this.prepearQuery()
        })
    }
    prepearQuery = async () => {
        const { populerFilterPage, language, subject, teach_stand, nationality, latitude, longitude, gender, keyword, search_currency } = this.state
        if (keyword) {
            this.initialiseFilterByKeyword(keyword)
        } else {
            let query = "?"
            query += `page=${populerFilterPage ? populerFilterPage : "1"}&`
            if (language) {
                query += `language=${language}&`
            }
            if (subject) {
                query += `subject=${subject}&`
            }
            if (teach_stand) {
                query += `teaching_standard=${teach_stand}&`
            }
            if (nationality) {
                query += `nationality=${nationality}&`
            }
            if (latitude) {
                query += `latitude=${latitude}&`
            }
            if (longitude) {
                query += `longitude=${longitude}&`
            }
            if (gender) {
                query += `gender=${gender}&`
            }
            if (search_currency) {
                query += `search_currency=${search_currency}&`
            }
            this.initialiseFilter(query)
        }
    }
    initialiseFilter = async (query) => {
        const { currency } = this.props
        const items = await agent.Common.TeacherFilterByStudent(`${query}&currency=${currency}&`)
        console.log("componentDidMount query", query, "items", items);

        this.setState(
            {
                ...this.state,
                populerFilter: items.posts,
                populerFilterCount: items.count,
            }, () => {
                console.log("StudentFilter", items);
            }
        )
    }
    initialiseFilterByKeyword = (keyword) => {
        if (keyword) {
            const { populerFilterPage } = this.state
            let query = "?"
            query += `page=${populerFilterPage ? populerFilterPage : "1"}&keyword=${keyword}&`
            this.initialiseFilter(query)
        } else {
            this.initialiseFilter("?page=1&")
        }
    }

    getProfileIcon = (profile_image) => {
        if (profile_image) {
            return (profile_image) ? `${agent.API_FILE_ROOT_SMALL}${profile_image}` : "/images/teacher_profile.svg"
        } else {
            return "/images/teacher_profile.svg"
        }
    }

    getSubjectFromApi = (params) => {
        const subjectItems = this.props.subjects ? this.props.subjects : []
        let subjectArr = subjectItems.filter(res => res.id == params)
        if (subjectArr.length > 0) {
            return subjectArr[0].name
        } else {
            return params
        }
    }
    getTeachStandFromApi = (params) => {
        const subjectItems = this.props.teaching_standards ? this.props.teaching_standards : []
        let subjectArr = subjectItems.filter(res => res.id == params)
        if (subjectArr.length > 0) {
            return subjectArr[0].name
        } else {
            return params
        }
    }
    getTeacherPost = () => {
        let rowData = []
        this.state.populerFilter.forEach(res => {
            // let currency = getPartucularCurrency(res.currency)

            rowData.push(<div class="cursor-pointer col-md-6" onClick={() => this.goToLink(`teacher/${res.user_id}/post/${res.id}`)}>
                <div class="card">
                    <div class="d-flex">
                        <img class="detail-img" src={this.getProfileIcon(res.profile_image)} alt={`${res.profile_image}`} />
                        <div class="card-body">
                            <div class="d-flex flex-column">
                                <p class="detail-text mb-0">{res.title}</p>
                                <time class="light-heading my-2">{manamusuDateFormatter(res.created_at)}</time>
                                <b class="text-third text-secondary">{this.getSubjectFromApi(res.subject)}</b>
                                <div>
                                    <img class="icon-size me-2" src="/images/home-page/class.svg" alt="" />
                                    <span class="text-third text-secondary">{this.getTeachStandFromApi(res.teaching_standard)} </span>
                                </div>
                                <div>
                                    <img class="icon-size me-2" src="/images/home-page/cash.svg" alt="" />
                                    <span class="text-third text-secondary">{res.currency} {res.hourly_rate}/hr</span>
                                </div>
                                <div>
                                    <img class="icon-size me-2" src="/images/home-page/user.svg" alt="" />
                                    <span class="text-third text-secondary">{res.first_name} {res.last_name} <span class="text-yello">(3.5/5) *</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )
        })
        return rowData
    }

    initialiseFilterStateMap = (element) => {
        console.log("initialiseFilterStateMap", element);
        let myValue = null
        const { selectedFilter } = this.state
        let rowSelectedFilter = selectedFilter
        if (rowSelectedFilter.has(element.id)) {
            rowSelectedFilter.delete(element.id)
            myValue = ""
        } else {
            rowSelectedFilter.set(element.id, element.id)
            myValue = element.value
        }
        this.setState({
            ...this.state,
            selectedFilter: rowSelectedFilter
        }, () => {
            this.setMyState(element.parent, myValue)
        })
    }
    getFilterChips = (popular_filter) => {
        const { selectedFilter } = this.state
        let rowData = []
        popular_filter.forEach(element => {
            rowData.push(<span class={` btn-ouline me-4`} onClick={() => this.initialiseFilterStateMap(element)}>{capitalizeFirstLetter(element.name)}</span>)
            // rowData.push(<span class={`${selectedFilter.has(element.id) ? "btn-primary" : ""} btn-ouline me-4`} onClick={() => this.initialiseFilterStateMap(element)}>{capitalizeFirstLetter(element.name)}</span>)
        });
        return rowData
    }
    render() {
        const { popular_filter } = this.props
        const { populerFilterPage, populerFilter, populerFilterCount } = this.state
        const currentListSize = ((populerFilterPage - 1) * 10) + populerFilter.length
        return (
            <section>
                <div class="container">
                    <div class="card my-4">
                        <div class="card-body pt-0">
                            <div class="row justify-content-between align-items-center">
                                <div class="col-auto pt-3">
                                    <h5 class="sub-heading mb-0 space-nowrap">Popular Filter :</h5>
                                </div>
                                <div class="col-auto pt-3">
                                    <div class="overflow-content d-flex align-items-center pb-2 pb-lg-0">
                                        {this.getFilterChips(popular_filter ? popular_filter : [])}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-3 pt-3">
                            <div class="card">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between align-items-center mb-4">
                                        <h5 class="sub-heading space-nowrap">Filter</h5>
                                        <img src="/images/icons/filter.png" />
                                    </div>
                                    {/* <input type="text" className="form-control mb-1" placeholder="Enter Address" ref={this.placeInputRef} onChange={(e) => (e.target.value === "") ? this.resetAddress() : () => { }} /> */}
                                    <input type="text" className="form-control mb-1" placeholder="Type something ..." onChange={(e) => this.setMyState("keyword", e.target.value)} />

                                    <div class="accordion" id="accordionExample">
                                        <div class="accordion-item">
                                            <h2 class="accordion-header" id="headingOne">
                                                <div class="accordion-button collapsed px-0" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                                    Language &nbsp;&nbsp; {(this.state.language !== "") ? <i className="fa fa-times-circle cursor-pointer text-light fw-500" onClick={() => this.setMyState("language", "")} ></i> : <></>}
                                                </div>
                                            </h2>
                                            <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                {this.getSelectedLanguage(this.props.languages)}
                                            </div>
                                        </div>
                                        <div class="accordion-item">
                                            <h2 class="accordion-header" id="headingTwo">
                                                <div class="accordion-button collapsed px-0" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                    Subject &nbsp;&nbsp; {(this.state.subject !== "") ? <i className="fa fa-times-circle cursor-pointer text-light fw-500" onClick={() => this.setMyState("subject", "")} ></i> : <></>}
                                                </div>
                                            </h2>
                                            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                {this.getSubject(this.props.subjects)}
                                            </div>
                                        </div>
                                        <div class="accordion-item">
                                            <h2 class="accordion-header" id="headingThree">
                                                <div class="accordion-button collapsed px-0" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                    Teaching Standard &nbsp;&nbsp; {(this.state.teach_stand !== "") ? <i className="fa fa-times-circle cursor-pointer text-light fw-500" onClick={() => this.setMyState("teach_stand", "")} ></i> : <></>}
                                                </div>
                                            </h2>
                                            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                {this.getTechStand(this.props.teaching_standards)}
                                            </div>
                                        </div>
                                        <div class="accordion-item">
                                            <h2 class="accordion-header" id="headingFour">
                                                <div class="accordion-button collapsed px-0" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                                    Payment &nbsp;&nbsp; {(this.state.search_currency !== "") ? <i className="fa fa-times-circle cursor-pointer text-light fw-500" onClick={() => this.setMyState("search_currency", "")} ></i> : <></>}
                                                </div>
                                            </h2>
                                            <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                                                {this.getCurrencyType()}

                                            </div>
                                        </div>
                                        <div class="accordion-item">
                                            <h2 class="accordion-header" id="headingFive">
                                                <div class="accordion-button collapsed px-0" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                                    Nationality &nbsp;&nbsp; {(this.state.nationality !== "") ? <i className="fa fa-times-circle cursor-pointer text-light fw-500" onClick={() => this.setMyState("nationality", "")} ></i> : <></>}
                                                </div>
                                            </h2>
                                            <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                                                {this.getSelectedNationality(this.props.nationalities)}
                                            </div>
                                        </div>
                                        {/* <div class="accordion-item">
                                            <h2 class="accordion-header" id="headingSix">
                                                <div class="accordion-button collapsed px-0" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                                                    Location
                                                </div>
                                            </h2>
                                            <div id="collapseSix" class="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#accordionExample">
                                                <div class="accordion-body pt-0">
                                                    <input type="text" className="form-control mb-1" ref={this.placeInputRef} onChange={(e) => (e.target.value === "") ? this.resetAddress() : () => { }} />
                                                </div>
                                            </div>
                                        </div> */}
                                        <div class="accordion-item">
                                            <h2 class="accordion-header" id="headingSeven">
                                                <div class="accordion-button collapsed px-0" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                                                    Gender &nbsp;&nbsp; {(this.state.gender !== "") ? <i className="fa fa-times-circle cursor-pointer text-light fw-500" onClick={() => this.setMyState("gender", "")} ></i> : <></>}
                                                </div>
                                            </h2>
                                            <div id="collapseSeven" class="accordion-collapse collapse" aria-labelledby="headingSeven" data-bs-parent="#accordionExample">
                                                {this.getGender(this.props.genderAPI)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-9 pt-3">
                            {(populerFilterCount !== 0) ?
                                <div class="card card-section mb-0">
                                    <div class="card-body pb-0">
                                        <h5 class="sub-heading mb-4 space-nowrap">Teacher's Post</h5>
                                        <div class="row">
                                            {this.getTeacherPost()}
                                        </div>
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
                                    </div>
                                </div>
                                : <img src="/images/undraw_empty.png" />}
                        </div>
                    </div>
                </div>
            </section>
        )
    }
    resetAddress = () => {
        this.setState({
            ...this.state,
            address: "",
            latitude: "",
            longitude: ""
        }, () => {
            this.prepearQuery()
        })
    }
    initPlaceAPI = () => {
        console.log("initPlaceAPI called");
        let autocomplete = new window.google.maps.places.Autocomplete(this.placeInputRef.current);
        new window.google.maps.event.addListener(autocomplete, "place_changed", () => {
            let place = autocomplete.getPlace();
            console.log("initPlaceAPI", place, "end");
            if (place) {
                this.setState({
                    ...this.state,
                    address: place.formatted_address,
                    latitude: place.geometry.location.lat(),
                    longitude: place.geometry.location.lng()
                }, () => {
                    this.prepearQuery()
                })
            }
        });
    };
    loadGoogleMapScript = (callback) => {
        if (typeof window.google === 'object' && typeof window.google.maps === 'object') {
            callback();
        } else {
            const googleMapScript = document.createElement("script");
            googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;
            window.document.body.appendChild(googleMapScript);
            googleMapScript.addEventListener("load", callback);
        }
    }
    componentDidMount() {
        this.initialiseFilter("?page=1&")
        this.loadGoogleMapScript(() => {
            console.log("callback loadGoogleMapScript");
            this.initPlaceAPI()
        })
    }
}
export default HomeTeacherLayout