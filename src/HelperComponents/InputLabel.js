import React from "react";

class InputLabel extends React.Component{
    render(){
        const labelStyle={
            color:"aqua",
            fontWeight:"500",
            fontSize:"20px",
        }
        return(
            <p style={labelStyle}>{this.props.label}</p>
        );
    }
}

export default InputLabel;