import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import language_contant from '../../../utils/language_contant';
import actions from '../../../store/actions';

import styles from './Header.module.scss';
import { setCookie } from 'nookies';
import { defaultCurrency } from '../../../utils/constant_value';
import { capitalizeFirstLetter } from '../../../utils/validation_contant';

const languages = [
    {
        code: "en",
        name: "English",
    },
    {
        code: "jp",
        name: "日本語",
    },
];
export default (props) => {

    const router = useRouter()
    const [currency, setCurrency] = useState("")
    language_contant.setLang(router.query.lang)

    console.log("header props", props);


    function gotoLink(lang, where) {
        router.push(`/${lang}/${where}`)
    }
    function gotoOtherLanguage(lang) {
        language_contant.setLang(lang)

        const rootArr = router.asPath.split("/")
        let path = ""
        rootArr.forEach((element, index) => {
            if (index === 1) {
                path += `/${lang}`
            } else {
                if (element) {
                    path += `/${element}`
                }
            }
        });
        console.log("rootArr", rootArr, "path", path);
        router.push(path)


    }
    function getActiveLink(path) {
        const url = router.asPath.split("/")
        if (url.length >= 3) {
            return (url[2].toLocaleLowerCase() === path) ? styles.activeLink : styles.link
        }
        return styles.link
    }
    // console.log("router", router, getActiveLink());
    function logOut() {
        setCookie(this, actions.GET_USER_INFO, JSON.stringify({ user_info: null }), {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
        });
        router.push("/")
    }

    function getDefaultIcon(user_type) {
        console.log("getDefaultIcon called", user_type);
        if (user_type) {
            return (user_type === 1) ? "/images/student_profile.svg" : "/images/teacher_profile.svg"
        } else {
            return "/images/student_profile.svg"
        }
    }
    function setCurrencyInLocal(value) {
        localStorage.setItem("currency", value)
        setCurrency(value)
        setCookie(this, actions.GET_USER_CURRENCY, value, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
        });
    }
    useEffect(() => {
        if (window) {
            if (currency !== window.localStorage.getItem("currency")) {
                setCurrency(window.localStorage.getItem("currency"))
            }
        }
    })
    return (< header className={styles.header}>
        <div className="container">
            <nav className="navbar navbar-expand-xl navbar-light py-3">
                <div className="container-fluid px-0">
                    {/* <Link href={`/${props.lang}`} className="navbar-brand">ManaMusu</Link> */}
                    <a className="navbar-brand" onClick={() => { router.push(`/${props.lang}`) }}>
                        <img id="websiteLogo" src="/images/logo.svg" alt="logo not found" />
                    </a>
                    <i className="fas fa-bars navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"></i>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mt-2 mt-xl-0 align-items-xl-center">
                            <li className="nav-item">
                                {/* <NavLink to="/about-us" className="nav-link">About Us</NavLink> */}
                                <a className={getActiveLink("about-us")} href="#forScrollAbout">{language_contant.Common.aboutUs()}</a>
                            </li>
                            <li className="nav-item">
                                {/* <NavLink to="/how-to-use" className="nav-link">How to Use</NavLink> */}
                                <a className={getActiveLink("how-to-use")} href="#forHowToUse">{language_contant.Common.howToUse()}</a>
                            </li>
                            <li className="nav-item">
                                {/* <NavLink to="/teacher" className="nav-link">Teacher</NavLink> */}
                                <a className={getActiveLink("teacher")} onClick={() => { gotoLink(props.lang, "teacher") }}>{language_contant.Common.teacher()}</a>
                            </li>
                            <li className="nav-item">
                                {/* <NavLink to="/student" className="nav-link">Student</NavLink> */}
                                <a className={getActiveLink("student")} onClick={() => { gotoLink(props.lang, "student") }}>{language_contant.Common.student()}</a>
                            </li>
                            <li className="nav-item">
                                {/* <NavLink to="/contact" className="nav-link">Contact</NavLink> */}
                                <a className={getActiveLink("contact")} onClick={() => { gotoLink(props.lang, "contact") }}>{language_contant.Common.contact()}</a>
                            </li>
                            <li className="nav-item">
                                <div className={`d-flex align-items-center pe-0 ${styles.link}`}>
                                    <i className="fas fa-globe"></i>
                                    <select className={`form-select border-0 bg-transparent ${styles.languageChanger}`} onChange={(e) => { gotoOtherLanguage(e.target.value); localStorage.setItem("lang", e.target.value) }} value={props.lang}>
                                        {languages.map((item, index) => {
                                            return <option key={index} value={item.code} className="content">{item.name}</option>
                                        })}
                                    </select>
                                </div>
                            </li>
                            <li className="py-0 nav-item">
                                <div className={`d-flex align-items-center pe-0 ${styles.link}`}>
                                    <select className={`form-select border-0 bg-transparent ${styles.languageChanger}`} onChange={(e) => { setCurrencyInLocal(e.target.value) }} value={currency}>
                                        {defaultCurrency.map((item, index) => {
                                            return <option key={index} value={item.value} className="content">{item.name}</option>
                                        })}
                                    </select>
                                </div>
                            </li>
                            {props.user_info ?
                                <li className="nav-item" onClick={() => { gotoLink(props.lang, `chat`) }}>
                                    <div className={`d-flex align-items-center ${styles.link}`}>
                                        <i className="fas fa-comment me-2"></i>chat
                                    </div>
                                </li> : <></>}
                            {props.user_info ? <li className="nav-item">
                                <div className="btn-group">
                                    <div className={`d-flex align-items-center py-0 ${styles.link}`} data-bs-toggle="dropdown" aria-expanded="false">
                                        <div className="flex-shrink-0 me-2">
                                            <img className={`${styles.profile}`} src={props.localProfileIcon ? props.localProfileIcon : getDefaultIcon(props.user_info ? props.user_info.user.user_type : "")} alt="Icon not found" />
                                            {/* <div class="profile-icon">
                                                <img class="w-100" src="/images/student_icon.svg" />
                                            </div>
                                            <div class="profile-icon">
                                                <img class="w-100" src="/images/teacher_icon.svg" />
                                            </div> */}
                                        </div>
                                        {/* <div className="flex-grow-1">
                                            <a>{String(props.userDetail ? props.userDetail.first_name : "").toLocaleUpperCase()}</a>
                                        </div> */}
                                    </div>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li onClick={() => { gotoLink(props.lang, "profile") }}><button className="dropdown-item" type="button">{props.user_info ? `${capitalizeFirstLetter(props.user_info.user.first_name)} ${capitalizeFirstLetter(props.user_info.user.last_name)}` : "My Profile"}</button></li>
                                        <li onClick={() => { gotoLink(props.lang, "profile/my-courses/ongoing") }}><button className="dropdown-item" type="button">{(props.user_info ? props.user_info.user.user_type : 0) === 1 ? "My Courses" : "My Students"}</button></li>
                                        {(props.user_info ? props.user_info.user.user_type : 0) === 1 ?
                                            <li onClick={() => { gotoLink(props.lang, "profile/my-request") }}><button className="dropdown-item" type="button">My Requests</button></li>
                                            : <li onClick={() => { gotoLink(props.lang, "profile/my-post") }}><button className="dropdown-item" type="button">My Post</button></li>
                                        }
                                        <li onClick={() => { gotoLink(props.lang, "profile/payment") }}><button className="dropdown-item" type="button">Payment</button></li>
                                        <li onClick={() => { gotoLink(props.lang, "profile/privacy-policy") }}><button className="dropdown-item" type="button">Privacy Policy</button></li>
                                        <li onClick={() => { gotoLink(props.lang, "profile/calendar") }}><button className="dropdown-item" type="button">Calendar</button></li>
                                        <li onClick={() => { gotoLink(props.lang, "profile/change-password") }}><button className="dropdown-item" type="button">Change Password</button></li>
                                        <li onClick={() => logOut()}><button className="dropdown-item" type="button">Log Out</button></li>
                                    </ul>
                                </div>
                            </li> : <>
                                <li className="nav-item">
                                    {/* <NavLink to="/sign-in" className="nav-link">Sign In</NavLink> */}
                                    <a className={getActiveLink("sign-in")} onClick={() => { gotoLink(props.lang, "sign-in") }}>{language_contant.Common.signIn()}</a>
                                </li>
                                <li className="nav-item">
                                    <a className={`d-inline-block pe-0 ${styles.link}`}>
                                        {/* <NavLink to="/sign-up" className="btn btn-primary btn-round px-3 py-1">Sign Up</NavLink> */}
                                        <button type="button" className="btn btn-primary btn-round px-4 py-1" onClick={() => { gotoLink(props.lang, "sign-up") }}>{language_contant.Common.signUp()}</button>
                                    </a>
                                </li>
                            </>}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    </header >
    )
}