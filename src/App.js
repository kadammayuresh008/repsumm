import './App.css';
import React from "react";
import WebNavbar from './HelperComponents/WebNavbar';
import UploadDoc from './components/UploadDoc';

function App() {

  return (
    <div>
      <WebNavbar></WebNavbar>
      <UploadDoc></UploadDoc>
    </div>
  );
}

export default App;
