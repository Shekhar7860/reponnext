import axios from "axios";
import { setCookie } from "nookies";
import { useState } from "react";
import actions from "../../../store/actions";
import agent from "../../../utils/agent";
import language_contant from "../../../utils/language_contant"

export default (props) => {
    const user_info = props.user_info ? props.user_info : {}
    console.log("checkImgUrl profile sidebar props", props);
    const [profileIcon, setProfileIcon] = useState("")
    agent.setToken(user_info.token)

    function getDefaultIcon(user_type) {
        console.log("getDefaultIcon called", user_type);
        if (user_type) {
            return (user_type === 1) ? "/images/student_profile.svg" : "/images/teacher_profile.svg"
        } else {
            return "/images/student_profile.svg"
        }
    }
    function getProfileIcon(userDetail) {
        let iconUrl;
        if (profileIcon) {
            iconUrl = `${agent.API_FILE_ROOT_MEDIUM}${profileIcon}`
        } else {
            if (userDetail && userDetail.profile_image) {
                iconUrl = `${agent.API_FILE_ROOT_MEDIUM}${userDetail.profile_image}`
            } else {
                iconUrl = getDefaultIcon(user_info.user ? user_info.user.user_type : "")
            }
        }
        props.setLocalProfileIcon(iconUrl)
        return iconUrl
    }
    async function fileUpload(file) {
        const url = `${agent.API_ROOT}upload/aws`;
        const formData = new FormData();
        formData.append('file', file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        const data = await (await axios.post(url, formData, config)).data
        return data.filename
    }
    async function uploadFileProfile(file) {
        const uploadUrl = await fileUpload(file)
        setProfileIcon(uploadUrl)
        agent.Profile.updateProfileImage(uploadUrl).then(res => {
            setCookie(this, actions.GET_USER_INFO, JSON.stringify({
                user_info: {
                    token: props.user_info.token,
                    user: res.user
                }
            }), {
                maxAge: 30 * 24 * 60 * 60,
                path: "/",
            });
            console.log("updateProfileImage res", res);
        }).catch(err => {
            console.log("updateProfileImage error", err);
        })
    }
    async function goToLink(url) {
        let lang = props.router.query.lang
        props.router.push(`/${lang}/profile/${url}`)
    }

    function closeNav() {
        document.getElementById("myDIV").classList.remove('display-profile');
    }
    return <div class="col-lg-3 col-md-5">
        <div class="left-menu" id="myDIV">
            <div class="card position-relative h-100">
                <i class="fas fa-times close-btn d-block d-lg-none" onClick={() => closeNav()}></i>
                <div class="upload-profile">
                    <img src={getProfileIcon(props.userDetail)} class="profile-bg" alt="..." />
                    <div class="profile-section">
                        <img src={getProfileIcon(props.userDetail)} class="profile-img" alt="" />
                        <div class="upload-icon">
                            <a class="cursor-pointer text-decoration-underline"><i class="fas fa-camera text-light"></i></a>
                            <input type="file" class="attack-file" onChange={(e) => uploadFileProfile(e.target.files[0])} />
                        </div>
                    </div>
                </div>
                <div class="card-body px-0">
                    <div class="nav flex-column flex-nowrap nav-pills overflow-auto profile-tabs" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <a class={`nav-link ${(props.activeTab === "profile") ? "active" : ""}`} id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="a" role="tab" aria-controls="v-pills-profile" aria-selected="false" onClick={() => goToLink("")}>{language_contant.Common.myProfile()}</a>
                        {(user_info.user ? user_info.user.user_type : 0) === 2 ?
                            <a class={`nav-link ${(props.activeTab === "bank") ? "active" : ""}`} id="v-pills-bank-tab" data-bs-toggle="pill" data-bs-target="#v-pills-bank" type="a" role="tab" aria-controls="v-pills-bank" aria-selected="false" onClick={() => goToLink("bank")}>Bank</a>
                            : <></>}

                        <div class={`nav-link ${(props.activeTab === "myCourses") ? "active" : ""} accordian-menu d-flex align-items-stretch`} data-bs-toggle="collapse" href="#collapseMyCourses" role="button" aria-expanded="false" aria-controls="collapseMyCourses">
                            <span>{(user_info.user ? user_info.user.user_type : 0) === 1 ? language_contant.Common.myCourses() : "My Students"}</span>
                            <i class="fas fa-sort-down ms-4"></i>
                        </div>
                        <div class={`collapse ${(props.activeTab === "myCourses") ? "show" : ""}`} id="collapseMyCourses">
                            <div class="">
                                {(user_info.user ? user_info.user.user_type : 0) === 1 ?
                                    <a class={`nav-link ${(props.subActiveTab === "pending") ? "active" : ""} ps-5`} id="v-pills-pending-tab" data-bs-toggle="pill" data-bs-target="#v-pills-pending" type="a" role="tab" aria-controls="v-pills-pending" aria-selected="false" onClick={() => goToLink("my-courses/pending")}>
                                        Pending
                                    </a> : (user_info.user ? user_info.user.user_type : 0) === 2 ?
                                        <a class={`nav-link ${(props.subActiveTab === "applications") ? "active" : ""} ps-5`} id="v-pills-applications-tab" data-bs-toggle="pill" data-bs-target="#v-pills-applications" type="a" role="tab" aria-controls="v-pills-applications" aria-selected="false" onClick={() => goToLink("my-courses/applications")}>
                                            Application
                                        </a>
                                        :
                                        <></>
                                }

                                <a class={`nav-link ${(props.subActiveTab === "pending_payment") ? "active" : ""} ps-5`} id="v-pills-pending_payment-tab" data-bs-toggle="pill" data-bs-target="#v-pills-pending_payment" type="a" role="tab" aria-controls="v-pills-pending_payment" aria-selected="false" onClick={() => goToLink("my-courses/pending-payment")}>
                                    Pending Payment
                                </a>
                                <a class={`nav-link ${(props.subActiveTab === "ongoing") ? "active" : ""} ps-5`} id="v-pills-ongoing-tab" data-bs-toggle="pill" data-bs-target="#v-pills-ongoing" type="a" role="tab" aria-controls="v-pills-ongoing" aria-selected="false" onClick={() => goToLink("my-courses/ongoing")}>
                                    Ongoing
                                </a>
                                <a class={`nav-link ${(props.subActiveTab === "completed") ? "active" : ""} ps-5`} id="v-pills-completed-tab" data-bs-toggle="pill" data-bs-target="#v-pills-completed" type="a" role="tab" aria-controls="v-pills-completed" aria-selected="false" onClick={() => goToLink("my-courses/completed")}>
                                    Completed
                                </a>
                                <a class={`nav-link ${(props.subActiveTab === "cancelled") ? "active" : ""} ps-5`} id="v-pills-cancelled-tab" data-bs-toggle="pill" data-bs-target="#v-pills-cancelled" type="a" role="tab" aria-controls="v-pills-cancelled" aria-selected="false" onClick={() => goToLink("my-courses/cancelled")}>
                                    Cancelled
                                </a>
                            </div>
                        </div>

                        {(user_info.user ? user_info.user.user_type : 0) === 2 ?
                            <>
                                <div class={`nav-link ${(props.activeTab === "request_reponse") ? "active" : ""} accordian-menu d-flex align-items-stretch`} data-bs-toggle="collapse" href="#collapseRequestResponses" role="button" aria-expanded="false" aria-controls="collapseRequestResponses">
                                    <span>Request Resposes</span>
                                    <i class="fas fa-sort-down ms-4"></i>
                                </div>
                                <div class={`collapse ${(props.activeTab === "request_reponse") ? "show" : ""}`} id="collapseRequestResponses">
                                    <div class="">
                                        <a class={`nav-link ${(props.subActiveTab === "applied") ? "active" : ""} ps-5`} id="v-pills-applied-tab" data-bs-toggle="pill" data-bs-target="#v-pills-applied" type="a" role="tab" aria-controls="v-pills-applied" aria-selected="false" onClick={() => goToLink("request-responses/applied")}>
                                            Applied
                                        </a>
                                        <a class={`nav-link ${(props.subActiveTab === "accepted") ? "active" : ""} ps-5`} id="v-pills-accepted-tab" data-bs-toggle="pill" data-bs-target="#v-pills-accepted" type="a" role="tab" aria-controls="v-pills-accepted" aria-selected="false" onClick={() => goToLink("request-responses/accepted")}>
                                            Accepted
                                        </a>
                                        <a class={`nav-link ${(props.subActiveTab === "decline") ? "active" : ""} ps-5`} id="v-pills-decline-tab" data-bs-toggle="pill" data-bs-target="#v-pills-decline" type="a" role="tab" aria-controls="v-pills-decline" aria-selected="false" onClick={() => goToLink("request-responses/decline")}>
                                            Decline
                                        </a>
                                    </div>
                                </div>
                            </>
                            : <></>}
                        {(user_info.user ? user_info.user.user_type : 0) === 1 ?
                            <a class={`nav-link ${(props.activeTab === "myRequest") ? "active" : ""}`} id="v-pills-request-tab" data-bs-toggle="pill" data-bs-target="#v-pills-request" type="a" role="tab" aria-controls="v-pills-post" aria-selected="false" onClick={() => goToLink("my-request")}>My Request</a>
                            : (user_info.user ? user_info.user.user_type : 0) === 2 ?
                                <a class={`nav-link ${(props.activeTab === "myPost") ? "active" : ""}`} id="v-pills-post-tab" data-bs-toggle="pill" data-bs-target="#v-pills-post" type="a" role="tab" aria-controls="v-pills-post" aria-selected="false" onClick={() => goToLink("my-post")}>My Post</a>
                                :
                                <></>
                        }
                        <a class={`nav-link ${(props.activeTab === "payment") ? "active" : ""}`} id="v-pills-payment-tab" data-bs-toggle="pill" data-bs-target="#v-pills-payment" type="a" role="tab" aria-controls="v-pills-payment" aria-selected="false" onClick={() => goToLink("payment")}>{language_contant.Common.payment()}</a>
                        <a class={`nav-link ${(props.activeTab === "calendar") ? "active" : ""}`} id="v-pills-calendar-tab" data-bs-toggle="pill" data-bs-target="#v-pills-calendar" type="a" role="tab" aria-controls="v-pills-calendar" aria-selected="false" onClick={() => goToLink("calendar")}>Calendar</a>
                        <a class={`nav-link ${(props.activeTab === "privacyPolicy") ? "active" : ""}`} id="v-pills-privacy-policy-tab" data-bs-toggle="pill" data-bs-target="#v-pills-privacy-policy" type="a" role="tab" aria-controls="v-pills-privacy-policy" aria-selected="false" onClick={() => goToLink("privacy-policy")}>{language_contant.Common.privacyPolicy()}</a>
                        <a class={`nav-link ${(props.activeTab === "changePassword") ? "active" : ""}`} id="v-pills-change-password-tab" data-bs-toggle="pill" data-bs-target="#v-pills-change-password" type="a" role="tab" aria-controls="v-pills-change-password" aria-selected="false" onClick={() => goToLink("change-password")} >{language_contant.Common.changePassword()}</a>
                        <a class={`nav-link ${(props.activeTab === "logOut") ? "active" : ""}`} id="v-pills-log-out-tab" data-bs-toggle="pill" data-bs-target="#v-pills-log-out" type="a" role="tab" aria-controls="v-pills-log-out" aria-selected="false" onClick={() => props.logOut()}>{language_contant.Common.logOut()}</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center my-4">
            <button type="button" class="btn btn-outline-primary py-2 w-100">CREATE TEACHER PROFILE</button>
        </div>
    </div>
}