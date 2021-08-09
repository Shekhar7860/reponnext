import { useState, useEffect } from "react";
import language_contant from "../../../utils/language_contant";

export default (props) => {
    const [selectedButton, setSelectedButton] = useState("teacher")

    var myIndex = 0;
    carousel();

    function carousel() {
        if (typeof window !== "undefined") {
            var i;
            var x = document.getElementsByClassName("banner-img-2");
            if (x) {
                for (i = 0; i < x.length; i++) {
                    // x[i].style.opacity = "0";
                    if (x[i]) {
                        try {
                            x[i].classList.add('myClass');
                        } catch (error) {
                            console.log("getElementsByClassName"), error;
                        }
                    }
                }
                myIndex++;
                if (myIndex > x.length) { myIndex = 1 }
                // x[myIndex - 1].style.opacity = "1";
                if (x[myIndex - 1]) {
                    try {
                        x[myIndex - 1].classList.remove('myClass');
                    } catch (error) {
                        console.log("getElementsByClassName", error);
                    }
                }
                setTimeout(carousel, 3000);
            }
        }
    }

    return (<section>
        <div class="my-5">
            <div class="container">
                <div class="how-section">
                    <div class="heading-section">
                        <h2 class="secondary-heading">{language_contant.HomePage.howItWorks()}</h2>
                        <p class="text-light fs-16">Aenean consectetur tortor in libero scelerisque commodo</p>
                        <span class="how-its-work d-none d-md-block">{String(language_contant.Common.howItWorks()).toUpperCase()}</span>
                        {/* <img class="how-its-work" src={`/images/home-page/how_it_works.png`} alt="" /> */}
                    </div>
                    <div class="how-work">
                        <div class="row justify-content-lg-between justify-content-center align-items-center">
                            <div class="col-xl-4 col-lg-5 col-md-8 mt-lg-3">
                                <div class="how-banner-section">
                                    <img class="banner-img-2" src={`/images/home-page/how_it_work/DSCF0317.webp`} alt="" />
                                    <img class="banner-img-2" src={`/images/home-page/how_it_work/DSCF9397.webp`} alt="" />
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-5 col-md-8 mt-3">
                                <div class="card green-border border-end-0">
                                    <div class="card-body">
                                        <p class="fs-14">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Porttitor et, ultrices fermentum felis pretium. Vel ut sed aliquam dictum mattis faucibus. Varius eu dapibus donec amet. Mauris sit mi nullam tortor, id rutrum ultrices. Mollis platea quis dignissim et morbi lacus. Orci, habitasse lobortis fringilla suscipit.
                                        </p>
                                        <p class="fs-14 mb-0">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Porttitor et, ultrices fermentum felis pretium. Vel ut sed aliquam dictum mattis faucibus. Varius eu dapibus donec amet. Mauris sit mi nullam tortor, id rutrum ultrices. Mollis platea quis dignissim et morbi lacus. Orci, habitasse lobortis fringilla suscipit.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="banner-works py-5">
                <div class="container">
                    <div class="row justify-content-xl-center">
                        <div class="col-xl-3 col-md-6">
                            <div class="d-flex align-items-start">
                                <img class="step-img" src={`/images/home-page/create_account.svg`} alt="" />
                                <div>
                                    <b class="data fs-16">Create free Account</b>
                                    <p class="data fs-14">Vestibulum ac pretium magna, ac faucibus nibh. Fusce vitae.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-md-6">
                            <div class="d-flex align-items-start">
                                <img class="step-img" src={`/images/home-page/select_teacher.svg`} alt="" />
                                <div>
                                    <b class="data fs-16">Select your Teacher</b>
                                    <p class="data fs-14">Vestibulum ac pretium magna, ac faucibus nibh. Fusce vitae.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-md-6">
                            <div class="d-flex align-items-start">
                                <img class="step-img" src={`/images/home-page/learning.svg`} alt="" />
                                <div>
                                    <b class="data fs-16">Start Learning</b>
                                    <p class="data fs-14">Vestibulum ac pretium magna, ac faucibus nibh. Fusce vitae.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    )
}