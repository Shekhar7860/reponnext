// import React from 'react'
// export default (props) => {

//     return (
//         <section>
//             <div>
//                 <div class="container">
//                     <div class="my-5">
//                         <div class="d-flex align-items-center">
//                             <img class="profile-rectangle me-3" src="/images/teacher_signup.jpg" />
//                             <div>
//                                 <h4 class="me-4 mb-0">Hyunwoong Kim (student)</h4>
//                                 <div class="d-flex align-items-center">
//                                     <img class="me-2" src="/images/icons/stars.jpg" />
//                                     <span class="text-yello fs-24">5.0</span>
//                                 </div>
//                             </div>
//                         </div>
//                         <div class="mt-5">
//                             <div class="main-heading me-4">
//                                 <h2 class="sub-heading mb-0 fs-24">Profile</h2>
//                             </div>
//                             <div class="row">
//                                 <div class="col-lg-4 col-md-6 mt-4">
//                                     <label class="form-label d-block"><img class="me-2" src="/images/icons/email.svg" />Email Id</label>
//                                     <span class="light-heading">hyunwoongkim123@gmail.com</span>
//                                 </div>
//                                 <div class="col-lg-4 col-md-6 mt-4">
//                                     <label class="form-label d-block"><img class="me-2" src="/images/icons/call.svg" />Mobile No.</label>
//                                     <span class="light-heading">+81-805-5582-296</span>
//                                 </div>
//                                 <div class="col-lg-4 col-md-6 mt-4">
//                                     <label class="form-label d-block"><img class="me-2" src="/images/icons/mars.svg" />Gender</label>
//                                     <span class="light-heading">Male</span>
//                                 </div>
//                                 <div class="col-lg-4 col-md-6 mt-4">
//                                     <label class="form-label d-block"><img class="me-2" src="/images/icons/pin.svg" />Location</label>
//                                     <span class="light-heading">258-1233, Sengari, Yuzawa-shi, Akita, Japan</span>
//                                 </div>
//                                 <div class="col-lg-4 col-md-6 mt-4">
//                                     <label class="form-label d-block"><img class="me-2" src="/images/icons/flag.svg" />Nationality</label>
//                                     <span class="light-heading">US</span>
//                                 </div>
//                                 <div class="col-lg-4 col-md-6 mt-4">
//                                     <label class="form-label d-block"><img class="me-2" src="/images/icons/language.svg" />Language</label>
//                                     <span class="light-heading">English, Japnese, Korean</span>
//                                 </div>
//                                 <div class="col-lg-4 col-md-6 mt-4">
//                                     <label class="form-label d-block"><img class="me-2" src="/images/icons/party.svg" />DOB</label>
//                                     <span class="light-heading">19/Apr/1995</span>
//                                 </div>
//                             </div>
//                         </div>
//                         <div class="mt-5">
//                             <div class="main-heading me-4">
//                                 <h2 class="sub-heading mb-0 fs-24">Profile Description</h2>
//                             </div>
//                             <p class="mt-4 mb-0">
//                                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vulputate tincidunt viverra. Vivamus suscipit nisl id nulla pulvinar, ut maximus ipsum vestibulum. Nulla leo massa, laoreet ut pharetra vel, viverra a mauris. Ut efficitur sodales sem sit amet porta. Vestibulum maximus maximus tincidunt.
//                             </p>
//                         </div>
//                         <div class="card mt-4">
//                             <div class="row justify-content-center g-0">
//                                 <div class="col">
//                                     <div class="card-body">
//                                         <div class="d-flex align-items-start">
//                                             <span class="certificate-text me-3">B.com</span>
//                                             <div class="d-flex flex-column flex-grow-1">
//                                                 {/* <div class="d-flex justify-content-between align-items-center"> */}
//                                                 <h5 class="mb-0">Arts and Humanity</h5>
//                                                 {/* </div> */}
//                                                 <b>Nihon University</b>
//                                                 <div class="d-flex justify-content-between align-items-end">
//                                                     <time class="time-text">2016</time>
//                                                     <span class="text-primary fs-20">50%</span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div class="col-auto">
//                                     <img class="documents" src="/images/teacher_signup.png" data-bs-toggle="modal" data-bs-target="#certificateModal" />
//                                 </div>
//                             </div>
//                         </div>
//                         <div class="card mt-4">
//                             <div class="row justify-content-center g-0">
//                                 <div class="col">
//                                     <div class="card-body">
//                                         <div class="d-flex align-items-start">
//                                             <span class="certificate-text me-3">B.com</span>
//                                             <div class="d-flex flex-column flex-grow-1">
//                                                 <div class="d-flex justify-content-between align-items-center">
//                                                     <h5 class="mb-0">Arts and Humanity</h5>
//                                                     <span class="text-black cursor-pointer space-nowrap"><i class="fas fa-pencil-alt me-2"></i>Edit</span>
//                                                 </div>
//                                                 <b>Nihon University</b>
//                                                 <div class="d-flex justify-content-between align-items-end">
//                                                     <time class="time-text">2016</time>
//                                                     <span class="text-primary fs-20">50%</span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div class="mt-5">
//                             <button type="button" class="btn btn-primary px-5 py-2 me-4">Back</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>


//             {/* Modals */}


//             <div class="modal fade" id="certificateModal" tabindex="-1" aria-hidden="true">
//                 <div class="modal-dialog modal-dialog-centered">
//                     <div class="modal-content">
//                         <div class="modal-header border-0">
//                         <i class="fas fa-times close-button" data-bs-dismiss="modal" aria-label="Close"></i>
//                         </div>
//                         <div class="modal-body">
//                             <img class="img-fluid" src="/images/teacher_signup.png" />
//                         </div>
//                     </div>
//                 </div>
//             </div>



//         </section>
//     )
// }
import React from 'react';
import Slider from "react-slick";
import agent from '../../../utils/agent';
import { manamusuDateFormatter } from '../../../utils/date_contant';
import { capitalizeFirstLetter } from '../../../utils/validation_contant';
class TeacherProfileLayout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalIcon: ""
        }
    }

    getAcademicList = (list) => {
        let rowData = []
        list.forEach(element => {
            // console.log("getAcademicList element", element);
            rowData.push(<div class="col-lg-6">
                <div class="card mt-4 shadow-lg">
                    <div class="row justify-content-center g-0">
                        <div class="col">
                            <div class="card-body">
                                <div class="d-flex align-items-start">
                                    <span class="certificate-text me-3">{this.getValueFromDropdown(this.props.educationLevel, element.level)}</span>
                                    <div class="d-flex flex-column flex-grow-1">
                                        <h5 class="mb-0">{this.getValueFromDropdown(this.props.educationLevel, element.level)}</h5>
                                        <b>{element.school}</b>
                                        <div class="d-flex justify-content-between align-items-center">
                                            <time class="time-text">{this.getValueFromDropdown(this.props.graduationYear, element.graduation_year)}</time>
                                            {/* <span class="text-primary fs-20">50%</span> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-auto" onClick={() => this.setState({ ...this.state, modalIcon: element.image })}>
                            <img class="documents" src={this.getProfileIconByUrl(element.image)} data-bs-toggle="modal" data-bs-target="#certificateModal" />
                        </div>
                    </div>
                </div>
            </div>
            )
        });
        return rowData
    }
    getCertificateList = (list) => {
        let rowData = []
        list.forEach(element => {
            // console.log("getCertificateList element", element);
            rowData.push(
                <div class="col-lg-6" onClick={() => this.setState({ ...this.state, modalIcon: element.image })} data-bs-toggle="modal" data-bs-target="#certificateModal">
                    <div class="card mt-4 shadow-lg">
                        <div class="card-body">
                            <div class="row justify-content-center g-0">
                                <div class="col">
                                    <div class="d-flex align-items-start">
                                        <span class="certificate-text me-3"><img src="/images/certificate.svg" width="50px" /></span>
                                        <div class="d-flex flex-column flex-grow-1">
                                            <h5 class="mb-0">{element.name}</h5>
                                            <time class="time-text my-1">{this.getValueFromDropdown(this.props.graduationYear, element.year)}</time>
                                            <p class="mb-0">{element.description}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-md-auto">
                                    <div class="d-flex flex-md-column justify-content-between h-100">
                                        <span class="text-black cursor-pointer space-nowrap"></span>
                                        <span class="text-primary fs-20">{element.result}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        });
        return rowData
    }
    getListOfRequest = (list) => {
        let rowData = []
        list.forEach(element => {
            console.log("getListOfRequest element", element);
            rowData.push(<div className="cursor-pointer" onClick={() => { this.props.router.push(`${this.props.userDetail.id}/request/${element.id}`) }}>
                <div class="card mb-0 mx-3 shadow-sm">
                    <div class="d-flex">
                        <img class="detail-img" src={this.getProfileIconByUrl(element.profile_image)} alt="" />
                        <div class="card-body">
                            <div class="d-flex flex-column">
                                <p class="detail-text  mb-0" >{capitalizeFirstLetter(element.title)}</p>
                                <time class="light-heading my-2">{manamusuDateFormatter(element.created_at)}</time>
                                <b class="text-third text-secondary">{this.getValueFromDropdown(this.props.subjects, element.subject)}</b>
                                <div>
                                    <img class="icon-size me-2" src="/images/home-page/class.svg" alt="" />
                                    <span class="text-third text-secondary">{this.getValueFromDropdown(this.props.teaching_standards, element.teaching_standard)}</span>
                                </div>
                                <div>
                                    <img class="icon-size me-2" src="/images/home-page/cash.svg" alt="" />
                                    <span class="text-third text-secondary">{element.currency} {element.hourly_rate}/hr</span>
                                </div>
                                <div>
                                    <img class="icon-size me-2" src="/images/home-page/user.svg" alt="" />
                                    <span class="text-third text-secondary">{capitalizeFirstLetter(element.first_name)} {capitalizeFirstLetter(element.last_name)}<span class="text-yello ms-2">(3.5/5)</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
        });
        return rowData
    }
    render() {
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: true,
                        arrows: false,
                        dots: true
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: true
                    }
                },
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: true
                    }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        };
        const { router, userDetail, languages, academics, certificates, requests } = this.props
        const { modalIcon } = this.state
        return (
            <section>
                <div>
                    <div class="container">
                        <div class="my-5">
                            <div class="d-flex align-items-center">
                                <img class="profile-rectangle me-3" src={this.getProfileIconByUrl(userDetail ? userDetail.profile_image : "")} />
                                <div>
                                    <h4 class="sub-heading me-4 mb-0">{userDetail ? capitalizeFirstLetter(userDetail.first_name) : ""} {userDetail ? capitalizeFirstLetter(userDetail.last_name) : ""}</h4>
                                    <div class="d-flex align-items-center mt-1">
                                        <div class="rating">
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <span class="text-yello fs-24 ms-2">5.0</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-5">
                                <div class="main-heading me-4">
                                    <h2 class="sub-heading mb-0 fs-24">Profile Description</h2>
                                </div>
                                <p class="mt-4 mb-0">
                                    {userDetail ? userDetail.description : ""}
                                </p>
                                <div class="mt-4">
                                    <img class="icon-size me-2" src="/images/icons/flag.svg" />
                                    <span class="form-label">{userDetail ? userDetail.location : ""}</span>
                                </div>
                                <div class="mt-4">
                                    <img class="icon-size me-2" src="/images/icons/language.svg" />
                                    <span class="form-label">{this.getValueFromDropdown(languages, userDetail ? userDetail.language : "")}</span>
                                </div>
                                <div class="mt-4">
                                    <img class="icon-size me-2" src="/images/icons/mars.svg" />
                                    <span class="form-label">{userDetail ? (userDetail.gender) ? userDetail.gender : "Not available" : "Not available"}</span>
                                </div>
                            </div>
                            <div class="mt-4">
                                <div class="d-flex justify-content-between flex-wrap">
                                    <div class="main-heading me-4 mt-4">
                                        <h2 class="sub-heading mb-0 fs-24">Academic History</h2>
                                    </div>
                                    <span class="text-primary cursor-pointer space-nowrap fs-18 mt-4">View All<i class="fas fa-chevron-right fs-12 ms-2"></i></span>
                                </div>
                                <div class="row">
                                    {this.getAcademicList(academics ? academics : [])}
                                </div>
                            </div>
                            <div class="mt-4">
                                <div class="d-flex justify-content-between flex-wrap">
                                    <div class="main-heading me-4 mt-4">
                                        <h2 class="sub-heading mb-0 fs-24">Certificate</h2>
                                    </div>
                                    <span class="text-primary cursor-pointer space-nowrap fs-18 mt-4">View All<i class="fas fa-chevron-right fs-12 ms-2"></i></span>
                                </div>
                                <div class="row">
                                    {this.getCertificateList(certificates ? certificates : [])}
                                </div>
                            </div>
                            <div class="mt-4">
                                <div class="d-flex justify-content-between flex-wrap">
                                    <div class="main-heading me-4 mt-4">
                                        <h2 class="sub-heading mb-0 fs-24">Requests</h2>
                                    </div>
                                    <span class="text-primary cursor-pointer space-nowrap fs-18 mt-4">View All<i class="fas fa-chevron-right fs-12 ms-2"></i></span>
                                </div>
                                <div class="mt-4">
                                    <Slider {...settings}>
                                        {this.getListOfRequest(requests ? requests : [])}
                                    </Slider>
                                </div>
                            </div>

                            {/* Reviews */}

                            <div class="mt-5">
                                <div class="main-heading me-4 mt-4">
                                    <h2 class="sub-heading mb-0 fs-24">Reviews<span class="ms-2 text-light">(146)</span></h2>
                                </div>
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="card mt-4 shadow-lg">
                                            <div class="card-body">
                                                <div class="row justify-content-center g-0">
                                                    <div class="col">
                                                        <div class="d-flex align-items-start">
                                                            <img class="certificate-text me-3" src="/images/teacher_signup.jpg" />
                                                            <div class="d-flex flex-column flex-grow-1">
                                                                <div class="d-flex align-items-center justify-content-between flex-wrap">
                                                                    <div class="d-flex align-items-center flex-wrap">
                                                                        <h5 class="mb-0 me-2">Lucy Pots</h5>
                                                                        <div class="rating">
                                                                            <i class="fas fa-star"></i>
                                                                            <i class="fas fa-star"></i>
                                                                            <i class="fas fa-star"></i>
                                                                            <i class="fas fa-star"></i>
                                                                            <i class="fas fa-star"></i>
                                                                            <span class="text-yello fs-12 ms-2">5.0</span>
                                                                        </div>
                                                                    </div>
                                                                    <time class="small">June 2020</time>
                                                                </div>
                                                                <p class="text-light mt-2 mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ullamcorper ex sed libero egestas, in ultricies urna sollicitudin.Suspendisse non interdum lacus, in hendrerit lacus.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="card mt-4 shadow-lg">
                                            <div class="card-body">
                                                <div class="row justify-content-center g-0">
                                                    <div class="col">
                                                        <div class="d-flex align-items-start">
                                                            <img class="certificate-text me-3" src="/images/teacher_signup.jpg" />
                                                            <div class="d-flex flex-column flex-grow-1">
                                                                <div class="d-flex align-items-center justify-content-between flex-wrap">
                                                                    <div class="d-flex align-items-center flex-wrap">
                                                                        <h5 class="mb-0 me-2">Lucy Pots</h5>
                                                                        <div class="rating">
                                                                            <i class="fas fa-star"></i>
                                                                            <i class="fas fa-star"></i>
                                                                            <i class="fas fa-star"></i>
                                                                            <i class="fas fa-star"></i>
                                                                            <i class="fas fa-star"></i>
                                                                            <span class="text-yello fs-12 ms-2">5.0</span>
                                                                        </div>
                                                                    </div>
                                                                    <time class="small">June 2020</time>
                                                                </div>
                                                                <p class="text-light mt-2 mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ullamcorper ex sed libero egestas, in ultricies urna sollicitudin.Suspendisse non interdum lacus, in hendrerit lacus.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="card mt-4 shadow-lg">
                                            <div class="card-body">
                                                <div class="row justify-content-center g-0">
                                                    <div class="col">
                                                        <div class="d-flex align-items-start">
                                                            <img class="certificate-text me-3" src="/images/teacher_signup.jpg" />
                                                            <div class="d-flex flex-column flex-grow-1">
                                                                <div class="d-flex align-items-center justify-content-between flex-wrap">
                                                                    <div class="d-flex align-items-center flex-wrap">
                                                                        <h5 class="mb-0 me-2">Lucy Pots</h5>
                                                                        <div class="rating">
                                                                            <i class="fas fa-star"></i>
                                                                            <i class="fas fa-star"></i>
                                                                            <i class="fas fa-star"></i>
                                                                            <i class="fas fa-star"></i>
                                                                            <i class="fas fa-star"></i>
                                                                            <span class="text-yello fs-12 ms-2">5.0</span>
                                                                        </div>
                                                                    </div>
                                                                    <time class="small">June 2020</time>
                                                                </div>
                                                                <p class="text-light mt-2 mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ullamcorper ex sed libero egestas, in ultricies urna sollicitudin.Suspendisse non interdum lacus, in hendrerit lacus.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="card mt-4 shadow-lg">
                                            <div class="card-body">
                                                <div class="row justify-content-center g-0">
                                                    <div class="col">
                                                        <div class="d-flex align-items-start">
                                                            <img class="certificate-text me-3" src="/images/teacher_signup.jpg" />
                                                            <div class="d-flex flex-column flex-grow-1">
                                                                <div class="d-flex align-items-center justify-content-between flex-wrap">
                                                                    <div class="d-flex align-items-center flex-wrap">
                                                                        <h5 class="mb-0 me-2">Lucy Pots</h5>
                                                                        <div class="rating">
                                                                            <i class="fas fa-star"></i>
                                                                            <i class="fas fa-star"></i>
                                                                            <i class="fas fa-star"></i>
                                                                            <i class="fas fa-star"></i>
                                                                            <i class="fas fa-star"></i>
                                                                            <span class="text-yello fs-12 ms-2">5.0</span>
                                                                        </div>
                                                                    </div>
                                                                    <time class="small">June 2020</time>
                                                                </div>
                                                                <p class="text-light mt-2 mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ullamcorper ex sed libero egestas, in ultricies urna sollicitudin.Suspendisse non interdum lacus, in hendrerit lacus.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-4 text-center text-md-start">
                                <button type="button" class="btn btn-outline-primary px-5 py-2">Show All reviews</button>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Modals */}


                <div class="modal fade" id="certificateModal" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header border-0">
                                <i class="fas fa-times close-button" data-bs-dismiss="modal" aria-label="Close"></i>
                            </div>
                            <div class="modal-body">
                                <img class="img-fluid" src={this.getProfileIconByUrl(modalIcon)} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )

    }
    getValueFromDropdown = (list, key) => {
        const lisItems = list ? list : []
        let subjectArr = lisItems.filter(res => res.id == key)
        if (subjectArr.length > 0) {
            return subjectArr[0].name ? subjectArr[0].name : subjectArr[0].year
        } else {
            return key
        }
    }
    getProfileIconByUrl = (profile_image) => {
        return profile_image ? `${agent.API_FILE_ROOT_MEDIUM}${profile_image}` : "/images/student_profile.svg"
    }
    componentDidMount() {

    }
}
export default TeacherProfileLayout
