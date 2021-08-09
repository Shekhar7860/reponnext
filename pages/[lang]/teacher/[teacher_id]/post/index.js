import { Container } from "next/app"
import { useRouter } from "next/router"
import { parseCookies } from "nookies"
import Footer from "../../../../../components/layout/footer/Footer"
import Header from "../../../../../components/layout/header/Header"
import actions from "../../../../../store/actions"
import PostDetails from "../../../../../components/layout/post-details/PostDetails"
import TeacherAllPostLayout from "../../../../../components/layout/teacher/TeacherAllPostLayout"
import { useState } from "react"
const TeacherPostPages = props => {
    const router = useRouter()

    return (
        <Container>
            {console.log("TeacherPostWithId props", props)}
            <Header lang={router.query.lang} {...props} />
            <div class="layout-content">
                <TeacherAllPostLayout />

            </div>
            <Footer />

        </Container>
    )
}
TeacherPostPages.getInitialProps = async ctx => {
    return {}
}
export default TeacherPostPages