import React from "react";
import Heading from "../HelperComponents/Heading";
import ImageUploader from "../HelperComponents/UploadBox";


const UploadDoc = () => {
    return (
        <div>
            <center>
                <br />
                <Heading name="Upload DOC/PDF"></Heading>
                <ImageUploader></ImageUploader>
            </center>
        </div>
    );
}
export default UploadDoc;