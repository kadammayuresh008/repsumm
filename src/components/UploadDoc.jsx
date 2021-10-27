import React from "react";
import Heading from "../HelperComponents/Heading";
import ImageUploader from "./Test";


const UploadDoc = () => {
    return (
        <div>
            <center>
                <Heading name="Upload DOC/PDF"></Heading>
                <br></br>
                <ImageUploader></ImageUploader>
            </center>
        </div>
    );
}
export default UploadDoc;