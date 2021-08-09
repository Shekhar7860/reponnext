import router from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import agent from '../../../../utils/agent';
import { timestampToYyyyMmDd } from '../../../../utils/date_contant';
import language_contant from '../../../../utils/language_contant';
import PhoneInput from 'react-phone-input-2'
import { parseCookies, setCookie } from 'nookies';
import actions from '../../../../store/actions';
export default (props) => {
    console.log("Edit profile props", props);
    const GOOGLE_MAP_API_KEY = 'AIzaSyD0fo5KQH8GdSqFCEEIEZ-_uHQwg0YAaCY';

    const placeInputRef = useRef(null);

    const firstName = props.userDetail ? props.userDetail.first_name : ""
    const lastName = props.userDetail ? props.userDetail.last_name : ""
    const phoneNumberProps = props.userDetail ? props.userDetail.phone_number : ""
    const dobProps = props.userDetail ? props.userDetail.dob : null
    const emailProps = props.userDetail ? props.userDetail.email : ""
    const genderProps = props.userDetail ? props.userDetail.gender : ""
    const nationalityProps = props.userDetail ? props.userDetail.nationality : ""
    const languageProps = props.userDetail ? props.userDetail.language : ""
    const occupationProps = props.userDetail ? props.userDetail.occupation : ""
    const locationProps = props.userDetail ? props.userDetail.location : ""
    const countryCodeProps = props.userDetail ? props.userDetail.country_code : ""
    const countryProps = props.userDetail ? props.userDetail.country : ""
    const stateProps = props.userDetail ? props.userDetail.state : ""
    const cityProps = props.userDetail ? props.userDetail.city : ""
    const zipcodeProps = props.userDetail ? props.userDetail.zipcode : ""
    const latProps = props.userDetail ? props.userDetail.lat : ""
    const lngProps = props.userDetail ? props.userDetail.lng : ""
    const descriptionProps = props.userDetail ? props.userDetail.description : ""
    const profileImageProps = props.userDetail ? props.userDetail.profile_image : ""

    const [first_name, setFirstName] = useState(firstName)
    const [last_name, setLastName] = useState(lastName)
    const [dob, setDob] = useState(timestampToYyyyMmDd(dobProps))
    const [contact_number, setPhoneNumber] = useState(phoneNumberProps)
    const [email, setEmail] = useState(emailProps)
    const [gender, setGender] = useState(genderProps)
    const [nationality, setNationality] = useState(nationalityProps)
    const [language, setLanguage] = useState(languageProps)
    const [occupation, setOccupation] = useState(occupationProps)
    const [location, setLocation] = useState(locationProps)
    const [country_code, setCountryCode] = useState(countryCodeProps)
    const [country, setCountry] = useState(countryProps)
    const [country_state, setCountryState] = useState(stateProps)
    const [city, setCity] = useState(cityProps)
    const [zipcode, setZipCode] = useState(zipcodeProps)
    const [lat, setLatitude] = useState(latProps)
    const [lng, setLongitude] = useState(lngProps)
    const [description, setDescription] = useState(descriptionProps)
    const [loading, setLoading] = useState(false)
    const [place, setPlace] = useState(null);


    function getNationality(params) {
        const nationalityAPI = params ? params : []
        let rowData = []
        nationalityAPI.forEach(res => {
            rowData.push(<option value={res.id}>{res.name}</option>)
        });
        return rowData
    }
    function getLanguage(params) {
        const languagesAPI = params ? params : []
        let rowData = []
        languagesAPI.forEach(res => {
            rowData.push(<option value={res.id}>{res.name}</option>)
        });
        return rowData
    }
    function updateProfileNow() {
        setLoading(true)
        const token = props.user_info ? props.user_info.token : ""
        agent.setToken(token)
        const info = {
            "first_name": first_name,
            "last_name": last_name,
            "dob": timestampToYyyyMmDd(dob),
            "email": email,
            "country_code": country_code,
            "phone_number": Number(contact_number),
            "gender": gender,
            "occupation": Number(occupation),
            "nationality": Number(nationality),
            "language": Number(language),
            "address": location,
            "country": country,
            "state": country_state,
            "city": city,
            "zip": zipcode,
            "lat": lat,
            "lng": lng,
            "profile_image": profileImageProps,
            "description": description
        }
        agent.Profile.update(info).then(res => {
            setLoading(false)
            console.log("agent.Profile.update", res);
            setCookie(this, actions.GET_USER_INFO, JSON.stringify({
                user_info: {
                    token: token,
                    user: res.user
                }
            }), {
                maxAge: 30 * 24 * 60 * 60,
                path: "/",
            });
            router.back()
        }).catch(err => {
            setLoading(false)
        })
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
            setLocation(place.formatted_address)
            setLatitude(place.geometry.location.lat())
            setLongitude(place.geometry.location.lng())
            setCity(place.name)
            if (place.address_components.length > 0) {
                setCountry(place.address_components[place.address_components.length - 1].long_name)
                setCountryCode(place.address_components[place.address_components.length - 1].short_name)
            }
            if (place.address_components.length > 1) {
                setCountryState(place.address_components[place.address_components.length - 2].long_name)
            }
        });
    };

    useEffect(() => {
        loadGoogleMapScript(() => {
            initPlaceAPI()
        });
    }, []);
    return (
        <section>
            <div class="main-section">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8">
                            <div class="main-heading me-4">
                                <h2 class="sub-heading mb-0 fs-24">My Profile / Edit</h2>
                            </div>
                            <form onSubmit={(e) => { e.preventDefault(); updateProfileNow() }}>
                                <div class="row mt-5 justify-content-between">
                                    <div class="col-lg-5 col-md-6">
                                        <div class="mb-3 input-field">
                                            <label class="form-label">First Name</label>
                                            <input type="text" className="form-control input-space" placeholder="First Name" value={first_name} onChange={(e) => setFirstName(e.target.value)} />
                                            <div class="icon">
                                                <i class="fas fa-user"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-5 col-md-6">
                                        <div class="mb-3 input-field">
                                            <label class="form-label">Last Name</label>
                                            <input type="text" className="form-control input-space" placeholder="Last Name" value={last_name} onChange={(e) => setLastName(e.target.value)} />
                                            <div class="icon">
                                                <i class="fas fa-user"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-5 col-md-6">
                                        <div class="mb-3 input-field">
                                            <label class="form-label">Date of Birth</label>
                                            <input type="date" className="form-control input-space" placeholder="Post title" value={dob} onChange={(e) => setDob(e.target.value)} />
                                            <div class="icon">
                                                <i class="fas fa-calendar-day"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row justify-content-between">
                                    <div class="col-lg-5 col-md-6">
                                        <div class="mb-3 input-field">
                                            <label class="form-label">Email</label>
                                            <input type="text" className="form-control input-space" placeholder="Email Id" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            <div class="icon">
                                                <i class="fas fa-envelope"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-5 col-md-6">
                                        <div class="mb-3 input-field">
                                            <label class="form-label">Mobile No.</label>
                                            <PhoneInput
                                                country={'in'}
                                                value={`${contact_number}`}
                                                onChange={phone => { setPhoneNumber(phone) }}
                                                inputClass={"form-control input-space"}
                                            />
                                            {/* <input type="text" className="form-control input-space" placeholder="Phone Number" value={contact_number} onChange={(e) => setPhoneNumber(e.target.value)} /> */}
                                            {/* <div class="icon">
                                                <i class="fas fa-phone-alt"></i>
                                            </div> */}
                                        </div>
                                    </div>
                                    <div class="col-lg-5 col-md-6">
                                        <label class="form-label d-block">Gender</label>
                                        <div class="form-check form-check-inline me-3">
                                            <label class="form-label mb-0" for="male">Male</label>
                                            <input class="form-check-input me-2" type="radio" name="gender" id="male" value="male" onChange={(e) => setGender(e.target.value)} checked={gender === "male"} />
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <label class="form-label mb-0" for="female">Female</label>
                                            <input class="form-check-input me-2" type="radio" name="gender" id="female" value="female" onChange={(e) => setGender(e.target.value)} checked={gender === "female"} />
                                        </div>
                                    </div>
                                    <div class="col-lg-5 col-md-6">
                                        <div class="mb-3 input-field">
                                            <label class="form-label">Nationality</label>
                                            <select class="form-select" value={nationality} onChange={(e) => setNationality(e.target.value)}>
                                                <option value="">{language_contant.Common.selectNationality()}</option>
                                                {getNationality(props.nationalities)}
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-lg-5 col-md-6">
                                        <div class="mb-3 input-field">
                                            <label class="form-label">Address</label>
                                            <input type="text" className="form-control" placeholder={location} ref={placeInputRef} onChange={(e) => setLocation(e.target.value)} />
                                        </div>
                                    </div>
                                    <div class="col-lg-5 col-md-6">
                                        <div class="mb-3 input-field">
                                            <label class="form-label">Language</label>
                                            <select class="form-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
                                                <option value="">{language_contant.Common.selectLanguage()}</option>
                                                {getLanguage(props.languages)}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-4">
                                    {loading ?
                                        <button type="button" class="btn btn-primary" >
                                            <div class="spinner-border spinner-border-sm" role="status">
                                                <span class="visually-hidden">Loading...</span>
                                            </div>
                                        </button>
                                        : <button type="button" class="btn btn-primary px-5" onClick={() => updateProfileNow()}>UPDATE</button>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}