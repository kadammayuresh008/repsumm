import React from 'react';
import axios from 'axios';
import config from '../config.json';
import { Accordion, Card, Button, ToastContainer, Toast } from "react-bootstrap";
import { Link } from "react-router-dom";

var listOfFile = [];

class ImageUploader extends React.Component {
    constructor() {
        super();
        this.handleAddImage = this.handleAddImage.bind(this);
        this.handleUploadImage = this.handleUploadImage.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDragEnter = this.handleDragEnter.bind(this);
        this.handleDragLeave = this.handleDragLeave.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleCancelUpload = this.handleCancelUpload.bind(this);
        this.state = {
            file: null,
            dragOver: false,
            errorNoficication: null,
            dataToShow: null,
            isProcessing: false,
            uploadingPaperNameList: [],
            running: false,
            currentTimeMs: 0,
            currentTimeSec: 0,
            currentTimeMin: 0,
            logList: [],
        };
    }

    //to get time
    formatTime = (val, ...rest) => {
        let value = val.toString();
        if (value.length < 2) {
          value = '0' + value;
        }
        if (rest[0] === 'ms' && value.length < 3) {
          value = '0' + value;
        }
        return value;
      };
    
      start = () => {
        this.setState({
            currentTimeMs: 0,
            currentTimeSec: 0,
            currentTimeMin: 0,
          });
          console.log("started");
        if (!this.state.running) {
          this.setState({ running: true });
          this.watch = setInterval(() => this.pace(), 10);
        }
      };
    
      stop = () => {
        this.setState({ running: false });
        clearInterval(this.watch);
      };
    
      pace = () => {
        this.setState({ currentTimeMs: this.state.currentTimeMs + 10 });
        if (this.state.currentTimeMs >= 1000) {
          this.setState({ currentTimeSec: this.state.currentTimeSec + 1 });
          this.setState({ currentTimeMs: 0 });
        }
        if (this.state.currentTimeSec >= 60) {
          this.setState({ currentTimeMin: this.state.currentTimeMin + 1 });
          this.setState({ currentTimeSec: 0 });
        }
      };
    
      reset = () => {
        this.setState({
          currentTimeMs: 0,
          currentTimeSec: 0,
          currentTimeMin: 0,
        });
      };

    //end of to get time

    
    /**
       Drag and Drop Event Handlers
    **/
    handleDragEnter(e) {
        e.preventDefault();
    }
    handleDragOver(e) {
        e.preventDefault();
        if (!this.state.dragOver) {
            this.setState({
                dragOver: true
            });
        }
    }
    handleDragLeave(e) {
        e.preventDefault();
        this.setState({
            dragOver: false
        });
    }
    handleDrop(e) {
        e.preventDefault();
        let file = e.dataTransfer.files[0];

        // Validate file is of type Image
        let fileType = file.type.split("/")[1];
        if (fileType !== "pdf") {
            this.setState({
                file: null,
                errorNotification: "Not an pdf File",
                dragOver: false
            });
            return setTimeout(() => {
                this.setState({
                    errorNotification: null
                });
            }, 3000);
        }
        this.refs.image.files = e.dataTransfer.files;
        document.getElementById('upload-image-input').fileList = e.dataTransfer.files[0];
        this.setState({
            file,
            dragOver: false
        });
    }


    /**
       Handle Manually (File Input) Added Files
    **/
    handleAddImage(e) {
        e.preventDefault();
        let file = this.refs.image.files[0];
        console.log(file);
        // Validate file is of type pdf
        let fileType = this.refs.image.files[0].type.split('/')[1];
        if (fileType !== "pdf") {
            this.setState({
                file: null,
                errorNotification: "Not an pdf File",
                dragOverClass: ""
            });
            return setTimeout(() => {
                this.setState({
                    errorNotification: null
                });
            }, 3000);
        }

        this.setState({
            file
        });
        let x = this.state.uploadingPaperNameList;
        x.push(this.refs.image.files[0].name);
        
        this.setState({
            uploadingPaperNameList: x
        });

        // listOfFile
        let form_data = new FormData();
        form_data.append('rp_file', this.refs.image.files[0], this.refs.image.files[0].name);
        form_data.append('title', this.refs.image.files[0].name);
        listOfFile.push(form_data);
        console.log(listOfFile);
    }



    /**
       Handle Upload after Upload Button Clicked
    **/
    handleUploadImage = async (e) => {
        e.preventDefault();
        this.setState({
            isProcessing: true
        });
        let url = config.UPLOAD_DOC_URL;


        //socket
        let socketUrl = 'ws://127.0.0.1:8000/ws/socket-server/'

        const messageSocket = new WebSocket(socketUrl)

        messageSocket.onmessage = (e) =>{
            let data = JSON.parse(e.data)
            console.log(data);

            let tmpList = this.state.logList;
            tmpList.push(data["message"])
            this.setState({
                logList: tmpList,
            });
        }


        // axios.post(
        //     url, 
        //     listOfFile
        // )
        //     .then(res => {

        //         this.setState({
        //             isProcessing: false
        //         });
        //         this.setState({ 
        //             dataToShow: res.data ? res.data : [] 
        //         });
        //         console.log(this.dataToShow)
        //     })
        //     .catch(err => {
        //         this.setState({
        //             isProcessing: false,
        //             errorNotification: "Not able to process"
        //         });
        //         setTimeout(() => {
        //             this.setState({
        //                 errorNotification: null
        //             });
        //         }, 3000);
        //         console.log(err);
        //     });
    
        this.start();
        for(let i=0; i<listOfFile.length; i++) {
            let tmpList = this.state.logList;
            tmpList.push((i+1).toString());
            this.setState({
                logList: tmpList,
            });

            try {
                const res = await axios.post(url, listOfFile[i]);
                // console.log(res.data);
                this.setState({
                    errorNotification: "Completed "+ (i+1),
                    isProcessing: false
                });
                this.setState({ 
                    dataToShow: res.data ? res.data : [] 
                });
                // console.log(this.dataToShow)
                setTimeout(() => {
                    this.setState({
                        errorNotification: null
                    });
                }, 3000);
                console.log(this.state.currentTimeMin + " : " + this.state.currentTimeSec + " : " + this.state.currentTimeMs);
            } 
            catch (err) {
                this.setState({
                    isProcessing: false,
                    errorNotification: "Not able to process"
                });
                setTimeout(() => {
                    this.setState({
                        errorNotification: null
                    });
                }, 3000);
                console.log(err);
                this.stop();
            }
            /*
            axios.post(
                url, 
                listOfFile[i]
            )
                .then(res => {
                    this.setState({
                        errorNotification: "Completed "+ (i+1),
                        isProcessing: false
                    });
                    this.setState({ 
                        dataToShow: res.data ? res.data : [] 
                    });
                    console.log(this.dataToShow)
                    setTimeout(() => {
                        this.setState({
                            errorNotification: null
                        });
                    }, 3000);
                })
                .catch(err => {
                    this.setState({
                        isProcessing: false,
                        errorNotification: "Not able to process"
                    });
                    setTimeout(() => {
                        this.setState({
                            errorNotification: null
                        });
                    }, 3000);
                    console.log(err);
                });
            */
        }
        this.stop();
    }

    handleCancelUpload(e) {
        e.preventDefault();
        this.setState({
            file: null,
            dataToShow: null,
            uploadingPaperNameList: [],
            logList: [],
        });
        listOfFile = [];
    }

    render() {
        // Match drag over css to hover css
        let dragOverClass = this.state.dragOver
            ? `display-box drag-over`
            : `display-box`;

        // If file is set, change upload box text to file name
        let uploadText = this.state.file
            ? <div>
                
                <h4 className='titleText'>Drag & drop files here, or click to select files</h4>
                <button
                    className="cancel-upload-button btn btn-danger"
                    onClick={this.handleCancelUpload}
                >
                    Cancel
                </button>
                <button
                    className="upload-button btn btn-success"
                    onClick={this.handleUploadImage}
                >
                    Upload to Summarize
                </button>
            </div>
            : <div>
                <h4 className='titleText'>Drag & drop files here, or click to select files</h4>
            </div>;

        // Show Error message if file type is not an image
        let errorNotification = this.state.errorNotification
            ? <div className="error-notification">
                <p>{this.state.errorNotification}</p>
            </div>
            : null;

        
        // Show Extracted Text if file is uploaded properly
        let extractedText = this.state.dataToShow
            ? <div>
                <h4>
                    Sections from Research Paper
                </h4>
            {
                Object.keys(this.state.dataToShow).map((key, i) => (
                    <Accordion flush>
                        <Accordion.Item eventKey={i}>
                            <Accordion.Header>{key.toUpperCase()}</Accordion.Header>
                            <Accordion.Body>
                                <p>
                                {this.state.dataToShow[key]}
                                </p>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                ))
            }
      
          </div>
            : null;


        // Show uploading paper list
        let uploadingPaperListCards = this.state.uploadingPaperNameList
            ? <div>
            {
                Object.keys(this.state.uploadingPaperNameList).map((i) => (
                    <Card border="info" style={{ width: '18rem', display: 'inline-flex'}} >
                        <Card.Header>{this.state.uploadingPaperNameList[i]}</Card.Header>
                    </Card>
                ))
                
            }
      
          </div>
            : null;
        
        return (
            <div>
                <div className='logContainer'>
                    {
                        Object.keys(this.state.logList).map((i) => (
                            this.state.logList[i]*1 >= 1 
                            ?
                                <Card className='speciaLogCard' border="info" >
                                    <Card.Text>{this.state.logList[i]}</Card.Text>
                                </Card>
                            :
                                <Card className='logCard' border="info" >
                                    <Card.Text>{this.state.logList[i]}</Card.Text>
                                </Card>
                        ))
                    }
                </div>
                <div className="image-uploader-wrapper">
                    
                    <div className={dragOverClass}>
                        <div className="icon-text-box">
                            <div className="upload-icon">
                                {
                                this.state.isProcessing == true 
                                    ? <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
                                    : <i className="fa fa-upload" aria-hidden="true" />
                                }                                
                            </div>
                            {
                            this.state.isProcessing == true 
                                ? null
                                : <div className="upload-text">
                                        {uploadText}
                                    </div>
                            } 
                            {errorNotification}
                        </div>
                        <div>
                            {this.state.isProcessing == true 
                                ? null
                                : <input
                                type="file"
                                ref="image"
                                id="upload-image-input"
                                className="upload-image-input"
                                // accept="image/*"
                                multiple
                                onDrop={this.handleDrop}
                                onDragEnter={this.handleDragEnter}
                                onDragOver={this.handleDragOver}
                                onDragLeave={this.handleDragLeave}
                                onChange={this.handleAddImage}
                            />
                            }
         

                            
                        </div>
                    </div>
                </div>

                <div className="uploadingPaperListStyle" >
                    {uploadingPaperListCards}
                </div>

                <br></br>
                <Link
                    style={{textDecoration: "none"}}
                    
                    to={{
                        pathname: "/Result",
                    }}
                    > 
                    <Button variant="success" className="homePageButton" >Get Summary View</Button>
                </Link>
            </div>
        );
    }
}


export default ImageUploader;
