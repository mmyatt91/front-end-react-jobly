import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JobCardList from "../jobs/JobCardList";
import JoblyApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";

// Provides details of individual companies
// Renders company info, and the list of jobs within the company
// Routed @ /companies/:handle
// Routes -> CompanyDetail -> JobCardList

function CompanyDetail() {
  const { handle } = useParams();

  const [company, setCompany] = useState(null)

  useEffect(function getCompanyDetailsOnMount() {
    async function getCompany() {
      setCompany(await JoblyApi.getCompany(handle));
    }
    getCompany();
  }, [handle]);

  if (!company) return <LoadingSpinner />;


  return (
    <div className="CompanyDetail col-md-8 offset-md-2">
      <h4>{company.name}</h4>
      <p>{company.description}</p>
      <JobCardList jobs={company.jobs} />
    </div>
  )
}

export default CompanyDetail;

