import React, { useState, useEffect } from "react";
import { Container } from "next/app"
import { useRouter } from "next/router"
import Footer from "../../components/layout/footer/Footer"
import Header from "../../components/layout/header/Header"
import Banner from "../../components/layout/home/Banner"
import StudentPost from "../../components/layout/home/StudentPost"
import TeacherPost from "../../components/layout/home/TeacherPost";
import AboutManaMusu from "../../components/layout/home/AboutManaMusu";
import HowItsWorks from "../../components/layout/home/HowItsWorks";
import language_contant from "../../utils/language_contant";
import actions from "../../store/actions";
import { parseCookies } from "nookies";
import agent from "../../utils/agent";

const LanguagePage = (props) => {
    const router = useRouter()
    console.log("checkImgUrl LanguagePage props", props);
    language_contant.setLang(router.query.lang)
    const profile_image = props.user_info ? props.user_info.user.profile_image : ""

    function getDefaultIcon(user_type) {
        if (user_type) {
            return (user_type == 1) ? "/images/student_profile.svg" : "/images/teacher_profile.svg"
        } else {
            return "/images/teacher_profile.svg"
        }
    }
    return (
        <Container>
            <Header lang={router.query.lang} localProfileIcon={profile_image ? `${agent.API_FILE_ROOT_MEDIUM}${profile_image}` : getDefaultIcon(props.user_info ? props.user_info.user.user_type : "1")}{...props} />
            <div class="layout-content">
                <div class="home-page bg-light">
                    <Banner lang={router.query.lang} />
                    <TeacherPost lang={router.query.lang} {...props} />
                    <StudentPost lang={router.query.lang} {...props} />
                    <AboutManaMusu />
                    <HowItsWorks />
                </div>
            </div>
            <Footer />

        </Container>
    )
}

LanguagePage.getInitialProps = async ctx => {
    console.log("ctx", ctx);
    const currency = ctx.query.currency
    const getUserCurrency = parseCookies(ctx)[actions.GET_USER_CURRENCY]
    const chatBookingId = parseCookies(ctx)[actions.GET_LAST_CHAT_BOOKING_ID]
    const userObj = parseCookies(ctx)[actions.GET_USER_INFO]
    const obj = userObj ? JSON.parse(userObj) : { user_info: null };
    const staticData = await agent.Common.staticData()

    if (currency) {
        const StudentFilterByTeacher = await agent.Common.StudentFilterByTeacher(`?page=0&currency=${currency}&`)
        const TeacherFilterByStudent = await agent.Common.TeacherFilterByStudent(`?page=0&currency=${currency}&`)
        return {
            ...obj,
            ...StudentFilterByTeacher,
            ...TeacherFilterByStudent,
            ...staticData,
            chatBookingId: chatBookingId,
        }
    } else {
        if (getUserCurrency) {
            const StudentFilterByTeacher = await agent.Common.StudentFilterByTeacher(`?page=0&currency=${getUserCurrency}&`)
            const TeacherFilterByStudent = await agent.Common.TeacherFilterByStudent(`?page=0&currency=${getUserCurrency}&`)
            return {
                ...obj,
                ...StudentFilterByTeacher,
                ...TeacherFilterByStudent,
                ...staticData,
                chatBookingId: chatBookingId,
            }
        } else {
            return {
                ...obj,
                ...staticData,
                chatBookingId: chatBookingId,
            }
        }
    }

};
export default LanguagePage