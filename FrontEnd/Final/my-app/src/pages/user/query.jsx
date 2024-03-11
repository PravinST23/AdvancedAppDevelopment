import React, { useEffect, useState } from "react";
import "/src/assets/css/query.css";
import { getAllEnquiries } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCourseDetails } from "../../services/auth";
import { setCourseDetails, storeEnquiryDetails } from "/src/redux/authSlice"; // Import storeEnquiryDetails action

const ExampleTable = () => {
  const [enquiryData, setEnquiryData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const enquiries = await getAllEnquiries();
      setEnquiryData(enquiries);
    } catch (error) {
      console.error("Error fetching enquiries:", error);
    }
  };

  const handleReplyClick = async (
    id,
    courseName,
    email,
    enquiryType,
    message,
    reply
  ) => {
    try {
      const courseDetails = await fetchCourseDetails(courseName);
      dispatch(setCourseDetails(courseDetails));
      dispatch(
        storeEnquiryDetails({
          id,
          courseName,
          email,
          enquiryType,
          message,
          reply,
        })
      ); // Dispatch storeEnquiryDetails action with enquiry details
      navigate("/routeTo/reply");
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  return (
    <div className="table-container">
      {enquiryData && enquiryData.length > 0 ? (
        <div className="user-table123">
          <h1>Queries</h1>
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Course Name</th>
                <th>Email</th>
                <th>Enquiry_type</th>
                <th>Message</th>
                <th>Status</th>
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
                  <td style={{ padding: "0 30px" }}>
                    {item.reply === null ? (
                      <button
                        className="query-reply"
                        onClick={() =>
                          handleReplyClick(
                            item.id,
                            item.courseName,
                            item.email,
                            item.enquiryType,
                            item.message,
                            item.reply
                          )
                        }
                      >
                        Reply
                      </button>
                    ) : (
                      <span style={{ color: "#00ff55" }}>Replied</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-table-image-container">
          <div className="empty-table-image-container-right">
            <h1>No Queries found</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExampleTable;
