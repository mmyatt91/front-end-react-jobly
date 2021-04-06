import React, { useContext, useState, useEffect } from "react";
import UserContext from "../auth/UserContext";
import "./JobCard.css";


// Show information about a single job 
// - Rendered by JobCardList to show card for single job
// - From parent, it receives apply function prop, which called on apply
// - Routes -> JobCardList -> JobCard


function JobCard({ id, title, companyName, salary, equity }) {

  const { appliedToJob, applyToJob} = useContext(UserContext)
  const [applied, setApplied] = useState();

  useEffect(function updateApplyStatus() {
    setApplied(appliedToJob(id));
  }, [id, appliedToJob])

  async function handleApply(evt) {
    if(appliedToJob(id)) return;
    applyToJob(id);
    setApplied(true);
  }

  return (
    <div className="JobCard card">
      {applied}
      <div className="card-body">
        <h6 className="card-title">{title}</h6>
        <p>{companyName}</p>
        {salary && 
          <div>
            <small>Salary:{salary}</small>
          </div>
        }
        {equity !== undefined &&
          <div>
            <small>Equity:{equity}</small>
          </div>
        }
        <button 
          className="btn btn-danger font-weight-bold text-uppercase float-right"
          onClick={handleApply}
          disabled={applied}>
            {applied ? "Applied": "Apply"}
        </button>
      </div>
    </div>
  );
}

export default JobCard;