import "/src/assets/css/dashboard.css";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { useState } from "react";

const AdminProfilePage = () => {
  const [users, setUsers] = useState([
    { id: 1, username: "user1", email: "user1@example.com", mobileNumber: "1234567890", role: "Admin" },
    { id: 2, username: "user2", email: "user2@example.com", mobileNumber: "9876543210", role: "User" },
    { id: 3, username: "user3", email: "user3@example.com", mobileNumber: "5678901234", role: "User" },
  ]);
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    email: "",
    mobileNumber: "",
    role: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleEdit = (user) => {
    setFormData(user);
    setIsEdit(true);
  };

  const handleSave = () => {
    if (isEdit) {
      setUsers(
        users.map((user) => (user.id === formData.id ? formData : user))
      );
    } else {
      setUsers([...users, { ...formData, id: Date.now() }]);
    }
    setFormData({ id: "", username: "", email: "", mobileNumber: "", role: "" });
    setIsEdit(false);
  };

  return (
    <div className="dashboardmain">
    <div className="admin-profile-container">
    
      <div className="container123">
        <div className="half-size">
          <div className="half-size-content">
            <h1>Hello Pravin!!!</h1>
            <p> .....Welcome to the BEC Enquiry Management System - where your role as administrator is key to ensuring a seamless and empowering experience for both our team and certification candidates.</p>
          </div>
          <div className="card-wrapper">
            <div className="card">Students <FaRegArrowAltCircleRight style={{ color: 'white' }} /></div>
            <div className="card">Professors  <FaRegArrowAltCircleRight style={{ color: 'white',marginLeft:"5px" }} /></div>
            <div className="card">Courses <FaRegArrowAltCircleRight style={{ color: 'white' }} /></div>
            <div className="card">Enquires <FaRegArrowAltCircleRight style={{ color: 'white' }} /></div>
          </div>
        </div>
      </div>
      <div className="admin-profile-header">
        <h1>Here, You Go</h1>
      </div>
      <div className="admin-profile-content">
        <div className="user-table">
          <h2>Students</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.mobileNumber}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="edit-button"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminProfilePage;
