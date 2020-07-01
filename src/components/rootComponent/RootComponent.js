import React from "react";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";

const RootComponent = (props) => {

    return (
        <div>{ <Redirect to={'/users'}/> }</div>
    )
}

export default withRouter(RootComponent)