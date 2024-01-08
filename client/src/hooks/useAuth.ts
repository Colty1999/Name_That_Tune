import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useStorageState } from "./useStorageState";

export default function useAuth(code: string | null) {
  let loggedIn = useStorageState({ state: "loggedIn" });
  let accessToken = useStorageState({state: "accessToken"});
  
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [expiresIn, setExpiresIn] = useState<number | null>(null);

  const isLoginMounted = useRef(false);

  useEffect(() => {
    if (code === null) return; //return if logging out (code is null)
    if (isLoginMounted.current) {
      //useStrict double rendering countermeasure
      axios
        .post("http://localhost:3000/login", {
          code,
        })
        .then((res) => {
          accessToken.setStorageState(res.data.accessToken);
          // setAccessToken(res.data.accessToken);
          setRefreshToken(res.data.refreshToken);
          setExpiresIn(res.data.expiresIn);
          window.history.pushState({}, "", "/");
          loggedIn.setStorageState("true");
        })
        .catch((err) => {
          loggedIn.setStorageState("false");
          console.log(err);
        });
    } else {
      isLoginMounted.current = true;
    }
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return
    const interval = setInterval(() => {
      // console.log("useEffect refresh");
      axios
        .post("http://localhost:3000/refresh", {
          refreshToken,
        })
        .then(res => {
          accessToken.setStorageState(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        })
        .catch((err) => {
          history.replaceState({}, "", "/");
          loggedIn.setStorageState("false");
          console.log(err);
        })
    }, (expiresIn - 60) * 1000)

    return () => clearInterval(interval)
  }, [refreshToken, expiresIn])

  return;
}