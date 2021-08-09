import { Container } from "next/app"
import { useRouter } from "next/router"
import { parseCookies } from "nookies"
import Footer from "../../../../components/layout/footer/Footer"
import Header from "../../../../components/layout/header/Header"
import TeacherProfileLayout from "../../../../components/layout/teacher/TeacherProfileLayout"
import actions from "../../../../store/actions"
import agent from "../../../../utils/agent"

const TeacherIdPage = props => {
    console.log("TeacherIdPage props", props);
    const router = useRouter()

    const profile_image = props.user_info ? props.user_info.user ? props.user_info.user.profile_image : "" : ""
    return (
        <Container>
            <Header lang={router.query.lang} localProfileIcon={profile_image ? `${agent.API_FILE_ROOT_MEDIUM}${profile_image}` : ""}{...props} />
            <div class="layout-content">
                <TeacherProfileLayout router={router} {...props} />
            </div>
            <Footer />

        </Container>
    )
}
TeacherIdPage.getInitialProps = async ctx => {
    const teacherId = ctx.query.teacher_id

    const userObj = parseCookies(ctx)[actions.GET_USER_INFO]
    const chatBookingId = parseCookies(ctx)[actions.GET_LAST_CHAT_BOOKING_ID]
    const obj = userObj ? JSON.parse(userObj) : {}
    const staticData = await agent.Common.staticData()
    if (teacherId) {
        const profile = await agent.Teacher.getProfileById(teacherId)
        return {
            ...obj,
            ...staticData,
            ...profile,
            chatBookingId,
        }
    } else {

        return {
            ...obj,
            ...staticData,
            chatBookingId,
        }
    }
};
export default TeacherIdPage