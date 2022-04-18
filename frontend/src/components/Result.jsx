import { useState, useCallback, useEffect, useRef } from 'react';
import TableContent from './TableContents';
import Table from './Table';
import config from '../config.json';
import axios from 'axios';
import { Accordion, Card, Button } from "react-bootstrap";

const Result = ()=>{
  const [summaryList, setSummaryList] = useState(null);
  const [subHeadingList, setSubHeadingList] = useState(null);

  useEffect(() => {
    let url = config.UPLOAD_DOC_URL;
    axios.get(url)
      .then((res) => {
        const x = res.data;
        setSummaryList(x);
      })
      .catch(e => {
        console.error(e);
      })
      // getAllTableHeaders();
  }, []);

  useEffect(() => {
    if(summaryList != null) {
      getAllSubHeadings();
    }
  }, [summaryList]);


  //get all subheadings of papers and store in state
  const getAllSubHeadings = () => {
    let tmpSubHeadingList = [];
    for (let paperInd in summaryList) {
      let tmpList = [];
      for (let subHeading in summaryList[paperInd]) {
        // console.log(subHeading);
        tmpList.push(subHeading);
      }
      tmpSubHeadingList.push(tmpList);
    }
    console.log(tmpSubHeadingList);
    setSubHeadingList(tmpSubHeadingList);
  }


  //we have to get matching subheadings from all rps subheadings
  const getTableHeaders = () => {
    let tmpTableHeaderList = [];
    
  }


  const tableHeaders = [
    "Title",
    "Abstract",
    "Introduction",
    "Methodology",
    "Result",
    "Conclusion"
  ];


  let x = summaryList
    ? <div>
        <h4>
            Sections 
        </h4>
    {
        Object.keys(summaryList).map((key, i) => (
          <div> 
            <p>{key}</p>
            <p>
              {
                Object.keys(summaryList[key]).map((keyy, ii) => (
                  <div> 
                    <p>{keyy}</p>
                    <p>
                    {summaryList[key][keyy]}
                    </p>
                  </div>
                  
                ))
            }
            </p>
            <p>
              {summaryList[key]["abstract"]}
            </p>
          </div>
          
        ))
    }

  </div>
    : null;


  return (
    <div align="center">
    <h4>Your Uploaded Paper</h4>
    <p>
      {/* {x} */}
    </p>

    {/*
      here commonHeaderList is list which contains list of headers for each common Sections
      like for 
      paper1 = [heading, introduction, related work, approach, conclusion and future work]
      paper2 = [heading, introduction, literature survey, Methodology, conclusion]
      and list of is commonHeaderList
    */}

    {subHeadingList
    ?
    <Table
      headers={subHeadingList[0]}
      minCellWidth={150}
      maxCellWidth={500}
      tableContent={<TableContent data = {summaryList} commonHeaderList = {subHeadingList}/>}
    />
  : null}
    </div>
  );
}

export default Result;



/*
introduction: [introduction, ...n-1 times] 
literature survey:  [literature survey, literature review, related work]
Methodology: [Methodology, approach]
conclusion: [conclusion, conclusion and future work]




*/