import React from "react";
import { Card } from "react-bootstrap";
import Image1 from "../Images/Image1.jpg";

class CardLeft extends React.Component {
    render() {
        const ImageCard = {
            border: "1px solid",
            padding: "10px",
            boxShadow: "5px 10px",
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
            <Card style={ImageCard}>
                <div className="row">
                    <div className="col-sm-5">
                        <center>
                            <img src={
                                Image1
                            } style={cardImage} alt="Image not Found"></img>
                        </center>
                    </div>
                    <div className="col-sm-7" style={cardDetails}>
                        <h3>Lorem ipsum dolor sit amet</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac luctus mi. Aenean nec augue dolor.
                            Sed varius sodales augue eu pulvinar. Etiam et risus varius, sollicitudin enim mollis, ornare nunc.
                            Donec in convallis dolor, vitae placerat dolor. Vivamus eget elit lobortis, venenatis ex a, maximus
                            elit. Cras dictum fringilla mi a dapibus. Vivamus lobortis, augue et luctus molestie, metus nunc
                            semper lorem, at maximus velit felis quis neque.
                        </p>
                    </div>
                </div>
            </Card >
        );
    }
}


export default CardLeft;