  // import axios from 'axios';
  // import instance from './axios';

  // const api_uri="http://localHost:8181";
  // export const login = (data) => axios.post(`${api_uri}/api/v1/auth/login`,data);
  // export const register = (data) => axios.post(`${api_uri}/api/v1/auth/register`,data);
  // export const logout = () => instance.post(`${api_uri}/api/v1/auth/logout`);
  // export const forgotPassword = (data) => axios.patch(`${api_uri}/api/v1/auth/forgot_password`,data);



  import axios from 'axios';
  import instance from './axios';

  const api_uri = "http://localhost:8181";

  export const login = (data) => axios.post(`${api_uri}/api/v1/auth/login`, data);

  // export const login = (data) => async (dispatch) => {
  //   try {
  //     const userDetailsResponse = await fetchUserDetails(data.email);
  //     dispatch(setUserData(userDetailsResponse.data)); // Dispatch action to store user details in Redux
  //   } catch (error) {
  //     console.error(error);
  //     if (error.response && error.response.status === 417) {
  //       toast.error("Invalid Credentials");
  //     } else {
  //       toast.error("Login failed");
  //     }
  //   }
  // };


  export const register = (data) => {
    return axios.post(`${api_uri}/api/v1/auth/register`, data)
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Server returned an error:", error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error setting up request:", error.message);
        }
        throw error; // Rethrow the error to propagate it to the caller
      });
  };

  export const logout = () => instance.post(`${api_uri}/api/v1/auth/logout`);

  export const forgotPassword = (data) => axios.patch(`${api_uri}/api/v1/auth/forgot_password`, data);
 
  export const fetchCourses = () => instance.get(`${api_uri}/api/v1/course/get/all`);

  export const getAllEnquiries = async () => {
    try {
      // Make the GET request using the axios instance
      const response = await instance.get(`${api_uri}/api/v1/query/get/all-enquiries`);
      // Return the data from the response
      return response.data;
    } catch (error) {
      // If an error occurs, log it and throw the error
      console.error('Error fetching enquiries:', error);
      throw error;
    }
  };


  export const fetchUserDetails = async (email) => {
    try {
      const response = await axios.get(`${api_uri}/api/v1/auth/api/v1/auth/user-details?email=${email}`);
      return response.data; // Assuming the response contains user details
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw error; // Propagate the error to the caller
    }
  };

    export const updateUserDetails = async (userData) => {
      try {
        const response = await axios.put(`${api_uri}/api/v1/auth/api/v1/auth/update-user-details`, userData);
        return response.data;
      } catch (error) {
        console.error('Error updating user details:', error);
        throw error;
      }
    };

    export const saveEnquiry = async (enquiryData) => {
      try {
        const response = await instance.post(`${api_uri}/api/v1/query/save/enquiry`, enquiryData);
        return response.data; // Assuming the response contains the saved enquiry data
      } catch (error) {
        console.error('Error saving enquiry:', error);
        throw error; // Propagate the error to the caller
      }
    };

    export const saveCourse = (courseData) => {
      const formData = new FormData();
      formData.append('courseName', courseData.courseName);
      formData.append('duration', courseData.duration);
      formData.append('fees', courseData.fees);
      formData.append('level', courseData.level);
      formData.append('image', courseData.image);
      
      return instance.post(`${api_uri}/api/v1/course/save/courses`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).catch(error => {
        handleAxiosError(error);
        throw error;
      });
    };

    export const fetchCourseDetails = async (courseName) => {
      try {
        const response = await instance.get(`${api_uri}/api/v1/course/get/${courseName}`);
        return response.data; // Assuming the response contains course details
      } catch (error) {
        console.error('Error fetching course details:', error);
        throw error;
      }
    };

    export const savePaymentDetails = async (paymentDetails) => {
      try {
        const response = await instance.post(`${api_uri}/api/v1/payment/save`, paymentDetails);
        console.log('Payment saved:', response.data);
        return response.data; // Return the response data if needed
      } catch (error) {
        console.error('Error saving payment details:', error);
        throw error; // Throw the error to handle it in the calling component
      }
    };
    


    // export const fetchCourses = async () => {
    //   try {
    //     const response = await axios.get(`${api_uri}/api/v1/course/get/all`);
    //     console.log(response.data);// Assuming the response contains course data
    //   } catch (error) {
    //     console.error('Error fetching courses:', error);
    //     throw error; 
    //   }
    // };

    export const getAllPayments = async () => {
      try {
        const response = await instance.get(`${api_uri}/api/v1/payment/all`);
        return response.data;
      } catch (error) {
        console.error('Error fetching payments:', error);
        throw error;
      }
    };

    export const getPaymentsByEmail = async (email) => {
      try {
        const response = await instance.get(`${api_uri}/api/v1/payment/email/${email}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching payments by email:', error);
        throw error;
      }
    };


// Function to update the reply in the database
export const updateEnquiryReply = async (enquiryId, updatedReply) => {
  try {
    console.log(updatedReply);
    const response = await instance.put(`${api_uri}/api/v1/query/update/${enquiryId}`,  updatedReply);
    return response.data; // Return the response data if needed
  } catch (error) {
    if (error.response && error.response.status === 403) {
      console.error('Error: Forbidden - Insufficient Permissions');
    } else {
      console.error('Error updating enquiry reply:', error);
    }
    throw error; // Propagate the error to the caller
  }
};

export const getEnquiriesByEmail = async (email) => {
  try {
    const response = await instance.get(`${api_uri}/api/v1/query/get/by-email/${email}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching enquiries by email:', error);
    throw error;
  }
};
    

  const handleAxiosError = (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Server returned an error:", error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up request:", error.message);
    }
  };