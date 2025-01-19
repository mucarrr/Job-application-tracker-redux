import moment from "moment";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import Delete from "./Delete";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

const Card = ({ job }) => {
  const date =
    job.status === "In Progress"
      ? `Application Date : ${moment(job.date).fromNow()}`
      : job.status === "Rejected"
      ? `Rejection Date : ${new Date(job.rejection_date).toLocaleDateString(
          "en",
          {
            day: "2-digit",
            month: "long",
          }
        )}`
      : `Interview Date : ${new Date(job.date).toLocaleDateString("en", {
          day: "2-digit",
          month: "long",
          hour: "numeric",
        })}`;
  return (
    <div className="card">
      <div className="card-top">
      <div className="head">
        <h2 className="letter">
          <span>{job.company[0]}</span>
        </h2>
        <h2 className="role">{job.position}</h2>
      </div>
      <div className="icons">
        <Link to={`/job/${job.id}`} className="edit"><FaEdit /></Link>
      <Delete id={job.id}/>
      </div>
      </div>
      <div className="line"></div>
      <div className="card-body">
        <h5 className="company">{job.company}</h5>
        <p className="location">
          <FaLocationDot className="ikon" /> {job.location}
        </p>
        <div className="card-bottom">
          <span className="date">
            <FaCalendarAlt className="ikon" />
            {date}
          </span>{" "}
          <span className="type">{job.type}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
