import axios from "axios";
import React from "react"
import agent from "../../../utils/agent"
import { dateFormatterByDate } from "../../../utils/date_contant";
import language_contant from "../../../utils/language_contant";
import { capitalizeFirstLetter, NumberValidation } from "../../../utils/validation_contant";
import BootstrapSpinner from "../../ui/spinner/BootstrapSpinner";

const staticCertificateState = {
    user_id: 0,
    certificate_name: "",
    certificate_id: 0,
    result: "",
    year: "",
    description: "",
    image: ""
}
const staticAcademicState = {
    user_id: 0,
    academic_id: 0,
    school: "",
    level: 0,
    country: 0,
    year: 0,
    image: ""
}
class MyProfileLayout extends React.Component {
    constructor(props) {
        super(props)
        console.log("MyProfileLayout props", props);
        this.state = {
            token: props.user_info ? props.user_info.token : null,
            description: null,
            tempDescription: "",
            list: [],
            subjects: [],
            academics: [],
            certificates: [],
            error_info: { name: "", msg: "" },
            academicItem: staticAcademicState,
            certificateItem: staticCertificateState,
            selectedFile: null,
            loading: false,
            uploading: false,
            success: ""
        }
    }
    goToLink = (params) => {
        this.props.router.push(`/${this.props.router.query.lang}/${params}`)
    }
    setMyState = async (name, value) => {
        this.setState({
            ...this.state,
            [name]: value,
            error_info: { name: "", msg: "" },
        })
    }
    setAcademicData = (name, value) => {
        const { academicItem } = this.state
        let temp = academicItem
        temp[name] = value
        this.setMyState("academicItem", temp)
    }
    setCertificateData = (name, value) => {
        const { certificateItem } = this.state
        let temp = certificateItem
        temp[name] = value
        this.setMyState("certificateItem", temp)
    }
    resetAcademicData = async () => {
        this.setState({
            ...this.state,
            academicItem: {
                user_id: 0,
                academic_id: 0,
                school: "",
                level: 0,
                country: 0,
                year: 0,
                image: ""
            },
            selectedFile: null,
            success: "",
        })
    }
    resetCertificateData = async () => {
        this.setState({
            ...this.state,
            certificateItem: {
                user_id: 0,
                certificate_name: "",
                certificate_id: 0,
                result: "",
                year: "",
                description: "",
                image: ""
            },
            selectedFile: null,
            success: "",
        })
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

    getValueFromDropdownCountry = (list, key) => {
        const lisItems = list ? list : []
        let subjectArr = lisItems.filter(res => res.id == key)
        if (subjectArr.length > 0) {
            return subjectArr[0].year
        } else {
            return key
        }
    }
    getAcademicsList = () => {
        const { academics } = this.state
        const items = academics ? academics : []
        let rowData = []
        items.forEach(element => {
            rowData.push(<div class="card mt-4">
                <div class="row g-0">
                    <div class="col">
                        <div class="card-body">
                            <div class="d-flex align-items-start">
                                <span class="certificate-text me-3">{this.getValueFromDropdown(this.props.educationLevel, element.level)}</span>
                                <div class="d-flex flex-column flex-grow-1">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <h5 class="mb-0">{this.getValueFromDropdown(this.props.educationLevel, element.level)}</h5>
                                        {element.id ?
                                            <span class="text-black cursor-pointer space-nowrap" data-bs-toggle="modal" data-bs-target="#editAcademicsModal" onClick={() => this.initialiseEditAcademic(element)}><i class="fas fa-pencil-alt me-2"></i>{language_contant.Common.edit()}</span>
                                            : <></>}
                                    </div>
                                    <b>{element.school}</b>
                                    <div class="d-flex justify-content-between align-items-end">
                                        <time class="time-text">{this.getValueFromDropdown(this.props.graduationYear, element.graduation_year)}</time>
                                        <span class="text-primary fs-20">{this.getValueFromDropdown(this.props.countries, element.country)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {element.image ?
                        <div class="col-auto">
                            <div class="h-100">
                                <img class="documents" src={`${agent.API_FILE_ROOT_SMALL}${element.image}`} alt={`file found ${element.image}`} />
                            </div>
                        </div>
                        : <></>}
                </div>
            </div>
            )
        });
        return rowData
    }
    getCertificatesList = () => {
        const { certificates } = this.state
        const items = certificates ? certificates : []
        let rowData = []
        items.forEach(element => {
            rowData.push(<div class="card mt-4">
                <div class="row g-0">
                    <div class="col">
                        <div class="card-body">
                            <div class="d-flex align-items-start">
                                <span class="certificate-text me-3"><img src="/images/certificate.svg" width="50px"/></span>
                                <div class="d-flex flex-column flex-grow-1">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <h5 class="mb-0">{element.name}</h5>
                                        {element.id ?
                                            <span class="text-black cursor-pointer space-nowrap" data-bs-toggle="modal" data-bs-target="#editCertificateModal" onClick={() => this.initialiseEditCertificate(element)}><i class="fas fa-pencil-alt me-2"></i>{language_contant.Common.edit()}</span>
                                            : <></>}
                                    </div>
                                    <time class="time-text">{this.getValueFromDropdown(this.props.graduationYear, element.year)}</time>
                                    <div class="d-flex justify-content-between align-items-end">
                                        <p>{element.description}</p>
                                        <span class="text-primary fs-20">{element.result}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {element.image ?
                        <div class="col-auto">
                            <div class="h-100">
                                <img class="documents" src={`${agent.API_FILE_ROOT_SMALL}${element.image}`} alt={`file found ${element.image}`} />
                            </div>
                        </div>
                        : <></>}
                </div>
            </div>
            )
        });
        return rowData
    }
    createDropdown = (params) => {
        const items = params ? params : []
        let rowData = []
        items.forEach((element, index) => {
            rowData.push(<option key={index} value={`${element.id}`}>{element.name ? element.name : element.year}</option>)
        });
        return rowData
    }


    fileUploadToAws = async (file) => {
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
    initialiseEditAcademic = (element) => {
        console.log("initialiseEditAcademic element", element);
        const { academicItem, academics } = this.state
        let temp = academicItem
        temp.country = element.country;
        temp.year = element.graduation_year;
        temp.academic_id = element.id;
        temp.image = element.image;
        temp.level = element.level;
        temp.school = element.school;
        temp.user_id = element.user_id
        this.setState({
            ...this.state,
            academicItem: temp
        })
    }
    initialiseEditCertificate = (element) => {
        console.log("initialiseEditAcademic element", element);
        const { certificateItem, certificates } = this.state
        let temp = certificateItem
        temp.certificate_id = element.id;
        temp.certificate_name = element.name;
        temp.description = element.description;
        temp.image = element.image;
        temp.result = element.result;
        temp.year = element.year;
        temp.user_id = element.user_id
        this.setState({
            ...this.state,
            academicItem: temp
        })
    }
    render() {
        const { userDetail, graduationYear, languages, nationalities, countries, educationLevel } = this.props
        const { error_info, description, tempDescription, selectedFile, loading, academicItem, certificateItem, success } = this.state
        return <>
            <div>
                <div class="d-flex justify-content-between align-items-center flex-wrap">
                    <div class="d-flex align-items-center mt-2 mt-sm-0">
                        <div class="main-heading me-4">
                            <h2 class="sub-heading mb-0 fs-24">{language_contant.Common.profile()}</h2>
                        </div>
                        <span class="text-primary cursor-pointer space-nowrap" onClick={() => this.goToLink("profile/edit")}><i class="fas fa-pencil-alt me-2"></i>{language_contant.Common.edit()}</span>
                    </div>
                    {(userDetail ? userDetail.user_type : 0) === 1 ?
                        <button type="button" class="btn btn-primary px-4 py-2 mt-2 mt-sm-0" onClick={() => this.goToLink("create-request")}>{language_contant.Common.createRequest()}</button>
                        : <button type="button" class="btn btn-primary px-4 py-2 mt-2 mt-sm-0" onClick={() => this.goToLink("create-post")}>{language_contant.Common.createPost()}</button>
                    }
                </div>
                <div class="row">
                    <div class="col-md-6 mt-4">
                        <label class="form-label d-block"><i class="fas fa-user me-2 text-primary"></i>{language_contant.Common.name()}</label>
                        <span class="light-heading">{this.props.userDetail ? `${capitalizeFirstLetter(this.props.userDetail.first_name)} ${capitalizeFirstLetter(this.props.userDetail.last_name)}` : "Hyunwoong Kim"}</span>
                    </div>
                    <div class="col-md-6 mt-4">
                        <label class="form-label d-block"><img class="icon-size me-2" src="/images/icons/party.svg" />{String(language_contant.Common.dob()).toUpperCase()}</label>
                        <span class="light-heading">{this.props.userDetail ? `${(dateFormatterByDate(this.props.userDetail.dob) === "01/01/2000") ? "Not available" : dateFormatterByDate(this.props.userDetail.dob)}` : "Not available"}</span>
                    </div>
                    <div class="col-md-6 mt-4">
                        <label class="form-label d-block"><img class="icon-size me-2" src="/images/icons/email.svg" />{language_contant.Common.email()}</label>
                        <span class="light-heading">{this.props.userDetail ? this.props.userDetail.email : "Not available"}</span>
                    </div>
                    <div class="col-md-6 mt-4">
                        <label class="form-label d-block"><img class="icon-size me-2" src="/images/icons/call.svg" />{language_contant.Common.contactNumber()}</label>
                        <span class="light-heading">{this.props.userDetail ? `+${this.props.userDetail.phone_number}` : "Not available"}</span>
                    </div>
                    <div class="col-md-6 mt-4">
                        <label class="form-label d-block"><img class="icon-size me-2" src="/images/icons/mars.svg" />{language_contant.Common.gender()}</label>
                        <span class="light-heading">{this.props.userDetail ? capitalizeFirstLetter(this.props.userDetail.gender ? this.props.userDetail.gender : "Not available") : "Not available"}</span>
                    </div>
                    <div class="col-md-6 mt-4">
                        <label class="form-label d-block"><img class="icon-size me-2" src="/images/icons/flag.svg" />{language_contant.Common.nationality()}</label>
                        <span class="light-heading">{this.getSingleValueFromGivenList(this.props.nationalities, userDetail ? userDetail.nationality : "")}</span>
                    </div>
                    <div class="col-md-6 mt-4">
                        <label class="form-label d-block"><img class="icon-size me-2" src="/images/icons/pin.svg" />{language_contant.Common.location()}</label>
                        <span class="light-heading">{this.props.userDetail ? this.props.userDetail.location : "Not available"}</span>
                    </div>
                    <div class="col-md-6 mt-4">
                        <label class="form-label d-block"><img class="icon-size me-2" src="/images/signup_login/language.svg" />{language_contant.Common.language()}</label>
                        <span class="light-heading">{this.getSingleValueFromGivenList(this.props.languages, userDetail ? userDetail.language : "")}</span>
                    </div>
                </div>
            </div>

            <div>
                <div class="d-flex align-items-center mt-5">
                    <div class="main-heading me-4">
                        <h2 class="sub-heading mb-0 fs-24">{language_contant.Common.profileDescription()}</h2>
                    </div>
                    <span class="text-primary cursor-pointer space-nowrap" data-bs-toggle="modal" data-bs-target="#editDesctiptionModal"><i class="fas fa-pencil-alt me-2"></i>{language_contant.Common.edit()}</span>
                </div>
                <p class="mt-4">{description ? description : userDetail ? userDetail.description : ""}</p>
            </div>
            <div>
                <div class="d-flex justify-content-between align-items-center flex-wrap mt-4">
                    <div class="main-heading me-5 mt-4">
                        <h2 class="sub-heading mb-0 fs-24">{language_contant.Common.academicHistory()}</h2>
                    </div>
                    <span class="text-primary cursor-pointer space-nowrap fs-20 mt-4" data-bs-toggle="modal" data-bs-target="#academicsModal" onClick={() => this.resetAcademicData()}>+ {language_contant.Common.addAcademics()}</span>
                </div>
                {this.getAcademicsList()}
            </div>
            <div>
                <div class="d-flex justify-content-between align-items-center flex-wrap mt-4">
                    <div class="main-heading me-5 mt-4">
                        <h2 class="sub-heading mb-0 fs-24">{language_contant.Common.certificates()}</h2>
                    </div>
                    <span class="text-primary cursor-pointer space-nowrap fs-20 mt-4" data-bs-toggle="modal" data-bs-target="#certificateModal" onClick={() => this.resetCertificateData()}>+ {language_contant.Common.addCertificates()}</span>
                </div>
                {this.getCertificatesList()}
            </div>

            {/* Edit Desctiption */}
            <div class="modal fade" id="editDesctiptionModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header border-0">
                            <i class="fas fa-times close-button" data-bs-dismiss="modal" aria-label="Close"></i>
                        </div>
                        <div class="modal-body">
                            <h5 class="modal-title text-center mb-4" id="exampleModalLabel">Edit Description</h5>
                            <form onSubmit={(e) => { e.preventDefault(); }}>
                                <div class="mb-3">
                                    <textarea className={`form-control ${(error_info.name === "description" && error_info.msg) ? "is-invalid" : ""}`} id="exampleFormControlTextarea1" rows="3" placeholder={language_contant.Common.writeHere()} name="tempDescription" value={tempDescription ? tempDescription : userDetail ? userDetail.description : ""} onChange={(e) => this.setMyState(e.target.name, e.target.value)}></textarea>
                                    {(error_info.name === "description" && error_info.msg)
                                        ? <div class="invalid-feedback">
                                            {error_info.msg}
                                        </div>
                                        : <></>
                                    }
                                    <div class="d-flex flex-column justify-content-center align-items-center py-3">
                                        <button type="button" class="btn btn-primary px-5 py-2" data-bs-dismiss="modal" aria-label="Close" onClick={() => this.updateProfileDescription()} >UPDATE</button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
            {/* Edit Desctiption */}

            {/* Add Academics */}
            <div class="modal fade" id="academicsModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header border-0">
                            <i class="fas fa-times close-button" data-bs-dismiss="modal" aria-label="Close"></i>
                        </div>
                        <div class="modal-body">
                            <h5 class="modal-title text-center mb-4" id="exampleModalLabel">Add Academics</h5>
                            <form onSubmit={(e) => { e.preventDefault(); this.prepareAcademics("create") }}>

                                <div class="mb-3">
                                    <select class="form-select" value={academicItem.level} name="level" onChange={(e) => this.setAcademicData(e.target.name, e.target.value)} required>
                                        <option selected>Level of education</option>
                                        {this.createDropdown(educationLevel)}
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <input type="text" class="form-control" placeholder="School" name="school" value={academicItem.school} onChange={(e) => this.setAcademicData(e.target.name, e.target.value)} required />
                                </div>
                                <div class="mb-3">
                                    <select class="form-select" value={academicItem.country} name="country" onChange={(e) => this.setAcademicData(e.target.name, e.target.value)} required>
                                        <option selected>Country</option>
                                        {this.createDropdown(countries)}
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <select class="form-select" value={academicItem.year} name="year" onChange={(e) => this.setAcademicData(e.target.name, e.target.value)} required>
                                        <option selected>Year of graduation</option>
                                        {this.createDropdown(graduationYear)}

                                    </select>
                                </div>
                                <div class="d-flex flex-column justify-content-center align-items-center py-3">
                                    <div class="position-relative d-inline-block mb-3 cursor-pointer ">
                                        {selectedFile ?
                                            <img class="attach-img" src={URL.createObjectURL(selectedFile)} alt={`file found ${selectedFile.name}`} />
                                            :
                                            <a class="cursor-pointer text-decoration-underline mb-3">Attach File</a>
                                        }
                                        <input type="file" class="attack-file" onChange={(e) => this.setMyState("selectedFile", e.target.files[0])} />

                                    </div>
                                    {loading ?
                                        <BootstrapSpinner />
                                        : <button type="submit" class="btn btn-primary px-5 py-2">ADD</button>}
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
            {/* Add Academics */}
            {/* Edit Academics */}
            <div class="modal fade" id="editAcademicsModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header border-0">
                            <i id="closeAcademicModal" class="fas fa-times close-button" data-bs-dismiss="modal" aria-label="Close"></i>
                        </div>
                        <div class="modal-body">
                            <h5 class="modal-title text-center mb-4" id="exampleModalLabel">Edit Academics</h5>
                            <form onSubmit={(e) => { e.preventDefault(); this.prepareAcademics("update") }}>
                                <div class="mb-3">
                                    <select class="form-select" value={academicItem.level} name="level" onChange={(e) => this.setAcademicData(e.target.name, e.target.value)} required>
                                        <option selected>Level of education</option>
                                        {this.createDropdown(educationLevel)}
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <input type="text" class="form-control" placeholder="School" name="school" value={academicItem.school} onChange={(e) => this.setAcademicData(e.target.name, e.target.value)} required />
                                </div>
                                <div class="mb-3">
                                    <select class="form-select" value={academicItem.country} name="country" onChange={(e) => this.setAcademicData(e.target.name, e.target.value)} required>
                                        <option selected>Country</option>
                                        {this.createDropdown(countries)}
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <select class="form-select" value={academicItem.year} name="year" onChange={(e) => this.setAcademicData(e.target.name, e.target.value)} required>
                                        <option selected>Year of graduation</option>
                                        {this.createDropdown(graduationYear)}

                                    </select>
                                </div>
                                <div class="d-flex flex-column justify-content-center align-items-center py-3">
                                    <div class="position-relative d-inline-block mb-3 cursor-pointer ">
                                        {selectedFile ?
                                            <img class="attach-img" src={URL.createObjectURL(selectedFile)} alt={`file found ${selectedFile.name}`} />
                                            :
                                            <a class="cursor-pointer text-decoration-underline mb-3">Attach File</a>
                                        }
                                        <input type="file" class="attack-file" onChange={(e) => this.setMyState("selectedFile", e.target.files[0])} />

                                    </div>
                                    {loading ?
                                        <BootstrapSpinner />
                                        : (success === "Update done") ? <button type="button" class="btn btn-primary px-5 py-2" data-bs-dismiss="modal" aria-label="Close">DONE</button>
                                            : <button type="submit" class="btn btn-primary px-5 py-2">UPDATE</button>}
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
            {/* Add Academics */}

            {/* Add Certificate */}

            <div class="modal fade" id="certificateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header border-0">
                            <i class="fas fa-times close-button" data-bs-dismiss="modal" aria-label="Close"></i>
                        </div>
                        <div class="modal-body">
                            <h5 class="modal-title text-center mb-4" id="exampleModalLabel">Add Certificate</h5>
                            <form onSubmit={(e) => { e.preventDefault(); this.prepareCertificats("create") }}>
                                <div class="mb-3">
                                    <input type="text" class="form-control" placeholder="Name of certificate" name="certificate_name" value={certificateItem.certificate_name} onChange={(e) => this.setCertificateData(e.target.name, e.target.value)} required />
                                </div>
                                <div class="mb-3">
                                    <input type="text" class="form-control" placeholder="Result" value={certificateItem.result} name="result" onChange={(e) => NumberValidation(e.target.value) ? this.setCertificateData(e.target.name, e.target.value) : ""} maxLength="3" required />
                                </div>
                                <div class="mb-3">
                                    <select class="form-select" value={certificateItem.year} name="year" onChange={(e) => this.setCertificateData(e.target.name, e.target.value)} >
                                        <option selected>Year Received</option>
                                        {this.createDropdown(graduationYear)}

                                    </select>
                                </div>
                                <div class="mb-3">
                                    <textarea class="form-control" placeholder="Sort Description" rows="4" value={certificateItem.description} name="description" onChange={(e) => this.setCertificateData(e.target.name, e.target.value)}></textarea>
                                </div>
                                <div class="d-flex flex-column justify-content-center align-items-center py-3">
                                    <div class="position-relative d-inline-block mb-3 cursor-pointer ">
                                        {selectedFile ?
                                            <img class="attach-img" src={URL.createObjectURL(selectedFile)} alt={`file found ${selectedFile.name}`} />
                                            :
                                            <a class="cursor-pointer text-decoration-underline mb-3">Attach File</a>
                                        }
                                        <input type="file" class="attack-file" onChange={(e) => this.setMyState("selectedFile", e.target.files[0])} />
                                    </div>
                                    {loading ?
                                        <BootstrapSpinner />
                                        : <button type="submit" class="btn btn-primary px-5 py-2">ADD</button>}
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
            {/* Add Certificate */}

            {/* Edit Certificate */}
            <div class="modal fade" id="editCertificateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header border-0">
                            <i id="closeCertificateModal" class="fas fa-times close-button" data-bs-dismiss="modal" aria-label="Close"></i>
                        </div>
                        <div class="modal-body">
                            <h5 class="modal-title text-center mb-4" id="exampleModalLabel">Edit Certificate</h5>
                            <form onSubmit={(e) => { e.preventDefault(); this.prepareCertificats("update") }}>
                                <div class="mb-3">
                                    <input type="text" class="form-control" placeholder="Name of certificate" name="certificate_name" value={certificateItem.certificate_name} onChange={(e) => this.setCertificateData(e.target.name, e.target.value)} required />
                                </div>
                                <div class="mb-3">
                                    <input type="text" class="form-control" placeholder="Result" value={certificateItem.result} name="result" onChange={(e) => NumberValidation(e.target.value) ? this.setCertificateData(e.target.value) : ""} maxLength="3" required />
                                </div>
                                <div class="mb-3">
                                    <select class="form-select" value={certificateItem.year} name="year" onChange={(e) => this.setCertificateData(e.target.name, e.target.value)} >
                                        <option selected>Year Received</option>
                                        {this.createDropdown(graduationYear)}

                                    </select>
                                </div>
                                <div class="mb-3">
                                    <textarea class="form-control" placeholder="Sort Description" rows="4" value={certificateItem.description} name="description" onChange={(e) => this.setCertificateData(e.target.name, e.target.value)}></textarea>
                                </div>
                                <div class="d-flex flex-column justify-content-center align-items-center py-3">
                                    <div class="position-relative d-inline-block mb-3 cursor-pointer ">
                                        {selectedFile ?
                                            <img class="attach-img" src={URL.createObjectURL(selectedFile)} alt={`file found ${selectedFile.name}`} />
                                            :
                                            <a class="cursor-pointer text-decoration-underline mb-3">Attach File</a>
                                        }
                                        <input type="file" class="attack-file" onChange={(e) => this.setMyState("selectedFile", e.target.files[0])} />
                                    </div>
                                    {loading ?
                                        <BootstrapSpinner />
                                        : <button type="submit" class="btn btn-primary px-5 py-2">UPDATE</button>}
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
            {/* Edit Certificate */}


        </>
    }
    getSingleValueFromGivenList = (list, value) => {
        const items = list ? list : []
        let languageArr = items.filter(res => res.id == value)
        if (languageArr.length > 0) {
            return languageArr[0].name
        } else {
            return value
        }
    }

    updateProfileDescription = async () => {
        const { token, tempDescription } = this.state
        agent.setToken(token)
        agent.Profile.updateDescription(tempDescription).then(res => {
            console.log("updateDescription res", res);
            this.setMyState("description", tempDescription)
        }).catch(err => {
            console.log("updateDescription error", err);
            this.setMyState("description", tempDescription ? tempDescription : this.props.userDetail.description)

        })
    }
    // academic
    insertAcademics = (uploadUrl) => {
        const { academicItem } = this.state
        const { user_info } = this.props
        const item = {
            "user_id": user_info.user ? user_info.user.id : "0",
            "school": academicItem.school,
            "level": Number(academicItem.level),
            "country": Number(academicItem.country),
            "year": Number(academicItem.year),
            "image": uploadUrl ? uploadUrl : ""
        }

        agent.Academics.add(item).then(async res => {
            let list = await agent.Common.TeacherAcademicList()
            this.setState({
                ...this.state,
                academics: list,
                academicItem: {
                    user_id: 0,
                    academic_id: 0,
                    school: "",
                    level: 0,
                    country: 0,
                    year: 0,
                    image: ""
                },
                selectedFile: null,
                loading: false
            }, () => {

            })
        }).catch(err => {
            this.setState({
                ...this.state,
                loading: false
            })
            console.log("addAcademics catch", "item", item);
        })
    }
    updateAcademics = async (uploadUrl) => {
        const { academicItem } = this.state
        const { user_info } = this.props
        const item = {
            user_id: user_info.user ? user_info.user.id : "0",
            academic_id: academicItem.academic_id,
            school: academicItem.school,
            level: Number(academicItem.level),
            country: Number(academicItem.country),
            year: Number(academicItem.year),
            image: uploadUrl ? uploadUrl : ""
        }
        agent.Academics.edit(item).then(async res => {
            document.getElementById("closeAcademicModal").click()
            let list = await agent.Common.TeacherAcademicList()
            this.setState({
                ...this.state,
                academics: list,
                selectedFile: null,
                loading: false,
                success: "Update done"
            })
        }).catch(err => {
            this.setState({
                ...this.state,
                loading: false,
                success: "Update failed"
            })
            console.log("addAcademics catch", "item", item);
        })
    }
    prepareAcademics = (param) => {
        const { token, selectedFile } = this.state
        agent.setToken(token)
        if (selectedFile) {
            const formData = new FormData();
            formData.append(
                "academics",
                selectedFile,
                selectedFile.name
            );
            try {
                this.setState({
                    ...this.state,
                    loading: true,
                }, async () => {
                    const uploadUrl = await this.fileUploadToAws(selectedFile)
                    console.log("uploadUrl", uploadUrl);
                    if (param === "create") {
                        this.insertAcademics(uploadUrl)
                    } else {
                        this.updateAcademics(uploadUrl)
                    }
                })
            } catch (error) {
                console.log("Error upload", error, "fileAcademics", fileAcademics);
                setFileUploadLoading(false)

            }
        }
    }
    // academic
    // certificate
    insertCertificate = async (uploadUrl) => {
        const { certificateItem } = this.state
        const { user_info } = this.props
        const item = {
            "user_id": user_info.user ? user_info.user.id : "0",
            "certificate_name": certificateItem.certificate_name,
            "result": certificateItem.result,
            "year": certificateItem.year,
            "description": certificateItem.description,
            "image": uploadUrl ? uploadUrl : ""
        }

        agent.Certificates.add(item).then(async res => {
            let list = await agent.Common.TeacherCertificateList()
            this.setState({
                ...this.state,
                certificates: list,
                certificateItem: {
                    user_id: 0,
                    certificate_name: "",
                    certificate_id: 0,
                    result: "",
                    year: "",
                    description: "",
                    image: ""
                },
                selectedFile: null,
                loading: false
            })
        }).catch(err => {
            this.setState({
                ...this.state,
                loading: false
            })
            console.log("addAcademics catch", "item", item);
        })
    }
    updateCertificate = async (uploadUrl) => {
        console.log("updateCertificate called");
        const { certificateItem } = this.state
        const { user_info } = this.props
        const item = {
            user_id: user_info.user ? user_info.user.id : "0",
            certificate_id: Number(certificateItem.certificate_id),
            certificate_name: certificateItem.certificate_name,
            result: certificateItem.result,
            year: certificateItem.year,
            description: certificateItem.description,
            image: uploadUrl ? uploadUrl : ""
        }
        agent.Certificates.edit(item).then(async res => {
            let list = await agent.Common.TeacherCertificateList()
            document.getElementById("closeCertificateModal").click()
            console.log("updated Certificates res", res, "list", list);
            this.setState({
                ...this.state,
                certificates: list,
                selectedFile: null,
                loading: false,
                success: "Update done"
            })
        }).catch(err => {
            this.setState({
                ...this.state,
                loading: false,
                success: "Update failed"
            })
            console.log("updateCertificate catch", "item", item);
        })
    }
    prepareCertificats = (param) => {
        const { token, selectedFile } = this.state
        agent.setToken(token)
        if (selectedFile) {
            const formData = new FormData();
            formData.append(
                "academics",
                selectedFile,
                selectedFile.name
            );
            try {
                this.setState({
                    ...this.state,
                    loading: true,
                }, async () => {
                    const uploadUrl = await this.fileUploadToAws(selectedFile)
                    console.log("uploadUrl", uploadUrl);
                    if (param === "create") {
                        this.insertCertificate(uploadUrl)
                    } else {
                        this.updateCertificate(uploadUrl)
                    }
                })
            } catch (error) {
                console.log("Error upload", error, "fileAcademics", fileAcademics);
                setFileUploadLoading(false)

            }
        }
    }
    // certificate
    componentDidMount() {
        const { token } = this.state
        if (this.props.user_info) {


            if (token) {
                agent.setToken(token)
                agent.Common.staticData().then(res => {
                    console.log("res", res);
                    this.setState({ ...this.state, ...res })
                }).catch(err => {
                    console.log("Common.staticData() error", err);
                })
            } else {
                console.log("token not found", token);
            }
            this.setState({
                ...this.state,
                academics: this.props.academics,
                certificates: this.props.certificates
            })
        } else {
            this.props.router.push(`/${this.props.router.query.lang}/sign-in`)
        }
    }
}
export default MyProfileLayout