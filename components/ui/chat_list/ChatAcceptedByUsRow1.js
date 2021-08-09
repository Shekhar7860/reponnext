export default props => {
    return <div class="d-flex align-items-start" onClick={() => props.initialiseGetBookingAmount(props.id)}>
        <img class="message-profile" src={props.icon} />
        <div class="mt-5">
            <span class="message-bg text-primary fs-16"><img class="icon-size me-2" src="/images/icons/verified.png" />Accepted</span>
            <span class="message-bg text-center">
                <span class="single-ellipsis d-block">{props.message}</span>
                <button type="button" id="selectPaymentModal" className="btn btn-outline-primary btn-round d-inline-block mt-2 py-2" data-bs-toggle="modal" data-bs-target="#paymentModal" >Make Payment</button>
            </span>
        </div>
    </div>
}