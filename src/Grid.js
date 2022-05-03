// import React, { useState } from "react";
// import { AgGridReact } from "ag-grid-react";

// import "ag-grid-community/dist/styles/ag-grid.css";
// import "ag-grid-community/dist/styles/ag-theme-alpine.css";
// // import { Grid } from "ag-grid-community";

// const Gridd = () => {
//   const [rowData] = useState([
//     { make: "Toyota", model: "Celica", price: 35000 },
//     { make: "Ford", model: "Mondeo", price: 32000 },
//     { make: "Porsche", model: "Boxster", price: 72000 },
//   ]);

//   const [columnDefs] = useState([
//     { headerName: "ID" ,field:"id" },
//     { headerName: "Name" ,field:"name"},
//     { headerName: "Email" ,field:"email"},
//     { headerName:"Body" ,field:"body"}
//   ]);

//   const onGridReady = (params) =>{
//       console.log("hello")
//       fetch("https://jsonplaceholder.typicode.com/posts").then(resp=>resp.json())
//       .then(resp => {console.log(resp) 
//                    params.api.applyTranscation({add:resp})})
//   }

//   return (
//     <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
//       <AgGridReact  columnDefs={columnDefs} onGridReady={onGridReady}></AgGridReact>
//     </div>
//   );
// };
// export default Gridd;
