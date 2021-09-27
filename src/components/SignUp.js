import React from "react";
import { Form, Button } from "react-bootstrap";
import Heading from "../HelperComponents/Heading";


class SignUp extends React.Component {
    render() {
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
                        <Heading name="Sign up"></Heading>
                        <br></br>
                    <p>Register with us by filling some of your information.</p>
                    <br></br>
                    <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label style={InputLabelStyle}>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name" style={inputStyle} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label style={InputLabelStyle}>Your Email</Form.Label>

                            <Form.Control type="email" placeholder="name@gmail.com" style={inputStyle} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label style={InputLabelStyle}>Password</Form.Label>
                            <Form.Control type="password" placeholder="Aleast 8 character" style={inputStyle} />
                        </Form.Group>
                        <Form.Group className="mb-1" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="By creating an account you
                            agree to the term of use and our privacy policy." />
                        </Form.Group>
                        <br></br>
                        <div className="d-grid gap-2">
                            <Button variant="primary" size="sm" >
                                Signup
                            </Button></div>
                        <center>
                            <br></br>
                            <Form.Label>Already have an account?
                                <a href="#" style={InputLabelStyle}> Login</a>
                                </Form.Label>
                            <br></br>
                        </center>
                    </Form>
                </div>
                <div className="col-sm-4"></div>
            </div>
        );
    }
}

export default SignUp;