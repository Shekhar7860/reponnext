import axios from "axios";
import React from "react"
import PhoneInput from "react-phone-input-2";
import agent from "../../../../utils/agent"
import { capitalizeFirstLetter, NumberValidation, UserNameValidation } from "../../../../utils/validation_contant"
import BootstrapSpinner from "../../../ui/spinner/BootstrapSpinner"
class BankLayout extends React.Component {

    constructor(props) {
        console.log("BankLayout props", props);
        super(props)
        let first_name = props.userDetail ? props.userDetail.first_name : ""
        let last_name = props.userDetail ? props.userDetail.last_name : ""
        let gender = props.userDetail ? props.userDetail.gender : "male"
        let phone_number = props.userDetail ? props.userDetail.phone_number : ""

        let account_holder_name_for_update = props.bank_detail ? props.bank_detail.account_holder_name : ""
        let account_number_for_update = props.bank_detail ? props.bank_detail.account_number : ""
        let bank_name_for_update = props.bank_detail ? props.bank_detail.bank_name : ""
        let routing_number_for_update = props.bank_detail ? props.bank_detail.routing_number : ""
        let bank_id_for_update = props.bank_detail ? props.bank_detail.id : ""
        this.state = {
            account_number: "",
            account_number2: "",
            account_holder_name: `${capitalizeFirstLetter(first_name)} ${capitalizeFirstLetter(last_name)}`,
            bank_name: "",
            account_holder_type: "individual",
            routing_number: "",
            paypal_user_name: "",
            error_info: { name: "", msg: "" },
            loading: false,
            userDetail: props.userDetail ? props.userDetail : {},
            bank_detail: props.bank_detail ? props.bank_detail : null,
            personal_detail: props.personal_detail ? props.personal_detail : null,
            error_info: { name: "", msg: "" },

            first_name: "",
            last_name: "",
            japan_contact_number: phone_number,
            japan_gender: gender,
            line1: "",
            line2: "",
            town: "",
            city: "",
            address_state: "",
            postal_code: "",

            frontProofImageFullUrl: null,
            frontProofImage: null,
            backProofImage: null,
            selectedFile: null,

            account_number_for_update: account_number_for_update,
            account_number2_for_update: account_number_for_update,
            account_holder_name_for_update: account_holder_name_for_update,
            bank_name_for_update: bank_name_for_update,
            routing_number_for_update: routing_number_for_update,
            bank_id_for_update: bank_id_for_update,
        }
    }

    setMyState = (name, value) => {
        this.setState({
            ...this.state,
            [name]: value,
            error_info: { name: "", msg: "" }
        })
    }

    goToLink = (params) => {
        const { router } = this.props
        if (router) {
            router.push(`/${router.query.lang}/${params}`)
        }
    }
    createNormalBankAccount = () => {
        const { account_number, account_number2, account_holder_name, bank_name, routing_number } = this.state
        const item = {
            account_number,
            account_holder_name,
            bank_name,
            routing_number
        }
        if (account_number === account_number2) {
            this.setState({
                ...this.state,
                loading: true
            }, () => {
                agent.Teacher.addNormalBankDetails(item).then(res => {
                    console.log("addNormalBankDetails res", res);
                    this.setState({
                        ...this.state,
                        loading: false
                    }, () => {
                        document.getElementById("closeNormalBankDetailsModal").click()
                        this.initialiseLiveProfile()
                    })
                }).catch(err => {
                    console.log("addNormalBankDetails err", err);
                    this.setState({
                        ...this.state,
                        loading: false
                    })
                })
            })
        } else {
            this.setMyState("error_info", { name: "account_number2", msg: "Account number not match" })
        }
    }
    updateNormalBankAccount = () => {
        const { bank_id_for_update, account_number_for_update, account_number2_for_update, account_holder_name_for_update, bank_name_for_update, routing_number_for_update } = this.state
        const item = {
            id: bank_id_for_update,
            account_number: account_number_for_update,
            account_holder_name: account_holder_name_for_update,
            bank_name: bank_name_for_update,
            routing_number: routing_number_for_update
        }
        if (account_number_for_update == account_number2_for_update) {
            this.setState({
                ...this.state,
                loading: true
            }, () => {
                agent.Teacher.updateNormalBankDetails(item).then(res => {
                    console.log("addNormalBankDetails res", res);
                    this.setState({
                        ...this.state,
                        loading: false
                    }, () => {
                        document.getElementById("closeEditNormalBankDetailsModal").click()
                        this.initialiseLiveProfile()
                    })
                }).catch(err => {
                    console.log("addNormalBankDetails err", err);
                    this.setState({
                        ...this.state,
                        loading: false
                    })
                })
            })
        } else {
            this.setMyState("error_info", { name: "account_number2_for_update", msg: "Account number not match" })
        }
    }
    createPaypalBankAccount = () => {

    }
    connectStripeAccount = () => {
        const { first_name, last_name, japan_contact_number, japan_gender, account_number, account_number2, account_holder_name, account_holder_type, routing_number, postal_code, address_state, city, town, line1, line2, frontProofImage, backProofImage } = this.state
        const { userDetail } = this.props
        const item = {
            "account_number": account_number,
            "account_holder_name": account_holder_name,
            "account_holder_type": account_holder_type,
            "routing_number": routing_number,
            "first_name": first_name,
            "last_name": last_name,
            "country": "JP",
            "postal_code": postal_code,
            "state": address_state,
            "city": city,
            "town": town,
            "line1": line1,
            "line2": line2,
            "gender": japan_gender,
            "phone": `+${japan_contact_number}`,
            'file': frontProofImage
        }
        if (account_number === account_number2) {
            this.setState({
                ...this.state,
                loading: true
            }, () => {
                agent.Teacher.addStripeBankDetails(item).then(res => {
                    console.log("addStripeBankDetails res", res);
                    document.getElementById("closeJapanDetailsModal2").click()
                    this.setState({
                        ...this.state,
                        loading: false
                    }, () => {
                        document.getElementById("closeJapanDetailsModal").click()
                        this.initialiseLiveProfile()
                    })
                }).catch(err => {
                    console.log("addNormalBankDetails err", err);
                    this.setState({
                        ...this.state,
                        loading: false
                    })
                })
            })
        } else {
            this.setState({
                ...this.state,
                error_info: { name: "account_number2", msg: "Account number not match" }
            })
            document.getElementById("goToJapanDetailsModal").click()
        }
    }
    uploadFileNow = async (file) => {
        this.setState({
            ...this.state,
            loading: true,
            selectedFile: file
        }, async () => {

            const { frontProofImage, backProofImage } = this.state
            const url = `${agent.API_ROOT}upload/local`;
            const formData = new FormData();
            formData.append('file', file)
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            const data = await (await axios.post(url, formData, config)).data
            const filename = data.filename
            console.log("filename", filename, "data", data,);
            if (frontProofImage) {
                this.setState({
                    ...this.state,
                    backProofImage: filename,
                    loading: false
                })
            } else {
                this.setState({
                    ...this.state,
                    frontProofImage: filename,
                    loading: false
                })
            }
        })

    }
    getFileNameFromLocal = async (file) => {
        const img = await agent.File.getLocalFile(file, "orig")
        console.log("getFileNameFromLocal", img);
        return img
    }
    render() {
        // console.log("Banklayout state", this.state);
        const { first_name, last_name, japan_contact_number, japan_gender, line1, line2, town, city, address_state, postal_code, account_number,
            account_number2, account_holder_name, bank_name, account_holder_type, routing_number, paypal_user_name, userDetail, bank_detail, loading,
            error_info, frontProofImage, backProofImage, selectedFile, personal_detail,
            account_number_for_update, account_number2_for_update, account_holder_name_for_update, bank_name_for_update, routing_number_for_update } = this.state
        return <>
            <div>
                <div class="d-flex align-items-center mt-2 mt-sm-0">
                    <div class="main-heading me-4">
                        <h2 class="sub-heading mb-0 fs-24">Bank Account</h2>
                    </div>
                    {(userDetail.bank_status == 0) ? <></> :
                        (bank_detail && bank_detail.bank_name) ?
                            // <span class="text-primary cursor-pointer space-nowrap" onClick={() => this.goToLink("profile/bank/edit")}><i class="fas fa-pencil-alt me-2"></i>Edit</span>
                            <span class="text-primary cursor-pointer space-nowrap" data-bs-toggle="modal" data-bs-target="#editNormalBankDetailsModal"><i class="fas fa-pencil-alt me-2"></i>Edit</span>
                            : <></>
                    }
                </div>
                {(userDetail.bank_status == 0) ?
                    <div class="text-center mt-5">
                        <p class="sub-heading fs-24 mb-0">Please add your bank account to create the post</p>
                        <button type="button" class="btn btn-primary mt-4" data-bs-toggle="modal" data-bs-target="#addAccountModal" >{loading ? <BootstrapSpinner /> : 'ADD BANK ACCOUNT'}</button>
                    </div>
                    :

                    <div>
                        {bank_detail ?
                            <div class="row">
                                <div class="col-md-6 mt-4">
                                    <label class="form-label d-block">Account Holder Name</label>
                                    <span class="light-heading">{bank_detail.account_holder_name}</span>
                                </div>
                                <div class="col-md-6 mt-4">
                                    <label class="form-label d-block">Bank Account No.</label>
                                    <span class="light-heading">{bank_detail.account_number}</span>
                                </div>
                                {bank_detail.bank_name ?
                                    <div class="col-md-6 mt-4">
                                        <label class="form-label d-block">Bank Name</label>
                                        <span class="light-heading">{bank_detail.bank_name}</span>
                                    </div>
                                    : <></>}

                                <div class="col-md-6 mt-4">
                                    <label class="form-label d-block">Routing No.</label>
                                    <span class="light-heading">{bank_detail.routing_number}</span>
                                </div>
                                {bank_detail.file ?
                                    <div class="col-md-12 mt-4">
                                        <label class="form-label d-block">Identity Proof</label>
                                        <div class="row">
                                            <div class="col-lg-3 col-md-4 mt-4" data-bs-toggle="modal" data-bs-target="#openImageModal">
                                                <figure class="figure">
                                                    {/* <figcaption class="figure-caption">Front</figcaption> */}
                                                    <img src={`http://13.208.129.181:3001/api/local/file?filename=${bank_detail.file}&folder=orig`} alt="Not available" class="figure-img img-fluid rounded" />
                                                </figure>
                                            </div>
                                            {/* <div class="col-lg-3 col-md-4 mt-4">
                                                <figure class="figure">
                                                    <figcaption class="figure-caption">Back</figcaption>
                                                    <div class="tap-section">
                                                        <img src="" alt="Not available" class="figure-img img-fluid rounded" />
                                                    </div>
                                                </figure>
                                            </div> */}
                                        </div>
                                    </div>
                                    : <></>}
                            </div>
                            : <></>}
                    </div>
                }
            </div>
            <hr />
            <div>
                <div class="d-flex align-items-center mt-2 mt-sm-0">
                    <div class="main-heading me-4">
                        <h2 class="sub-heading mb-0 fs-24">Personal Details</h2>
                    </div>
                </div>

                <div>
                    {personal_detail ?
                        <div class="row">
                            <div class="col-md-6 mt-4">
                                <label class="form-label d-block">First Name</label>
                                <span class="light-heading">{personal_detail.first_name}</span>
                            </div>
                            <div class="col-md-6 mt-4">
                                <label class="form-label d-block">Last Name</label>
                                <span class="light-heading">{personal_detail.last_name}</span>
                            </div>
                            <div class="col-md-6 mt-4">
                                <label class="form-label d-block">Contact Number</label>
                                <span class="light-heading">{personal_detail.phone}</span>
                            </div>
                            <div class="col-md-6 mt-4">
                                <label class="form-label d-block">Postal Code</label>
                                <span class="light-heading">{personal_detail.postal_code}</span>
                            </div>
                            <div class="col-md-6 mt-4">
                                <label class="form-label d-block">Line 1</label>
                                <span class="light-heading">{personal_detail.line1}</span>
                            </div>
                            <div class="col-md-6 mt-4">
                                <label class="form-label d-block">Line 2</label>
                                <span class="light-heading">{personal_detail.line2}</span>
                            </div>
                            <div class="col-md-6 mt-4">
                                <label class="form-label d-block">Town</label>
                                <span class="light-heading">{personal_detail.town}</span>
                            </div>
                            <div class="col-md-6 mt-4">
                                <label class="form-label d-block">State</label>
                                <span class="light-heading">{personal_detail.state}</span>
                            </div>
                            <div class="col-md-6 mt-4">
                                <label class="form-label d-block">City</label>
                                <span class="light-heading">{personal_detail.city}</span>
                            </div>
                            <div class="col-md-6 mt-4">
                                <label class="form-label d-block">Country</label>
                                <span class="light-heading">{personal_detail.country}</span>
                            </div>
                        </div>
                        : <></>}
                </div>
            </div>



            {/* condition */}


            <div class="modal fade" id="addAccountModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header border-0">
                            <i class="fas fa-times close-button" data-bs-dismiss="modal" aria-label="Close"></i>
                        </div>
                        <div class="modal-body">
                            <div class="row justify-content-center pb-4">
                                <div class="col-lg-10">
                                    <h5 class="modal-title text-center mb-4" id="exampleModalLabel">Add Bank Account</h5>

                                    <button type="submit" class="btn btn-primary px-5 py-2 w-100 mb-3" data-bs-dismiss="modal" aria-label="Close" data-bs-toggle="modal" data-bs-target={(userDetail.country_code == "JP") ? "#japanDetailsModal" : "#japanDetailsModalError"}  >ARE YOU IN JAPAN</button>

                                    <button type="submit" class="btn btn-outline-primary px-5 py-2 w-100" data-bs-dismiss="modal" aria-label="Close" data-bs-toggle="modal" data-bs-target="#accountOptionModal">ARE YOU OUTSIDE JAPAN</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* error */}

            <div class="modal fade" id="japanDetailsModalError" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header border-0">
                            <i class="fas fa-times close-button" data-bs-dismiss="modal" aria-label="Close"></i>
                        </div>
                        <div class="modal-body">
                            <div className="text-center">
                                <div class="row justify-content-center pb-4">
                                    <div class="col-lg-10">
                                        <h5 class="modal-title text-center mb-4" id="exampleModalLabel">Error</h5>
                                        <h5>Your address not in Japan</h5>
                                        <button type="button" class="btn btn-primary px-5 py-2" data-bs-dismiss="modal" aria-label="exampleModalLabeljapanDetailsModalError" onClick={() => this.goToLink("profile/edit")}>CHANGE ADDRESS</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* japanDetailsModal */}

            <div class="modal fade" id="japanDetailsModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header border-0">
                            <i id="closeJapanDetailsModal" class="fas fa-times close-button" data-bs-dismiss="modal" aria-label="Close"></i>
                        </div>
                        <div class="modal-body">
                            <h5 class="modal-title text-center mb-4" id="exampleModalLabel">Please Fill The Account Details</h5>
                            <form onSubmit={(e) => { e.preventDefault(); }}>
                                <div class="mb-3">
                                    <input type="text" class="form-control" placeholder="Account holder name" name="account_holder_name" value={account_holder_name} onChange={(e) => UserNameValidation(e.target.value) ? this.setMyState(e.target.name, e.target.value) : ""} required />
                                </div>
                                <div class="mb-3">
                                    <input type="password" class="form-control" placeholder="Account no." name="account_number" value={account_number} onChange={(e) => NumberValidation(e.target.value) ? this.setMyState(e.target.name, e.target.value) : ""} required />
                                </div>
                                <div class="mb-3">
                                    <input type="password" className={`form-control ${(error_info.name === "account_number2" && error_info.msg) ? "is-invalid" : ""}`} placeholder="Confirm account no." name="account_number2" value={account_number2} onChange={(e) => NumberValidation(e.target.value) ? this.setMyState(e.target.name, e.target.value) : ""} required />
                                    {(error_info.name === "account_number2" && error_info.msg)
                                        ? <div class="invalid-feedback">
                                            {error_info.msg}
                                        </div>
                                        : <></>
                                    }
                                </div>
                                <div class="mb-3">
                                    <select className="form-control" name="account_holder_type" value={account_holder_type} onChange={(e) => this.setMyState(e.target.name, e.target.value)} required>
                                        <option value="individual">Individual</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <input type="text" class="form-control" placeholder="Routing no." name="routing_number" value={routing_number} required onChange={(e) => this.setMyState(e.target.name, e.target.value)} />
                                </div>
                                {(frontProofImage || backProofImage) ?
                                    <div class="d-flex flex-row justify-content-between py-3">
                                        {frontProofImage ?
                                            <div class="col-lg-3 col-md-4">
                                                <img src={URL.createObjectURL(selectedFile)} alt="Not available" height="100px" />
                                            </div>
                                            : <></>}
                                        {backProofImage ?
                                            <div class="col-lg-3 col-md-4">
                                                <img src={this.getFileNameFromLocal(backProofImage)} alt="Not available" height="100px" />
                                            </div>
                                            : <></>}
                                    </div>
                                    : <></>}
                                <div class="d-flex flex-column justify-content-center align-items-center">
                                    {(frontProofImage) ? <></> :
                                        <div class="position-relative d-inline-block mb-3 cursor-pointer ">
                                            <img class="attach-img" src="" />
                                            <a class="cursor-pointer text-decoration-underline mb-3">Attach File {frontProofImage ? "Back Of" : "Front Of"} Identity Proof</a>
                                            <input type="file" class="attack-file" onChange={(e) => { this.uploadFileNow(e.target.files[0]) }} />
                                        </div>
                                    }
                                    <button type="button" class="btn btn-primary px-5 py-2" data-bs-dismiss="modal" aria-label="exampleModalLabeljapanDetailsModal2" data-bs-toggle="modal" data-bs-target="#japanDetailsModal2">{loading ? <BootstrapSpinner /> : "NEXT"}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* japanDetailsModal2 */}

            <div class="modal fade" id="japanDetailsModal2" tabindex="-1" aria-labelledby="exampleModalLabeljapanDetailsModal2" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header border-0">
                            <i id="closeJapanDetailsModal2" class="fas fa-times close-button" data-bs-dismiss="modal" aria-label="Close"></i>
                        </div>
                        <div class="modal-body">
                            <h5 class="modal-title text-center mb-4" id="exampleModalLabel">Please Fill The Billing Address</h5>
                            <form onSubmit={(e) => { e.preventDefault(); this.connectStripeAccount() }}>
                                <div class="mb-3">
                                    <div className="row">
                                        <div className="col-sm">
                                            <input type="text" class="form-control" placeholder="First Name" name="first_name" value={first_name} onChange={(e) => this.setMyState(e.target.name, e.target.value)} required />
                                        </div>
                                        <div className="col-sm">
                                            <input type="text" class="form-control" placeholder="Last Name" name="last_name" value={last_name} onChange={(e) => this.setMyState(e.target.name, e.target.value)} required />
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <PhoneInput
                                        country={'jp'}
                                        value={`${japan_contact_number}`}
                                        onChange={phone => { this.setMyState("japan_contact_number", phone) }}
                                        inputClass={"form-control"}
                                    />
                                    {/* <input type="text" class="form-control" placeholder="Contact Number" name="japan_contact_number" value={japan_contact_number} onChange={(e) => this.setMyState(e.target.name, e.target.value)} required /> */}
                                </div>
                                <div class="mb-3">
                                    <select className="form-control" name="japan_gender" value={japan_gender} onChange={(e) => this.setMyState(e.target.name, e.target.value)} required>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <input type="text" class="form-control" placeholder="Line 1" name="line1" value={line1} onChange={(e) => this.setMyState(e.target.name, e.target.value)} required />
                                </div>
                                <div class="mb-3">
                                    <input type="text" class="form-control" placeholder="Line 2" name="line2" value={line2} onChange={(e) => this.setMyState(e.target.name, e.target.value)} required />
                                </div>
                                <div class="mb-3">
                                    <input type="text" class="form-control" placeholder="Town" name="town" value={town} onChange={(e) => this.setMyState(e.target.name, e.target.value)} required />
                                </div>
                                <div class="mb-3">
                                    <input type="text" class="form-control" placeholder="City" name="city" value={city} onChange={(e) => this.setMyState(e.target.name, e.target.value)} required />
                                </div>
                                <div class="mb-3">
                                    <input type="text" class="form-control" placeholder="State" name="address_state" value={address_state} onChange={(e) => this.setMyState(e.target.name, e.target.value)} required />
                                </div>
                                <div class="mb-3">
                                    <input type="text" class="form-control" placeholder="Postal Code" name="postal_code" value={postal_code} onChange={(e) => this.setMyState(e.target.name, e.target.value)} required />
                                </div>
                                <div class="d-flex flex-row justify-content-between py-3">
                                    <button class="btn btn-secontry" id="goToJapanDetailsModal" data-bs-dismiss="modal" aria-label="exampleModalLabeljapanDetailsModal" data-bs-toggle="modal" data-bs-target="#japanDetailsModal">BACK</button>
                                    <button type={loading ? "" : "submit"} class="btn btn-primary ">{loading ? <BootstrapSpinner /> : "SUBMIT NOW"}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bank account option*/}

            <div class="modal fade" id="accountOptionModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header border-0">
                            <i class="fas fa-times close-button" data-bs-dismiss="modal" aria-label="Close"></i>
                        </div>
                        <div class="modal-body">
                            <div class="row justify-content-center pb-4">
                                <div class="col-lg-12">
                                    <div class="d-flex align-items-center">
                                        <button type="submit" class="btn btn-primary px-5 py-2 d-flex flex-column align-items-center me-3 w-100" data-bs-dismiss="modal" aria-label="Close" data-bs-toggle="modal" data-bs-target="#normalBankDetailsModal">
                                            <span>BANK</span>
                                            <img class="icon-size-2" src="/images/bank.png" />
                                        </button>
                                        <button type="submit" class="btn btn-outline-primary px-5 py-2 d-flex flex-column align-items-center w-100">
                                            <span>PAYPAL</span>
                                            <img class="icon-size-2" src="/images/paypal.png" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* normalBankDetailsModal */}

            <div class="modal fade" id="normalBankDetailsModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header border-0">
                            <i id="closeNormalBankDetailsModal" class="fas fa-times close-button" data-bs-dismiss="modal" aria-label="Close"></i>
                        </div>
                        <div class="modal-body">
                            <h5 class="modal-title text-center mb-4" id="exampleModalLabel">Please Fill The Account Details</h5>
                            <form onSubmit={(e) => { e.preventDefault(); this.createNormalBankAccount() }}>
                                <div class="mb-3">
                                    <input type="text" class="form-control" placeholder="Account holder name" name="account_holder_name" value={account_holder_name} onChange={(e) => UserNameValidation(e.target.value) ? this.setMyState(e.target.name, e.target.value) : ""} required />
                                </div>
                                <div class="mb-3">
                                    <input type="password" class="form-control" placeholder="Account no." name="account_number" value={account_number} onChange={(e) => NumberValidation(e.target.value) ? this.setMyState(e.target.name, e.target.value) : ""} required />
                                </div>
                                <div class="mb-3">
                                    <input type="password" className={`form-control ${(error_info.name === "account_number2" && error_info.msg) ? "is-invalid" : ""}`} placeholder="Confirm account no." name="account_number2" value={account_number2} onChange={(e) => NumberValidation(e.target.value) ? this.setMyState(e.target.name, e.target.value) : ""} required />
                                    {(error_info.name === "account_number2" && error_info.msg)
                                        ? <div class="invalid-feedback">
                                            {error_info.msg}
                                        </div>
                                        : <></>
                                    }
                                </div>

                                <div class="mb-3">
                                    <input type="text" class="form-control" placeholder="Bank name" name="bank_name" value={bank_name} onChange={(e) => UserNameValidation(e.target.value) ? this.setMyState(e.target.name, e.target.value) : ""} required />
                                </div>
                                <div class="mb-3">
                                    <input type="text" class="form-control" placeholder="Routing no." name="routing_number" value={routing_number} required onChange={(e) => this.setMyState(e.target.name, e.target.value)} />
                                </div>
                                <div class="d-flex flex-column justify-content-center align-items-center py-3">
                                    {loading ? <BootstrapSpinner /> :
                                        <button type="submit" class="btn btn-primary px-5 py-2">SUBMIT NOW</button>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* editNormalBankDetailsModal */}

            <div class="modal fade" id="editNormalBankDetailsModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header border-0">
                            <i id="closeEditNormalBankDetailsModal" class="fas fa-times close-button" data-bs-dismiss="modal" aria-label="Close"></i>
                        </div>
                        <div class="modal-body">
                            <h5 class="modal-title text-center mb-4" id="exampleModalLabel">Please Fill The Account Details</h5>
                            <form onSubmit={(e) => { e.preventDefault(); this.updateNormalBankAccount() }}>
                                <div class="mb-3">
                                    <input type="text" class="form-control" placeholder="Account holder name" name="account_holder_name_for_update" value={account_holder_name_for_update} onChange={(e) => UserNameValidation(e.target.value) ? this.setMyState(e.target.name, e.target.value) : ""} required />
                                </div>
                                <div class="mb-3">
                                    <input type="password" class="form-control" placeholder="Account no." name="account_number_for_update" value={account_number_for_update} onChange={(e) => NumberValidation(e.target.value) ? this.setMyState(e.target.name, e.target.value) : ""} required />
                                </div>
                                <div class="mb-3">
                                    <input type="password" className={`form-control ${(error_info.name === "account_number2_for_update" && error_info.msg) ? "is-invalid" : ""}`} placeholder="Confirm account no." name="account_number2_for_update" value={account_number2_for_update} onChange={(e) => NumberValidation(e.target.value) ? this.setMyState(e.target.name, e.target.value) : ""} required />
                                    {(error_info.name === "account_number2_for_update" && error_info.msg)
                                        ? <div class="invalid-feedback">
                                            {error_info.msg}
                                        </div>
                                        : <></>
                                    }
                                </div>

                                <div class="mb-3">
                                    <input type="text" class="form-control" placeholder="Bank name" name="bank_name_for_update" value={bank_name_for_update} onChange={(e) => UserNameValidation(e.target.value) ? this.setMyState(e.target.name, e.target.value) : ""} required />
                                </div>
                                <div class="mb-3">
                                    <input type="text" class="form-control" placeholder="Routing no." name="routing_number_for_update" value={routing_number_for_update} required onChange={(e) => this.setMyState(e.target.name, e.target.value)} />
                                </div>
                                <div class="d-flex flex-column justify-content-center align-items-center py-3">
                                    {loading ? <BootstrapSpinner /> :
                                        <button type="submit" class="btn btn-primary px-5 py-2">UPDATE NOW</button>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* paypalBankDetailsModal */}

            <div class="modal fade" id="paypalBankDetailsModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header border-0">
                            <i id="closeNormalBankDetailsModal" class="fas fa-times close-button" data-bs-dismiss="modal" aria-label="Close"></i>
                        </div>
                        <div class="modal-body">
                            <h5 class="modal-title text-center mb-4" id="exampleModalLabel">Please Fill The Account Details</h5>
                            <form onSubmit={(e) => { e.preventDefault(); this.createPaypalBankAccount() }}>
                                <div class="mb-3">
                                    <input type="text" class="form-control" placeholder="Username" name="paypal_user_name" value={paypal_user_name} onChange={(e) => UserNameValidation(e.target.value) ? this.setMyState(e.target.name, e.target.value) : ""} required />
                                </div>
                                <div class="d-flex flex-column justify-content-center align-items-center py-3">
                                    {loading ? <BootstrapSpinner /> :
                                        <button type="submit" class="btn btn-primary px-5 py-2">SUBMIT NOW</button>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* openImageModal */}
            {(bank_detail && bank_detail.file) ?
                <div class="modal" id="openImageModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-fullscreen">
                        <div class="modal-content">
                            {/* <div class="modal-header">
                                <h5 class="modal-title h4" id="exampleModalFullscreenLabel">Full screen modal</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div> */}
                            <div class="modal-body">
                                <img src={`http://13.208.129.181:3001/api/local/file?filename=${bank_detail.file}&folder=orig`} alt="" />
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                : <></>}

        </>
    }
    initialiseLiveProfile = () => {
        agent.Profile.get().then(res => {
            this.setState({
                ...this.state,
                ...res,
                account_number: "",
                account_holder_name: "",
                bank_name: "",
                routing_number: ""
            })
        })
    }
    componentDidMount() {
        const { user_info, bank_detail } = this.props
        if (user_info) {
            if (bank_detail.file) {
                agent.File.getLocalFile(bank_detail.file, "orig").then(res => {
                    console.log("getLocalFile res", res);
                }).catch(err => {
                    console.log("getLocalFile err", err);
                })
            }
        }

    }
}
export default BankLayout