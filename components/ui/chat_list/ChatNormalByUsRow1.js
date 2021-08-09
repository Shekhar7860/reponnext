export default props => {
    return <div className="d-flex align-items-start">
        <img className="message-profile" src={props.icon} />
        <div className="mt-5">
            <span className="message-bg">{props.message}</span>
        </div>
    </div>
}