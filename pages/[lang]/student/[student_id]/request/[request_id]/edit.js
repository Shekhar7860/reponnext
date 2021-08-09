import { Container } from "next/app"
import { useRouter } from "next/router"
import { parseCookies } from "nookies"
import Head from 'next/head'
import Footer from "../../../../../../components/layout/footer/Footer"
import Header from "../../../../../../components/layout/header/Header"
import actions from "../../../../../../store/actions"
import StudentEditRequest from "../../../../../../components/layout/student/StudentEditRequest"
import { useState } from "react"
import agent from "../../../../../../utils/agent"

const StudentRequestWithId = props => {
    console.log("StudentRequestWithId props");
    const router = useRouter()

    const title = props.requestDetail ? props.requestDetail.title : "Post title"
    const description = props.requestDetail ? props.requestDetail.description : "Post description"
    const profile_image = props.user_info ? props.user_info.user.profile_image : ""

    return (
        <Container>
            {console.log("StudentRequestWithId props", props)}

            <Head>
                <title>{title} : Mana Musu</title>
                <meta name="description" content={description} key="description" />
            </Head>
            <Header lang={router.query.lang} localProfileIcon={profile_image ? `${agent.API_FILE_ROOT_MEDIUM}${profile_image}` : ""}{...props} />
            <div class="layout-content">

                <StudentEditRequest router={router} {...props} />

            </div>
            <Footer />

        </Container>
    )
}
StudentRequestWithId.getInitialProps = async ctx => {

    const lang = ctx.query.lang
    const request_id = ctx.query.request_id
    const teacher_id = ctx.query.teacher_id
    console.log("StudentRequestWithId getInitialProps", ctx, lang, request_id, teacher_id);


    const userObj = parseCookies(ctx)[actions.GET_USER_INFO]
    const currency = parseCookies(ctx)[actions.GET_USER_CURRENCY]
    const chatBookingId = parseCookies(ctx)[actions.GET_LAST_CHAT_BOOKING_ID]
    const obj = userObj ? JSON.parse(userObj) : { user_info: null };
    const staticData = await agent.Common.staticData()
    if (obj.user_info && currency) {
        agent.setToken(obj.user_info.token)
        const request_info = await agent.Auth.getRequestById(request_id, currency)
        return {
            ...obj,
            ...staticData,
            ...request_info,
            chatBookingId,
        }
    } else {
        return {
            ...obj,
            ...staticData,
            chatBookingId,
        }
    }
}
export default StudentRequestWithId
