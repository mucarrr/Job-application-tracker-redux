import React, { useEffect, useState } from "react";
import Input from "./input";
import { statusOptions, typeOptions } from "../../utils/constants";
import "./form.scss";
import { useDispatch } from "react-redux";
import { createJob, updateJob } from "../../redux/slices/jobSlice";
import { useNavigate } from "react-router-dom";
import api from '../../utils/api';
import getJob from '../../utils/service';
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const Form = () => {


  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {mode} = useParams()


  const [editItem, setEditItem] = useState(null)
  const [status, setStatus] = useState(editItem?.status || "Interviewing");

  useEffect(()=>{
    if(mode === "create") return setEditItem(null)
    if(mode !== "create"){
      getJob(mode).then((data)=>{setEditItem(data);
        setStatus(data.status)
      })
    }
  },[mode])
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const jobData = Object.fromEntries(formData.entries());
    console.log(jobData);
    
    if(!editItem){
      api.post("/jobs", jobData)
    .then((res)=>{
      dispatch(createJob(res.data));
      navigate("/")
      toast.success("Application created")
    })
  .catch((err)=>{
    toast.error("Failed to create application")
    
  });
    } else{
      api.patch(`/jobs/${editItem.id}`, jobData).then((res)=>{
        dispatch(updateJob(res.data));
        navigate("/")
        toast.success("Application updated")
      })
    .catch((err)=>{
      toast.error("Failed to update application")
      
    });
    }
  };
  const dateName = editItem?.status=== "Interviewing" ? "interview_date" : editItem?.status==="Rejected" ? "rejection_date" : "date";

  const defaultDate =
  editItem && editItem[dateName]
    ? new Date(editItem[dateName])
        .toISOString()
        .slice(0, editItem.status === "Interviewing" ? 16 : 10)
    : ""; 


  return (
    <div className="create-page">
      <section>
        <h2>{editItem ? "Update the Application" : "New Application"}</h2>
        <form onSubmit={handleSubmit}>
          <Input label="Position" name="position" value={editItem?.position } />
          <Input label="Company" name="company" value={editItem?.company }/>
          <Input label="Location" name="location" value={editItem?.location }/>
          <Input
            label="Status"
            name="status"
            options={statusOptions}
            handleChange={(e) => setStatus(e.target.value)} value={editItem?.status }
          />
          <Input label="Type" name="type" options={typeOptions} value={editItem?.type }/>

          <Input label={
            status=== "Interviewing" ? "Interview Date" : 
            status==="Rejected" ? "Rejection Date" : "Application Date"} 
            name={
              status=== "Interviewing" ? "Interview Date" : 
              status==="Rejected" ? "Rejection Date" : "Application Date"} 
              type={
                status === "Interviewing" ? "datetime-local" : "date"}
              value={defaultDate}/>

          <div className="btn">
            <button>{editItem ? "UPDATE" : "CREATE"}</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Form;
