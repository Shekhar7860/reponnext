import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import StudentPostLayout from '../../ui/student/StudentPostLayout'
import language_contant from '../../../utils/language_contant'

export default (props) => {
    const router = useRouter()
    console.log("studentPost props", props);
    const getStudentPost = () => {
        let rowData = []
        const posts = props.requests ? props.requests.slice(0, 6) : []
        posts.forEach((element, ind) => {
            rowData.push(<StudentPostLayout key={ind} {...element} subjects={props.subjects} teaching_standards={props.teaching_standards} />)
        });
        return rowData
    }
    return (
        <section>
            <div class="section-spacing">
                <div class="container position-relative z1">

                    {/* <img class="dots-img d-none d-lg-block" src="/images/home-page/dots.svg" alt="" /> */}
                    <div class="heading-section">
                        <h2 class="secondary-heading">{language_contant.HomePage.studentRecentPost()}</h2>
                        <p class="text-light fs-16">{language_contant.HomePage.studentSubTitle()}</p>
                        <span class="bg-text d-none d-md-block">{language_contant.Common.STUDENTS()}</span>
                    </div>
                    <div class="card card-section mb-0">
                        <div class="card-body pb-0">
                            <div class="row">
                                {getStudentPost()}
                            </div>
                            <div class="text-center my-3">
                                <button type="button" class="btn btn-primary btn-round" onClick={() => router.push(`/${props.lang}/student`)}>{language_contant.Common.viewAllStudent()}</button>
                            </div>
                        </div>
                    </div>
                    {/* <img class="ellipse-img d-none d-lg-block z-1" src="/images/home-page/ellipse.svg" alt="" /> */}
                    <img class="ellipse-img-two d-none d-lg-block z-1" src="/images/home-page/ellipse.svg" alt="" />

                </div>
            </div>
            <div id="forScrollAbout"></div>
        </section >
    )
}