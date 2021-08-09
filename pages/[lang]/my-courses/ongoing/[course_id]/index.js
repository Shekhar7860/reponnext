import { Container } from "next/app"
import { useRouter } from "next/router"
import { parseCookies } from "nookies"
import Footer from "../../../../../components/layout/footer/Footer"
import Header from "../../../../../components/layout/header/Header"
import actions from "../../../../../store/actions"
import StudentCourseOnGoingDetails from "../../../../../components/layout/student-course/StudentCourseOnGoingDetails"
import TeacherCourseOnGoingDetails from "../../../../../components/layout/teacher/TeacherCourseOnGoingDetails"
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
                {(props.user_info ? props.user_info.user.user_type : 0) === 1 ?
                    <StudentCourseOnGoingDetails router={router} {...props} />
                    :
                    <TeacherCourseOnGoingDetails router={router} {...props} />
                }

            </div>
            <Footer />

        </Container>
    )
}
MyCourseOnGoingWithId.getInitialProps = async ctx => {

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
