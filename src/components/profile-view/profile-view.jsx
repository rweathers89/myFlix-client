import { useEffect, useState } from "react";
import PropTypes from "prop-types";
//import Form from "react-bootstrap/Form";
import { Button, Card, Container, Row, Col } from "react-bootstrap";

import { FavoriteMovies } from "./favorite-movies";
import { UpdateUser } from "./update-user";
//import { Link } from "react-router-dom";
import { UserInfo } from "./user-info";

export const ProfileView = ({ localuser, movies, token }) => {
    // const storedUser = JSON.parse(localStorage.getItem("user"));

    const { username, setUserName } = useState(storedUser.username);
    const [password, setPassword] = useState(storedUser.password);
    const [email, setEmail] = useState(storedUser.email);
    const [birthday, setBirthday] = useState(storedUser.birthday);
    const [user, setUser] = useState();

    const favoriteMovies = movies.filter((m) =>
        user.FavoriteMovies.includes(m.id)
    );

    const formData = {
        Username: username,
        Email: email,
        Birthday: birthday,
        Password: password
    };

    const handleSubmit = (event) => {
        event.preventDefault(event);

        fetch(`https://movie-api-nj6m.onrender.com/users/${user.username}`, {
            method: "PUT",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        )
            .then((response) => {
                if (response.ok) {
                    alert("Update successful");
                    window.location.reload();

                    return response.json()
                }
                alert("Update failed");
            })
            .then((user) => {
                if (user) {
                    localStorage.setItem("user", JSON.stringify(user));
                    setUser(user)
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }; //END handleSubmit


    const handleUpdate = (e) => {
        switch (e.target.typ) {
            case "text":
                setUsername(e.target.value);
                break;
            case "email":
                setEmail(e.target.value);
                break;
            case "password":
                setPassword(e.target.value);
                break;
            case "birthday":
                setBrithday(e.target.value);
            default:
        }
    }; // END handleUpdate

    const handleDeleteAccount = () => {
        fetch(`https://movie-api-nj6m.onrender.com//users/${storedUser.username}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert("Account deleted");
                localStorage.clear();
                window.location.reload();
            } else {
                alert("Something went wrong");
            }
        });
    }; //END handleDeleteAccount




    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://movie-api-nj6m.onrender.com/users", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Users data: ", data);

                const usersFromApi = data.map((user) => {
                    return {
                        id: user.id,
                        username: user.username,
                        password: user.password,
                        email: user.email,
                        birthday: user.birthday,
                        favoriteMovies: user.favoriteMovies,
                    };
                });

                setUser(usersFromApi.find((u) => u.username === localUser.username));
                console.log("Profile Saved User:", JSON.stringify(user));
            })
            .catch((error) => {
                console.error(error);
            });
    }, [token]) //END useEffect

    return (
        <Container>
            <Row>
                <Card className="mb-5">
                    <Card.Body>
                        <Card.Title>My Profile </Card.Title>
                        <Card.Text>
                            {user && <UserInfo name={user.username} email={user.email} />}
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className="mb-5">
                    <Card.Body>
                        <UpdateUser
                            formData={formData}
                            handleUpdate={handleUpdate}
                            handleSubmit={handleSubmit}
                            handleDeleteAccount={handleDeleteAccount}
                        />
                    </Card.Body>
                </Card>
            </Row>
            <Row>
                <Col className="mb-5" xs={12} md={12}>
                    {favoriteMovies && (
                        <FavoriteMovies user={user} favoriteMovies={favoriteMovies} />
                    )}
                </Col>
            </Row>
        </Container>
    );
};

ProfileView.propTypes = {
    localUser: PropTypes.object.isRequired,
    movies: PropTypes.array.isRequired,
    token: PropTypes.string.isRequired,
};

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
