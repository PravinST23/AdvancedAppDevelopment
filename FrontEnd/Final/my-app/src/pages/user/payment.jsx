import React, { useEffect, useState } from "react";
import "/src/assets/css/query.css";
import { getAllPayments, getPaymentsByEmail } from "../../services/auth";
import { useSelector } from 'react-redux';


const Payment = () => {
  const [paymentData, setPaymentData] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  const role = userData.role;


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let payments;
      if (role === 'ADMIN') {
        payments = await getAllPayments(); // Call the service function to fetch all payments
      } else {
        // Assuming userEmail is accessible in the component's props or state
        payments = await getPaymentsByEmail(userData.email); // Call the service function to fetch payments by email
      }
      setPaymentData(payments);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  return (
    <div className="table-container">
      {paymentData && paymentData.length > 0 ? (
        <div className="user-table123">
          <h1>Payments</h1>
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Payment ID</th>
                <th>Name</th>
                <th>Course Name</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>Fees</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentData.map((item, index) => (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td>{item.paymentId}</td>
                  <td>{item.name}</td>
                  <td>{item.courseName}</td>
                  <td>{item.email}</td>
                  <td>{item.mobileNumber}</td>
                  <td>{item.fees}</td>
                  <td>{item.date}</td>
                  <td style={{color:"#00ff55",paddingRight:"30px"}}>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-table-image-container">
          <div className="empty-table-image-container-right">
            <h1>No Payments found</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
