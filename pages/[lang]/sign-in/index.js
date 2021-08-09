import { parseCookies, setCookie } from "nookies";

import Header from "../../../components/layout/header/Header"
import { useRouter } from "next/router"
import Head from "next/head"
import { Container } from "next/app"
import language_contant from "../../../utils/language_contant"
import { validateEmail } from "../../../utils/validation_regex"
import agent from "../../../utils/agent"
import { useEffect, useState } from "react"
import actions from "../../../store/actions";

const SignInPage = props => {
    console.log("SignInPage", props);
    const router = useRouter()
    language_contant.setLang(router.query.lang)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [eyeOpen, setEyeOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error_info, setErrorInfo] = useState({ name: "", msg: "" })

    useEffect(() => {
        { (props.user_info) ? router.push(`/${router.query.lang}/profile`) : "" }
    })

    function gotoForgotPasswordPage() {
        router.push(`/${router.query.lang}/password/forgot`)
    }
    function gotoSignUpPage() {
        router.push(`/${router.query.lang}/sign-up`)
    }
    function checkAndLogin() {
        if (validateEmail(email)) {
            if (password.length >= 8) {
                setLoading(true)

                agent.Auth.login({
                    "email": email,
                    "password": password
                }).then((res) => {
                    setLoading(false)
                    setCookie(this, actions.GET_USER_INFO, JSON.stringify({ user_info: res }), {
                        maxAge: 30 * 24 * 60 * 60,
                        path: "/",
                    });
                    if (props.allow_back) {

                        setCookie(this, actions.ALLOW_BACK, false, {
                            maxAge: 1 * 1 * 2 * 60,
                            path: "/",
                        });
                        router.back()
                    } else {
                        console.log("login ", res);

                        router.push(`/${router.query.lang}/profile`)

                    }

                }).catch((err) => {
                    setLoading(false)
                    setErrorInfo({ name: "email", msg: "Invalid email or password" })
                })
            } else if (password.length === 0) {
                setErrorInfo({ name: "password", msg: "Please provide password" })

            } else {
                setErrorInfo({ name: "password", msg: "Password too small" })
            }
        } else {
            setErrorInfo({ name: "email", msg: language_contant.Common.emailError() })
        }

    }
    return (<Container>
        <Head>
            <title>Login : Mana Musu</title>
            <meta name="description" content="This is login page" key="description" />
        </Head>
        <Header lang={router.query.lang} />
        <div class="">
            <div class="sign-section bg-light">
                <div class="row g-0 bg-white h-100">
                    <div class="col-lg-6 d-none d-lg-block">
                        <div>
                            <img class="sign-image" src={`/images/signup_login/DSCF0067.webp`} alt="" />
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="h-100">
                            <div class="single-section pb-0">
                                <div class="text-center">
                                    <div class="mb-5">
                                        <img src="/images/logo.svg" alt="logo not found" />
                                    </div>
                                    <h5 class="bold-heading">{language_contant.Common.signInToYourAccount()}</h5>
                                </div>
                                <form onSubmit={(e) => { e.preventDefault(); checkAndLogin() }}>
                                    <div class="row row-cols-lg-2 row-cols-md-2 row-cols-sm-1 row-cols-1 mt-5">
                                        <div class="col">
                                            <div class="mb-3 input-field">
                                                <label for="exampleInputEmail1" class="form-label">{language_contant.Common.email()}</label>
                                                <input type="email" name="email" class={`form-control input-space ${(error_info.name === "email" && error_info.msg) ? "is-invalid" : ""}`} id="exampleInputEmail1"
                                                    aria-describedby="emailHelp" placeholder={language_contant.Common.email()} value={email} onChange={(e) => { setEmail(e.target.value); setErrorInfo({ name: "", msg: "" }) }} disabled={loading} />

                                                {(error_info.name === "email" && error_info.msg)
                                                    ? <div class="invalid-feedback">
                                                        {error_info.msg}
                                                    </div>
                                                    :
                                                    <div class="icon">
                                                        <i class="fa fa-envelope"></i>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="mb-3 input-field">
                                                <label for="exampleInputPassword1" class="form-label">{language_contant.Common.password()}</label>
                                                <input type={eyeOpen ? "text" : "password"} class={`form-control input-space ${(error_info.name === "password" && error_info.msg) ? "is-invalid" : ""}`} id="exampleInputPassword1"
                                                    placeholder={language_contant.Common.password()} value={password} onChange={(e) => { setPassword(e.target.value); setErrorInfo({ name: "", msg: "" }) }} disabled={loading} />
                                                {(error_info.name === "password" && error_info.msg)
                                                    ? <div class="invalid-feedback">
                                                        {error_info.msg}
                                                    </div>
                                                    : <div class="icon" onClick={() => setEyeOpen(!eyeOpen)}>
                                                        <i class={eyeOpen ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                                                    </div>

                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-between my-4">
                                        <a class="text-success cursor-pointer" onClick={() => gotoForgotPasswordPage()}>{language_contant.Common.forgetPassword()}</a>
                                        {loading ?
                                            <button type="button" class="btn btn-primary" >
                                                <div class="spinner-border spinner-border-sm" role="status">
                                                    <span class="visually-hidden">Loading...</span>
                                                </div>
                                            </button>
                                            : <button type="submit" class="btn btn-primary" >{language_contant.Common.signIn()}</button>
                                        }
                                    </div>
                                </form>
                            </div>
                            <div class="mt-3">
                                <p class="text-center fs-16 fw-500 mb-0">Don't have an account?<a class="sign-in text-primary cursor-pointer" onClick={() => gotoSignUpPage()}> Sign Up</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Container>

    )
}

SignInPage.getInitialProps = async ctx => {
    console.log("ProfilePage getInitialProps called");

    const userObj = parseCookies(ctx)[actions.GET_USER_INFO]
    const allow_back = parseCookies(ctx)[actions.ALLOW_BACK]
    const obj = userObj ? JSON.parse(userObj) : { user_info: null };
    return {
        ...obj,
        allow_back: allow_back
    }

};

export default SignInPage