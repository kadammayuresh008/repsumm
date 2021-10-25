import React from "react";

const InputLabel=()=>{
    const labelStyle={
        color:"aqua",
        fontWeight:"500",
        fontSize:"20px",
    }
    return(
        <p style={labelStyle}>{this.props.label}</p>
    );
}


export default InputLabel;