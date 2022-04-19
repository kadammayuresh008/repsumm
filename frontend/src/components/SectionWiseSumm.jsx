import { Accordion} from "react-bootstrap";

const SectionWiseSumm = ({index, summaryOfPaper})=>{

  let summary = summaryOfPaper
    ? <div>
      <div className="horizontalSeperationStyle"></div>
    {
        Object.keys(summaryOfPaper).map((key, i) => (
            <Accordion flush>
                <Accordion.Item eventKey={i}>
                    <Accordion.Header>{key.toUpperCase()}</Accordion.Header>
                    <Accordion.Body>
                        <p>
                        {summaryOfPaper[key]}
                        </p>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        ))
    }

  </div>
    : null;

  return (
    <div>
        {summary}
    </div>
  );
}

export default SectionWiseSumm;
