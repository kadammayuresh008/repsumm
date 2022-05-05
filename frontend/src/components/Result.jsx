import { useState, useEffect } from 'react';
import TableContent from './TableContents';
import Table from './Table';
import config from '../config.json';
import axios from 'axios';
import SectionWiseSumm from './SectionWiseSumm';


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
  }, []);

  useEffect(() => {
    if(summaryList != null) {
      getAllSubHeadings();
    }
    //eslint-disable-next-line
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

  const tableHeaders = [
    "TITLE",
    "INTRODUCTION",
    "LITERATURE SURVEY",
    "METHODOLOGY",
    "EXPERIMENTS & RESULTS",
    "CONCLUSION"
  ];


  let allSummary = summaryList
    ? <div className="allSummarySectionStyle">
        <span className="titleTextStyle">
          All Summaries
        </span>
      <br/>
    {
        Object.keys(summaryList).map((key, i) => (
          <div> 
            <SectionWiseSumm index={i} summaryOfPaper={summaryList[key]} />
          </div>
          
        ))
    }

  </div>
    : null;


  return (
    <div align="center">
      <br/>
    <span className="titleTextStyle">Your Comparative Summaries</span>
    {subHeadingList
      ?
      <div>
        <Table
        headers={tableHeaders}
        minCellWidth={150}
        maxCellWidth={500}
        tableContent={<TableContent data = {summaryList} commonSubHeadings = {tableHeaders}/>}
        />
        <br/>
        {allSummary}
      </div>

      : null
    }
    <br></br>
    </div>
  );
}

export default Result;



/*


let mapForSubHeading = {
      "introduction" : [
        "introduction",
      ],
      "Literature Survey" : [
        "literature survey", "literature review", "related work", "related works", "related study", "background", "state of the art",
      ],
      "methodology" : [
        "methodology", "approach", "structure and discussion", "method", "proposed model", "proposed system", "algorithm", "materials and methods", "the proposed method", "proposed method", "experimental setup"
      ],
      "Conclusion": [
        "conclusion", "conclusion and future work", "conclusions", "conclusion and future scope", "conclusion and future works", "conclusions and limitations", "discussion and conclusions", "empirical study", "conclusion and further work"
      ],
      "Result": [
        "result", "experiment",  "experiments", "experimental results", "result and discussion", "discussion", "results and discussion", "experiment and result analysis", "result and  evalution", "experimental verification", "comparison and discussion", "limitations and discussion", "experiments and results", "implement and experimental results", "experimental evalution", "experimental verification", "experimental results and  evalution"
      ],
    };

*/