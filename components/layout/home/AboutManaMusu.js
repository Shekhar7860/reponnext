import { useState, useEffect } from "react";
import language_contant from "../../../utils/language_contant";

export default (props) => {
    const [selectedButton, setSelectedButton] = useState("teacher")

    return (
        <section>
            <div class="section-spacing position-relative">
                <img class="dots-img-right d-none d-lg-block" src='/images/home-page/dots.svg' alt="" />
                <div class="container position-relative">
                    <div class="row justify-content-lg-between justify-content-center">
                        <div class="col-xl-5 col-lg-6">
                            <div class="about-section">
                                <div class="d-flex mb-4">
                                    <img class="about-img" src={`/images/home-page/about/DSCF0728.webp`} loading="lazy" alt="" />
                                </div>
                                <div class="d-flex justify-content-end mb-3">
                                    <img class="about-img" src={`/images/home-page/about/DSCF0923.webp`} loading="lazy" alt="" />
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-5 col-lg-6 col-md-8 mt-4">
                            <div>
                                <div class="heading-section">
                                    <h2 class="secondary-heading mb-4">{language_contant.Common.about()} ManaMusu</h2>
                                    <span class="bg-text-2 d-none d-md-block">MANAMUSU</span>
                                </div>
                                <p class="text-light fs-16 text-justiify">{props.about}</p>
                                <p class="text-light fs-16 text-justiify">Maecenas non nunc eget lectus interdum commodo et quis justo. Nunc sed auctor tellus, ut mattis sapien. Nunc nulla justo, imperdiet vitae urna at, suscipit feugiat lorem.</p>
                                <div>
                                    <button type="button" onClick={() => { setSelectedButton("teacher") }} className={` ${(selectedButton === "teacher") ? "btn btn-primary " : "btn btn-outline-primary"} btn-round mt-3 me-4`}>{language_contant.Common.seeTeacher()}</button>
                                    <button type="button" onClick={() => { setSelectedButton("student") }} className={` ${(selectedButton === "student") ? "btn btn-primary " : "btn btn-outline-primary "}btn-round mt-3`}>{language_contant.Common.seeStudent()}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="forHowToUse"></div>
        </section>
    )
}