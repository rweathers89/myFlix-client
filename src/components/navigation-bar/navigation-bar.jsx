import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";

export const NavigationBar = ({ user, onLoggedOut }) => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    return (

        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    My Movie Mix
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!user && (
                            <>
                                <Nav.Link className="navLink" as={Link} to="/login">
                                    Login
                                </Nav.Link>
                                <Nav.Link className="navLink" as={Link} to="/signup">
                                    Signup
                                </Nav.Link>
                            </>
                        )}
                        {!user && (
                            <>
                                <Nav.Link className="navLink" as={Link} to="/">
                                    Home
                                </Nav.Link>
                                <Nav.Link className="navLink" as={Link} to="/profile">
                                    Profile
                                </Nav.Link>
                                <Nav.Link className="navLink" onClick={() => dispatch(setUser(null))} >
                                    Logout
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};