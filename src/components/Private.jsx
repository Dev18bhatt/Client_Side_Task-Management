import { useContext } from "react"
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
export default function Private(props) {
    console.log("We came here and then ")
    const loggedData = useContext(UserContext);
    console.log('Accessed the value of loggedData', loggedData.loggedUser);
    return (
        loggedData.loggedUser !== null ?
            <props.Components></props.Components>
            : <Navigate to="/login" />

    )
}
