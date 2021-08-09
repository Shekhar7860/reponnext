import { Container } from "next/app"
import { useRouter } from "next/router"
import { parseCookies } from "nookies"
import Footer from "../../../../../components/layout/footer/Footer"
import Header from "../../../../../components/layout/header/Header"
import actions from "../../../../../store/actions"
import StudentCoursePendingDetails from "../../../../../components/layout/student-course/StudentCoursePendingDetails"
import agent from "../../../../../utils/agent"

const MyCourseOnGoingWithId = props => {
    console.log("MyCourseOnGoingWithId props");
    const router = useRouter()
    const profile_image = props.user_info ? props.user_info.user.profile_image : ""

    return (
        <Container>
            {console.log("MyCourseOnGoingWithId props", props)}
            <Header lang={router.query.lang} localProfileIcon={profile_image ? `${agent.API_FILE_ROOT_MEDIUM}${profile_image}` : ""}{...props} />
            <div class="layout-content">

                <StudentCoursePendingDetails router={router} {...props} />

            </div>
            <Footer />

        </Container>
    )
}
MyCourseOnGoingWithId.getInitialProps = async ctx => {

    const lang = ctx.query.lang
    const post_id = ctx.query.post_id
    const teacher_id = ctx.query.teacher_id
    console.log("MyCourseOnGoingWithId getInitialProps", ctx, lang, post_id, teacher_id);


    const userObj = parseCookies(ctx)[actions.GET_USER_INFO]
    const chatBookingId = parseCookies(ctx)[actions.GET_LAST_CHAT_BOOKING_ID]
    const obj = userObj ? JSON.parse(userObj) : { user_info: null };
    const staticData = await agent.Common.staticData()
    if (obj.user_info) {
        agent.setToken(obj.user_info.token)
        return {
            ...obj,
            ...staticData,
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
export default MyCourseOnGoingWithId
