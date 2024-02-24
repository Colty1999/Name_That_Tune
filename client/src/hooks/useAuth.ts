import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useStorageState } from "./useStorageState";
import { backend, cookieOptions } from "../assets/common";
import SpotifyWebApi from "spotify-web-api-node";
import Cookies from "js-cookie";

export default function useAuth(code: string | null) {
  let loggedIn = useStorageState({ state: "loggedIn" });
  // let accessToken = useStorageState({ state: "accessToken" });
  // let refreshToken = useStorageState({ state: "refreshToken" });
  let accessToken = Cookies.get("accessToken");
  let refreshToken = Cookies.get("refreshToken");

  // const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [expiresIn, setExpiresIn] = useState<number | null>(null);

  const isLoginMounted = useRef(false);
  const isRefreshed = useRef(false);

  useEffect(() => {
    if (!accessToken || accessToken.length === 0) return;
    if (isRefreshed.current) return;
    const spotifyApi = new SpotifyWebApi({
      clientId: "226da25afbe64537a2574c7155cbc643",
    });
    spotifyApi.setAccessToken(accessToken);
    spotifyApi
      .getMe()
      .then(() => {
        axios
          .post(`${backend}/refresh`, {
            refreshToken: refreshToken,
          })
          .then((res) => {
            Cookies.set("accessToken", res.data.accessToken, cookieOptions);
            // accessToken.setStorageState(res.data.accessToken);
            setExpiresIn(res.data.expiresIn);
          })
          .catch((err) => {
            history.replaceState({}, "", "/");
            loggedIn.setStorageState("false");
            console.error(err.response);
          });
      })
      .catch((err) => {
        // accessToken.setStorageState("");
        Cookies.remove("accessToken");
        loggedIn.setStorageState("false");
        console.error(err.response);
      });
    isRefreshed.current = true;
  }, []);

  useEffect(() => {
    if (code === null) return; //return if logging out (code is null)
    if (isLoginMounted.current) return;
    //useStrict double rendering countermeasure
    axios
      .post(`${backend}/login`, {
        code,
      })
      .then((res) => {
        // accessToken.setStorageState(res.data.accessToken);
        Cookies.set("accessToken", res.data.accessToken, cookieOptions);
        // refreshToken.setStorageState(res.data.refreshToken);
        Cookies.set("refreshToken", res.data.refreshToken, cookieOptions);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, "", "/");
        loggedIn.setStorageState("true");
      })
      .catch((err) => {
        loggedIn.setStorageState("false");
        console.error(err.response);
      });
    isLoginMounted.current = true;
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post(`${backend}/refresh`, {
          refreshToken: refreshToken,
        })
        .then((res) => {
          // accessToken.setStorageState(res.data.accessToken);
          Cookies.set("accessToken", res.data.accessToken, cookieOptions);
          setExpiresIn(res.data.expiresIn);
        })
        .catch((err) => {
          history.replaceState({}, "", "/");
          loggedIn.setStorageState("false");
          console.error(err.response);
        });
    }, (expiresIn - 59) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return;
}
