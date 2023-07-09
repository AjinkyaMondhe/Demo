import React from "react";
import axios from "axios";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import "./Table.css";

export default function Table({ rows, deleteRow, editRow }) {
  return (
    <div className="table-wrapper">
      <table className="tablea">
        <thead>
          <tr>
            <th>Title</th>
            <th className="expand">Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const statusText = row.status.charAt(0).toUpperCase() + row.status.slice(1);
            return (
              <tr key={row.id}>
                <td>{row.page}</td>
                <td className="expand">{row.description}</td>
                <td>
                  <span className={`label label-${row.status}`}>{statusText}</span>
                </td>
                <td>
                  <span className="actions">
                    <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => {
                        const confirmDelete = window.confirm("Are you sure about deleting the information?");
                        if (confirmDelete) {
                          axios.delete(`http://your-backend-api-url/del/${row.id}`)
                            .then(() => {
                              alert("Your Information has been Deleted Successfully !");
                              deleteRow(row.id);
                            })
                            .catch((error) => {
                              console.error("Error deleting row:", error);
                              alert("Failed to delete the information. Please try again.");
                            });
                        } else {
                          alert("Your Information has been Retrieved Successfully !");
                        }
                      }}
                    />
                    <BsFillPencilFill onClick={() => editRow(row.id)} />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
