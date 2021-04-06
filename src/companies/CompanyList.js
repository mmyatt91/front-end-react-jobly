import React, { useState, useEffect } from "react";
import SearchForm from "../common/SearchForm";
import JoblyApi from "../api/api";
import CompanyCard from "./CompanyCard";
import LoadingSpinner from "../common/LoadingSpinner";

// Show page with list of companies
// - Loads companies on mount
// - Reloads companies upon submission of Search form
// - Routes -> { CompanyCard, SearchForm }


function CompanyList() {
  const [companies, setCompanies] = useState(null)

  useEffect(function getCompaniesOnMount() {
    search();
  }, []);

  // Handles search form submission, and reloads companies after filtering.
  async function search(name) {
    let companies = await JoblyApi.getCompanies(name);
    setCompanies(companies);
  }

  if(!companies) return <LoadingSpinner />;

  return (
    <div className="CompanyList col-md-8 offset-md-2">
      <SearchForm searchFor={search} />
      {companies.length 
        ? (
            <div className="CompanyList-list">
              {companies.map(c => (
                <CompanyCard  
                  key={c.handle}
                  handle={c.handle}
                  name={c.name}
                  description={c.description}
                  logoUrl={c.logoUrl}
                />
              ))}
            </div>
        ) : (
          <p className="lead">Sorry, no results were found.</p>
        )}
    </div>
  );
}

export default CompanyList;