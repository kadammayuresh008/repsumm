import { useState, useCallback, useEffect, useRef } from "react";
import "./styles.css";

const createHeaders = (headers) => {
  return headers.map((item) => ({
    text: item,
    ref: useRef()
  }));
};

const Table = ({ headers, minCellWidth, maxCellWidth,tableContent }) => {
  const [tableHeight, setTableHeight] = useState("auto");
  const [activeIndex, setActiveIndex] = useState(null);
  const tableElement = useRef(null);
  const columns = createHeaders(headers);

  useEffect(() => {
    //intial style for columns on basis of number of columns
    var styleForColumns = "";
    for (let i = 0; i < headers.length; i++) {
      styleForColumns += "minmax(150px, 1fr)";
      styleForColumns += "\n";
    }
    tableElement.current.style.gridTemplateColumns = `${styleForColumns}`;
    
    setTableHeight(tableElement.current.offsetHeight);
  }, [tableHeight]);

  // useEffect(()=>{
  //   settableWidth(tableElement.current.offsetWidth);
  // },[tableWidth])

  const mouseDown = (index) => {
    setActiveIndex(index);
  };

  const mouseMove = useCallback(
    (e) => {
      const gridColumns = columns.map((col, i) => {
        if (i === activeIndex) {
          const width = e.clientX - col.ref.current.offsetLeft;


          if (width >= minCellWidth && width<=maxCellWidth) {
            return `${width}px`;
          }
        }
        return `${col.ref.current.offsetWidth}px`;
      });

      tableElement.current.style.gridTemplateColumns = `${gridColumns.join(
        " "
      )}`;
    },
    [activeIndex, columns, minCellWidth,maxCellWidth]
  );

  const removeListeners = useCallback(() => {
    window.removeEventListener("mousemove", mouseMove);
    window.removeEventListener("mouseup", removeListeners);
  }, [mouseMove]);

  const mouseUp = useCallback(() => {
    setActiveIndex(null);
    removeListeners();
  }, [setActiveIndex, removeListeners]);

  useEffect(() => {
    if (activeIndex !== null) {
      window.addEventListener("mousemove", mouseMove);
      window.addEventListener("mouseup", mouseUp);
    }

    return () => {
      removeListeners();
    };
  }, [activeIndex, mouseMove, mouseUp, removeListeners]);

  // Demo only
  const resetTableCells = () => {
    tableElement.current.style.gridTemplateColumns = "";
  };

  return (
    <div className="bodyDesign">
      <div className="table-wrapper">
        <table className="resizeable-table" ref={tableElement}>
          <thead>
            <tr>
              {columns.map(({ ref, text }, i) => (
                <th ref={ref} key={text}>
                  <span>{text}</span>
                  <div
                    style={{ height: tableHeight}}
                    onMouseDown={() => mouseDown(i)}
                    className={`resize-handle ${
                      activeIndex === i ? "active" : "idle"
                    }`}
                  />
                </th>
              ))}
            </tr>
          </thead>
          {tableContent}
        </table>
      </div>
      {/* <button onClick={resetTableCells}>Reset</button> */}
    </div>
  );
};

export default Table;
