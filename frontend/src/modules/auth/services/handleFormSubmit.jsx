import axios from "axios";

export const handleFormSubmit = async (values, formType) => {
  try {
    let userInfo = {};
    if (formType === "register") {
      try {
        const { data }  = await axios.post(
          `${process.env.REACT_APP_API_BASE}/users/register`,
          {
            username: values.name,
            email: values.email,
            password: values.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        userInfo = data.user
        localStorage.setItem("token", data.token);
      } catch (error) {
        return { success: false, message: error.response.data.error };
      }
      return { success: true, userInfo };
    } else if (formType === "login") {
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_API_BASE}/users/login`,
          {
            email: values.email,
            password: values.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        //! TODO: se debe guardar el token para mantener la sesion activa res.data.token
        localStorage.setItem("token", data.token);
        userInfo = data.user
      } catch (error) {
        return { success: false, message: error };
      }
      return { success: true, userInfo };
    } else {
      return { success: false };
    }
  } catch (error) {
    return { success: false, error: error };
  }
};