import { Container } from "next/app"
import Link from "next/link"
import { useRouter } from "next/router"
import { parseCookies } from "nookies"
import Footer from "../../../../components/layout/footer/Footer"
import Header from "../../../../components/layout/header/Header"
import StudentProfileLayout from "../../../../components/layout/student/StudentProfileLayout"
import actions from "../../../../store/actions"
import agent from "../../../../utils/agent"

const StudentIdPage = props => {
    console.log("StudentIdPage props", props);
    const router = useRouter()
    const profile_image = props.user_info ? props.user_info.user ? props.user_info.user.profile_image : "" : ""
    return (
        <Container>
            <Header lang={router.query.lang} localProfileIcon={profile_image ? `${agent.API_FILE_ROOT_MEDIUM}${profile_image}` : ""}{...props} />
            <div class="layout-content">
                <StudentProfileLayout router={router} {...props} />
            </div>
            <Footer />

        </Container>
    )
}
StudentIdPage.getInitialProps = async ctx => {
    const studentId = ctx.query.student_id
    const userObj = parseCookies(ctx)[actions.GET_USER_INFO]
    const chatBookingId = parseCookies(ctx)[actions.GET_LAST_CHAT_BOOKING_ID]
    const obj = userObj ? JSON.parse(userObj) : {}
    const staticData = await agent.Common.staticData()
    if (studentId) {
        const profile = await agent.Student.getProfileById(studentId)
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
export default StudentIdPage