import React from "react";
import {Col, Row} from "react-bootstrap";
import "./Users.css"
import UsersList from "./UsersList";
import Skeleton from "antd/es/skeleton";
import {Input} from "antd";
import FormUser from "./FormUser";
import Button from "antd/es/button";
import View from "./viewUser";

class Users extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoadingUsers: false,
            currentPage: 1,
            data: [],
            entry: {},
            filterText:null,
            unfilteredData:[]
        }
    }

    componentDidMount() {
        this.setState({
            isLoadingUsers: true
        }, () => fetch("https://api.github.com/users", {
            method: 'get',
            headers: {
                Accept: 'application/json',
            },
        }).then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            } else {
                const error = new Error(`HTTP Error ${response.statusText}`);
                error.status = response.statusText;
                error.response = response;
                throw error;
            }
        }).then((data) => {
            this.setState({
                isLoadingUsers: false,
                data: [...data]
            })

        }))
    }

    onModalClose = () => {
        this.setState({
            entry:{}
        },() => this.props.history.push("/users"))
    }

    onModalSubmit = (user) => {
        let {data} = this.state;
        if (user.id) {
            let newData = data.map((el) => {
                if (el.id === user.id) {
                    return Object.assign({}, el, {
                        ...user
                    });
                } else {
                    return el;
                }
            })
            this.setState({
                data: [...newData]
            }, () => this.props.history.push("/users"))
        } else {
            if(user.avatar_url === undefined){
                user.avatar_url = "https://www.web2present.com/wp-content/uploads/2017/02/no-avatar-350x350.jpg"
            }
            data.unshift(user);
            this.setState({
                data
            },() => this.props.history.push("/users"))
        }
    }

    setUnfilteredData = (data) => {
        if (!this.state.unfilteredData.length > 0) {
            const copy = Object.assign([], data);
            this.setState({unfilteredData: copy});
        }
    }

    onChangeSearch = (e) => {
        this.setState({
            filterText:e.target.value
        },() => this.filterData())
    }

    filterData = () => {
        let {data,unfilteredData,filterText} = this.state;
        this.setState({
            isLoadingUsers:true
        })
        this.setUnfilteredData(data)

       function  matchesText(item) {
           return item.login ? item.login.toLowerCase().includes(filterText.toLowerCase()) : false;
       }

       let dataToFilter = unfilteredData ? unfilteredData : data
       let filteredData = dataToFilter
                           .filter(matchesText);

        this.setState({
            data:[...filteredData],
            isLoadingUsers:false
        })

    }

    addNewUser = () => {
        this.setState({
            entry:{
                login: "",
                url: "",
                followers_url: "",
                following_url: "",
                starred_url: "",
                subscriptions_url: "",
            }
        }, () => this.props.history.push(`users/create`))
    }

    handelDelete = (id) => {
        let {data} = this.state,
            users = [...data];
        let filteredData = users.filter(el => +el.id !== +id);
        this.setState({
            data: [...filteredData]
        })

    }

    onView = (id) => {
        let {data} = this.state,
            entry = data.find(({id: UserId}) => +UserId === +id);

        this.setState({
            entry
        }, () => this.props.history.push(`users/${id}/view`))
    }

    handelEdit = (id) => {
        let {data} = this.state,
            entry = data.find(({id: UserId}) => +UserId === +id);

        this.setState({
            entry
        }, () => this.props.history.push(`users/${id}/edit`))
    }


    render() {
        let {isLoadingUsers, data, currentPage, entry} = this.state;

        return (
            <Row>
                {
                    isLoadingUsers ? <Skeleton active/> :
                        <Col>
                            <Row>
                                <Col/>
                                <Col/>
                                <Col>
                                    <Button type="primary" onClick={this.addNewUser} className="mt-3 float-right" htmlType="button">
                                        Add New User
                                    </Button>
                                </Col>
                                <Col>
                                    <Input type="text" className="mt-3" placeholder="Search" onChange={this.onChangeSearch}/>
                                </Col>
                            </Row>

                            <View  entry={entry} onClose={this.onModalClose}/>
                            <FormUser entry={entry} onClose={this.onModalClose} onSubmit={this.onModalSubmit}/>

                            <UsersList
                                onView={this.onView}
                                onDelete={this.handelDelete}
                                onEdit={this.handelEdit}
                                currentPage={currentPage}
                                data={data}
                            />
                        </Col>
                }
            </Row>
        )
    }
}

export default Users