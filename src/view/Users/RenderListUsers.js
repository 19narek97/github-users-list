import React from "react";
import {Button, Card, Popconfirm} from "antd";
import Divider from "antd/es/divider";
import { withRouter } from "react-router";

function RenderListUsers(props) {
    return props.dataUsers.map((item) => {
        return (
            <Card
                bordered={true}
                className="mt-3"
                key={+item.id * Math.random()}
                hoverable
                style={{width: 270}}
                cover={<img alt="example" src={item.avatar_url}/>}
            >

                <Divider/>
                <div className="emailSetupInfo">
                    <span className="labelUserInfo">Login: <strong>{item.login}</strong></span> <br/>
                    <span className="labelUserInfo">Url: <a href={item.url} target="_blank"><strong>{item.url.length > 26 ? item.url.slice(0,26) + "..." : item.url}</strong></a> </span>

                </div>

                <Button
                    type="primary"
                    className="mt-4 mr-2"
                    disabled={false}
                    onClick={() => props.onView(item.id)}
                >
                    View
                </Button>
                <Button
                    type="primary"
                    className="mt-4 mr-2"
                    disabled={false}
                    onClick={() => props.onEdit(item.id)}
                >
                    Edit
                </Button>

                <Popconfirm title="Confirm delete" onConfirm={() => props.onDelete(item.id)}>
                    <Button
                        type="danger"
                        className="mt-4 deleteBtn"
                        disabled={false}
                    >
                        Delete
                    </Button>
                </Popconfirm>
            </Card>
        )
    })
}

export default withRouter(RenderListUsers)