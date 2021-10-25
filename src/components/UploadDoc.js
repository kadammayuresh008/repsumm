import React from "react";
import Heading from "../HelperComponents/Heading";
import UploadBox from "../HelperComponents/UploadBox";
import { Button } from "react-bootstrap";


const UploadDoc = ()=>{
        return (
            <div>
                <center>
                    <Heading name="Upload DOC/PDF"></Heading>
                    <br></br>
                    <UploadBox></UploadBox>
                </center>
            </div>
        );
}
export default UploadDoc;