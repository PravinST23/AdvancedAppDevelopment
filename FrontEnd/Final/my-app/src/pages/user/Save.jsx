// import React from 'react';
// import { useSelector } from 'react-redux';
// import defaultImage from '/src/assets/css/images/snapedit_1709987019645.jpeg';
// import '/src/assets/css/Save.css'; // Adjust the path to your CSS file

// const SavePage = () => {
//   // Access saved course details from Redux state
//   const savedCourses = useSelector(state => state.auth.savedCourseDetails);

//   return (
//     <div className="saved-page">
//       <h1 className="saved-page-title">Saved Courses</h1>
//       <div className="saved-courses">
//         {savedCourses.map((course, index) => (
//           <div className="saved-blur-color" key={index}>
//             <div className="saved-menuItem">
//               <div className="saved-menuItemImg" style={{ backgroundImage: `url(data:image/jpeg;base64,${course.image})` }} />
//               <div className="product-img-details">
//                 <h2 className="saved-menuItemName">{course.courseName}</h2>
//               </div>
//               <p className="saved-stock">Duration: {course.duration}</p>
//               {/* Add additional course details if needed */}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SavePage;
