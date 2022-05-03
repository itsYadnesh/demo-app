// import React from "react";
// import "../src/App.css"
// import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/dist/styles/ag-grid.css"; // Core grid CSS, always needed
// import "ag-grid-community/dist/styles/ag-theme-alpine.css";
// function Table() {
//   const actionButton = (params) => {
//     alert(`${params.data.name} ${params.value}`);
//     console.log(params.data);
//   };
//   const data = [
//     { name: "sam", age: "21", city: "sudo" },
//     { name: "tam", age: "22", city: "apt" },
//     { name: "uam", age: "23", city: "get" },
//     { name: "vam", age: "24", city: "app" },
//   ];
//   const Columns = [
//     {
//       headerName: "Name",
//       field: "name",
//     },
//     {
//       headerName: "age",
//       field: "age",
//     //   cellStyle:(params)=>(params.value>22?{backgroundColor:"red"}:{backgroundColor:"green"})
//     cellClass:(params)=>(params.value>22 ?"morethan22" :"lessthan22")
//     },
//     {
//       headerName: "city",
//       field: "age",
//       cellRendererFramework: (params) => (
//         <div>
//           <button onClick={() => actionButton(params)}>click Me</button>
//         </div>
//       ),
//     },
//   ];

//   const defaultColDef = {
//     sortable: true,
//     editable: true,
//     filter: true,
//     floatingFilter: true,
//     flex: 1,
//   };

//   //------------->Download CSV File in Grid Table
//   let gridApi;
//   const onGridReady = (params) => {
//     gridApi = params.api;
//   };
//   const onExportClick = () => {
//     gridApi.exportDataAsCsv();
//   };
//   return (
//     <>
//       <div>
//         <button onClick={() => onExportClick()}>export</button>
//         <div
//           className="ag-theme-alpine"
//           style={{ height: 300, width: "100%", marginTop: "50px" }}
//         >
//           <AgGridReact
//             rowData={data}
//             columnDefs={Columns}
//             rowSelection="multiple"
//             defaultColDef={defaultColDef}
//             onGridReady={onGridReady}
//           ></AgGridReact>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Table;

//------------>Grid table using another API & curd Oeration------------------------
import React, { useState, useEffect, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Grid, Button } from "@material-ui/core";
import FormDialog from "./components/dialog";
const initialValue = { name: "", email: "", phone: "", dob: "" };
function App() {
  const gridRef = useRef();
  const [gridApi, setGridApi] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState(initialValue);
  const handleClickOpen = () => {
    setOpen(true);
  };
  console.log(gridApi);
  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue);
  };
  const url = `http://localhost:3000/users`;
  const columnDefs = [
    {
      headerName: "ID",
      field: "id",
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    { headerName: "Name", field: "name" },
    { headerName: "Email", field: "email", tooltipField: "name" }, //---you can hover and then showthename list
    { headerName: "phone", field: "phone" },
    { headerName: "Date of Birth", field: "dob" },
    {
      headerName: "Actions",
      field: "id",
      cellRenderer: (params) => (
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleUpdate(params.data)}
          >
            Update
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleDelete(params.value)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];
  

  //fetching user data from server
  const getUsers = () => {
    fetch(url)
    .then((resp) => resp.json())
    .then((resp) => setTableData(resp));
  };

// calling getUsers function for first time
  useEffect(() => {
    getUsers()
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const onChange = (e) => {
    const { value, id } = e.target;
    // console.log(value,id)
    setFormData({ ...formData, [id]: value });
  };


  const onGridReady = (params) => {
    setGridApi(params.api);
  };


  // setting update row data to form data and opening pop up window
  const handleUpdate = (oldData) => {
    setFormData(oldData);
    handleClickOpen();
  };
  //deleting a user
  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure, you want to delete this row",
      id
    );
    if (confirm) {
      fetch(url + `/${id}`, { method: "DELETE" })
        .then((resp) => resp.json())
        .then((resp) => getUsers());
    }
  };
  const handleFormSubmit = () => {
    if (formData.id) {
      //updating a user
      const confirm = window.confirm(
        "Are you sure, you want to update this row ?"
      );
      confirm &&
        fetch(url + `/${formData.id}`, {
          method: "PUT",
          body: JSON.stringify(formData),
          headers: {
            "content-type": "application/json",
          },
        })
          .then((resp) => resp.json())
          .then((resp) => {
            handleClose();
            getUsers();
          });
    } else {
      // adding new user
      fetch(url, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((resp) => {
          handleClose();
          getUsers();
        });
    }
  };

  const defaultColDef = {
    sortable: true,
    flex: 1,
    filter: true,
    floatingFilter: true,
    editable: true,
  };
  const rowSelectionType = "multiple";
  const onSelectionChanged = (e) => {
  };

  //-------Download Csv File
  const onExportClick = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

  const allSearch = (e) =>{
    gridApi.setQuickFilter(e.target.value)
  }
  return (
    <div className="App">
      <h1 align="center">React-App</h1>
      <h3>CRUD Operation with Json-server in ag-Grid</h3>
      <Grid align="left">
        <button onClick={onExportClick}>download</button>
      </Grid>
      <Grid align="right">
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add user
        </Button>
      </Grid>
      <input type="search" placeholder="serarch here....." onChange={allSearch} style={{padding:"7px 105rem 9px 11px" ,borderRadius:"10px", margin:"10px"}}/>
      <div className="ag-theme-alpine" >
        <AgGridReact
          rowData={tableData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          enableBrowserTooltips={true} //---you can hover any field
          rowSelection={rowSelectionType}
          sideBar={true}
          rowModelType={'infinite'}
          onSelectionChanged={onSelectionChanged}
          // pagination={true}
          // paginationPageSize={15}
          domLayout="autoHeight"
        />
      </div>
      <FormDialog
        open={open}
        handleClose={handleClose}
        data={formData}
        onChange={onChange}
        handleFormSubmit={handleFormSubmit}
      />
    </div>
  );
}

export default App;
