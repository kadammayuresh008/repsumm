import React from "react";
import { Form,Button} from "react-bootstrap";
import UploadDocImage from "../Images/UploadDocImage1.png";
import WebNavbar from "../HelperComponents/WebNavbar";


const UploadBox=()=>{
    const divStyle={
        backgroundColor:'aqua',
        width:'900px',
        padding:'50px',
    }
    
    const textStyle={
        size:'20px',
        fontWeight:'700',
        // padding:'200px',
    }

    const imgStyle={
        height:'100px',
        width:'100px',
    }
    
    const dropDownStyle={
        paddingLeft:'40px',
        paddingRight:'40px',
        paddingTop:'10px',
        paddingBottom:'10px',
        borderRadius:'5px',
    }

    return (
        <div style={divStyle}>
            {/* <WebNavbar></WebNavbar> */}
            <img 
            src={UploadDocImage} 
            alt="Image not found"
            style={imgStyle}></img>
            <br></br>
            <div className="mb-1 col-sm-6">
            <Form>
                <Form.Select style={dropDownStyle}>
                    <option>CHOOSE FILE</option>
                    <option>From Device</option>
                    <option>From Drive</option>
                </Form.Select>
            </Form>
            </div>
            <br></br>
            <p style={textStyle}>or drop pdf here</p>
            <Button variant="success">Summarize</Button>
        </div>
    );   
}

// class UploadBox extends React.Component{

// render(){
//     const divStyle={
//         backgroundColor:'aqua',
//         width:'900px',
//         padding:'50px',
//     }
    
//     const textStyle={
//         size:'20px',
//         fontWeight:'700',
//         // padding:'200px',
//     }

//     const imgStyle={
//         height:'100px',
//         width:'100px',
//     }
    
//     const dropDownStyle={
//         paddingLeft:'40px',
//         paddingRight:'40px',
//         paddingTop:'10px',
//         paddingBottom:'10px',
//         borderRadius:'5px',
//     }

//     return (
//         <div style={divStyle}>
//             {/* <WebNavbar></WebNavbar> */}
//             <img 
//             src={UploadDocImage} 
//             alt="Image not found"
//             style={imgStyle}></img>
//             <br></br>
//             <div className="mb-1 col-sm-6">
//             <Form>
//                 <Form.Select style={dropDownStyle}>
//                     <option>CHOOSE FILE</option>
//                     <option>From Device</option>
//                     <option>From Drive</option>
//                 </Form.Select>
//             </Form>
//             </div>
//             <br></br>
//             <p style={textStyle}>or drop pdf here</p>
//             <Button variant="success">Summarize</Button>
//         </div>
//     );
// }
// }

export default UploadBox;
