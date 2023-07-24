import {Button} from "react-bootstrap"
import styleUtils from "../styles/utils.module.css"

interface NavBarLoggedOutViewProps {
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
}

const NavBarLoggedOutView = ({onSignUpClicked, onLoginClicked }:NavBarLoggedOutViewProps)=>{
    return(
        <>
        <Button onClick={onSignUpClicked} className={styleUtils.lout}>Sign Up</Button>
        <Button onClick={onLoginClicked}>Log In</Button>
        </>
    )
}

export default NavBarLoggedOutView