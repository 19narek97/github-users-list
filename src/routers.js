import React from "react";
import {Switch} from 'react-router'
import AppRouter from './components/AppRouter/AppRouter'
import UserLayout from "./components/layouts/UserLayout";
import Home from  "./view/Home"

class Routers extends React.Component{


    render() {
        return (
            <div>
                <Switch>
                    <AppRouter exact path={'/'} layout={UserLayout} component={Home} />
                </Switch>
            </div>
        )
    }
}

export default Routers