import { useState, useCallback, useEffect, useRef } from 'react';
import TableContent from './TableContents';
import Table from './Table';
import config from '../config.json';
import axios from 'axios';


const Result = ()=>{

  useEffect(() => {
    let url = config.UPLOAD_DOC_URL;
    axios.get(
        url
    )
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err);
        });
  }, []);


  const tableHeaders = [
    "Title",
    "Abstract",
    "Introduction",
    "Methodology",
    "Result",
    "Conclusion"
  ];
  return (
    <div align="center">
    <h1>Your Uploaded Paper</h1>
    <Table
      headers={tableHeaders}
      minCellWidth={150}
      maxCellWidth={500}
      tableContent={<TableContent />}
    />

    </div>
  );
}

export default Result;