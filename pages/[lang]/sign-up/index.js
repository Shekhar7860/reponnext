import Header from "../../../components/layout/header/Header"
import { useRouter } from "next/router"
import Head from "next/head"
import { Container } from "next/app"
import Link from "next/link"
import language_contant from "../../../utils/language_contant"
import { useEffect, useRef, useState } from "react"
import agent from "../../../utils/agent"
import { validateEmail } from "../../../utils/validation_regex"
import { UserNameValidation, NumberValidation } from "../../../utils/validation_contant"
import { setCookie } from "nookies"
import actions from "../../../store/actions"
import BootstrapSpinner from "../../../components/ui/spinner/BootstrapSpinner"
import axios from "axios"
import PhoneInput from 'react-phone-input-2'

const SignUpPage = props => {
    // const GOOGLE_MAP_API_KEY = 'AIzaSyAgBbYxsS_pWcT3TR3qwOInOEonqG3_jyc';
    const GOOGLE_MAP_API_KEY = 'AIzaSyD0fo5KQH8GdSqFCEEIEZ-_uHQwg0YAaCY';

    const router = useRouter()
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [email_1, setEmail1] = useState("")
    const [email_2, setEmail2] = useState("")
    const [password_1, setPassword1] = useState("")
    const [password_2, setPassword2] = useState("")
    const [user_type, setUserType] = useState("")
    const [signUpToken, setSignUpToken] = useState(null)
    const [enable_page_2, setEnablePage2] = useState(true)
    const [error_info, setErrorInfo] = useState({ name: "", msg: "" })
    // 
    const [language, setLanguage] = useState("")
    const [nationality, setNationality] = useState("")
    const [country, setCountry] = useState("")
    const [countryCode, setCountryCode] = useState("")
    const [addressState, setAddressState] = useState("")
    const [address, setAddress] = useState("")
    const [locationName, setLocationName] = useState("")
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")
    const [occupation, setOccupation] = useState("")
    const [contact_number, setContactNumber] = useState("")
    const [description, setDescription] = useState("")
    const [eyeOpen1, setEyeOpen1] = useState(false)
    const [eyeOpen2, setEyeOpen2] = useState(false)
    const [loadMap, setLoadMap] = useState(false);
    const [loading, setLoading] = useState(false)

    // Academics
    const [schoolAcademics, setSchoolAcademics] = useState("")
    const [levelOfEduAcademics, setLevelOfEduAcademics] = useState("")
    const [countryAcademics, setCountryAcademics] = useState("")
    const [yearAcademics, setYearAcademics] = useState("")
    const [fileAcademics, setFileAcademics] = useState(null)
    const [resAcademics, setResAcademics] = useState([])
    // Certificates
    const [idCertificates, setIdCertificates] = useState("")
    const [nameCertificates, setNameCertificates] = useState("")
    const [resultCertificates, setResultCertificates] = useState("")
    const [yearCertificates, setYearCertificates] = useState("")
    const [descCertificates, setDescCertificates] = useState("")
    const [fileCertificates, setFileCertificates] = useState(null)
    const [resCertificates, setResCertificates] = useState([])


    const [fileUploadLoading, setFileUploadLoading] = useState(false)
    const [fileUploadDoneAcademic, setFileUploadDoneAcademic] = useState(false)
    const [fileUploadDoneCertificate, setFileUploadDoneCertificate] = useState(false)

    const placeInputRef = useRef(null);
    const [place, setPlace] = useState(null);

    const userInfo = props.user_info ? props.user_info : {}

    async function resetCertificate() {
        setNameCertificates("")
        setResultCertificates("")
        setYearCertificates("")
        setDescCertificates("")
        setFileUploadDoneCertificate(false)
        setFileCertificates(null)
    }
    async function resetAcademic() {
        setSchoolAcademics("")
        setLevelOfEduAcademics("")
        setCountryAcademics("")
        setYearAcademics("")
        setFileUploadDoneAcademic(false)

        setFileAcademics(null)
    }
    async function insertAcademics(params) {
        const item = {
            "user_id": userInfo.user ? userInfo.user.id : "0",
            "school": schoolAcademics,
            "level": levelOfEduAcademics,
            "country": countryAcademics,
            "year": yearAcademics,
            "image": params ? params : ""
        }
        agent.Academics.add(item).then(res => {
            const oldData = resAcademics
            oldData.push(item)
            setResAcademics(oldData)
            resetAcademic()
            setFileAcademics(null)
            setFileUploadDoneAcademic(true)
            setFileUploadLoading(false)
            console.log("addAcademics", res, "item", item);
        }).catch(err => {
            setFileUploadLoading(false)
            console.log("addAcademics catch", "item", item);
        })
    }

    async function uploadAcademics() {
        agent.setToken(signUpToken)
        if (fileAcademics) {
            const formData = new FormData();
            formData.append(
                "academics",
                fileAcademics,
                fileAcademics.name
            );
            try {
                setFileUploadLoading(true)
                const uploadUrl = await fileUpload(fileAcademics)
                console.log("uploadUrl", uploadUrl);
                await insertAcademics(uploadUrl)

            } catch (error) {
                console.log("Error upload", error, "fileAcademics", fileAcademics);
                setFileUploadLoading(false)

            }
        }
    }

    async function fileUpload(file) {
        const url = `${agent.API_ROOT}upload/aws`;
        const formData = new FormData();
        formData.append('file', file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        const data = await (await axios.post(url, formData, config)).data
        return data.filename
    }
    async function insertCertificats(params) {
        const item = {
            "user_id": userInfo.user ? userInfo.user.id : "0",
            "certificate_name": nameCertificates,
            "result": resultCertificates,
            "year": yearCertificates,
            "description": descCertificates,
            "image": params ? params : "not found"
        }
        agent.Certificates.add(item).then(res => {
            const oldData = resCertificates
            oldData.push(item)
            setResCertificates(oldData)

            resetCertificate()
            setFileUploadDoneCertificate(true)
            setFileUploadLoading(false)
            console.log("insertCertificats res", res);
        }).catch(err => {
            setFileUploadLoading(false)
        })
    }
    async function uploadCertificats() {
        agent.setToken(signUpToken)
        if (fileCertificates) {
            const formData = new FormData();
            formData.append(
                "academics",
                fileCertificates,
                fileCertificates.name
            );
            try {
                setFileUploadLoading(true)
                const uploadUrl = await fileUpload(fileCertificates)

                console.log("uploadUrl", uploadUrl);

                await insertCertificats(uploadUrl)

            } catch (error) {
                console.log("Error upload", error);
                insertCertificats()
            }
        } else {
            console.log("Select File");
            setFileUploadLoading(false)
        }
    }


    function signUpNow() {
        if (first_name.length >= 3) {
            if (last_name.length >= 3) {

                if (validateEmail(email_1)) {
                    if (email_1 === email_2) {

                        if (password_1.length >= 8) {
                            if (password_1 === password_2) {

                                if (user_type === "1" || user_type === "2") {
                                    setLoading(true)
                                    const info = {
                                        "first_name": first_name,
                                        "last_name": last_name,
                                        "email": email_1,
                                        "confirm_email": email_2,
                                        "password": password_1,
                                        "confirm_password": password_2,
                                        "user_type": Number(user_type),
                                        "fcm_id": "none",
                                        "device_id": "none",
                                        "device_type": 1
                                    }
                                    agent.Auth.signup(info).then((res) => {
                                        setCookie(this, actions.GET_USER_INFO, JSON.stringify({ user_info: res }), {
                                            maxAge: 30 * 24 * 60 * 60,
                                            path: "/",
                                        });
                                        setSignUpToken(res.token)
                                        console.log("sign up res", res);
                                        setEnablePage2(false)
                                        setLoading(false)


                                    }).catch((err) => {
                                        console.log("error", err);
                                        setLoading(false)
                                        setErrorInfo({ name: "email1", msg: "email already registered" })

                                    })
                                } else {

                                }

                            } else {
                                setErrorInfo({ name: "password2", msg: "Password not match" })
                            }
                        } else {
                            setErrorInfo({ name: "password1", msg: "Password should be at least 8 chars long" })
                        }

                    } else {
                        setErrorInfo({ name: "email2", msg: "Email not match" })
                    }
                } else {
                    setErrorInfo({ name: "email1", msg: "Please provide valid email" })
                }

            } else {
                setErrorInfo({ name: "last_name", msg: language_contant.Common.lastNameError() })
            }
        } else {
            setErrorInfo({ name: "first_name", msg: language_contant.Common.firstNameError() })
        }

    }
    // 

    function updateProfileInfo() {
        agent.setToken(signUpToken)
        const info = {
            "first_name": first_name,
            "last_name": last_name,
            "dob": "2000-01-01",
            "email": email_1,
            "country_code": countryCode,
            "phone_number": Number(contact_number),
            "gender": "",
            "occupation": Number(occupation),
            "nationality": Number(nationality),
            "language": Number(language),
            "address": address,
            "country": country,
            "state": addressState,
            "city": locationName,
            "zip": "",
            "lat": latitude,
            "lng": longitude,
            "profile_image": "",
            "description": description
        }

        console.log("info", info, signUpToken);
        if (language.length > 0) {
            if (nationality.length > 0) {
                if (address.length > 5) {
                    if (occupation.length > 0) {
                        setLoading(true)

                        agent.Profile.update(info).then((res) => {
                            console.log("sign up res", res);
                            // router.push(`/${router.query.lang}/sign-in`)
                            router.push(`/${router.query.lang}/profile`)

                        }).catch((err) => {
                            console.log("error", err);
                            setLoading(false)

                        })

                    } else {
                        setErrorInfo({ name: "occupation", msg: "Enter Occupation" })
                    }
                } else {
                    setErrorInfo({ name: "address", msg: "Address to small" })
                }
            } else {
                setErrorInfo({ name: "nationality", msg: "Select nationality" })
            }
        } else {
            setErrorInfo({ name: "language", msg: "Select language" })
        }
    }

    function loadGoogleMapScript(callback) {
        if (typeof window.google === 'object' && typeof window.google.maps === 'object') {
            callback();
        } else {
            const googleMapScript = document.createElement("script");
            googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;
            window.document.body.appendChild(googleMapScript);
            googleMapScript.addEventListener("load", callback);
        }
    }
    const initPlaceAPI = () => {
        console.log("initPlaceAPI called");
        let autocomplete = new window.google.maps.places.Autocomplete(placeInputRef.current);
        new window.google.maps.event.addListener(autocomplete, "place_changed", function () {
            let place = autocomplete.getPlace();
            console.log("initPlaceAPI", place, "end");
            setPlace({
                address: place.formatted_address,
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            });
            setAddress(place.formatted_address)
            setLatitude(place.geometry.location.lat())
            setLongitude(place.geometry.location.lng())
            setLocationName(place.name)
            setCountry(place.address_components[place.address_components.length - 1].long_name)
            setCountryCode(place.address_components[place.address_components.length - 1].short_name)
            setAddressState(place.address_components[place.address_components.length - 2].long_name)
        });
    };

    useEffect(() => {
        loadGoogleMapScript(() => {
            setLoadMap(true)
            if (enable_page_2) {

            } else {
                initPlaceAPI()
            }
        });
    }, []);

    function getAcademicList() {
        let rowData = []
        console.log("getAcademicList data", resAcademics);
        resAcademics.forEach(res => {
            console.log("getAcademicList", res);
            rowData.push(
                <div class="card mt-4" >
                    <div class="row g-0">
                        <div class="col">
                            <div class="card-body">
                                <div class="d-flex align-items-start">
                                    <span class="certificate-text me-3">{res.year}</span>
                                    <div class="d-flex flex-column flex-grow-1">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <h5 class="mb-0">{res.level}</h5>
                                        </div>
                                        <b>{res.school}</b>
                                        <div class="d-flex justify-content-between align-items-end">
                                            <time class="time-text">{res.country}</time>
                                            <span class="text-primary fs-20"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-auto">
                            <div class="h-100">
                                <img class="documents" src={`${agent.API_FILE_ROOT_SMALL}${res.image}`} alt={res.image} />
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
        return rowData
    }
    function getCertificateList() {
        let rowData = []
        resCertificates.forEach(res => {
            rowData.push(
                <div class="card mt-4">
                    <div class="row g-0">
                        <div class="col-auto">
                            <div class="h-100">
                                <img class="documents" src={`${agent.API_FILE_ROOT_SMALL}${res.image}`} alt={res.image} />
                            </div>
                        </div>
                        <div class="col">
                            <div class="card-body">
                                <div class="d-flex align-items-start">

                                    <div class="d-flex flex-column flex-grow-1">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <h5 class="mb-0">{res.certificate_name}</h5>
                                        </div>
                                        <time class="time-text">{res.year}</time>
                                        <div class="d-flex justify-content-between align-items-end">
                                            <p>{res.description}</p>
                                            <span class="text-primary fs-20">{res.result}%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
        return rowData
    }
    function createDropdown(params) {
        const items = params ? params : []
        let rowData = []
        items.forEach((element, index) => {
            rowData.push(<option key={index} value={`${element.id}`}>{element.name ? element.name : element.year}</option>)
        });
        return rowData
    }
    language_contant.setLang(router.query.lang)
    return (<Container>
        <Head>
            <title>Sign Up : Mana Musu</title>
            <meta name="description" content="This is sign up page" key="description" />
        </Head>
        <Header lang={router.query.lang} />
        <div class="sign-section bg-white">
            <div class="row g-0 h-100">
                <div class="col-lg-6 d-none d-lg-block">
                    <div>
                        <img class="sign-image" src={`/images/signup_login/DSCF0088.webp`} alt="/images/signup_login/DSCF0088.webp" />
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="d-flex flex-column justify-content-between h-100">
                        <div class="single-section pb-0">
                            {enable_page_2 ?
                                <form onSubmit={(e) => { e.preventDefault(); signUpNow() }}>
                                    <div class="text-center">
                                        <div class="mb-5">
                                            <img src="/images/logo.svg" alt="logo not found" />
                                        </div>
                                        <h5 class="bold-heading">{language_contant.Common.signUpToYourAccount()}</h5>
                                    </div>
                                    <div class="row row-cols-lg-2 row-cols-md-2 row-cols-sm-1 row-cols-1 mt-5">
                                        <div class="col">
                                            <div class="mb-3 input-field">
                                                <label for="exampleInputText1" class="form-label">{language_contant.Common.firstName()}</label>
                                                <input type="text" className={`form-control input-space ${(error_info.name === "first_name" && error_info.msg) ? "is-invalid" : ""}`} id="exampleInputEmail1" name="first_name"
                                                    aria-describedby="emailHelp" placeholder={language_contant.Common.firstName()} value={first_name} onChange={(e) => { UserNameValidation(e.target.value) ? setFirstName(e.target.value) : setErrorInfo({ name: "first_name", msg: "Special symbol not allow" }); setErrorInfo({ name: "", msg: "" }) }} required />

                                                {(error_info.name === "first_name" && error_info.msg)
                                                    ? <div class="invalid-feedback">
                                                        {error_info.msg}
                                                    </div>
                                                    : <div class="icon">
                                                        <i class="fas fa-user"></i>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="mb-3 input-field">
                                                <label for="exampleInputText1" class="form-label">{language_contant.Common.lastName()}</label>
                                                <input type="text" className={`form-control input-space ${(error_info.name === "last_name" && error_info.msg) ? "is-invalid" : ""}`} id="exampleInputEmail1" name="last_name"
                                                    aria-describedby="emailHelp" placeholder={language_contant.Common.lastName()} value={last_name} onChange={(e) => { UserNameValidation(e.target.value) ? setLastName(e.target.value) : setErrorInfo({ name: "last_name", msg: "Special symbol not allow" }); setErrorInfo({ name: "", msg: "" }) }} required />

                                                {(error_info.name === "last_name" && error_info.msg)
                                                    ? <div class="invalid-feedback">
                                                        {error_info.msg}
                                                    </div>
                                                    : <div class="icon">
                                                        <i class="fas fa-user"></i>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="mb-3 input-field">
                                                <label for="exampleInputEmail1" class="form-label">{language_contant.Common.email()}</label>
                                                <input type="email" className={`form-control input-space ${(error_info.name === "email1" && error_info.msg) ? "is-invalid" : ""}`} id="exampleInputEmail1" name="email"
                                                    aria-describedby="emailHelp" placeholder={language_contant.Common.email()} value={email_1} onChange={(e) => { setEmail1(e.target.value); setErrorInfo({ name: "", msg: "" }) }} required />

                                                {(error_info.name === "email1" && error_info.msg)
                                                    ? <div class="invalid-feedback">
                                                        {error_info.msg}
                                                    </div>
                                                    : <div class="icon">
                                                        <i class="fas fa-envelope"></i>
                                                    </div>
                                                }

                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="mb-3 input-field">
                                                <label for="exampleInputEmail1" class="form-label">{`${language_contant.Common.confirm()} ${language_contant.Common.email()}`}</label>
                                                <input type="email" className={`form-control input-space ${(error_info.name === "email2" && error_info.msg) ? "is-invalid" : ""}`} id="exampleInputEmail1" name="email"
                                                    aria-describedby="emailHelp" placeholder={`${language_contant.Common.confirm()} ${language_contant.Common.email()}`} value={email_2} onChange={(e) => { setEmail2(e.target.value); setErrorInfo({ name: "", msg: "" }) }} required />
                                                {(error_info.name === "email2" && error_info.msg)
                                                    ? <div class="invalid-feedback">
                                                        {error_info.msg}
                                                    </div>
                                                    : <div class="icon">
                                                        <i class="fas fa-envelope"></i>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="mb-3 input-field">
                                                <label for="exampleInputPassword1" class="form-label">{language_contant.Common.password()}</label>
                                                <input type={eyeOpen1 ? "text" : "password"} className={`form-control input-space ${(error_info.name === "password1" && error_info.msg) ? "is-invalid" : ""}`} id="exampleInputPassword1" name="password1"
                                                    placeholder="Password" value={password_1} onChange={(e) => { setPassword1(e.target.value); setErrorInfo({ name: "", msg: "" }) }} required />
                                                {(error_info.name === "password1" && error_info.msg)
                                                    ? <div class="invalid-feedback">
                                                        {error_info.msg}
                                                    </div>
                                                    : <div class="icon" onClick={() => setEyeOpen1(!eyeOpen1)}>
                                                        <i class={eyeOpen1 ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                                                    </div>
                                                }

                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="mb-3 input-field">
                                                <label for="exampleInputPassword1" class="form-label">{`${language_contant.Common.confirm()} ${language_contant.Common.password()}`}</label>
                                                <input type={eyeOpen2 ? "text" : "password"} className={`form-control input-space ${(error_info.name === "password2" && error_info.msg) ? "is-invalid" : ""}`} id="exampleInputPassword1" name="password2"
                                                    placeholder={`${language_contant.Common.confirm()} ${language_contant.Common.password()}`} value={password_2} onChange={(e) => { setPassword2(e.target.value); setErrorInfo({ name: "", msg: "" }) }} required />
                                                {(error_info.name === "password2" && error_info.msg)
                                                    ? <div class="invalid-feedback">
                                                        {error_info.msg}
                                                    </div>
                                                    : <div class="icon" onClick={() => setEyeOpen2(!eyeOpen2)}>
                                                        <i class={eyeOpen2 ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center justify-content-between ">
                                        <div class="d-flex align-items-center flex-wrap mt-2">
                                            <h6 class="m-0 text-dark me-3">{language_contant.Common.selectAccountType()}:</h6>
                                            <div class="form-check me-3">
                                                <label class="form-label d-flex align-items-center mb-0">
                                                    <input class="form-check-input me-2" type="radio" name="account" value="1" onChange={(e) => { setUserType(e.target.value); setErrorInfo({ name: "", msg: "" }) }} required />
                                                    {language_contant.Common.student()} / {language_contant.Common.parents()}
                                                </label>
                                            </div>
                                            <div class="form-check">
                                                <label class="form-label d-flex align-items-center mb-0">
                                                    <input class="form-check-input me-2" type="radio" name="account" value="2" onChange={(e) => { setUserType(e.target.value); setErrorInfo({ name: "", msg: "" }) }} required />
                                                    {language_contant.Common.teacher()}
                                                </label>
                                            </div>
                                        </div>
                                        {loading ?
                                            <button type="button" class="btn btn-primary" >
                                                <div class="spinner-border spinner-border-sm" role="status">
                                                    <span class="visually-hidden">Loading...</span>
                                                </div>
                                            </button>
                                            :
                                            <button type="submit" class="btn btn-primary">{language_contant.Common.next()}</button>
                                        }
                                    </div>
                                </form>
                                : <form onSubmit={(e) => { e.preventDefault(); updateProfileInfo() }}>
                                    <div class="text-center">
                                        <div class="mb-5">
                                            <img src="/images/logo.svg" alt="logo not found" />
                                        </div>
                                        <h5 class="bold-heading">{language_contant.Common.pleaseFillYourDetails()}</h5>
                                    </div>
                                    <div class="leftcol-content">
                                        <div class="row row-cols-lg-2 row-cols-md-2 row-cols-sm-1 row-cols-1 mt-5">
                                            <div class="col">
                                                <div class="mb-3 input-field">
                                                    <label for="exampleInputText1" class="form-label">{language_contant.Common.language()}</label>
                                                    <select class="form-select bg-none" aria-label="Default select example" onChange={(e) => setLanguage(e.target.value)} required>
                                                        <option value="">{language_contant.Common.selectLanguage()}</option>
                                                        {props.languages.map((res) => {
                                                            return <option value={res.id}>{res.name}</option>

                                                        })}
                                                    </select>
                                                    <div class="icon">
                                                        <i class="fas fa-globe"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                {/* nationality */}
                                                <label for="exampleInputText1" class="form-label">{language_contant.Common.nationality()}</label>
                                                <select className={`form-select ${(error_info.name === "nationality" && error_info.msg) ? "is-invalid" : ""}`} aria-label="Default select example" value={nationality} onChange={(e) => { setNationality(e.target.value); setErrorInfo({ name: "", msg: "" }) }} required>
                                                    <option value="">{language_contant.Common.selectNationality()}</option>
                                                    {props.nationalities.map((res) => {
                                                        return <option value={res.id}>{res.name}</option>

                                                    })}
                                                </select>
                                                <div class="invalid-feedback">
                                                    {error_info.msg}
                                                </div>
                                            </div>
                                            <div class="col">
                                                <label for="exampleInputText1" class="form-label">{language_contant.Common.currentLocation_Address()} </label>
                                                <input type="text" className={`form-control input-space ${(error_info.name === "address" && error_info.msg) ? "is-invalid" : ""}`} name="address" ref={placeInputRef}
                                                    aria-describedby="emailHelp" placeholder={language_contant.Common.address()} onChange={(e) => { setAddress(e.target.value); setErrorInfo({ name: "", msg: "" }) }} onFocus={() => initPlaceAPI()} />
                                                <div class="invalid-feedback">
                                                    {error_info.msg}
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="mb-3 input-field">
                                                    <label for="exampleInputText1" class="form-label">{language_contant.Common.occupation()}</label>
                                                    {/* <input type="text" className={`form-control input-space ${(error_info.name === "occupation" && error_info.msg) ? "is-invalid" : ""}`} name="occupation" id="exampleInputEmail1"
                                                                aria-describedby="emailHelp" placeholder={language_contant.Common.occupation()} value={occupation} onChange={(e) => { setOccupation(e.target.value); setErrorInfo({ name: "", msg: "" }) }} /> */}

                                                    <select class="form-select bg-none" aria-label="Default select example" value={occupation} onChange={(e) => { setOccupation(e.target.value); setErrorInfo({ name: "", msg: "" }) }} required>
                                                        <option value="">{language_contant.Common.selectOccupation()}</option>
                                                        {props.occupations.map((res) => {
                                                            return <option value={res.id}>{res.name}</option>

                                                        })}
                                                    </select>

                                                    {(error_info.name === "occupation" && error_info.msg)
                                                        ? <div class="invalid-feedback">
                                                            {error_info.msg}
                                                        </div>
                                                        : <div class="icon">
                                                            <i class="fas fa-user"></i>
                                                        </div>
                                                    }

                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="mb-3 input-field">
                                                    <label for="exampleInputText1" class="form-label">{language_contant.Common.contactNumber()}
                                                        <span class="text-light">(Optional)</span></label>
                                                    {/* <input type="text" className={`form-control ${(error_info.name === "contact_number" && error_info.msg) ? "is-invalid" : ""}`} name="contact_number" id="exampleInputEmail1"
                                                        aria-describedby="emailHelp" placeholder={language_contant.Common.contactNumber()} value={contact_number} onChange={(e) => { NumberValidation(e.target.value) ? setContactNumber(e.target.value) : setErrorInfo({ name: "", msg: "" }); setErrorInfo({ name: "", msg: "" }) }} maxLength="12" /> */}
                                                    <PhoneInput
                                                        country={'in'}
                                                        value={`${contact_number}`}
                                                        onChange={phone => { setContactNumber(phone) }}
                                                        inputClass={`form-control ${(error_info.name === "contact_number" && error_info.msg) ? "is-invalid" : ""}`}
                                                    />
                                                    {(error_info.name === "contact_number" && error_info.msg)
                                                        ? <div class="invalid-feedback">
                                                            {error_info.msg}
                                                        </div>
                                                        : <></>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label for="exampleFormControlTextarea1" class="form-label">{language_contant.Common.profileDescription()} <span class="text-light">({language_contant.Common.optional()})</span></label>
                                            <textarea className={`form-control ${(error_info.name === "description" && error_info.msg) ? "is-invalid" : ""}`} id="exampleFormControlTextarea1" rows="3" placeholder={language_contant.Common.writeHere()} value={description} onChange={(e) => { setDescription(e.target.value); setErrorInfo({ name: "", msg: "" }) }}></textarea>
                                            {(error_info.name === "description" && error_info.msg)
                                                ? <div class="invalid-feedback">
                                                    {error_info.msg}
                                                </div>
                                                : <></>
                                            }
                                        </div>
                                    </div>
                                    <div>
                                        {getAcademicList()}
                                        <div class="d-flex align-items-center justify-content-between mb-3">
                                            <h6 class="m-0">{language_contant.Common.academics()} <span class="text-light">{language_contant.Common.optional()}</span></h6>
                                            <div class="d-flex align-items-center text-success fs-14 cursor-pointer">
                                                <i class="fal fa-plus"></i>
                                                <span class="px-1" data-bs-toggle="modal" data-bs-target="#academicsModal" onClick={() => resetAcademic()}>{language_contant.Common.addAcademics()}</span>
                                            </div>
                                        </div>
                                        {getCertificateList()}
                                        <div class="d-flex align-items-center justify-content-between">
                                            <h6 class="m-0">{language_contant.Common.certificates()} <span class="text-light">{language_contant.Common.optional()}</span></h6>
                                            <div class="d-flex align-items-center text-success fs-14 cursor-pointer">
                                                <i class="fal fa-plus"></i>
                                                <span class="px-1" data-bs-toggle="modal" data-bs-target="#certificateModal" onClick={() => resetCertificate()}>{language_contant.Common.addCertificates()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="text-end my-4">
                                        {loading ?
                                            <button type="button" class="btn btn-primary" >
                                                <div class="spinner-border spinner-border-sm" role="status">
                                                    <span class="visually-hidden">Loading...</span>
                                                </div>
                                            </button>
                                            :
                                            <button type="submit" class="btn btn-primary">{language_contant.Common.signUp()}</button>
                                        }
                                    </div>
                                </form>
                            }
                            <div>
                                <p className="danger mt-2">{error_info.msg}</p>
                            </div>
                        </div>
                        <div class="bg-light py-2 mt-2 ">
                            <Link href={`/${router.query.lang}/sign-in`}>
                                <p class="text-center fs-16 fw-500 mb-0">{language_contant.Common.alreadyHaveAnAccount()} <a class="sign-in text-primary cursor-pointer">{language_contant.Common.signIn()}</a></p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        {/* Add Certificate */}
        <div class="modal fade" id="certificateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header border-0">
                        <i class="fas fa-times close-button" data-bs-dismiss="modal" aria-label="Close"></i>
                    </div>
                    <div class="modal-body">
                        <h5 class="modal-title text-center mb-4" id="exampleModalLabel">Add Certificate</h5>
                        <form onSubmit={(e) => { e.preventDefault(); uploadCertificats() }}>
                            <div class="mb-3">
                                <input type="text" class="form-control" placeholder="Name of certificate" value={nameCertificates} onChange={(e) => setNameCertificates(e.target.value)} required />
                            </div>
                            <div class="mb-3">
                                <input type="text" class="form-control" placeholder="Result" value={resultCertificates} onChange={(e) => NumberValidation(e.target.value) ? setResultCertificates(e.target.value) : ""} maxLength="3" required />
                            </div>
                            <div class="mb-3">
                                <select class="form-select" value={yearCertificates} onChange={(e) => setYearCertificates(e.target.value)} required>
                                    <option selected>Year Received</option>
                                    {createDropdown(props.graduationYear)}
                                </select>
                            </div>
                            <div class="mb-3">
                                <textarea class="form-control" placeholder="Sort Description" rows="4" value={descCertificates} onChange={(e) => setDescCertificates(e.target.value)}></textarea>
                            </div>
                            <div class="d-flex flex-column justify-content-center align-items-center py-3">
                                <div class="position-relative d-inline-block mb-3 cursor-pointer ">
                                    {fileCertificates ?
                                        <img class="attach-img" src={URL.createObjectURL(fileCertificates)} alt={`file found ${fileCertificates.name}`} />
                                        :
                                        <a class="cursor-pointer text-decoration-underline mb-3">Attach File</a>
                                    }
                                    <input type="file" class="attack-file" onChange={(e) => setFileCertificates(e.target.files[0])} />
                                </div>

                                {fileUploadLoading ?
                                    <BootstrapSpinner />
                                    : fileUploadDoneCertificate ? <button type="button" class="btn btn-primary px-5 py-2" data-bs-dismiss="modal" aria-label="Close" >Done</button>
                                        : <button type="submit" class="btn btn-primary px-5 py-2">ADD</button>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        {/* Add Academics */}
        <div class="modal fade" id="academicsModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header border-0">
                        <i class="fas fa-times close-button" data-bs-dismiss="modal" aria-label="Close"></i>
                    </div>
                    <div class="modal-body">
                        <h5 class="modal-title text-center mb-4" id="exampleModalLabel">Add Academics</h5>
                        <form onSubmit={(e) => { e.preventDefault(); uploadAcademics() }}>
                            <div class="mb-3">
                                <input type="text" class="form-control" placeholder="School" value={schoolAcademics} onChange={(e) => setSchoolAcademics(e.target.value)} required />
                            </div>
                            <div class="mb-3">
                                <select class="form-select" onChange={(e) => setLevelOfEduAcademics(e.target.value)} required>
                                    <option selected>Level of education</option>
                                    {createDropdown(props.educationLevel)}
                                </select>
                            </div>
                            <div class="mb-3">
                                <select class="form-select" onChange={(e) => setCountryAcademics(e.target.value)} required>
                                    <option selected>Country</option>
                                    {createDropdown(props.countries)}
                                </select>
                            </div>
                            <div class="mb-3">
                                <select class="form-select" value={yearAcademics} onChange={(e) => setYearAcademics(e.target.value)} required>
                                    <option selected>Year of graduation</option>
                                    {createDropdown(props.graduationYear)}

                                </select>
                            </div>
                            <div class="d-flex flex-column justify-content-center align-items-center py-3">
                                <div class="position-relative d-inline-block mb-3 cursor-pointer ">
                                    {fileAcademics ?
                                        <img class="attach-img" src={URL.createObjectURL(fileAcademics)} alt={`file found ${fileAcademics.name}`} />
                                        :
                                        <a class="cursor-pointer text-decoration-underline mb-3">Attach File</a>
                                    }
                                    <input type="file" class="attack-file" onChange={(e) => setFileAcademics(e.target.files[0])} />
                                </div>

                                {fileUploadLoading ?
                                    <BootstrapSpinner />
                                    : fileUploadDoneAcademic ? <button type="button" class="btn btn-primary px-5 py-2" data-bs-dismiss="modal" aria-label="Close">Done</button>
                                        : <button type="submit" class="btn btn-primary px-5 py-2">Add</button>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>


    </Container>

    )
}

SignUpPage.getInitialProps = async ctx => {
    let staticData = await agent.Common.staticData()
    return {
        ...staticData
    }
}
export default SignUpPage