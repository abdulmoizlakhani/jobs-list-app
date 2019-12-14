import React, { useState, useEffect } from 'react';
import Jobs from './jobs';
import './App.css';

const JOB_API_URL = 'http://localhost:3001/jobs';

// const mockJobs = [
//   { title: 'SWE 1', company: 'Google' },
//   { title: 'SWE 1', company: 'Faceboob' },
//   { title: 'SWE 1', company: 'Apple' },
// ]

async function fetchJobs(updateCb) {
  const res = await fetch(JOB_API_URL);
  const json = await res.json();
  updateCb(json);
}

function App() {

  const [jobList, updateJobs] = useState([]);

  useEffect(() => {
    fetchJobs(updateJobs);
  }, [])

  return (
    <div className="App">
      <Jobs jobs={jobList} />
    </div>
  );
}

export default App;
