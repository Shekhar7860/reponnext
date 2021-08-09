
import { Container } from "next/app"
import { useRouter } from "next/router"
import { parseCookies } from "nookies"
import Head from 'next/head'
import Footer from "../../../../../../components/layout/footer/Footer"
import Header from "../../../../../../components/layout/header/Header"
import actions from "../../../../../../store/actions"
import PostDetails from "../../../../../../components/layout/post-details/PostDetails"
import { useState } from "react"
import agent from "../../../../../../utils/agent"

const TeacherPostWithId = props => {
    console.log("TeacherPostWithId props");

    const router = useRouter()

    const title = props.postDetail ? props.postDetail.title : "Post title"
    const description = props.postDetail ? props.postDetail.description : "Post description"
    const profile_image = props.user_info ? props.user_info.user.profile_image : ""

    return (
        <Container>
            {console.log("TeacherPostWithId props", props)}

            <Head>
                <title>{title} : Mana Musu</title>
                <meta name="description" content={description} key="description" />
            </Head>
            <Header lang={router.query.lang} localProfileIcon={profile_image ? `${agent.API_FILE_ROOT_MEDIUM}${profile_image}` : ""}{...props} />
            <div class="layout-content">
                <PostDetails router={router} {...props} />
            </div>
            <Footer />

        </Container>
    )
}
TeacherPostWithId.getInitialProps = async ctx => {

    const lang = ctx.query.lang
    const post_id = ctx.query.post_id
    const teacher_id = ctx.query.teacher_id
    console.log("TeacherPostWithId getInitialProps", ctx, lang, post_id, teacher_id);

    const currency = parseCookies(ctx)[actions.GET_USER_CURRENCY]
    const userObj = parseCookies(ctx)[actions.GET_USER_INFO]
    const chatBookingId = parseCookies(ctx)[actions.GET_LAST_CHAT_BOOKING_ID]
    const obj = userObj ? JSON.parse(userObj) : { user_info: null };
    const staticData = await agent.Common.staticData()
    if (currency) {
        const post_info = await agent.Auth.getPostById(post_id, currency)

        if (obj.user_info) {
            agent.setToken(obj.user_info.token)
            if (obj.user_info.user.user_type === 1) {
                try {
                    const bookingDetail = await agent.Student.getBookingDetailsByPostId(post_id)
                    return {
                        ...obj,
                        ...post_info,
                        ...staticData,
                        ...bookingDetail,
                        chatBookingId,
                    }
                } catch (error) {
                    return {
                        ...obj,
                        ...post_info,
                        ...staticData,
                        booking_detail: null,
                        timeSlots: [],
                        chatBookingId,
                    }
                }

            } else {
                return {
                    ...obj,
                    ...post_info,
                    ...staticData,
                    booking_detail: null,
                    timeSlots: [],
                    chatBookingId,
                }
            }

        } else {
            return {
                ...obj,
                ...post_info,
                ...staticData,
                booking_detail: null,
                timeSlots: [],
                chatBookingId,
            }
        }
    } else {

        return {
            ...obj,
            ...staticData,
            booking_detail: null,
            timeSlots: [],
            chatBookingId,
        }
    }

}
export default TeacherPostWithId
