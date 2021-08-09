import { Container } from "next/app"
import { useRouter } from "next/router"
import { parseCookies } from "nookies"
import Head from 'next/head'
import Footer from "../../../../components/layout/footer/Footer"
import Header from "../../../../components/layout/header/Header"
import actions from "../../../../store/actions"
import PostDetails from "../../../../components/layout/post-details/PostDetails"
import agent from "../../../../utils/agent"
import StudentBookingDetailsByTeacher from "../../../../components/layout/teacher/StudentBookingDetailsByTeacher"

const TeacherPostWithBookingId = props => {
    console.log("TeacherPostWithBookingId props", props);

    const router = useRouter()

    const title = props.postDetail ? props.postDetail.title : "Post title"
    const description = props.postDetail ? props.postDetail.description : "Post description"
    const profile_image = props.user_info ? props.user_info.user.profile_image : ""

    return (
        <Container>
            {console.log("TeacherPostWithBookingId props", props)}

            <Head>
                <title>{title} : Mana Musu</title>
                <meta name="description" content={description} key="description" />
            </Head>
            <Header lang={router.query.lang} localProfileIcon={profile_image ? `${agent.API_FILE_ROOT_MEDIUM}${profile_image}` : ""}{...props} />
            <div class="layout-content">
                {(props.user_info ? props.user_info.user.user_type : 0) === 1 ?
                    <PostDetails router={router} {...props} />
                    :
                    <StudentBookingDetailsByTeacher router={router} {...props} />
                }
            </div>
            <Footer />

        </Container>
    )
}
TeacherPostWithBookingId.getInitialProps = async ctx => {

    const lang = ctx.query.lang
    const booking_id = ctx.query.booking_id

    const userObj = parseCookies(ctx)[actions.GET_USER_INFO]
    const currency = parseCookies(ctx)[actions.GET_USER_CURRENCY]
    const chatBookingId = parseCookies(ctx)[actions.GET_LAST_CHAT_BOOKING_ID]
    const obj = userObj ? JSON.parse(userObj) : { user_info: null };
    const staticData = await agent.Common.staticData()

    if (obj.user_info) {
        agent.setToken(obj.user_info.token)
        if (obj.user_info.user) {

            if (obj.user_info.user.user_type === 1 && currency) {
                try {
                    const getBookingDetails = await agent.Student.getBookingDetailsByBookingId(booking_id)
                    const post_info = await agent.Auth.getPostById(getBookingDetails.booking_detail.post_id, currency)

                    return {
                        ...obj,
                        ...post_info,
                        ...staticData,
                        ...getBookingDetails,
                        chatBookingId,
                    }
                } catch (error) {
                    return {
                        ...obj,
                        ...staticData,
                        booking_detail: null,
                        timeSlots: [],
                        chatBookingId,
                    }
                }

            } else {
                const getBookingDetails = await agent.Teacher.getBookingDetails(booking_id)

                return {
                    ...obj,
                    ...staticData,
                    ...getBookingDetails,
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
export default TeacherPostWithBookingId
