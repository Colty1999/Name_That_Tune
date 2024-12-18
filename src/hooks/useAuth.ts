import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { cookieOptions } from "../assets/common";
import SpotifyWebApi from "spotify-web-api-node";
import { deleteCookie, getCookie, setCookie } from 'cookies-next/client';
import { AppContext } from "../App";

export default function useAuth(code: string | null) {
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");

  const [expiresIn, setExpiresIn] = useState<number | null>(null);

  const { setLoading, setError } = useContext(AppContext);

  const isLoginMounted = useRef(false);
  const isRefreshed = useRef(false);

  useEffect(() => {
    if (!accessToken || accessToken.length === 0) return;
    if (isRefreshed.current) return;
    const spotifyApi = new SpotifyWebApi({
      clientId: "226da25afbe64537a2574c7155cbc643",
    });
    setLoading(true);
    spotifyApi.setAccessToken(accessToken);
    spotifyApi
      .getMe()
      .then(() => {
        axios
          .post(`/api/refresh`, {
            refreshToken: refreshToken,
          })
          .then((res) => {
            setCookie("accessToken", res.data.accessToken, cookieOptions);
            // accessToken.setStorageState(res.data.accessToken);
            setExpiresIn(res.data.expiresIn);
            setLoading(false);
          })
          .catch((err) => {
            // history.replaceState({}, "", "/");
            deleteCookie("accessToken");
            console.error(err.response);
            setLoading(false);
            setError(err.message);
          });
      })
      .catch((err) => {
        // history.replaceState({}, "", "/");
        deleteCookie("accessToken");
        console.error(err.response);
        setLoading(false);
        setError(err.message);
      });
    isRefreshed.current = true;
  });

  useEffect(() => {
    if (code === null) return; //return if logging out (code is null)
    if (isLoginMounted.current) return;
    //useStrict double rendering countermeasure
    setLoading(true);
    axios
      .post(`/api/login`, {
        code,
      })
      .then((res) => {
        // accessToken.setStorageState(res.data.accessToken);
        setCookie("accessToken", res.data.accessToken, cookieOptions);
        // refreshToken.setStorageState(res.data.refreshToken);
        setCookie("refreshToken", res.data.refreshToken, cookieOptions);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, "", "/");
        setLoading(false);
      })
      .catch((err) => {
        deleteCookie("accessToken");
        console.error(err.response);
        setLoading(false);
        setError(err.message);
      });
    isLoginMounted.current = true;
  }, [code, setLoading, setError]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post(`/api/refresh`, {
          refreshToken: refreshToken,
        })
        .then((res) => {
          // accessToken.setStorageState(res.data.accessToken);
          setCookie("accessToken", res.data.accessToken, cookieOptions);
          setExpiresIn(res.data.expiresIn);
        })
        .catch((err) => {
          // history.replaceState({}, "", "/");
          deleteCookie("accessToken");
          console.error(err.response);
          setError(err.message);
        });
    }, (expiresIn - 59) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn, setError]);

  return;
}
