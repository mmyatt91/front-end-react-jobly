import React from "react";
import JobCard from "./JobCard";

// Show page with list of job cards.
// - Receives apply function prop, which is called by JobCard on apply button
// - Used by JobList and CompanyDetail to list jobs
// - Route (1) -> JobList -> JobCardList -> JobCard
// - Route (2) -> CompanyDetail -> JobCardList -> JobCard


function JobCardList({ jobs, apply }) {

  return (
    <div className="JobCardList">
      {jobs.map(job => (
        <JobCard
          key={job.id}
          id={job.id}
          title={job.title}
          salary={job.salary}
          equity={job.equity}
          companyName={job.companyName}
        />
      ))}
    </div>
  );
}

export default JobCardList;