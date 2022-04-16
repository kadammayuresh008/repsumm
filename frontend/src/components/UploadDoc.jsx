import React from "react";
import Heading from "../HelperComponents/Heading";
import ImageUploader from "../HelperComponents/UploadBox";
// import UploadFiles from "./upload-files.component";


const UploadDoc = () => {
    return (
        <div>
            <center>
                <br />
                <Heading name="Upload IEEE Research Paper PDF"></Heading>
                <ImageUploader></ImageUploader>

                {/* <UploadFiles /> */}

            </center>
        </div>
    );
}
export default UploadDoc;