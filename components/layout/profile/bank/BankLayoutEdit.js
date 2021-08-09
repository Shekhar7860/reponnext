import React from "react"
import agent from "../../../../utils/agent"
import { NumberValidation, UserNameValidation } from "../../../../utils/validation_contant"
import BootstrapSpinner from "../../../ui/spinner/BootstrapSpinner"
class BankLayoutEdit extends React.Component {

    constructor(props) {
        console.log("BankLayoutEdit props", props);
        super(props)
        this.state = {
            account_id: props.bank_detail ? props.bank_detail.id : "",
            account_number: props.bank_detail ? props.bank_detail.account_number : "",
            account_number2: props.bank_detail ? props.bank_detail.account_number : "",
            account_holder_name: props.bank_detail ? props.bank_detail.account_holder_name : "",
            bank_name: props.bank_detail ? props.bank_detail.bank_name : "",
            routing_number: props.bank_detail ? props.bank_detail.routing_number : "",
            error_info: { name: "", msg: "" },
            loading: false,
            userDetail: props.userDetail,
            bank_detail: props.bank_detail
        }
    }

    setMyState = (name, value) => {
        this.setState({
            ...this.state,
            [name]: value,
            error_info: { name: "", msg: "" }
        })
    }
    updateNormalBankAccount = () => {
        const { account_id, account_number, account_number2, account_holder_name, bank_name, routing_number } = this.state
        const { router } = this.props
        const item = {
            id: account_id,
            account_number,
            account_holder_name,
            bank_name,
            routing_number
        }
        if (account_id && account_number === account_number2) {
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
                        router.back()
                    })
                }).catch(err => {
                    console.log("addNormalBankDetails err", err);
                    this.setState({
                        ...this.state,
                        loading: false
                    })
                })
            })
        }
    }
    render() {
        // console.log("BankLayoutEdit state", this.state);
        const { account_number, account_number2, account_holder_name, bank_name, routing_number, userDetail, loading } = this.state
        return <>
            <div>
                <div class="d-flex align-items-center mt-2 mt-sm-0">
                    <div class="main-heading me-4">
                        <h2 class="sub-heading mb-0 fs-24">Edit Bank Account</h2>
                    </div>

                </div>

                <div>
                    <form class="row" onSubmit={(e) => { e.preventDefault(); this.updateNormalBankAccount() }}>
                        <div class="col-md-6 mt-4">
                            <label class="form-label d-block">Account Holder Name</label>
                            <input type="text" className="form-control" name="account_holder_name" value={account_holder_name} placeholder="Enter Holder Name" onChange={(e) => UserNameValidation(e.target.value) ? this.setMyState(e.target.name, e.target.value) : ""} required />
                        </div>
                        <div class="col-md-6 mt-4">
                            <label class="form-label d-block">Bank Account No.</label>
                            <input type="text" class="form-control" placeholder="Account no." name="account_number" value={account_number} onChange={(e) => NumberValidation(e.target.value) ? this.setMyState(e.target.name, e.target.value) : ""} required />
                        </div>
                        <div class="col-md-6 mt-4">
                            <label class="form-label d-block">Bank Name</label><input type="text" class="form-control" placeholder="Bank name" name="bank_name" value={bank_name} onChange={(e) => UserNameValidation(e.target.value) ? this.setMyState(e.target.name, e.target.value) : ""} required />
                        </div>
                        <div class="col-md-6 mt-4">
                            <label class="form-label d-block">Routing No.</label>
                            <input type="text" class="form-control" placeholder="Routing no." name="routing_number" value={routing_number} onChange={(e) => this.setMyState(e.target.name, e.target.value)} required />
                        </div>
                        {/* <div class="col-md-12 mt-4">
                            <label class="form-label d-block">Identity Proof</label>
                            <div class="row">
                                <div class="col-lg-3 col-md-4 mt-4">
                                    <figure class="figure">
                                        <figcaption class="figure-caption">Front</figcaption>
                                        <div class="tap-section">
                                            <img src="" alt="Not available" class="figure-img img-fluid rounded" />
                                            <span class="tap-change fs-14 text-white">Tap to change</span>
                                        </div>
                                    </figure>
                                </div><div class="col-lg-3 col-md-4 mt-4">
                                    <figure class="figure">
                                        <figcaption class="figure-caption">Back</figcaption>
                                        <div class="tap-section">
                                            <img src="" alt="Not available" class="figure-img img-fluid rounded" />
                                            <span class="tap-change fs-14 text-white">Tap to change</span>
                                        </div>
                                    </figure>
                                </div>
                            </div>
                        </div> */}
                        {loading ? <BootstrapSpinner /> :
                            <button type="submit" class="btn btn-primary px-5" >UPDATE</button>
                        }
                    </form>
                </div>
            </div>

        </>
    }
    componentDidMount() {

    }
}
export default BankLayoutEdit