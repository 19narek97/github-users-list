import React from "react";
import {Switch} from 'react-router'
import AppRouter from './components/AppRouter/AppRouter'
import UserLayout from "./components/layouts/UserLayout";
import Users from "./view/Users"
import RootComponent from "./components/rootComponent/RootComponent";

class Routers extends React.Component {


    render() {
        return (
            <div>
                <Switch>
                    <AppRouter exact path={'/'} layout={UserLayout} component={RootComponent}/>
                    <AppRouter exact path={'/users'} layout={UserLayout} component={Users}/>
                    <AppRouter path="/users/:id(\d+)?/:action([a-z]+)?" layout={UserLayout} component={Users} exact />
                </Switch>
            </div>
        )
    }
}

export default Routers