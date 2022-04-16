import { useState, useCallback, useEffect, useRef } from 'react';
import TableContent from './TableContents';
import Table from './Table';

const Result = ()=>{
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