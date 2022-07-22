import React from "react";


const NotificationSuccess = ({ text }) => (
    <div>
      <i className="bi bi-check-circle-fill text-success mx-2" />
      <span className="text-secondary mx-1">{text}</span>
    </div>
  );
  
  const NotificationError = ({ text }) => (
    <div>
      <i className="bi bi-x-circle-fill text-danger mx-2" />
      <span className="text-secondary mx-1">{text}</span>
    </div>
  );

export {  NotificationSuccess, NotificationError };

