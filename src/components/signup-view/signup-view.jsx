import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch("https://movie-api-nj6m.onrender.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                if (response.ok) {
                    alert("Signup successful");
                    navigate("/login");
                } else if (username.length < 6) {
                    alert("Username must be 6 characters or longer.");
                } else if (password === "") {
                    alert("You must enter a password.");
                } else if (email.includes("@") === false) {
                    alert("Please enter a valid email address.");
                } else {
                    alert("Signup failed");
                }
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="signupFormUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="3"
                />
            </Form.Group>

            <Form.Group controlId="signupFormPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="6"
                />
            </Form.Group>

            <Form.Group controlId="signupFormEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="signupFormBirthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Signup
            </Button>
        </Form>
    );
};

/*
return (
    <form onSubmit={handleSubmit}>
        <label>
            Username:
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength="3"
            />
        </label>

        <label>
            Password:
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="6"
            />
        </label>

        <label>
            Email:
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
        </label>

        <label>
            Birthday:
            <input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
            />
        </label>


        <button type="submit">Submit</button>
    </form>
*/