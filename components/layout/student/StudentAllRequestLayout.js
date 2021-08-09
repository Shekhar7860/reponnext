import StudentPostLayout from "../../ui/student/StudentPostLayout";
export default props => {

    function getUserPost() {
        const posts = props.student_post ? props.student_post : []
        let rowDate = []
        posts.forEach((element, index) => {
            rowDate.push(<StudentPostLayout key={index} {...element} />)
        });
        return rowDate

    }

    return <>
        {getUserPost()}
        <h1>StudentAllRequestLayout</h1>
    </>

}