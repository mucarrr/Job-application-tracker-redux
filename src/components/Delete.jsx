import React from 'react'
import { FaTrashAlt } from "react-icons/fa";
import api from '../utils/api';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteJob } from "../redux/slices/jobSlice";

const Delete = ({id}) => {
const dispatch = useDispatch()

    const handleDelete = () => {
        if(!confirm('Are you sure you want to delete?')) return;
        api.delete(`./jobs/${id}`)
        .then((res)=>{
            dispatch(deleteJob(id))
            toast.success("Job deleted successfully")
        }).catch((err)=>{
            toast.error("Failed to delete job")
        });
    }
  return (
    <div className='button' onClick={handleDelete}>
        <button><FaTrashAlt /></button>
    </div>
  )
}

export default Delete