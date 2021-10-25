import React from "react";
import { Form, Button } from "react-bootstrap";
import Heading from "../HelperComponents/Heading";


const Login=()=>{
    const inputStyle = {
        borderRadius: "10px",
    }

    const InputLabelStyle={
        color:"purple"
    }
    return (
        <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-4">
                    <Heading name="Login"></Heading>
                    <br></br>
                <p>Log in with your Credentials</p>
                <br></br>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label style={InputLabelStyle}>Your Email</Form.Label>

                        <Form.Control type="email" placeholder="name@gmail.com" style={inputStyle} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label style={InputLabelStyle}>Password</Form.Label>
                        <Form.Control type="password" placeholder="Aleast 8 character" style={inputStyle} />
                    </Form.Group>
                    <Form.Group className="mb-1" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Keep me logged in." />
                    </Form.Group>
                    <br></br>
                    <div className="d-grid gap-2">
                        <Button variant="primary" size="sm" >
                            Login
                        </Button></div>
                    <center>
                        <br></br>
                        <Form.Label>Don't have an account?
                            <a href="#" style={InputLabelStyle}> SignUp</a>
                            </Form.Label>
                        <br></br>
                        <Form.Label style={InputLabelStyle}>Forgot Password</Form.Label>
                    </center>
                </Form>
            </div>
            <div className="col-sm-4"></div>
        </div>
    );
}



export default Login;