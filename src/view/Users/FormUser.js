import React from "react";
import {Formik, ErrorMessage, Field, Form} from "formik";
import * as Yup from 'yup'
import Button from "antd/es/button";
import Modal from "antd/es/modal";
import {withRouter} from "react-router";
import PicturePreview from "../../components/picturePreview/picturePreview";


class FormUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            picture: null,
            pictureUrl: null,
        }
    }

    onFinish = (values, {setSubmitting, setErrors, setStatus, resetForm}) => {
        const {onSubmit} = this.props;
        if(this.state.pictureUrl !== null){
            values.avatar_url = this.state.pictureUrl
        }
        onSubmit({...values})
        this.setState({
            picture: null,
            pictureUrl: null,
        }, () => resetForm())
    };

    onClose = () => {
        const {onClose} = this.props;
        this.setState({
            picture: null,
            pictureUrl: null,
        })
        onClose()
    }

    uploadPicture = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                picture: file,
                pictureUrl: reader.result,
            })
        };
        reader.readAsDataURL(file);
    };


    render() {
        let {match, entry} = this.props,
            {pictureUrl} = this.state,
            {action} = match.params,
            isVisible = /^(edit|create)$/i.test(action);

        return (

            <Modal
                title={entry.id ? "Edit User" : "Add User"}
                width={796}
                visible={isVisible}
                footer={null}
                onCancel={this.onClose}
            >

                <Formik
                    enableReinitialize
                    initialValues={{
                        ...entry
                    }}
                    validationSchema={Yup.object({
                        login: Yup.string().required('Login is required'),
                        url: Yup.string()
                            .matches(
                                /^((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                                'Enter correct url!'
                            )
                            .required('Please enter website'),
                        followers_url: Yup.string()
                            .matches(
                                /^((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                                'Enter correct url!'
                            )
                            .required('Please enter website'),
                        following_url: Yup.string()
                            .required('Please enter website'),
                        starred_url: Yup.string()
                            .required('Please enter website'),
                        subscriptions_url: Yup.string()
                            .required('Please enter website'),
                    })}
                    onSubmit={this.onFinish}

                >
                    {
                        ({errors, status, touched, values, setFieldValue}) => (
                            <Form>
                                <div className="form-row">
                                    <div className="form-group col-6">
                                        <Field name="login" type="text" placeholder="Login"
                                               className={'form-control' + (errors.login && touched.login ? ' is-invalid' : '')}/>
                                        <ErrorMessage name="login" style={{'fontSize': '15px'}} component="div"
                                                      className="invalid-feedback"/>
                                    </div>
                                    <div className="form-group col-6">
                                        <Field name="url" type="text" placeholder="Url"
                                               className={'form-control' + (errors.url && touched.url ? ' is-invalid' : '')}/>
                                        <ErrorMessage style={{'fontSize': '15px'}} name="url" component="div"
                                                      className="invalid-feedback"/>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-6">
                                        <Field name="followers_url" type="text" placeholder="Followers Url"
                                               className={'form-control' + (errors.followers_url && touched.followers_url ? ' is-invalid' : '')}/>
                                        <ErrorMessage name="followers_url" style={{'fontSize': '15px'}} component="div"
                                                      className="invalid-feedback"/>
                                    </div>
                                    <div className="form-group col-6">
                                        <Field name="following_url" type="text" placeholder="Following Url"
                                               className={'form-control' + (errors.following_url && touched.following_url ? ' is-invalid' : '')}/>
                                        <ErrorMessage style={{'fontSize': '15px'}} name="following_url" component="div"
                                                      className="invalid-feedback"/>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-6">
                                        <Field name="starred_url" type="text" placeholder="Starred Url"
                                               className={'form-control' + (errors.starred_url && touched.starred_url ? ' is-invalid' : '')}/>
                                        <ErrorMessage name="starred_url" style={{'fontSize': '15px'}} component="div"
                                                      className="invalid-feedback"/>
                                    </div>
                                    <div className="form-group col-6">
                                        <Field name="subscriptions_url" type="text" placeholder="Subscriptions Url"
                                               className={'form-control' + (errors.subscriptions_url && touched.subscriptions_url ? ' is-invalid' : '')}/>
                                        <ErrorMessage style={{'fontSize': '15px'}} name="subscriptions_url"
                                                      component="div" className="invalid-feedback"/>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-12">
                                        <div className="input-group">
                                            <PicturePreview pictureUrl={entry.id && pictureUrl === null ? entry.avatar_url : pictureUrl}/>

                                        </div>
                                    </div>
                                    <div className="form-group col-12">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="inputGroupFileAddon01">
                                              Upload
                                            </span>
                                            <div className="custom-file">
                                                <input
                                                    type="file"
                                                    className="custom-file-input"
                                                    id="inputGroupFile01"
                                                    aria-describedby="inputGroupFileAddon01"
                                                    onChange={this.uploadPicture}
                                                />
                                                <label className="custom-file-label" htmlFor="inputGroupFile01">
                                                    Choose file
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <div className=" float-right">
                                    <Button onClick={this.onClose}>Cancel</Button>

                                    <Button type="primary" className="ml-2 " htmlType="submit">
                                        Save
                                    </Button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </Modal>
        )
    }
}

export default withRouter(FormUser)