import React, { useState } from "react";
import "./SearchForm.css";

// Search Form.
// Component renders search form and calls the searchFor function prop from the parent to
// handle the searching.
// Appears on the CompanyList and JobList to assist with filtering.
// Routes: { CompanyList, JobList } -> SearchForm


function SearchForm({ searchFor }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Handles filtering done by the parent
  function handleSubmit(evt) {
    evt.preventDefault();
    searchFor(searchTerm.trim() || undefined)
    setSearchTerm(searchTerm.trim());
  }

  // Handles form field updates
  function handleChange(evt) {
    setSearchTerm(evt.target.value)
   };
 

  return (
     <div className="SearchForm mb-4">
       <form className="form-inline" onSubmit={handleSubmit}>
         <input
            className="form-control form-control-lg flex-grow-1"
            name="searchTerm"
            placeholder="Enter search term"
            value={searchTerm}
            onChange={handleChange}
         />
         <button type="submit" className="btn btn-lg btn-primary">
           Submit
         </button>
       </form>
     </div>
  )
}

export default SearchForm;