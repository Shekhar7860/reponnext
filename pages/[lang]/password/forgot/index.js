import Head from "next/head"
import Header from "../../../../components/layout/header/Header"
import { Container } from "next/app"
import { useRouter } from "next/router"
import { useState } from "react"
import Link from "next/link"
import { validateEmail } from "../../../../utils/validation_regex"
import agent from "../../../../utils/agent"

export default () => {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")
    const [eyeOpen, setEyeOpen] = useState(false)
    const [eyeOpenPass1, setEyeOpenPass1] = useState(false)
    const [eyeOpenPass2, setEyeOpenPass2] = useState(false)
    const [invitation_sent, setInvitationSent] = useState(false)
    const [invitation_verified, setInvitationVerified] = useState(false)
    const [loading, setLoading] = useState(false)
    const [verifySession, setVerifySession] = useState(null)

    const [error_info, setErrorMsg] = useState({ name: "", msg: "" })

    function gotoLoginPage() {
        router.push(`/${router.query.lang}/sign-in`)
    }

    function sentVerificationCode() {
        if (validateEmail(email)) {
            setLoading(true)
            agent.Auth.forgotPassword({
                "email": email
            }).then((res) => {
                console.log("sentVerificationCode", res);
                setInvitationSent(true)
                setLoading(false)

            }).catch(err => {
                setLoading(false)

            })
        } else {
            setErrorMsg({ name: "email", msg: "Invalid email id" })
        }
    }
    function verifyNow() {
        if (otp.length >= 4) {
            setLoading(true)
            agent.Auth.checkEmailOtp({ otp: otp }).then((res) => {
                setLoading(false)
                setInvitationVerified(true)
                setVerifySession(res)
                console.log("verifySession", res);

            }).catch((err) => {
                setLoading(false)
            })

        } else {
            setErrorMsg({ name: "otp", msg: "Invalid OTP" })
        }
    }
    function verifyAndChangePasswordNow() {
        if (invitation_verified) {
            if (password1 === password2) {
                agent.setToken(verifySession.token)
                agent.Auth.resetPassword({ "password": password1 }).then(res => {
                    gotoLoginPage()
                }).catch(err => {
                    console.log("resetPassword", err);
                })
            }
        }
    }


    return (<Container>
        <Head>
            <title>Forgot Password : Mana Musu</title>
            <meta name="description" content="This is forgot password page" key="description" />
        </Head>
        <Header lang={router.query.lang} />

        <div class="layout-content">
            <div class="py-5 bg-light">
                <div class="container">
                    <div class="bg-white">
                        <div class="row g-0">
                            <div class="col-lg-6 d-none d-lg-block">
                                <div>
                                    <img class="sign-image" src={`/images/signup_login/DSCF0067.webp`} alt="" />
                                </div>
                            </div>
                            <div class="col-lg-6 py-2">
                                <div class="p-4 pb-0">
                                    <form onSubmit={(e) => { e.preventDefault(); }}>
                                        <div class="text-center">
                                            <h4 class="mb-3">ManaMusu</h4>
                                            <h5 class="secondary-heading fw-600 fs-20 mb-3">Forgot Password</h5>
                                        </div>

                                        <div class="row row-cols-lg-2 row-cols-md-2 row-cols-sm-1 row-cols-1 mt-5">
                                            <div class="col">
                                                {/* is-invalid */}
                                                <div class="mb-3 input-field">
                                                    <label for="exampleInputEmail1" class="form-label">Email</label>
                                                    <input type="email" class={`form-control input-space ${(error_info.name === "email" && error_info.msg) ? "is-invalid" : ""}`} id="exampleInputEmail1"
                                                        aria-describedby="emailHelp" name="email" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value); setErrorMsg({ name: "", msg: "" }) }} disabled={invitation_sent} required />
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
                                                    <label for="exampleInputPassword1" class="form-label">OTP</label>
                                                    <input type={eyeOpen ? "text" : "password"} class={`form-control input-space ${(error_info.name === "otp" && error_info.msg) ? "is-invalid" : ""}`} id="exampleInputPassword1"
                                                        placeholder="One Time Password" name="otp" value={otp} onChange={(e) => { setOtp(e.target.value); setErrorMsg({ name: "", msg: "" }) }} disabled={!invitation_sent} />

                                                    {(error_info.name === "otp" && error_info.msg)
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
                                        {invitation_verified ?
                                            <div class="row row-cols-lg-2 row-cols-md-2 row-cols-sm-1 row-cols-1 mt-1">
                                                <div class="col">
                                                    <div class="mb-3 input-field">
                                                        <label for="exampleInputPassword1" class="form-label">Password</label>
                                                        <input type={eyeOpenPass1 ? "text" : "password"} class={`form-control input-space ${(error_info.name === "password1" && error_info.msg) ? "is-invalid" : ""}`} id="exampleInputPassword1"
                                                            placeholder="Password" name="password" value={password1} onChange={(e) => { setPassword1(e.target.value); setErrorMsg({ name: "", msg: "" }) }} />

                                                        {(error_info.name === "otp" && error_info.msg)
                                                            ? <div class="invalid-feedback">
                                                                {error_info.msg}
                                                            </div>
                                                            : <div class="icon" onClick={() => setEyeOpenPass1(!eyeOpenPass1)}>
                                                                <i class={eyeOpenPass1 ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                                                            </div>

                                                        }
                                                    </div>
                                                </div>
                                                <div class="col">
                                                    <div class="mb-3 input-field">
                                                        <label for="exampleInputPassword1" class="form-label">Confirm Password</label>
                                                        <input type={eyeOpenPass2 ? "text" : "password"} class={`form-control input-space ${(error_info.name === "password2" && error_info.msg) ? "is-invalid" : ""}`} id="exampleInputPassword1"
                                                            placeholder="Confirm Password" name="pasword" value={password2} onChange={(e) => { setPassword2(e.target.value); setErrorMsg({ name: "", msg: "" }) }} />

                                                        {(error_info.name === "password2" && error_info.msg)
                                                            ? <div class="invalid-feedback">
                                                                {error_info.msg}
                                                            </div>
                                                            : <div class="icon" onClick={() => setEyeOpenPass2(!eyeOpenPass2)}>
                                                                <i class={eyeOpenPass2 ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>

                                            </div>
                                            : <></>}
                                        <div class="d-flex justify-content-between my-4">
                                            <a class="text-success cursor-pointer" onClick={() => gotoLoginPage()}>Back to login</a>
                                            {invitation_sent ?
                                                loading ?
                                                    <button type="button" class="btn btn-primary" >
                                                        <div class="spinner-border spinner-border-sm" role="status">
                                                            <span class="visually-hidden">Loading...</span>
                                                        </div>
                                                    </button>
                                                    : invitation_verified ? <button type="button" class="btn btn-primary" onClick={() => verifyAndChangePasswordNow()} >Save Now</button>
                                                        : <button type="button" class="btn btn-primary" onClick={() => verifyNow()} >VERIFY NOW</button>
                                                : loading ?
                                                    <button type="button" class="btn btn-primary" >
                                                        <div class="spinner-border spinner-border-sm" role="status">
                                                            <span class="visually-hidden">Loading...</span>
                                                        </div>
                                                    </button>
                                                    : <button type="button" class="btn btn-primary" onClick={() => sentVerificationCode()}>REQUEST</button>

                                            }    </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Container>

    )
}