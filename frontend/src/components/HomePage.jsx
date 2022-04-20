import React from "react";
import { Button} from "react-bootstrap";
import CardLeft from "../HelperComponents/CardLeft";
import CardRight from "../HelperComponents/CardRight";
import "../components/maincomponents.scss";
import { Link } from "react-router-dom";


const HomePage = ()=>{

    // const HomeImageStyle={
    //     height: "300px",
    //     backgroundColor: "#848BB3",
    //     position:"relative",
    //     textAlign:"center",
    //     background-color: #36096d,
    //     background-image: linear-gradient(315deg, #36096d 0%, #37d5d6 74%);
    // }

    const HomePageButton={
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingTop:"10px",
        paddingBottom:"10px",
        borderRadius: "7px",
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
        <div className ="homeImageStyle" >
            <h1 className="HomeImageText" style={HomeImageText}>Research Paper Summarizer </h1>

            <Link
                style={{textDecoration: "none"}}
                
                to={{
                    pathname: "/UploadDoc",
                }}
                > 
                <Button variant="success" className="HomePageButton" style={HomePageButton}>Get Started</Button>
            </Link>
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