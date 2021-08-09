import { Container } from "next/app"
import Head from "next/head"
import { useRouter } from "next/router"
import { parseCookies, setCookie } from "nookies"
import Footer from "../../../components/layout/footer/Footer"
import Header from "../../../components/layout/header/Header"
import EditProfileLayout from "../../../components/layout/profile/edit-profile/EditProfileLayout"
import actions from "../../../store/actions"
import agent from "../../../utils/agent"
import language_contant from "../../../utils/language_contant"

const EditProfilePage = props => {
    const router = useRouter()
    language_contant.setLang(router.query.lang)
    const profile_image = props.user_info ? props.user_info.user.profile_image : ""

    return (
        <Container>

            <Head>
                <title>Student : Mana Musu</title>
                <meta name="description" content="This is edit profile page" key="description" />
            </Head>
            <Header lang={router.query.lang} localProfileIcon={profile_image ? `${agent.API_FILE_ROOT_MEDIUM}${profile_image}` : ""}{...props} />
            <div class="layout-content">
                <EditProfileLayout {...props} />
            </div>
            <Footer />

        </Container>
    )
}
EditProfilePage.getInitialProps = async ctx => {
    console.log("EditProfilePage getInitialProps called");

    const userObj = parseCookies(ctx)[actions.GET_USER_INFO]
    const chatBookingId = parseCookies(ctx)[actions.GET_LAST_CHAT_BOOKING_ID]
    const obj = userObj ? JSON.parse(userObj) : { user_info: null };
    if (obj.user_info) {
        agent.setToken(obj.user_info.token)
        const profile = await agent.Profile.get()
        const staticData = await agent.Common.staticData()

        setCookie(ctx, actions.GET_USER_DETAILS, JSON.stringify({ ...profile }), {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
        });
        return {
            ...obj,
            ...profile,
            ...staticData,
            chatBookingId,
        }
    } else {
        return {
            ...obj,
            userDetail: null,
            chatBookingId,
        }
    }
}
export default EditProfilePage