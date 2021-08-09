import { Container } from "next/app"
import Head from "next/head"
import { useRouter } from "next/router"
import { parseCookies } from "nookies"
import { useEffect } from "react"
import CreatePost from "../../../components/layout/create-post/CreatePost"
import Footer from "../../../components/layout/footer/Footer"
import Header from "../../../components/layout/header/Header"
import actions from "../../../store/actions"
import agent from "../../../utils/agent"
import language_contant from "../../../utils/language_contant"

const CreatePostPage = props => {
    const router = useRouter()

    language_contant.setLang(router.query.lang)
    console.log("CreatePostPage props", props);
    const profile_image = props.user_info ? props.user_info.user.profile_image : ""

    useEffect(() => {
        { props.user_info ? props.user_info.user ? (props.user_info.user.user_type === 2) ? "" : router.push(`/${router.query.lang}/profile`) : "" : router.push(`/${router.query.lang}/sign-in`) }

    })
    return (
        <Container>
            <Head>
                <title>How to use : Mana Musu</title>
                <meta name="description" content="This is Create Post page" key="description" />
            </Head>

            <Header lang={router.query.lang} localProfileIcon={profile_image ? `${agent.API_FILE_ROOT_MEDIUM}${profile_image}` : ""}{...props} />
            <div class="layout-content">
                <CreatePost router={router} {...props} />
            </div>
            <Footer />

        </Container>
    )

}
CreatePostPage.getInitialProps = async ctx => {
    console.log("CreatePostPage getInitialProps called");

    const userInfoObj = parseCookies(ctx)[actions.GET_USER_INFO]
    const userDetailsObj = parseCookies(ctx)[actions.GET_USER_DETAILS]
    const chatBookingId = parseCookies(ctx)[actions.GET_LAST_CHAT_BOOKING_ID]
    const userInfoJson = userInfoObj ? JSON.parse(userInfoObj) : { user_info: null };
    const userDetailsJson = userDetailsObj ? JSON.parse(userDetailsObj) : { user_details: null };
    const staticData = await agent.Common.staticData()
    if (userInfoJson.user_info) {
        agent.setToken(userInfoJson.user_info.token)
        const liveProfile = await agent.Profile.get()
        return {
            ...userInfoJson,
            ...userDetailsJson,
            ...staticData,
            chatBookingId,
            liveProfile: liveProfile.userDetail,
        }
    } else {
        return {
            ...userInfoJson,
            ...staticData,
            userDetail: null,
            chatBookingId,
        }
    }
}
export default CreatePostPage