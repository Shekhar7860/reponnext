import React from 'react'
import styles from './Teacher.module.scss';

export default (props) => {
    var myIndex = 0;
    carousel();
    function goToLink(params) {
        props.router.push(`/${props.langRouter}/${params}`)
    }
    function carousel() {
        if (typeof window !== "undefined") {
            var i;
            var x = document.getElementsByClassName("slides-img");
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

    return (
        <section>
            <div class={styles.teacherBanner}>
                <img class="slides-img" src="/images/teacher_page/teacher_banner_one.png" />
                <img class="slides-img" src="/images/teacher_page/teacher_banner_two.png" />
                <img class="slides-img" src="/images/teacher_page/teacher_banner_three.png" />
                <div class="container z1">
                    <div class="row justify-content-between align-items-center">
                        <div class="col-lg-4 col-md-6">
                            <h1 class="banner-heading">Find the best<br /> <span class="text-primary fw-700">Teachers.</span></h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            <button type="button" class="btn btn-primary btn-round px-5 py-2" onClick={() => goToLink("create-post")}>Create Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}