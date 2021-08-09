import { Container } from "next/app"
import { useRouter } from "next/router"
import { parseCookies } from "nookies"
import Footer from "../../../../../components/layout/footer/Footer"
import Header from "../../../../../components/layout/header/Header"
import StudentAllRequestLayout from "../../../../../components/layout/student/StudentAllRequestLayout"
const StudentRequestPages = props => {
    const router = useRouter()

    return (
        <Container>
            {console.log("TeacherPostWithId props", props)}
            <Header lang={router.query.lang} {...props} />
            <div class="layout-content">
                <StudentAllRequestLayout />

            </div>
            <Footer />

        </Container>
    )
}
StudentRequestPages.getInitialProps = async ctx => {
    return {}
}
export default StudentRequestPages