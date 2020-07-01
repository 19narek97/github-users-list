import React from "react";
import {Container, Row} from "react-bootstrap"
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom"

class UserLayout extends React.Component {


    render() {
        const {children} = this.props;

        return (
            <Container fluid={true}>
                <Row style={{display: 'block'}}>
                    <Navbar bg="light" expand='md'>
                        <Navbar.Brand href="/users">Users</Navbar.Brand>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Link style={{marginTop: '6px'}} to={"/users"}>Users List</Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>

                </Row>
                {children}
            </Container>
        )
    }

}

export default UserLayout