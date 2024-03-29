import React from "react";

export const UserInfo = (email, name) => {
    return (
        <div>
            <h4>My Info</h4>
            <p>Name: {name}</p>
            <p>email: {email}</p>
        </div>
    )
};

