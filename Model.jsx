import React, { useState } from "react";
import "./Model.css";

export const Model = ({ closeModel, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(defaultValue || {
    id: "",
    page: "",
    description: "",
    status: "Live",
  });
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.id && formState.page && formState.description && formState.status) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSubmit(formState);
    closeModel();
  };

  return (
    <div
      className="model-container"
      onClick={(e) => {
        if (e.target.className === "model-container") closeModel();
      }}
    >
      <div className="model">
        <form>
          <div className="form-group">
            <label htmlFor="id">ID</label>
            <input
              name="id"
              type="text"
              value={formState.id}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="page">Page</label>
            <input
              name="page"
              type="text"
              value={formState.page}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              value={formState.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              name="status"
              value={formState.status}
              onChange={handleChange}
            >
              <option value="live">Live</option>
              <option value="draft">Draft</option>
              <option value="error">Error</option>
            </select>
          </div>
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button className="btn" type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
