import { useRouter } from "next/router"
import agent from "../../../utils/agent"
import { manamusuDateFormatter } from "../../../utils/date_contant"
import { capitalizeFirstLetter } from "../../../utils/validation_contant"

export default (props) => {
    const router = useRouter()

    function goToLink(params) {
        router.push(`/${router.query.lang}/student/${params}`)
    }
    function getProfileIcon(profile_image) {
        if (profile_image) {
            return (profile_image) ? `${agent.API_FILE_ROOT_SMALL}${profile_image}` : "/images/student_profile.svg"
        } else {
            return "/images/student_profile.svg"
        }
    }
    function getValueFromList(list, params) {
        const items = list ? list : []
        let listArr = items.filter(res => res.id == params)
        if (listArr.length > 0) {
            return listArr[0].name ? listArr[0].name : listArr[0].year
        } else {
            return params
        }
    }

    return <div class="col-xl-4 col-md-6" onClick={() => goToLink(`${props.user_id}/request/${props.id}`)}>
        <div class="card">
            <div class="d-flex">
                <img class="detail-img" src={getProfileIcon(props.profile_image)} alt="" />

                <div class="card-body">
                    <div class="d-flex flex-column">
                        <p class="detail-text  mb-0">{props.title}</p>
                        <time class="light-heading my-2"> {manamusuDateFormatter(new Date(props.created_at).getTime())}</time>
                        <b class="text-third text-secondary">{getValueFromList(props.subjects, props.subject)}</b>
                        <div>
                            <img class="icon-size me-2" src="/images/home-page/class.svg" alt="" />
                            <span class="text-third text-secondary">{getValueFromList(props.teaching_standards, props.teaching_standard)}</span>
                        </div>
                        <div>
                            <img class="icon-size me-2" src="/images/home-page/cash.svg" alt="" />
                            <span class="text-third text-secondary">{props.currency} {props.hourly_rate}/Hr</span>
                        </div>
                        <div>
                            <img class="icon-size me-2" src='/images/home-page/user.svg' alt="" />
                            {/* <NavLink to={`/students/${props.user_id}`} className="ancher-tag text-third text-secondary">{props.user}</NavLink> */}
                            <span class="text-third text-secondary">{capitalizeFirstLetter(props.first_name)} {capitalizeFirstLetter(props.last_name)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}