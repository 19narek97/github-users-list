import React from "react";
import RenderListUsers from "./RenderListUsers";

function UsersList(props) {

    return (
            <div className="wrapper">
                <RenderListUsers
                    onView={props.onView}
                    onDelete={props.onDelete}
                    dataUsers={props.data}
                    onEdit={props.onEdit}
                />
            </div>
    )
}

export default UsersList