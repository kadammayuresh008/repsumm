import React from "react";
import { Button} from "react-bootstrap";
import { render } from "react-dom";
import HomeImage from "../Images/HomeImage.jpg";
import CardLeft from "../HelperComponents/CardLeft";
import CardRight from "../HelperComponents/CardRight";


const HomePage = ()=>{
    const HomeImageStyle = {
        height: "450px",
        backgroundColor: "aqua",
        position:"relative",
    }
    const HomePageButton = {
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingTop:"10px",
        paddingBottom:"10px",
        borderRadius: "20px",
        position: "absolute",
        right: "150px",
        bottom: "70px",
        opacity:1.0,
    }

    const HomeImageText={
        position: "absolute",
        left: "50px",
        bottom: "70px",
        color:"white",
        opacity:1.0,
        textShadow:"3px 3px black",
    }
    return (

        <center>
        <div style={HomeImageStyle}>
            <h1 style={HomeImageText}>Research Paper Summarizer </h1>
            <Button variant="success" style={HomePageButton}>Get Started</Button>
        </div>
        <div className="col-sm-10">
        <CardLeft></CardLeft>
        <CardRight></CardRight>
        <CardLeft></CardLeft>
        <CardRight></CardRight>
        </div>
        </center>
    );
}


export default HomePage;