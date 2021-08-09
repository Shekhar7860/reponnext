import React from 'react'
import PhoneInput from 'react-phone-input-2';
import styles from './Contact.module.scss';
import BootstrapSpinner from '../../ui/spinner/BootstrapSpinner';
import { validateEmail } from '../../../utils/validation_regex';
import agent from '../../../utils/agent';

var myIndex = 0;

class ContactLayout extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            full_name: "",
            email: "",
            contact_number: "",
            dialCode: "",
            message: "",
            loading: false,
            error_info: { name: "", msg: "" }
        }
    }

    setMyState = (name, value) => {
        this.setState({
            ...this.state,
            [name]: value,
            error_info: { name: "", msg: "" }
        })
    }
    onSubmitForm = () => {
        const { full_name, email, dialCode, contact_number, message } = this.state

        const item = {
            name: full_name,
            email: email,
            country_code: `+${dialCode}`,
            phone_number: contact_number,
            message: message
        }
        // if (full_name) {
        if (validateEmail(email)) {
            this.setState({
                ...this.state,
                loading: true
            }, () => {
                agent.Common.createContactUs(item).then(res => {
                    console.log("createContactUs res", res);
                    this.setState({
                        ...this.state,
                        full_name: "",
                        email: "",
                        email: "",
                        dialCode: "",
                        contact_number: "",
                        message: "",
                        loading: false
                    })
                    document.getElementById("closeContactUsModal").click()
                }).catch(err => {
                    this.setState({
                        ...this.state,
                        loading: false
                    })
                })
            })
        } else {
            this.setState({
                ...this.state,
                error_info: { name: "email", msg: "Invalid Email Id" }
            })
        }

        // } else {
        //     this.setState({
        //         ...this.state,
        //         error_info: { name: "full_name", msg: "This field required !" }
        //     })
        // }

    }
    render() {
        const { full_name, email, contact_number, message, loading, error_info } = this.state
        return (
            <section class="contact">
                <div class={styles.contactBanner}>
                    <img class="slides-img" src="/images/contact_us/contact_us_two.png" />
                    <img class="slides-img" src="/images/contact_us/contact_us_one.png" />
                    <img class="slides-img" src="/images/contact_us/contact_us_three.png" />
                    <div class="container z1">
                        <div class="row justify-content-between align-items-center">
                            <div class="col-lg-4 col-md-6">
                                <h1 class="banner-heading">Get in touch</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                <button type="button" class="btn btn-primary btn-round px-5 py-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Contact Us</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container py-5">
                    <h2 class="primary-heading mb-5">Frequently Asked Questions</h2>
                    <div class="accordion" id="accordionExample">
                        <div class={`accordion-item mb-4 shadow ${styles.contact_accordian}`}>
                            <div class="accordion-header " id="headingOne">
                                <div class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                    <h5 class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit?</h5>
                                </div>
                            </div>
                            <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div class="accordion-body pt-0">
                                    <p class="text-light">
                                        Aenean quis felis tempor, cursus nisi sit amet, tempor nulla. Curabitur pellentesque diam vitae ipsum facilisis, in tempor risus euismod. Nullam non eleifend erat. Phasellus scelerisque suscipit dolor sed convallis. Pellentesque a velit ut sem iaculis imperdiet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi sed erat laoreet mi pellentesque fermentum. Aenean a augue et urna ornare tincidunt. Nulla nec auctor ante, non pellentesque sapien. Vestibulum sed auctor arcu, at facilisis ex. Morbi tempus felis a velit viverra ultricies. Suspendisse fermentum magna vitae dolor eleifend lacinia.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class={`accordion-item mb-4 shadow ${styles.contact_accordian}`}>
                            <div class="accordion-header" id="headingTwo">
                                <div class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    <h5 class="mb-0">Nunc ultrices nisi et finibus vehicular?</h5>
                                </div>
                            </div>
                            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div class="accordion-body pt-0">
                                    <p class="text-light">
                                        Aenean quis felis tempor, cursus nisi sit amet, tempor nulla. Curabitur pellentesque diam vitae ipsum facilisis, in tempor risus euismod. Nullam non eleifend erat. Phasellus scelerisque suscipit dolor sed convallis. Pellentesque a velit ut sem iaculis imperdiet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi sed erat laoreet mi pellentesque fermentum. Aenean a augue et urna ornare tincidunt. Nulla nec auctor ante, non pellentesque sapien. Vestibulum sed auctor arcu, at facilisis ex. Morbi tempus felis a velit viverra ultricies. Suspendisse fermentum magna vitae dolor eleifend lacinia.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class={`accordion-item mb-4 shadow ${styles.contact_accordian}`}>
                            <div class="accordion-header" id="headingThree">
                                <div class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    <h5 class="mb-0">Sed accumsan scelerisque nibh, ac congue lacus consequat et?</h5>
                                </div>
                            </div>
                            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                <div class="accordion-body pt-0">
                                    <p class="text-light">
                                        Aenean quis felis tempor, cursus nisi sit amet, tempor nulla. Curabitur pellentesque diam vitae ipsum facilisis, in tempor risus euismod. Nullam non eleifend erat. Phasellus scelerisque suscipit dolor sed convallis. Pellentesque a velit ut sem iaculis imperdiet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi sed erat laoreet mi pellentesque fermentum. Aenean a augue et urna ornare tincidunt. Nulla nec auctor ante, non pellentesque sapien. Vestibulum sed auctor arcu, at facilisis ex. Morbi tempus felis a velit viverra ultricies. Suspendisse fermentum magna vitae dolor eleifend lacinia.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                {/* modal */}

                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header border-0">
                                <i id="closeContactUsModal" class="fas fa-times close-button" data-bs-dismiss="modal" aria-label="Close"></i>
                            </div>
                            <form onSubmit={(e) => { e.preventDefault(); this.onSubmitForm() }}>
                                <div class="modal-body">
                                    <h5 class="modal-title text-center mb-4" id="exampleModalLabel">Contact Us</h5>

                                    <div class="mb-3">
                                        <label for="exampleFormControlInput1" class="form-label">Full Name</label>
                                        <input type="text" class={`form-control ${(error_info.name === "full_name" && error_info.msg) ? "is-invalid" : ""}`} id="exampleFormControlInput1" placeholder="Enter Your Name" name="full_name" value={full_name} onChange={(e) => this.setMyState(e.target.name, e.target.value)} />
                                        {(error_info.name === "full_name" && error_info.msg)
                                            ? <div class="invalid-feedback">
                                                {error_info.msg}
                                            </div>
                                            : <></>
                                        }
                                    </div>

                                    <div class="mb-3">
                                        <label for="exampleFormControlInput1" class="form-label">Email</label>
                                        <input type="email" class={`form-control ${(error_info.name === "email" && error_info.msg) ? "is-invalid" : ""}`} id="exampleFormControlInput1" placeholder="Enter Email Address" name="email" value={email} onChange={(e) => this.setMyState(e.target.name, e.target.value)} />
                                        {(error_info.name === "email" && error_info.msg)
                                            ? <div class="invalid-feedback">
                                                {error_info.msg}
                                            </div>
                                            : <></>
                                        }
                                    </div>

                                    <div class="mb-3">
                                        <label for="exampleFormControlInput1" class="form-label">Contact Number</label>
                                        <PhoneInput
                                            country={'in'}
                                            value={`${contact_number}`}
                                            onChange={(phone, country) => { this.setState({ ...this.state, dialCode: country.dialCode, contact_number: phone }) }}
                                            inputClass={"form-control"}
                                        />
                                    </div>

                                    <div class="mb-3">
                                        <label for="exampleFormControlTextarea1" class="form-label">Message</label>
                                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="message" value={message} onChange={(e) => this.setMyState(e.target.name, e.target.value)}></textarea>
                                    </div>
                                    <div class="text-center py-3">
                                        {loading ? <BootstrapSpinner /> :
                                            <button type="submit" class="btn btn-primary px-5 py-2">SUBMIT</button>
                                        }
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </section>
        )
    }
    carousel = () => {
        console.log("carousel called");
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
                setTimeout(this.carousel, 3000);
            }
        }
    }
    componentDidMount() {
        this.carousel()
    }
}
export default ContactLayout