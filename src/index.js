// import React, { useState } from "react";
// import { render } from "react-dom";
// import { AgGridReact } from "ag-grid-react";

// import "ag-grid-community/dist/styles/ag-grid.css";
// import "ag-grid-community/dist/styles/ag-theme-alpine.css";

// const App = () => {
//   const [gridcolumnApi, setgridcolumnApi] = useState(null);
//   const [hideColumn ,sethideColumn] = useState(false)
//   const [gridApi ,setGridApi ] = useState()
//   const [rowData] = useState([
//     { make: "Toyota", model: "Celica", price: 35000, contry: "usa" },
//     { make: "Ford", model: "Mondeo", price: 32000, contry: "usa" },
//     { make: "Porsche", model: "Boxter", price: 72000, contry: "usa" },
//     { make: "Mersati", model: "giotint", price: 2522, contry: "usa" },
//   ]);

//   //------------> "Sortable" and "filter" are features of ag grid
//   const [columnDefs] = useState([
//     { field: "make" },
//     { field: "model" },
//     { field: "price" },
//     { field: "contry", hide: false },
//   ]);
//   function onGridReady(params) {
//     setGridApi(params.api)
//     setgridcolumnApi(params.columnApi);
//   }

//   const defaultColDef = {
//     sortable: true,
//     filter: true,
//     checkboxSelection: true,
//     rowSelction: "multiple",
//     flex: 1,
//     resizable: true,
//   };

//   const searchContain = (e) =>{
//     gridApi.setQuickFilter(e.target.value)

//   }
  
//   const showCountry = () => {
//     // gridcolumnApi.setColumnVisible("contry", hideColumn)
//     gridcolumnApi.setColumnsVisible(["contry","model"], hideColumn) 
//     sethideColumn(!hideColumn) 
//   };
//   return (
//     <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
//       <button onClick={showCountry} style={{margin:"10px" ,padding:"7px 7px"}}>Show contry column </button>
//       <input type="search" placeholder="secrching...." onChange={searchContain} style={{padding :"7px 171px 7px 7px"}}/>
//       <AgGridReact
//         rowData={rowData}
//         columnDefs={columnDefs}
//         defaultColDef={defaultColDef}
//         onGridReady={onGridReady}
//       ></AgGridReact>
//     </div>
//   );
// };

// render(<App />, document.getElementById("root"));

import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/dist/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/dist/styles/ag-theme-alpine.css"; // Optional theme CSS

const App = () => {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    { field: "make", filter: true, checkboxSelection: true },
    { field: "model", filter: true, checkboxSelection: true },
    { field: "price" ,
    cellStyle:(params)=>(params.value>70000 ?{backgroundColor:"blue"} :{backgroundColor:"red"})
  },
  ]);
  console.log(setColumnDefs);
  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true,flex:1,editable:true
  }),[]);

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
  }, []);

  // Example load data from sever
  useEffect(() => {
    console.log("hello")
    fetch("https://www.ag-grid.com/example-assets/row-data.json")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);

  // Example using Grid's API
  const buttonListener = useCallback((e) => {
    gridRef.current.api.deselectAll();
  }, []);

  //---------- Download CSV File
  const onExportClick= useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

  return (
    <>
    <div>
      <button onClick={()=>onExportClick()}>download CSV</button>
    <div>
      {/* Example using Grid's API */}
      <button onClick={buttonListener}>Push Me</button>

      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div className="ag-theme-alpine" style={{ width: "100%", height: 1000 }}>
        <AgGridReact
          ref={gridRef} // Ref for accessing Grid's API
          rowData={rowData} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection="multiple" // Options - allows click selection of rows
          onCellClicked={cellClickedListener} // Optional - registering for Grid Event
          pagination={true}
          // paginationPageSize={20}
          paginationAutoPageSize={true}
          useEffect={useEffect}
        />
      </div>
    </div>
    </div>
    </>
  );
};

render(<App />, document.getElementById("root"));

// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";

// import App from "./App";

// const rootElement = document.getElementById("root");
// const root = createRoot(rootElement);

// root.render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );

//------------>Grid table using another API & curd Oeration------------------------
// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './Table';
// ReactDOM.render(
//   <App/>,document.getElementById("root")
// )

//--- Grid Component

//  import React from 'react';
//  import ReactDOM from 'react-dom';
//  import Gridd from './Grid';
//  ReactDOM.render(
//    <Gridd/>,document.getElementById("root")
//  )
