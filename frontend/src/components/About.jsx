import ReactRoundedImage from 'react-rounded-image';
import DefaultImage from '../Images/DefaultImage.jpg';

const About = () => {
    const AboutImageText = {
        position: "absolute",
        left: "50px",
        bottom: "70px",
        color: "white",
        opacity: 1.0,
        textShadow: "3px 3px black",
    }

    return (
        <center>
            <div className="aboutImageStyle">
                <h1 className="AboutImageText" style={AboutImageText}>About Research Paper Summarizer </h1>
            </div>
            <br></br>
            <div className="container">
                {/* <Heading className="" name="Why RPS?"></Heading> */}
                <span className="titleTextStyle">Why RPS?</span>
                <p style={{margin: "10px"}}>
                Preparing a research paper on a certain topic requires searching and analyzing multiple research papers related to the research topic. This process is not only time-consuming but also becomes hectic sometimes. Even after studying various papers, generating a summary and concluding results from it becomes difficult.Hence, this difficulty in reading multiple articles and understanding the actual content of the articles, made us realize the acute need for an application where a summarization of the research paper can be possible. This thought inspired us to design this web application to solve this problem. The web application designed will summarize the multiple research papers of a particular topic.
                </p>
            </div>
                <div className="horizontalSeperationStyle"></div>
            <br></br>
            <div>
                <span className="titleTextStyle">Team Members</span>
                <br/>
                {/* <Heading name="Team Members"></Heading> */}
                <div className="row container">
                    <div className="col-sm-3">
                        <ReactRoundedImage
                            image={DefaultImage}
                            roundedColor="#848BB3"
                            roundedSize="5"
                            imageWidth="150"
                            imageHeight="150"
                        ></ReactRoundedImage>
                        <h5>Mayuresh Kadam</h5>
                    </div>
                    <div className="col-sm-3">
                        <ReactRoundedImage
                            image={DefaultImage}
                            roundedColor="#848BB3"
                            roundedSize="5"
                            imageWidth="150"
                            imageHeight="150"
                        ></ReactRoundedImage>
                        <h5>Mahek Baru</h5>
                    </div>
                    <div className="col-sm-3">
                        <ReactRoundedImage
                            image={DefaultImage}
                            roundedColor="#848BB3"
                            roundedSize="5"
                            imageWidth="150"
                            imageHeight="150"
                        ></ReactRoundedImage>
                        <h5>Jainam Mehta</h5>
                    </div>
                    <div className="col-sm-3">
                        <ReactRoundedImage
                            image={DefaultImage}
                            roundedColor="#848BB3"
                            roundedSize="5"
                            imageWidth="150"
                            imageHeight="150"
                        ></ReactRoundedImage>
                        <h5>Sourabh Bujawade</h5>
                    </div>
                </div>
            </div>
        </center>
    );
}

export default About;