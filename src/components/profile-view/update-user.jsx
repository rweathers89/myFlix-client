import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";

export const UpdateUser = ({ formData, handleSubmit, handleUpdate, handleDeleteAccount }) => {

    return (
        <Row>
            <Form onSubmit={handleSubmit}>
                <h4>Update profile information</h4>
                <Form.Group controlId="formUsername" className="mb-2">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type="text"
                        value={formData.username}
                        onChange={(e) => handleUpdate(e)}
                        required
                        minLength="3"
                    />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-2">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleUpdate(e)}
                        required
                        minLength="6"
                    />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-2">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleUpdate(e)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBirthday" className="mb-2">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                        type="date"
                        value={formData.birthday}
                        onChange={(e) => handleUpdate(e)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" >
                    Submit Changes
                </Button>
                <Button
                    onClick={() => handleDeleteAccount()}
                    variant="outline-secondary"
                    className="mx-3"
                >
                    Delete Account
                </Button>

            </Form>
        </Row >
    );
};


UpdateUser.propTypes = {
    formData: PropTypes.object.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
};


/*
 

*/