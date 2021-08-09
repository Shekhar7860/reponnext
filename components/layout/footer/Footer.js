import React from 'react'
import language_contant from '../../../utils/language_contant'
import styles from './Footer.module.scss'
// import './footer.scss'
class Footer extends React.Component {
    render() {
        return <>
            <footer>
                <div class={styles.footer}>
                    <div class="container pb-4">
                        <div class="row justify-content-xl-between">
                            <div class="col-xl-auto col-md-4 mt-4">
                                <div class="logo-bg">
                                    <img src="/images/logo.svg" alt="logo not found" />
                                    {/* <a class={styles.brand} href="#">ManaMusu</a> */}
                                </div>
                            </div>
                            <div class="col-xl-auto col-md-4 mt-4">
                                <ul>
                                    <li>
                                        <h6 class="text-secondary fw-16">{language_contant.Common.company()}</h6>
                                    </li>
                                    <li>
                                        <a href="#">{language_contant.Common.aboutUs()}</a>
                                    </li>
                                    <li>
                                        <a href="#">{language_contant.Common.support()}</a>
                                    </li>
                                    <li>
                                        <a href="#">{language_contant.Common.termsConditions()}</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-xl-auto col-md-4 mt-4">
                                <ul>
                                    <li>
                                        <h6 class="text-secondary fw-16">{language_contant.Common.importantLinks()}</h6>
                                    </li>
                                    <li>
                                        <a href="#">{language_contant.Common.home()}</a>
                                    </li>
                                    <li>
                                        <a href="#">{language_contant.Common.aboutUs()}</a>
                                    </li>
                                    <li>
                                        <a href="#">{language_contant.Common.howItWorks()}</a>
                                    </li>
                                    <li>
                                        <a href="#">{language_contant.Common.teachers()}</a>
                                    </li>
                                    <li>
                                        <a href="#">{language_contant.Common.students()}</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-xl-auto col-md-4 mt-4">
                                <ul>
                                    <li>
                                        <h6 class="text-secondary fw-16">{language_contant.Common.others()}</h6>
                                    </li>
                                    <li>
                                        <a href="#">{language_contant.Common.contactUs()}</a>
                                    </li>
                                    <li>
                                        <a href="#">{language_contant.Common.support()}</a>
                                    </li>
                                    <li>
                                        <a href="#">{language_contant.Common.careers()}</a>
                                    </li>
                                    <li>
                                        <a href="#">{language_contant.Common.blog()}</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-xl-auto col-md-4 mt-4">
                                <ul>
                                    <li>
                                        <h6 class="text-secondary fw-16">{language_contant.Common.contactUs()}</h6>
                                    </li>
                                    <li>
                                        <i class="fas fa-envelope me-2 text-primary"></i>help@manamusu.com
                                    </li>
                                    <li>
                                        <i class="fas fa-phone-alt me-2 text-primary"></i>98 7654 3210
                                    </li>
                                    <li class="mt-4">
                                        <h6 class="text-secondary fw-16 mb-1">{language_contant.Common.followUs()}</h6>
                                        <div class="d-flex">
                                            <i class="fab fa-facebook-f text-primary me-3"></i>
                                            <i class="fab fa-twitter text-primary me-3"></i>
                                            <i class="fab fa-instagram text-primary me-3"></i>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <div class={styles.copyright}>
                <p class="small mb-0">© 2021 ManaMusu Inc. {language_contant.Common.AllRightsReserved()}</p>
            </div>
        </>
    }
}
export default Footer