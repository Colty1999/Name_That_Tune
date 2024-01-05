import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useStorageState } from "./useStorageState";

export default function useAuth(code: string | null) {
  let loggedIn = useStorageState({ state: "loggedIn" });

  let accessToken = useStorageState({state: "accessToken"})
  // const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [expiresIn, setExpiresIn] = useState<number | null>(null);

  const isLoginMounted = useRef(false);
  const isRefreshMounted = useRef(false);

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
          console.log(err);
        });
    } else {
      isLoginMounted.current = true;
    }
  }, [code]);

  useEffect(() => {
    if (code === null) return; //return if logging out (code is null)
    if (!refreshToken || !expiresIn) return; //return if no refresh token or expiresIn (prevent call just after login)
    const interval = setInterval(() => {
      if (isRefreshMounted.current) {
        //useStrict double rendering countermeasure

        axios
          .post("http://localhost:3000/refresh", {
            refreshToken,
          })
          .then((res) => {
            accessToken.setStorageState(res.data.accessToken);
            // setAccessToken(res.data.accessToken);
            setExpiresIn(res.data.expiresIn);
            // window.history.pushState({}, "", "/");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        isRefreshMounted.current = true;
      }
    }, (expiresIn - 60) * 1000);
    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
}
