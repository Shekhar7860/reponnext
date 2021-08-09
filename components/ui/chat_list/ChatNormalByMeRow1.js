export default props => {
    // console.log("ChatNormalByMeRow1 props", props);
    return <div className="d-flex align-items-start flex-row-reverse">
        <img className="message-profile" src={props.icon} />
        <div className="mt-5">
            <span className="message-bg-two">{props.message}</span>
        </div>
    </div>
}