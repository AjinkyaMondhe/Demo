import { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css";
import { Model } from "./components/Model";
import Table from "./components/Table";

export default function App() {
  const [modelOpen, setModelOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/fetch');
      setRows(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data from the server. Please try again.");
    }
  };

  const handleDeleteRow = async (targetIndex) => {
    const rowToDelete = rows[targetIndex];
    try {
      await axios.delete(`http://localhost:3001/del/${rowToDelete._id}`);
      setRows(rows.filter((_, idx) => idx !== targetIndex));
    } catch (error) {
      console.error("Error deleting row:", error);
      alert("Failed to delete the information. Please try again.");
    }
  };

  const handleClose = () => {
    setModelOpen(false);
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModelOpen(true);
  };

  const handleSubmit = async (newRow) => {
    try {
      if (rowToEdit === null) {
        // Add new row
        await axios.post('http://localhost:3001/post', newRow);
        fetchData();
      } else {
        // Update row
        await axios.put(`http://localhost:3001/update/${rows[rowToEdit]._id}`, newRow);
        setRows(rows.map((currRow, idx) => (idx !== rowToEdit ? currRow : newRow)));
      }
      setRowToEdit(null);
      setModelOpen(false);
    } catch (error) {
      console.error("Error submitting row:", error);
      alert("Failed to submit the information. Please try again.");
    }
  };

  return (
    <>
      {modelOpen && <p onClick={handleClose} className="close">&#x2715;</p>}
      <div className="App">
        <h1>Information Table</h1>
        <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
        <button className="btn Add" onClick={() => setModelOpen(true)}>Add</button>

        {modelOpen && (
          <Model
            closeModel={() => {
              setModelOpen(false);
              setRowToEdit(null);
            }}
            onSubmit={handleSubmit}
            defaultValue={rowToEdit !== null && rows[rowToEdit]}
          />
        )}
      </div>
    </>
  );
}
