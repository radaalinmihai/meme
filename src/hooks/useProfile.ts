import { useContext } from "react";
import { profileStore } from "../contexts/home/ProfileContext";
import httpClient from "../helpers/httpClient";

const useProfile = () => {
  const {state: {loading, profile}, dispatch} = useContext(profileStore);

  const getProfile = (): void => {
    httpClient.get("/profile").then(res => {
      console.log(res.data);
    }).catch(err => {
      console.error(err.response?.data);
    });
  }

  return { loading, profile, getProfile };
}

export default useProfile;
