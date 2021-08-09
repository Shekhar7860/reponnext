import { Container } from "next/app"
import { useRouter } from "next/router"
import { parseCookies } from "nookies"
import Footer from "../../../../../components/layout/footer/Footer"
import Header from "../../../../../components/layout/header/Header"
import actions from "../../../../../store/actions"
import agent from "../../../../../utils/agent"
import StudentCoursePendingPaymentDetails from "../../../../../components/layout/student-course/StudentCoursePendingPaymentDetails"
import TeacherCoursePendingPaymentDetails from "../../../../../components/layout/teacher/TeacherCoursePendingPaymentDetails"
const MyCourseTeacherRequest = props => {
    console.log("MyCourseTeacherRequest props");
    const router = useRouter()
    const profile_image = props.user_info ? props.user_info.user.profile_image : ""

    return (
        <Container>
            {console.log("MyCourseTeacherRequest props", props)}
            <Header lang={router.query.lang} localProfileIcon={profile_image ? `${agent.API_FILE_ROOT_MEDIUM}${profile_image}` : ""}{...props} />
            <div class="layout-content">
                {(props.user_info ? props.user_info.user.user_type : 0) === 1 ?
                    <StudentCoursePendingPaymentDetails router={router} {...props} />
                    :
                    <TeacherCoursePendingPaymentDetails router={router} {...props} />
                }
            </div>
            <Footer />

        </Container>
    )
}
MyCourseTeacherRequest.getInitialProps = async ctx => {

    const lang = ctx.query.lang
    const course_id = ctx.query.course_id
    console.log("MyCourseTeacherRequest getInitialProps", ctx, lang, course_id);


    const userObj = parseCookies(ctx)[actions.GET_USER_INFO]
    const chatBookingId = parseCookies(ctx)[actions.GET_LAST_CHAT_BOOKING_ID]
    const obj = userObj ? JSON.parse(userObj) : { user_info: null };
    const staticData = await agent.Common.staticData()
    if (obj.user_info) {
        agent.setToken(obj.user_info.token)
        const courseId = await agent.Teacher.getBookingDetails(course_id)
        return {
            ...obj,
            ...staticData,
            ...courseId,
            chatBookingId,
            query: { ...ctx.query }
        }
    } else {
        return {
            ...obj,
            ...staticData,
            chatBookingId,
        }
    }
}
export default MyCourseTeacherRequest
