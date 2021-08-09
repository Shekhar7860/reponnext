export default props => {
    return <>
        <div class="d-flex align-items-start" >
            <img class="message-profile" src={props.iconUs} />
            <div class="mt-5">
                <span class="message-bg text-primary fs-16"><img class="icon-size me-2" src="/images/icons/verified.png" />Accepted</span>
                <span class="message-bg text-center">
                    <span class="single-ellipsis d-block">{props.message}</span>
                </span>
            </div>
        </div>

        <div class="d-flex align-items-start flex-row-reverse">
            <img class="message-profile" src={props.iconMe} />
            <div class="mt-5">
                <span class="message-bg-two text-white fs-16"><img class="icon-size me-2" src="/images/icons/verified_white_small.png" />Payment Done</span>
            </div>
        </div>
    </>
}