import Heading from '../HelperComponents/Heading';
import ReactRoundedImage from 'react-rounded-image';
import DefaultImage from '../Images/DefaultImage.jpg';

const About = () => {

    const AboutImageStyle = {
        height: "300px",
        backgroundColor: "aqua",
        position: "relative",
        textAlign: "center",
    }

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
            <div className="AboutImageStyle" style={AboutImageStyle}>
                <h1 className="AboutImageText" style={AboutImageText}>About Research Paper Summarizer </h1>
            </div>
            <br></br>
            <div className="container">
                <Heading name="Why RPS?"></Heading>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac luctus mi. Aenean nec augue dolor.
                    Sed varius sodales augue eu pulvinar. Etiam et risus varius, sollicitudin enim mollis, ornare nunc.
                    Donec in convallis dolor, vitae placerat dolor. Vivamus eget elit lobortis, venenatis ex a, maximus
                    elit. Cras dictum fringilla mi a dapibus. Vivamus lobortis, augue et luctus molestie, metus nunc
                    semper lorem, at maximus velit felis quis neque.
                </p>
            </div>
            <br></br>
            <div>
                <Heading name="Team Members"></Heading>
                <div className="row container">
                    <div className="col-sm-3">
                        <ReactRoundedImage
                            image={DefaultImage}
                            roundedColor="aqua"
                            roundedSize="5"
                        ></ReactRoundedImage>
                        <h5>Mayuresh Kadam</h5>
                    </div>
                    <div className="col-sm-3">
                        <ReactRoundedImage
                            image={DefaultImage}
                            roundedColor="aqua"
                            roundedSize="5"
                        ></ReactRoundedImage>
                        <h5>Mahek Baru</h5>
                    </div>
                    <div className="col-sm-3">
                        <ReactRoundedImage
                            image={DefaultImage}
                            roundedColor="aqua"
                            roundedSize="5"
                        ></ReactRoundedImage>
                        <h5>Jainam Mehta</h5>
                    </div>
                    <div className="col-sm-3">
                        <ReactRoundedImage
                            image={DefaultImage}
                            roundedColor="aqua"
                            roundedSize="5"
                        ></ReactRoundedImage>
                        <h5>Sourabh Bujawade</h5>
                    </div>
                </div>
            </div>
        </center>
    );
}

export default About;