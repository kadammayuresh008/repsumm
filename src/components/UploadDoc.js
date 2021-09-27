import React from "react";
import Heading from "../HelperComponents/Heading";
import UploadBox from "../HelperComponents/UploadBox";

class UploadDoc extends React.Component {
    render() {
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
}

export default UploadDoc;