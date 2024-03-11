// // authSlice.js

// import { createSlice } from '@reduxjs/toolkit';
// import { fetchUserDetails } from '../services/auth';

// const initialState = {
//   exp: null,
//   iat: null,
//   role: null,
//   sub: null,
//   email: null,
//   userData: {},
// };

// export const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     loginSuccess: (state, action) => {
//       const { exp, iat, role, sub, email } = action.payload;
//       state.exp = exp;
//       state.iat = iat;
//       state.role = role;
//       state.sub = sub;
//       state.email = email;
//     },
//     setUserData(state, action){
//       state.userData = action.payload;

//       // Store user data in session storage
//       sessionStorage.setItem('userData', JSON.stringify(action.payload));
//     },
//   },
// });

// // export const { setUserData } = authSlice.actions;

// // export const fetchUserData = (email) => async (dispatch) => {
// //   try {
// //     const userData = await fetchUserDetails(email);
// //     dispatch(setUserData(userData));
// //   } catch (error) {
// //     console.error('Error fetching user data:', error);
// //   }
// // };



// export const{setUserData,loginSuccess}=authSlice.actions;
// export default authSlice.reducer;



import { createSlice } from '@reduxjs/toolkit';
// import { fetchUserDetails } from '../services/auth';

const initialState = {
  exp: null,
  iat: null,
  role: null,
  sub: null,
  email: null,
  userData: {},
  courseDetails: null,
  savedCourseDetails: [],
  enquiryDetails: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { exp, iat, role, sub, email } = action.payload;
      state.exp = exp;
      state.iat = iat;
      state.role = role;
      state.sub = sub;
      state.email = email;
    },
    setUserData(state, action){
      state.userData = action.payload;

      // Store user data in session storage
      sessionStorage.setItem('userData', JSON.stringify(action.payload));
    },
    setCourseDetails: (state, action) => {
      state.courseDetails = action.payload;
      // sessionStorage.setItem('courseDetails', JSON.stringify(action.payload));
    },  
    setSaveCourse: (state, action) => {
      state.savedCourseDetails = action.payload;
    },
    storeEnquiryDetails: (state, action) => {
      state.enquiryDetails = action.payload;
      sessionStorage.setItem('enquiryDetails', JSON.stringify(action.payload));

    },
  },
});

export const { setUserData, loginSuccess, setCourseDetails, setSaveCourse, storeEnquiryDetails  } = authSlice.actions;

export default authSlice.reducer;