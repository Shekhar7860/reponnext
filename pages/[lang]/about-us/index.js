import Head from 'next/head'
import { Container } from "next/app"
import { useRouter } from "next/router"
import Footer from "../../../components/layout/footer/Footer"
import Header from "../../../components/layout/header/Header"
import language_contant from '../../../utils/language_contant'
import { parseCookies } from 'nookies'
import actions from '../../../store/actions'

const AboutPage = (props) => {
    const router = useRouter()
    language_contant.setLang(router.query.lang)
    return (
        <Container>

            <Head>
                <title>Mana Musu : About Us</title>
                <meta name="description" content="This is about us page" key="description" />
            </Head>
            <Header lang={router.query.lang} {...props} />
            <h1>About us</h1>
            <Footer />

        </Container>
    )
}
AboutPage.getInitialProps = async ctx => {
    const userObj = parseCookies(ctx)[actions.GET_USER_INFO]

    const chatBookingId = parseCookies(ctx)[actions.GET_LAST_CHAT_BOOKING_ID]
    const obj = userObj ? JSON.parse(userObj) : {}
    return {
        ...obj,
        chatBookingId
    }
}
export default AboutPage