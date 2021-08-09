import { useRouter } from 'next/router';
import React, { useState } from 'react'
import Calendar from 'react-calendar';
import agent from '../../../utils/agent';
import { defaultSlot } from '../../../utils/constant_value';
import { manamusuDateFormatter } from '../../../utils/date_contant';
import { capitalizeFirstLetter } from '../../../utils/validation_contant';
import { hhmmToampm } from '../../../utils/work_contant';
import BootstrapSpinner from '../../ui/spinner/BootstrapSpinner';
export default (props) => {
    const router = useRouter()

    console.log("studentRequestDetails props", props);
    const [calendar_data, setCalendarData] = useState(new Date());

    const userInfo = props.user_info ? props.user_info.user : { id: 0 }
    const postdetails = props.requestDetail ? props.requestDetail : { user_id: -1 }
    agent.setToken(props.user_info ? props.user_info.token : "")


    function getCurrentTimestamp() {
        return new Date().getTime()
    }

    const [start_time, setStartTime] = useState("00:00")
    const [end_time, setEndTime] = useState("00:00")
    const [title, setTitle] = useState("")
    const [selectedMap, setSelectedMap] = useState({ data: new Map, time: getCurrentTimestamp() })
    const [loading, setLoading] = useState(false)
    const [interestedRes, setInterestedRes] = useState(null)
    const [buttonData, setButtonData] = useState(false)

    function goToLink(params) {
        router.push(`/${router.query.lang}/${params}`)
    }
    function getPostLanguage(langs) {
        // console.log("getPostLanguage", langs);
        const languages = langs ? langs : []
        let rowStr = ""
        languages.forEach((element, index) => {
            if (index === languages.length - 1) {
                rowStr += element.name
            } else {
                rowStr += `${element.name}, `
            }
        });
        return rowStr
    }
    function goRouterBack() {
        router.back()
    }
    function deleteRequestById() {
        const userInfo = props.user_info
        const postdetails = props.requestDetail

        agent.setToken(userInfo.token)
        if (typeof window !== "undefined") {
            if (window.confirm("Do you really want to delete?")) {
                agent.Auth.deleteRequestById({
                    "request_id": postdetails.id
                }).then(res => {
                    console.log("deletePostById", res);
                    goRouterBack()
                })
            }
        } else {
            agent.Auth.deleteRequestById({
                "request_id": postdetails.id
            }).then(res => {
                console.log("deletePostById", res);
                goRouterBack()
            })
        }
    }
    function createTimeSchedule() {
        const timeSlotLoop = props.timeSlot ? props.timeSlot : []
        let rowData = []
        timeSlotLoop.sort((a, b) => { return new Date(a.date).getTime() - new Date(b.date).getTime() })
        timeSlotLoop.forEach((element, index) => {
            let items = element.time_slot ? element.time_slot : []
            items.sort((a, b) => { return a.start_time - b.start_time })
            items.forEach(item => {
                rowData.push(<div class="d-flex align-items-start flex-wrap justify-content-between">
                    <div class="accordion mb-3" id="accordionExample">
                        <div class="accordion-item">
                            <div class="accordion-header" id={`headingOne${index}`}>
                                <span class="me-3">{manamusuDateFormatter(element.date)}</span>
                                {/* <time class="me-2 text-light">{(item.start_time > 12) ? (Number(item.start_time)) - 12 : item.start_time}:00{(item.start_time > 11) ? "pm" : "am"} - {(item.end_time > 12) ? (Number(item.end_time)) - 12 : item.end_time}:00{(item.end_time > 11) ? "pm" : "am"}</time> */}
                                <time class="me-2 text-light">{hhmmToampm(item.start_time)} - {hhmmToampm(item.end_time)}</time>
                            </div>
                        </div>
                    </div>
                </div>)
            });
            console.log("timeSlotLoop.forEach", element, "index", index);
        });
        return rowData
    }
    function acceptRequestBooking(id) {
        agent.Student.acceptInterestedTeacher({
            "response_id": id
        }).then(res => {
            console.log("acceptInterestedTeacher res", res);
            goToLink(`chat?booking_id=${res.booking_id}`)
        }).catch(err => {
            console.log("acceptInterestedTeacher err", err);
        })
    }
    function rejectRequestBooking(id) {
        agent.Student.rejectInterestedTeacher({
            "response_id": id
        }).then(res => {
            console.log("rejectInterestedTeacher res", res);
        }).catch(err => {
            console.log("rejectInterestedTeacher err", err);
        })
    }
    function getInterestedTeacherList() {
        let resTeachers = props.responses
        let rowData = []
        resTeachers.forEach(element => {
            rowData.push(<div key={element.id} class="card mt-4">
                <div class="row g-0">
                    <div class="col-xl-2 col-md-4 cursor-pointer" onClick={() => goToLink(`teacher/${element.user_id}`)}>
                        <img class="course-profile" src={getProfileIconByUrl(element.teacher_profile_image)} alt={element.teacher_profile_image} />
                    </div>
                    <div class="col-xl-10 col-md-8">
                        <div class="card-second h-100 d-flex flex-column justify-content-center">
                            <div class="d-flex justify-content-between align-items-center">
                                <h5 class="mb-0"></h5>
                                <span class="text-primary fs-20">{element.currency} {element.hourly_rate}</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-end flex-wrap">
                                <div class="mt-1">
                                    {(element.teacher_rating) ?
                                        <time class="d-block mb-1">
                                            <span class="text-light">Rating :</span>{element.teacher_rating}
                                        </time>
                                        : <></>}
                                    <time class="d-block mb-1">
                                        <span class="text-light">Description :</span>{element.teacher_description}</time>
                                    <b><span class="text-light fw-500">Teacher's Name :</span>{element.teacher_first_name} {element.teacher_last_name}</b>
                                </div>
                                <div>
                                    <button type="button" class="btn btn-primary px-5 me-4 mt-2" disabled={element.status === 1} onClick={() => acceptRequestBooking(element.id)}>ACCEPT</button>
                                    <button type="button" class="btn btn-danger px-5 mt-2" disabled={element.status === 1} onClick={() => rejectRequestBooking(element.id)}>DECLINE</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
        });
        return rowData

    }
    function getProfileIcon(requestDetail) {
        if (requestDetail) {
            return (requestDetail.profile_image) ? `${agent.API_FILE_ROOT_SMALL}${requestDetail.profile_image}` : "/images/student_profile.svg"
        } else {
            return "/images/student_profile.svg"
        }
    }
    function getProfileIconByUrl(teacher_profile_image) {
        return teacher_profile_image ? `${agent.API_FILE_ROOT_MEDIUM}${teacher_profile_image}` : "/images/teacher_profile.svg"
    }
    function getValueFromDropdown(list, key) {
        const lisItems = list ? list : []
        let subjectArr = lisItems.filter(res => res.id == key)
        if (subjectArr.length > 0) {
            return subjectArr[0].name ? subjectArr[0].name : subjectArr[0].year
        } else {
            return key
        }
    }
    function getInterestedValue(myId) {
        const responses = props.responses
        let findId = responses.filter(res => res.user_id === myId)
        if (findId.length > 0) {
            return true

        } else {
            return false
        }
    }
    function interestRequestClass() {
        const userInfo = props.user_info
        let requestDetail = props.requestDetail

        setLoading(true)
        agent.setToken(userInfo.token)
        agent.Teacher.interestedRequest({
            "request_id": requestDetail.id,
            "hourly_rate": Number(requestDetail.hourly_rate)
        }).then(res => {
            console.log("acceptRequestClass res", res);
            setLoading(false)
            setButtonData(true)
            setInterestedRes(res)
        }).catch(err => {
            setLoading(false)
            console.log("acceptRequestClass err", err);
        })
    }
    function deslineInterestRequestClass() {
        const userInfo = props.user_info
        let requestDetail = props.requestDetail

        setLoading(true)
        agent.setToken(userInfo.token)
        agent.Teacher.declineInterestedRequest({
            "request_id": requestDetail.id
        }).then(res => {
            console.log("deslineInterestRequestClass res", res);
            setLoading(false)
            setButtonData(true)
            setInterestedRes(null)
        }).catch(err => {
            setLoading(false)
            console.log("deslineInterestRequestClass err", err);
        })

    }
    function getMyButton(id, liveProfile) {
        if (liveProfile && liveProfile.bank_status == 0) {
            return <button type="button" class="btn btn-danger px-5" onClick={() => { goToLink("profile/bank") }}>Complete Bank Account First</button>
        } else {
            if (buttonData) {
                return interestedRes ? <button type="button" class="btn btn-danger px-5 mt-2" onClick={() => deslineInterestRequestClass()}>DECLINE</button> : <button type="button" class="btn btn-primary px-5 me-4 mt-2" onClick={() => interestRequestClass()}>APPLY</button>
            } else {
                return (getInterestedValue(id)) ? <button type="button" class="btn btn-danger px-5 mt-2" onClick={() => deslineInterestRequestClass()}>DECLINE</button> : <button type="button" class="btn btn-primary px-5 me-4 mt-2" onClick={() => interestRequestClass()}>APPLY</button>
            }
        }
    }
    return (
        <section>
            <div>
                <div class="container">
                    <div class="row g-lg-5">
                        <div class="col-12 col-lg border-end border-md-0 py-5">
                            <div class="my-3">
                                <div class="d-flex align-items-center justify-content-between flex-wrap">
                                    <div class="d-flex align-items-start">
                                        <img class="profile-rectangle me-3" src={getProfileIcon(props.requestDetail)} />
                                        <div>
                                            <div class="d-flex align-items-center flex-wrap">
                                                <h4 class="me-4 mb-0">{props.requestDetail ? capitalizeFirstLetter(props.requestDetail.first_name) : "Hyunwoong"} {props.requestDetail ? capitalizeFirstLetter(props.requestDetail.last_name) : "Kim"}</h4>
                                                {(userInfo.id === postdetails.user_id) ? <></> :
                                                    <span class="text-primary cursor-pointer space-nowrap fs-18" onClick={() => goToLink(`student/${props.requestDetail.user_id}`)}>View Profile <i class="fas fa-chevron-right fs-12 ms-2"></i></span>
                                                }
                                            </div>
                                            <div class="d-flex align-items-center mb-2">
                                                <img class="me-2" src="/images/icons/stars.jpg" />
                                                <span class="text-yello fs-24">{props.requestDetail ? props.requestDetail.user_rating ? props.requestDetail.user_rating : "0.0" : "0.0"}</span>
                                            </div>
                                            {(userInfo.id === postdetails.user_id) ?
                                                <div class="d-flex">
                                                    <a class="text-primary cursor-pointer me-3" onClick={() => goToLink(`student/${userInfo.id}/request/${props.requestDetail.id}/edit`)}><i class="fas fa-pencil-alt me-2"></i>Edit</a>
                                                    <a class="text-danger cursor-pointer" onClick={() => deleteRequestById(props.requestDetail.id)}><i class="fas fa-trash me-2"></i>Delete</a>
                                                </div>
                                                : <></>}
                                        </div>
                                    </div>
                                    <span class="text-black fs-24">{props.requestDetail ? props.requestDetail.currency : '$'} {props.requestDetail ? props.requestDetail.hourly_rate : 0}/hr</span>
                                </div>
                                <div class="mt-5">
                                    <div class="main-heading me-4">
                                        <h2 class="sub-heading mb-0 fs-24">{props.requestDetail ? props.requestDetail.title : ""}</h2>
                                    </div>
                                    <div class="mt-4">
                                        <img class="icon-size-2 me-3" src="/images/icons/books.svg" alt="" />
                                        <span class="text-third text-secondary">{props.requestDetail ? getValueFromDropdown(props.subjects, props.requestDetail.subject) : ""}</span>
                                    </div>
                                    <div class="mt-4">
                                        <img class="icon-size-2 me-3" src="/images/icons/class.svg" alt="" />
                                        <span class="text-third text-secondary">{getValueFromDropdown(props.teaching_standards, props.requestDetail ? props.requestDetail.teaching_standard : "")}</span>
                                    </div>
                                    <div class="mt-4">
                                        <img class="icon-size-2 me-3" src="/images/icons/language.svg" alt="" />
                                        <span class="text-third text-secondary">{getPostLanguage(props.language)}</span>
                                    </div>
                                </div>
                                <div class="mt-5">
                                    <div class="main-heading me-4">
                                        <h2 class="sub-heading mb-0 fs-24">description</h2>
                                    </div>
                                    <p class="mt-4 mb-0">
                                        {props.requestDetail ? props.requestDetail.description : ""}
                                    </p>
                                </div>
                                {(userInfo.id !== postdetails.user_id && userInfo.user_type === 2) ?
                                    <div className="mt-2">
                                        {loading ? <BootstrapSpinner />
                                            : (props.requestDetail.status !== 1) ?
                                                getMyButton(userInfo.id, props.liveProfile)
                                                : <button type="button" class="btn btn-primary px-5 me-4 mt-2" >ACCEPTED</button>
                                        }
                                    </div>
                                    : <></>}
                                {(userInfo.id === postdetails.user_id) ?
                                    <div class="mt-5">
                                        <div class="main-heading mb-4">
                                            <h2 class="sub-heading mb-0 fs-24">Responses</h2>
                                        </div>
                                        {getInterestedTeacherList()}
                                    </div>
                                    : <></>}
                            </div>
                        </div>
                        <div class="col-auto pt-1">
                            <div class="overflow-section">
                                {/* <div class="card mt-4 shadow-lg" style={{ maxHeight: "250px" }}> */}
                                <div class="card mt-4 shadow-lg">
                                    <div class="card-body">
                                        <div class="accordion-item">
                                            {/* <div class="accordion-button collapsed px-0" data-bs-toggle="collapse" data-bs-target="#collapsePendingClass" aria-expanded="false" aria-controls="collapsePendingClass"> */}
                                            <h5 className="mb-4">Class Request Time</h5>
                                            {/* </div> */}
                                            {/* <div id="collapsePendingClass" class="accordion-collapse collapse " aria-labelledby="headingOne" data-bs-parent="#accordionExample"> */}
                                            {createTimeSchedule()}
                                            {/* </div> */}
                                        </div>
                                    </div>
                                </div>
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
                        <form onSubmit={(e) => { e.preventDefault(); addNewCalendarData() }} >
                            <div class="modal-body">
                                <div class="text-center mb-4">
                                    <h4 class="modal-title">Customize Time for {manamusuDateFormatter(calendar_data.getTime())}</h4>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Start Time</label>
                                    <input type="time" placeholder="Start Time" className="form-control" name="start_time" value={start_time} onChange={(e) => setStartTime(e.target.value)} />
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">End Time</label>
                                    <input type="time" placeholder="End Time" className="form-control" name="end_time" value={end_time} onChange={(e) => setEndTime(e.target.value)} />
                                </div>
                            </div>
                            <div class="modal-footer justify-content-center py-4 border-0">
                                <button type="button" id="selectDateModalBtnClose" class="btn btn-primary py-2 px-5" data-bs-dismiss="modal">CONFIRM</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


            <div class="modal fade" id="makeoffer" tabindex="-1" aria-labelledby="makeofferLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-sm">
                    <div class="modal-content">
                        <div class="modal-header border-0">
                            <i class="fas fa-times close-button" data-bs-dismiss="modal" aria-label="Close"></i>
                        </div>
                        <div class="modal-body">
                            <div class="text-center mb-4">
                                <h5 class="modal-title text-center mb-4">Make Offer</h5>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Enter the Amount</label>
                                <div class="d-flex align-items-center">
                                    <input type="text" class="form-control" placeholder="Enter amount" />
                                    <span class="ms-2">/hr</span>
                                </div>
                            </div>
                            <div class="text-center py-3">
                                <button type="button" class="btn btn-primary px-4 py-2" data-bs-dismiss="modal">OFFER</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </section >


    )
}
