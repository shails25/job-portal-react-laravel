import axios from 'axios';
import PreviousMap from 'postcss/lib/previous-map';
import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

function LoginForm(props){
    const [formdata, setFormdata] = useState({
        type: "login",
        name: "",
        email: "",
        password: "",
        confirm: "",
        user_type: "user",
        success: null,
        error: null
    })

    const toggleFormType = () =>{
        const frmdata = {
            ...formdata,
            type: formdata.type == 'login' ? 'register' : 'login'
        }

        setFormdata(frmdata);
    }

    const toggleUserType = () => {
        const frmdata = {
            ...formdata,
            user_type: formdata.user_type == 'user' ? 'recruiter' : 'user'
        }

        setFormdata(frmdata);
    }

    const inputHandler = (event, elem) => {
        console.log(event.target.value, );
        const value = event.target.value;
        const data = {
            ...formdata,
            [elem] : value
        }

        setFormdata(data);
    }

    const submitHandler = (e) =>{
        e.preventDefault();
        $(e).find("button#submit").attr("disabled", true);

        const type = formdata['type'];

        const data = {
            email: formdata['email'],
            password: formdata['password']
        }

        if(type == 'register') {
            data['name'] = formdata['name'];
            data['user_type'] = formdata['user_type'];

            register(data);
        }else{
            login(data);
        }

        console.log(data);
    }

    const login = (data) => {
        axios.post("/api/login", data)
        .then(resp => {
            showMsg("Logged in Successfully", false)
            saveDataLocal(resp.data);
            props.history.push("/dashboard");
        })
        .catch(err => showMsg(err.response.data.message));
    }

    const showMsg = (msg, err = true, s=3000) => {
        setFormdata({
            ...formdata,
            [err ? "error" : "success"] : msg
        })

        setTimeout(()=>{
            setFormdata({
                ...formdata,
                [err ? "error" : "success"] : null
            })
        }, s);
    }

    const register = (data) => {
        axios.post("/api/register", data)
        .then(resp => {
            showMsg("Registered Successfully", false)
            saveDataLocal(resp.data);
            props.history.push("/dashboard");
        })
        .catch(err => showMsg(err.response.data.errors[0]));
    }

    const saveDataLocal = (data) => {
        localStorage.setItem("token", data.token)
        localStorage.setItem("user_type", data.users.user_type);
        localStorage.setItem("name", data.users.name);
    }

    const error = formdata['error'] ? <Alert color="danger">{formdata['error']}</Alert> : null;
    const success = formdata['success'] ? <Alert color="success">{formdata['success']}</Alert> : null;
    return (
        <Form onSubmit={submitHandler}>
            {success}
            {error}
            {formdata.type == 'register' ?
                <>
                    <h4 className="text-capitalize">{formdata.user_type} Register</h4>
                    <hr />
                    <FormGroup>
                        <Label for="exampleEmail">Name</Label>
                        <Input type="text" name="name" placeholder="Enter Name" value={formdata?.name} onChange={(e) => inputHandler(e, "name")}/>
                    </FormGroup>
                </>
                : 
                <>
                    <h4 className="text-capitalize">{formdata.user_type} Login</h4>
                    <hr />
                </>
            }
            <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input type="email" name="email" id="exampleEmail" placeholder="Enter email" value={formdata?.email} onChange={(e) => inputHandler(e, "email")}/>
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" value={formdata?.password} onChange={(e) => inputHandler(e, "password")}/>
            </FormGroup>
            <Button color="primary" id="submit">Submit</Button>
            <hr />
            <div className="text-center text-primary">
                <Button type="button" color="link" onClick={toggleFormType}>{formdata.type == 'login' ? "Create Account" : "Login" }</Button>
                <Button type="button" color="link" onClick={toggleUserType}>{formdata.user_type == 'user' ? "Recruiter " : "User Login" }</Button>
            </div>
        </Form>
    )
}

export default withRouter(LoginForm)