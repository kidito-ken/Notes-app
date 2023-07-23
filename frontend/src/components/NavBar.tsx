import {user} from "../models/user"
import {Container, Nav, Navbar} from "react-bootstrap"
import NavBarLoggedInView from "./NavBarLoggedInView";
import NavBarLoggedOutView from "./NavBarLoggedOutView";

interface NavBarProps {
    loggedInUser: user | null,
    onSignUpClicked: () => void,
    onLogInClicked: () => void,
    onLogoutSuccessful: () => void,
}

const NavBar = ({loggedInUser,onSignUpClicked, onLogInClicked, onLogoutSuccessful}: NavBarProps ) => {
    return (
        <Navbar bg="primary" variant = "dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand>
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