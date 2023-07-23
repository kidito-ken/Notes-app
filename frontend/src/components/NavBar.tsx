import {user} from "../models/user"
import {Container, Nav, Navbar} from "react-bootstrap"
import NavBarLoggedInView from "./NavBarLoggedInView";
import NavBarLoggedOutView from "./NavBarLoggedOutView";
import styleUtils from "../styles/utils.module.css"

interface NavBarProps {
    loggedInUser: user | null,
    onSignUpClicked: () => void,
    onLogInClicked: () => void,
    onLogoutSuccessful: () => void,
}

const NavBar = ({loggedInUser,onSignUpClicked, onLogInClicked, onLogoutSuccessful}: NavBarProps ) => {
    return (
        <Navbar  variant = "dark" expand="lg" sticky="top" className={styleUtils.navbar}>
            <Container>
                <Navbar.Brand className={styleUtils.f1}>
                    NoteNation
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar"/>
                <Navbar.Collapse id="main-navbar">
                    <Nav className="ms-auto">
                        {loggedInUser
                        ? <NavBarLoggedInView user={loggedInUser} onLogoutSuccessful={onLogoutSuccessful}/>
                        : <NavBarLoggedOutView onLoginClicked={onLogInClicked} onSignUpClicked={onSignUpClicked} />
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;