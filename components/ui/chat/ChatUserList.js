import agent from "../../../utils/agent"
import { capitalizeFirstLetter } from "../../../utils/validation_contant"

const getProfileIcon = (profile_image) => {
    if (profile_image) {
        return `${agent.API_FILE_ROOT_MEDIUM}${profile_image}`
    } else {
        return "/images/student_profile.svg"
    }
}
export default props => {
    return <div className={`profile-menu ${props.active ? "active" : ""}`} onClick={() => props.onClickSlideBar(props)}>
        <div className="position-relative me-3">
            <img className="profile-image" src={getProfileIcon(props.profile_image)} />
            {props.status ?
                <span className="active-dots"></span>
                : <></>}
        </div>
        <div className="flex-grow-1">
            <div className="d-flex align-items-center justify-content-between">
                <b className="single-ellipsis fs-18">{capitalizeFirstLetter(props.first_name)} {capitalizeFirstLetter(props.last_name)}</b>
                <span className="light-heading ms-3">{props.time_since}</span>
            </div>
            <div className="d-flex align-items-center justify-content-between">
                <p className="single-ellipsis text-third mb-0">{props.message}</p>
                {/* <span className="light-heading space-nowrap ms-3">9:30am</span> */}
            </div>
        </div>
    </div>
}