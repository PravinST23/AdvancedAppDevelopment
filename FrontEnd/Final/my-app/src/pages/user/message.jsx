import React, { useEffect, useState } from "react";
import "/src/assets/css/query.css";
import {  useSelector } from 'react-redux'; 
import { getEnquiriesByEmail } from "../../services/auth";

const Message = () => {
  const [enquiryData, setEnquiryData] = useState([]);

  // Get email from Redux state
  const userEmail = useSelector(state => state.auth.email);

  useEffect(() => {
    fetchData();
  }, [userEmail]); // Add userEmail to the dependency array

  const fetchData = async () => { 
    try {
      const enquiries = await getEnquiriesByEmail(userEmail); // Pass userEmail to getAllEnquiries
      setEnquiryData(enquiries);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
    }
  };

  return (
    <div className="table-container">
      {enquiryData && enquiryData.length > 0 ? (
        <div className="user-table123">
          <h1>Message</h1>
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Course Name</th>
                <th>Email</th>
                <th>Enquiry_type</th>
                <th>Message</th>
                <th>Reply</th>
              </tr>
            </thead>
            <tbody>
              {enquiryData.map((item, index) => (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td>{item.courseName}</td>
                  <td>{item.email}</td>
                  <td>{item.enquiryType}</td>
                  <td>{item.message}</td>
                  <td>{typeof item.reply === 'string' ? item.reply : null}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-table-image-container">
          <div className="empty-table-image-container-right">
            <h1>No Message found</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
