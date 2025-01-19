import React from 'react'
import { useSelector } from 'react-redux'
import Card from '../../components/Card'
import Loader from '../../components/Loader'
import Error from '../../components/Error'
import "./home.scss"

const Home = () => {
  const {jobs, isLoading, error} = useSelector((store)=> store.jobReducer)

const grouped = jobs.reduce((grouped, job)=> {
  if(!grouped[job.status]) {
    grouped[job.status] = [];
  }
  grouped[job.status].push(job);
  return grouped;
  
},{})

  return (
    <div className='home-page'>
      {isLoading ? <Loader/> : error ? <Error info={error}/> : (
        <div className='layout'>
        {/* {grouped["In Progress"].map(()=><Card/>)}
        {grouped.Interviewing.map(()=><Card/>)}
        {grouped.Rejected.map(()=><Card/>)} */}
        {Object.keys(grouped).map((status)=> <div key={status} className='group'>
          <h1 className='title'>{status} ({grouped[status].length})</h1>
          <div className='list'>
            {grouped[status].map((job)=> 
            <Card key={job.id} job={job}/>)}
          </div>
        </div>
      )}
       </div>)}
    </div>
  )
}

export default Home