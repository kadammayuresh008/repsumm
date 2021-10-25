import './App.css';
import React from "react";
import WebNavbar from './HelperComponents/WebNavbar';
import UploadDoc from './components/UploadDoc';
import Login from './components/Login';
import SignUp from './components/SignUp';
import HomePage from './components/HomePage';

function App() {
  const PageStyle = {
    // marginTop: "25px",
    // marginLeft: "30%",
    // marginRight: "30%",
    backgroundColor: "aqua",
    // paddingLeft:"30px",
    // paddingRight:"30px",
    // borderRadius:"10px",
    // paddingTop: "30px",
    // paddingBottom: "10px",
    // borderRadius: "10px",
}

  return (
    <div>
      <WebNavbar></WebNavbar>
      <HomePage></HomePage>
      {/* <UploadDoc></UploadDoc> */}
      {/* <Login></Login> */}
      {/* <SignUp></SignUp> */}
    </div>
  );
}

export default App;
