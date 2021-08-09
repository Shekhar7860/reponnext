import React from 'react'

import language_contant from '../../../utils/language_contant'

export default (props) => {
    var myIndex = 0;
    carousel();

    function carousel() {
        if (typeof window !== "undefined") {
            var i;
            var x = document.getElementsByClassName("slides-home");
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
        <div class="banner-bg">
            {/* <div class="container"> */}
            {/* <div class=""> */}
            <img class="slides-home" src="/images/home-page/home_page_one.png" loading="lazy" />
            <img class="slides-home" src="/images/home-page/home_page_two.png" loading="lazy" />
            <img class="slides-home" src="/images/home-page/home_page_three.png" loading="lazy" />
            <div class="container z1">
                <div class="row justify-content-between align-items-center">
                    <div class="col-lg-4 col-md-6">
                        {language_contant.HomePage.bannerTitle()}
                        {/* <h1>Learn New Skills Online With Top<br /> <span class="text-primary fw-600">Educators.</span></h1> */}
                        {language_contant.HomePage.bannerSubTitle()}
                        {/* <p>His ideas somewhere me to founding so unable late, the unrecognizable</p> */}
                        <button type="button" class="btn btn-primary btn-round"><i class="fas fa-graduation-cap text-white me-2"></i>{language_contant.HomePage.startLearningToday()}</button>
                    </div>
                    <div class="col-md-12">
                        <div class="d-flex justify-content-center mt-5">
                            <div class='scrolldown'></div>
                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}
            {/* <div class="row justify-content-between align-items-center">
                    <div class="col-lg-5 col-md-6 d-none d-md-block">
                        <div class="banner-img">
                            <img class="slides-home" src="/images/home-page/home_page_one.png" loading="lazy" />
                            <img class="slides-home" src="/images/home-page/home_page_two.png" loading="lazy" />
                            <img class="slides-home" src="/images/home-page/home_page_three.png" loading="lazy" />
                        </div>
                    </div>
                </div> */}
            {/* </div> */}
        </div>
    </section>
    )
}