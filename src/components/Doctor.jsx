import React from "react";
import { useNavigate } from "react-router-dom";
import moment from 'moment'
function Doctor({ doctor }) {
  const navigate = useNavigate();
  return (
    <div
      className="card p-2 cursor-pointer"
      onClick={() => navigate(`/book-appointment/${doctor._id}`)}
    >
      <h1 className="card-title">
        {doctor.firstName} {doctor.lastName}
      </h1>
      <hr />
      <p>
        <b>Phone Number : </b>
        {doctor.phone}
      </p>
      <p>
        <b>Address : </b>
        {doctor.address}
      </p>
      <p>
        <b>Fee per Visit : </b>
       R {doctor.feePerconsoltation}
      </p>
      <p>
        <b>Timings : </b>
        {moment(doctor.timings[0]).format("'LT'") } - {moment(doctor.timings[1]).format("'LT'") }
      </p>
    </div>
  );
}

export default Doctor;