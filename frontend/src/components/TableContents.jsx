import React from "react";
import "./styles.css";
import { Accordion } from "react-bootstrap";

const TableRow = ({data, paperHeaders}) => {

  return (
    <tr>
      {
        Object.keys(paperHeaders).map((index) => (
          index === 0
            ? <td id="paper-index">
                {data[paperHeaders[index]]}
              </td>
          : <td>
            <Accordion>
              <Accordion.Item eventKey="0">
                  <Accordion.Header>{paperHeaders[index]}</Accordion.Header>
                  <Accordion.Body>
                    {data[paperHeaders[index]] === "" ? "NA" : data[paperHeaders[index]]}
                  </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </td>      
        ))
      }
    </tr>
  );
}

const TableContent = ({data, commonSubHeadings}) => {
  return (
    <tbody>
      {
        Object.keys(data).map((key, i) => (
          <TableRow data={data[key]} paperHeaders={commonSubHeadings}></TableRow>          
        ))
      }
    </tbody>
  );
};

export default TableContent;