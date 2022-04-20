import React from "react";
import Heading from "../HelperComponents/Heading";
import ImageUploader from "../HelperComponents/UploadBox";


const UploadDoc = () => {
    return (
        <div>
            <center>
                <br />
                <span className="titleTextStyle">Upload IEEE/Springer Research Paper PDF</span>
                {/* <Heading name="Upload IEEE/Springer Research Paper PDF"></Heading> */}
                <ImageUploader />
            </center>
        </div>
    );
}
export default UploadDoc;