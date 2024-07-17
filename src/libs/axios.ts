import a from "axios";
import {
  API_VERSION,
  BACKEND_URL,
  BACKEND_URL_PROTOCOL,
} from "../constants/Settings";
import { notifications } from "@mantine/notifications";
// import { roleState } from "../models/states/useRole";
// import { siteState } from "../models/states/useSiteState";

const axios = a.create({
  baseURL: `${BACKEND_URL_PROTOCOL + BACKEND_URL + API_VERSION}`,
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${Cookies.get("session")}`,
    // "fi-client-number": CLIENT_ID.toUpperCase(),
    // "fi-device-number": siteState().device_identifier,
  },
});

axios.interceptors.request.use(
  (config) => {
    // const token = Cookies.get("session");

    // const role = roleState().role;
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    //   config.headers["X-ROLE"] = Number(role) - 1;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  function (response: any) {
    return response;
  },
  async function (error: any) {
    if (error.response.status === 401) {
      // TODO: Implement Refresh Token Functionality
      // window.location.href = "/signin";
      // try {
      //   const res = await axios.get("/auth/get_access_token", {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${Cookies.get("refresh-token")}`,
      //     },
      //   });
      //   Cookies.set("session", res.data.token.accessToken);
      // } catch (error) {
      // }
    }

    error?.response.data.errors?.forEach((error: any) => {
      notifications.show({
        title: error.message ?? "Something went wrong",
        message: "",
        bg: "red",
        styles: {
          title: {
            color: "white",
          },
        },
      });
    });
  }
);

export default axios;
