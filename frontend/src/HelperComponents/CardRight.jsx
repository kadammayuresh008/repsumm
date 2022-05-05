import React from "react";
import { Card } from "react-bootstrap";
import Image2 from "../Images/Image2.jpg";


const CardRight =(props)=>{
        const cardImage={
            height:"200px",
            weight:"500px",
        }
        const cardDetails={
            padding:"20px",
            elevation:1.0,
        }
        return(
            <Card>
                <div className="row">
                    <div className="col-sm-7" style={cardDetails}>
                    <h3>{props.title}</h3>
                        <p>
                        {props.content}
                        </p>
                    </div>
                    <div className="col-sm-5">
                        <center>
                        <img src={
                            Image2
                            } style={cardImage} alt="Not Found"></img>
                        </center>
                    </div>
                </div>
            </Card>
        );
    }

export default CardRight;