import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {

    return (
        <>
            <Row className="navBar">
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand as={Link} to="/">
                            MyMovieMix
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
                                        <Nav.Link className="navLink" onClick={onLoggedOut} >
                                            Logout
                                        </Nav.Link>
                                    </>
                                )}
                            </Nav>
                            <Routes>
                                <Route
                                    path="/"
                                    element={
                                        <Form inline="true">
                                            <Row>
                                                <Col xs="auto">
                                                    <SearchBar
                                                        handleSearch={handleSearch}
                                                        query={query}
                                                        movies={movies} />
                                                </Col>
                                            </Row>
                                        </Form>
                                    }
                                />
                            </Routes>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Row>
        </>
    );
};
