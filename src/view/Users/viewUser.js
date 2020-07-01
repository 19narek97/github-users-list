import React from "react";
import Button from "antd/es/button";
import Modal from "antd/es/modal";
import {withRouter} from "react-router";



class View extends React.Component {

    onClose = () => {
        const {onClose} = this.props;
        onClose()
    }


    render() {
        let {match, entry} = this.props,
            {action} = match.params,
            isVisible = /^(view)$/i.test(action);

        return (

            <Modal
                title={"View"}
                width={1024}
                visible={isVisible}
                footer={null}
                onCancel={this.onClose}
            >

                <div>
                    <span style={{fontSize:"34px"}}>Login ` </span> <strong style={{fontSize:"21px"}}>{entry.login}</strong><br/>
                    <span style={{fontSize:"34px"}}>Url ` <a href={entry.url} target="_blank"><strong style={{fontSize:"21px"}}>{entry.url}</strong></a> </span><br/>
                    <span style={{fontSize:"34px"}}>Followers Url ` <a href={entry.followers_url} target="_blank"><strong style={{fontSize:"21px"}}>{entry.followers_url}</strong></a> </span><br/>
                    <span style={{fontSize:"34px"}}>Following Url ` <a href={entry.following_url} target="_blank"><strong style={{fontSize:"21px"}}>{entry.following_url}</strong></a> </span><br/>
                    <span style={{fontSize:"34px"}}>starred Url ` <a href={entry.starred_url} target="_blank"><strong style={{fontSize:"21px"}}>{entry.starred_url}</strong></a> </span><br/>
                    <span style={{fontSize:"34px"}}>Subscriptions Url ` <a href={entry.subscriptions_url} target="_blank"><strong style={{fontSize:"21px"}}>{entry.subscriptions_url}</strong></a> </span>
                </div>
                <div className="modal-footer">
                    <Button  type="primary" onClick={this.onClose}>Okay</Button>
                </div>
            </Modal>
        )
    }
}

export default withRouter(View)