import React from "react";

class Heading extends React.Component{
    render(){
        return(
            <h2>{this.props.name}</h2>
        );
    }
}

export default Heading;