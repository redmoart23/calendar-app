import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import {
  clearErrorMessage,
  onChecking,
  onLoging,
  onLogout,
} from "../store/auth/authSlice";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());

    try {
      const { data } = await calendarApi.post("/auth", { email, password });
      localStorage.setItem("token", data.token);

      dispatch(onLoging({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogout("Credenciales incorrectas", error));
      setTimeout(() => dispatch(clearErrorMessage()), 10);
    }
  };

  const startRegister = async ({ name, email, password }) => {
    
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post("/auth/new", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      dispatch(onLoging({ name: data.name, uid: data.uid }));

    } catch (error) {
      dispatch(onLogout(error.response.data?.message || ""));
      setTimeout(() => dispatch(clearErrorMessage()), 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await calendarApi.get("/auth/renew");
      localStorage.setItem("token", data.token);
      dispatch(onLoging({ name: data.name, uid: data.uid }));
    } catch (error) {
      console.log(error);
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  return {
    status,
    user,
    errorMessage,
    startLogin,
    startRegister,
    checkAuthToken
  };
};
