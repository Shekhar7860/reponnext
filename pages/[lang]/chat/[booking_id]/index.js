import { Container } from "next/app"
import Head from 'next/head'
import { useRouter } from "next/router"
import Header from "../../../../components/layout/header/Header"
// import Footer from "../../../../components/layout/footer/Footer"
import ChatLayout from "../../../../components/layout/chat/ChatLayout"
import language_contant from "../../../../utils/language_contant"
import actions from "../../../../store/actions"
import { parseCookies, setCookie } from "nookies"
import agent from "../../../../utils/agent"
import TeacherChatLayout from "../../../../components/layout/teacher/TeacherChatLayout"
import StudentChatLayout from "../../../../components/layout/student/StudentChatLayout"

const ChatLayoutPage = (props) => {
    console.log("ChatLayoutPage props", props);
    const router = useRouter()
    language_contant.setLang(router.query.lang)
    const profile_image = props.user_info ? props.user_info.user.profile_image : ""

    return (
        <Container>
            <Head>
                <title>Chat : Mana Musu</title>
                <meta name="description" content="This is chat page" key="description" />
            </Head>
            <Header lang={router.query.lang} localProfileIcon={profile_image ? `${agent.API_FILE_ROOT_MEDIUM}${profile_image}` : ""}{...props} />
            <div className="layout-content">
                {(props.user_info) ?
                    (props.user_info.user.user_type === 1) ?
                        <StudentChatLayout router={router} {...props} />
                        :
                        <TeacherChatLayout router={router} {...props} />
                    : <ChatLayout router={router} {...props} />
                }

            </div>
            {/* <Footer /> */}

        </Container>
    )
}

ChatLayoutPage.getInitialProps = async ctx => {
    const userObj = parseCookies(ctx)[actions.GET_USER_INFO]
    const chatBookingId = parseCookies(ctx)[actions.GET_LAST_CHAT_BOOKING_ID]
    const obj = userObj ? JSON.parse(userObj) : {}
    const staticData = await agent.Common.staticData()
    if (obj.user_info) {
        agent.setToken(obj.user_info.token)
        try {
            let profile = await agent.Profile.get()

            setCookie(ctx, actions.GET_USER_DETAILS, JSON.stringify({ ...profile }), {
                maxAge: 30 * 24 * 60 * 60,
                path: "/",
            });

            return {
                ...obj,
                ...profile,
                ...staticData,
                chatBookingId,
                event: [
                    {
                        start: new Date("2021, 06, 07"),
                        end: new Date("2021, 06, 10"),
                        title: "Some title"
                    }, {
                        start: new Date("2021, 06, 27"),
                        end: new Date("2021, 06, 29"),
                        title: "Some title 2"
                    },
                ],
            }
        } catch (error) {
            setCookie(this, actions.GET_USER_INFO, JSON.stringify({ user_info: null }), {
                maxAge: 30 * 24 * 60 * 60,
                path: "/",
            });
            return {
                ...obj,
                ...staticData,
                user_info: null,
                chatBookingId,
                event: [
                    {
                        start: new Date("2021, 06, 07"),
                        end: new Date("2021, 06, 10"),
                        title: "Some title"
                    }, {
                        start: new Date("2021, 06, 27"),
                        end: new Date("2021, 06, 29"),
                        title: "Some title 2"
                    },
                ],
            }
        }
    } else {
        return {
            ...obj,
            ...staticData,
            userDetail: null,
            user_info: null,
            event: [],
            chatBookingId,
        }
    }
}
export default ChatLayoutPage

