import { Container } from "next/app"
import Link from "next/link"
import Head from 'next/head'

import { useRouter } from "next/router"
import Header from "../../../components/layout/header/Header"
import Footer from "../../../components/layout/footer/Footer"
import ContactLayout from "../../../components/layout/contact/ContactLayout"
import language_contant from "../../../utils/language_contant"
import actions from "../../../store/actions"
import { parseCookies } from "nookies"
import agent from "../../../utils/agent"

const ContactPage = (props) => {
    const router = useRouter()
    language_contant.setLang(router.query.lang)
    const profile_image = props.user_info ? props.user_info.user.profile_image : ""

    return (
        <Container>

            <Head>
                <title>Contact Us : Mana Musu</title>
                <meta name="description" content="This is contact us page" key="description" />
            </Head>
            <Header lang={router.query.lang} localProfileIcon={profile_image ? `${agent.API_FILE_ROOT_MEDIUM}${profile_image}` : ""}{...props} />
            <div class="layout-content">
                <ContactLayout router={router} {...props} />
            </div>
            <Footer />

        </Container>
    )
}

ContactPage.getInitialProps = async ctx => {
    const userObj = parseCookies(ctx)[actions.GET_USER_INFO]
    const chatBookingId = parseCookies(ctx)[actions.GET_LAST_CHAT_BOOKING_ID]
    const obj = userObj ? JSON.parse(userObj) : {}
    return {
        ...obj,
        chatBookingId,
    }
}
export default ContactPage