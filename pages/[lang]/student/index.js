import { Container } from "next/app"
import Head from "next/head"
import { useRouter } from "next/router"
import { parseCookies } from "nookies"
import Footer from "../../../components/layout/footer/Footer"
import Header from "../../../components/layout/header/Header"
import Student from "../../../components/layout/student/Student"
import actions from "../../../store/actions"
import agent from "../../../utils/agent"
import language_contant from "../../../utils/language_contant"

const StudentPage = props => {
    const router = useRouter()
    language_contant.setLang(router.query.lang)
    const profile_image = props.user_info ? props.user_info.user.profile_image : ""

    return (
        <Container>

            <Head>
                <title>Student : Mana Musu</title>
                <meta name="description" content="This is student page" key="description" />
            </Head>
            <Header lang={router.query.lang} localProfileIcon={profile_image ? `${agent.API_FILE_ROOT_MEDIUM}${profile_image}` : ""}{...props} />
            <div class="layout-content">
                <Student {...props} router={router} langRouter={router.query.lang} />
            </div>
            <Footer />

        </Container>
    )
}
StudentPage.getInitialProps = async ctx => {
    const userObj = parseCookies(ctx)[actions.GET_USER_INFO]
    const currency = parseCookies(ctx)[actions.GET_USER_CURRENCY]
    const chatBookingId = parseCookies(ctx)[actions.GET_LAST_CHAT_BOOKING_ID]
    const obj = userObj ? JSON.parse(userObj) : {}

    const staticData = await agent.Common.staticData()
    return {
        ...obj,
        ...staticData,
        currency,
        chatBookingId,
        genderAPI: [{ name: "male" }, { name: "female" }],
        paymentAPI: [{ name: "Cash" }, { name: "Card" }],

    }
}
export default StudentPage