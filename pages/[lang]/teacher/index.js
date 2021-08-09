import { parseCookies, setCookie } from "nookies";

import { Container } from "next/app"
import { useRouter } from "next/router"
import { connect } from "react-redux"
import Footer from "../../../components/layout/footer/Footer"
import Header from "../../../components/layout/header/Header"
import Banner from "../../../components/layout/teacher/Banner"
import Teacher from "../../../components/layout/teacher/Teacher"
import actions from "../../../store/actions"
import language_contant from "../../../utils/language_contant"
import agent from "../../../utils/agent";

const TeacherPage = props => {
    const router = useRouter()
    language_contant.setLang(router.query.lang)
    const profile_image = props.user_info ? props.user_info.user.profile_image : ""
    return (
        <Container>

            <Header lang={router.query.lang} localProfileIcon={profile_image ? `${agent.API_FILE_ROOT_MEDIUM}${profile_image}` : ""}{...props} />
            <div class="layout-content">
                <Banner {...props} router={router} langRouter={router.query.lang} />
                <Teacher {...props} router={router} langRouter={router.query.lang} />
            </div>
            <Footer />

        </Container>
    )
}



TeacherPage.getInitialProps = async ctx => {
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
};

const mapStateToProps = state => ({
    ...state.teacherReducer,
    user: state.userReducer
});

// export default connect(mapStateToProps)(Teacher);
export default TeacherPage;