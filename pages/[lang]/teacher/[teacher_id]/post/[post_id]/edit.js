import { Container } from "next/app"
import { useRouter } from "next/router"
import { parseCookies } from "nookies"
import Head from 'next/head'
import Footer from "../../../../../../components/layout/footer/Footer"
import Header from "../../../../../../components/layout/header/Header"
import actions from "../../../../../../store/actions"
import TeacherEditPost from "../../../../../../components/layout/teacher/TeacherEditPost"
import agent from "../../../../../../utils/agent"

const TeacherPostWithId = props => {
    console.log("TeacherPostWithId props");

    const router = useRouter()

    const title = props.postDetail ? props.postDetail.title : "Post title"
    const description = props.postDetail ? props.postDetail.description : "Post description"
    const profile_image = props.user_info ? props.user_info.user.profile_image : ""

    return (
        <Container>
            {console.log("TeacherPostWithId props", props)}

            <Head>
                <title>{title} : Mana Musu</title>
                <meta name="description" content={description} key="description" />
            </Head>
            <Header lang={router.query.lang} localProfileIcon={profile_image ? `${agent.API_FILE_ROOT_MEDIUM}${profile_image}` : ""}{...props} />
            <div class="layout-content">
                <TeacherEditPost {...props} router={router} langRouter={router.query.lang} />
            </div>
            <Footer />

        </Container>
    )
}
TeacherPostWithId.getInitialProps = async ctx => {

    const lang = ctx.query.lang
    const post_id = ctx.query.post_id
    const teacher_id = ctx.query.teacher_id
    console.log("TeacherPostWithId getInitialProps", ctx, lang, post_id, teacher_id);

    const userObj = parseCookies(ctx)[actions.GET_USER_INFO]
    const currency = parseCookies(ctx)[actions.GET_USER_CURRENCY]
    const chatBookingId = parseCookies(ctx)[actions.GET_LAST_CHAT_BOOKING_ID]
    const obj = userObj ? JSON.parse(userObj) : { user_info: null };
    const staticData = await agent.Common.staticData()
    if (obj.user_info && currency) {
        agent.setToken(obj.user_info.token)
        const post_info = await agent.Auth.getPostById(post_id, currency)

        return {
            ...obj,
            ...post_info,
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
export default TeacherPostWithId
