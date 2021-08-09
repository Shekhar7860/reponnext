import React from "react"
import agent from "../../../utils/agent";
import BootstrapSpinner from "../../ui/spinner/BootstrapSpinner"
class ChangePasswordProfileLayout extends React.Component {
    constructor(props) {
        super(props)
        console.log("ChangePasswordProfileLayout props", props);
        this.state = {
            password: "",
            password1: "",
            password2: "",
            passwordSuccess: false,
            passwordEye: false,
            passwordEye1: false,
            passwordEye2: false,
            loading: false,
            error_info: { name: "", msg: "" },
        }
    }
    setMyState = async (name, value) => {
        this.setState({
            ...this.state,
            [name]: value
        })
    }

    changePassword = (userInfo) => {
        const { password, password1, password2, passwordSuccess, passwordEye, passwordEye1, passwordEye2, error_info, loading } = this.state

        if (userInfo) {
            if (password1) {

                agent.setToken(userInfo.token)
                if (password1 === password2) {
                    this.setMyState("loading", true)
                    agent.Auth.changePassword({
                        "old_password": password,
                        "new_password": password1
                    }).then(res => {
                        console.log("changePassword res", res);
                        this.setMyState("passwordSuccess", true)
                        this.setMyState("password", "")
                        this.setMyState("password1", "")
                        this.setMyState("password2", "")
                        this.setMyState("loading", false)
                    }).catch(err => {
                        console.log("changePassword err", err);
                        this.setMyState("passwordSuccess", false)
                        this.setMyState("error_info", { name: "password", msg: "Old password not match" })
                        this.setMyState("loading", false)

                    })
                } else {
                    this.setMyState("error_info", { name: "password1", msg: "Password not match" })
                }

            } else {
                this.setMyState("error_info", { name: "password1", msg: "Empty Password" })
            }
        } else {
            console.log("User not found");
        }
    }
    render() {
        const { password, password1, password2, passwordSuccess, passwordEye, passwordEye1, passwordEye2, error_info, loading } = this.state
        const { router, user_info } = this.props
        return <>
            <div class="main-heading mb-5">
                <h2 class="sub-heading mb-0 fs-24">Change Password</h2>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); this.changePassword(user_info ? user_info : null) }}>
                <div class="row mt-5">
                    <div class="col-lg-4">
                        <div class="mb-4 input-field">
                            <label for="exampleInputEmail1" class="form-label">Current Password</label>
                            <input type={passwordEye ? "text" : "password"} class={`form-control input-space ${(error_info.name === "password" && error_info.msg) ? "is-invalid" : ""}`} placeholder="Password" name="password" value={password} onChange={(e) => { this.setMyState(e.target.name, e.target.value); }} />
                            {(error_info.name === "password" && error_info.msg)
                                ? <div class="invalid-feedback">
                                    {error_info.msg}
                                </div>
                                : <div class="icon" onClick={() => this.setMyState("passwordEye", !passwordEye)}>
                                    <i class={passwordEye ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                                </div>
                            }
                        </div>
                        <div class="mb-4 input-field">
                            <label for="exampleInputEmail1" class="form-label">New Password</label>
                            <input type={passwordEye1 ? "text" : "password"} class={`form-control input-space ${(error_info.name === "password1" && error_info.msg) ? "is-invalid" : ""}`} placeholder="New Password" value={password1} name="password1" onChange={(e) => { this.setMyState(e.target.name, e.target.value); }} />
                            {(error_info.name === "password1" && error_info.msg)
                                ? <div class="invalid-feedback">
                                    {error_info.msg}
                                </div>
                                : <div class="icon" onClick={() => this.setMyState("passwordEye1", !passwordEye1)}>
                                    <i class={passwordEye1 ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                                </div>
                            }
                        </div>
                        <div class="mb-4 input-field">
                            <label for="exampleInputEmail1" class="form-label">Confirm Password</label>
                            <input type={passwordEye2 ? "text" : "password"} class="form-control input-space" placeholder="Confirm Password" value={password2} name="password2" onChange={(e) => this.setMyState(e.target.name, e.target.value)} />
                            {(error_info.name === "password2" && error_info.msg)
                                ? <div class="invalid-feedback">
                                    {error_info.msg}
                                </div>
                                : <div class="icon" onClick={() => this.setMyState("passwordEye2", !passwordEye2)}>
                                    <i class={passwordEye2 ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                                </div>
                            }
                        </div>
                        {loading ? <BootstrapSpinner /> :
                            <button type="submit" class="btn btn-primary px-5 mt-4" disabled={passwordSuccess}>{passwordSuccess ? "Success" : "Apply"}</button>
                        }
                    </div>
                </div>
            </form>
        </>
    }
    componentDidMount() {

    }
}
export default ChangePasswordProfileLayout