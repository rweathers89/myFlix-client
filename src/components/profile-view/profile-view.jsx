import { useState, useEffect } from "react";
import { Container, Button, Form, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import "./profile-view.css";

export const ProfileView = ({ user, movies }) => {
    const token = localStorage.getItem("token");
    const [userData, setUserData] = useState(user);
    const Username = user ? user.Username : null;

    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newBirthday, setNewBirthday] = useState("");

    const [showUserInfo, setShowUserInfo] = useState(false);
    const toggleShowUserInfo = () => setShowUserInfo(!showUserInfo);

    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const toggleShowUpdateForm = () => setShowUpdateForm(!showUpdateForm);

    const [showFavoriteMovies, setShowFavoriteMovies] = useState(false);
    const toggleShowFavoriteMovies = () =>
        setShowFavoriteMovies(!showFavoriteMovies);

    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const toggleShowDeleteForm = () => setShowDeleteForm(!showDeleteForm);

    const navigate = useNavigate();

    const favMovies = user.FavoriteMovies
        ? movies.filter((m) => user.FavoriteMovies.includes(m._id))
        : [];

    // GET USER DATA FUNCTION
    useEffect(() => {
        if (!token) {
            return;
        }
        if (!user) {
            fetch(
                `https://movie-api-nj6m.onrender.com/users/${Username}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
                .then((response) => response.json())
                .then((responseData) => {
                    setUserData({
                        Username: responseData.Username,
                        Email: responseData.Email,
                        Birthday: responseData.Birthday,
                        FavoriteMovies: responseData.FavoriteMovies,
                    });
                });
        }
    }, [token]);

    // UPDATE USER FUNCTION
    const handleSubmit = (event) => {
        event.preventDefault();

        const newData = {
            Username: newUsername,
            Password: newPassword,
            Email: newEmail,
            Birthday: newBirthday,
        };

        fetch(
            `https://movie-api-nj6m.onrender.com/users/${Username}`,
            {
                method: "PUT",
                body: JSON.stringify(newData),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((response) => response.json())
            .then((response) => {
                if (response.Username) {
                    alert("Update successful");
                    setUserData(newData);
                    localStorage.setItem("user", JSON.stringify(response));
                }
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    };

    // DELETE USER FUNCTION
    const handleDelete = (event) => {
        event.preventDefault();

        if (newUsername !== Username) {
            alert(
                "Incorrect username. Please enter your username to delete your account."
            );
            return;
        }

        fetch(
            `https://movie-api-nj6m.onrender.com/users/${Username}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        ).then((response) => {
            if (response.ok) {
                setUserData(null);
                localStorage.clear();
                alert("User successfully deleted");
                navigate("/return-signup");
            }
        });
    };

    return (
        <Container>
            {/* DISPLAY USER INFO CARD */}
            <Card>
                <Card.Body>
                    <Card.Title>User Information</Card.Title>
                    {showUserInfo && userData && (
                        <div>
                            <Card.Text>Username: {userData.Username}</Card.Text>
                            <Card.Text>Email: {userData.Email}</Card.Text>
                            <Card.Text>Birthday: {userData.Birthday}</Card.Text>
                        </div>
                    )}
                </Card.Body>
                <Button type="button" variant="primary" onClick={toggleShowUserInfo} className="show-button">
                    {showUserInfo ? "Hide User Info" : "Show User Info"}
                </Button>
            </Card>
            {/* UPDATE USER INFO CARD */}
            <Card>
                <Card.Body>
                    <Card.Title>Update User</Card.Title>
                    {showUpdateForm && (
                        <Form>
                            <Form.Group controlId="newUsername">
                                <Form.Label>New Username:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={newUsername}
                                    onChange={(e) => setNewUsername(e.target.value)}
                                    required
                                    minLength="6"
                                />
                            </Form.Group>
                            <Form.Group controlId="newPassword">
                                <Form.Label>New Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    minLength="6"
                                />
                            </Form.Group>
                            <Form.Group controlId="newEmail">
                                <Form.Label>New Email:</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="newBirthday">
                                <Form.Label>New Birthday:</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={newBirthday}
                                    onChange={(e) => setNewBirthday(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Button
                                type="submit"
                                onClick={handleSubmit}
                                variant="primary"
                                className="mr-auto"
                            >
                                Update Info
                            </Button>
                        </Form>
                    )}
                </Card.Body>
                <Button type="button" variant="primary" onClick={toggleShowUpdateForm} className="show-button">
                    {showUpdateForm ? "Hide Update Form" : "Show Update Form"}
                </Button>
            </Card>
            {/* DISPLAY USER'S FAVORITE MOVIES LIST */}
            <Card>
                <Card.Body>
                    <Row>
                        <Card.Title>My Favorite Movies</Card.Title>
                        {showFavoriteMovies &&
                            favMovies.map((movie) => (
                                <Col key={movie._id} sm={12} md={6}>
                                    <MovieCard movie={movie} />
                                </Col>
                            ))}
                    </Row>
                </Card.Body>
                <Button
                    type="button"
                    variant="primary"
                    onClick={toggleShowFavoriteMovies}
                    className="show-button"
                >
                    {showFavoriteMovies ? "Hide Favorites" : "Show Favorites"}
                </Button>
            </Card>
            {/* DELETE USER CARD */}
            <Card>
                <Card.Body>
                    <Card.Title>Delete User</Card.Title>
                    {showDeleteForm && (
                        <Form>
                            <Form.Group controlId="newUsername">
                                <Form.Label>Type Username:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={newUsername}
                                    onChange={(e) => setNewUsername(e.target.value)}
                                    required
                                    minLength="6"
                                />
                            </Form.Group>
                            <Button
                                type="submit"
                                onClick={handleDelete}
                                variant="danger"
                                className="ml-auto"
                            >
                                Delete User
                            </Button>
                        </Form>
                    )}
                </Card.Body>
                <Button type="button" variant="primary" onClick={toggleShowDeleteForm}>
                    {showDeleteForm ? "Hide Delete User Form" : "Show Delete User Form"}
                </Button>
            </Card>
        </Container>
    );
};

/*
EXERCISES

*/



/*<Container className="mx-1">
    <Row>
        <Card className="mb-5">
            <Card.Body>
                <Card.Title>My Profile  </Card.Title>
                <Card.Text>
                    {
                        user && (<UserInfo name={user.username} email={user.email} />)
                    }
                </Card.Text>
            </Card.Body>
        </Card>
        <Card className="mb-5">
            <Card.Body>
                <UpdateUser
                    formData={formData}
                    handleUpdate={handleUpdate}
                    handleSubmit={handleSubmit}
                />
            </Card.Body>
        </Card>
    </Row>
    <Button onClick={() => handleDeleteAccount(storedUser._id)}
        className="button-delete mb-5"
        type="submit" variant="outline-secondary"
    >
        Delete account
    </Button>
    <Row>
        <Col className="mb-5" xs={12} md={12}>
            {
                favoriteMovies && (<FavoriteMovies user={user} favoriteMovies={favoriteMovies} />)
            }
        </Col>
    </Row>
</Container>
*/
