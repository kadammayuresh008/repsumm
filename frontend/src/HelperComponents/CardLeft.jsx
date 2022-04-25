import React from "react";
import { Card } from "react-bootstrap";
import Image1 from "../Images/Image1.jpg";


const CardLeft = (props) =>{
        const ImageCard = {
            border: "1px solid #36096d",
            padding: "10px",
            boxShadow: "5px 8px #36096d",
            margin:"20px",
        }

        const cardImage = {
            height: "200px",
            weight: "500px",
            elevation: 0.5,
        }
        const cardDetails = {
            padding: "20px",
            elevation: 1.0,
        }
        return (
            <Card style={ImageCard} className="infoCard">
                <div className="row">
                    <div className="col-sm-5">
                        <center>
                            <img src={
                                Image1
                            } style={cardImage} alt="Image not Found"></img>
                        </center>
                    </div>
                    <div className="col-sm-7" style={cardDetails}>
                        <h3>{props.title}</h3>
                        <p>
                            {props.content}
                        </p>
                    </div>
                </div>
            </Card >
        );
    }


export default CardLeft;