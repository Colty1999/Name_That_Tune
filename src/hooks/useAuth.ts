import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { cookieOptions } from "../assets/common";
import SpotifyWebApi from "spotify-web-api-node";
import { deleteCookie, getCookie, setCookie } from 'cookies-next/client';
import { AppContext } from "../App";
import { createClient } from "../../utils/supabase/client";

const supabase = createClient();

export default function useAuth() {
  // write code that is user is not logged into spotify to return
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
            setExpiresIn(res.data.expiresIn);
            setLoading(false);
          })
          .catch((err) => {
            deleteCookie("accessToken");
            console.error(err.response);
            setLoading(false);
            setError(err.message);
          });
      })
      .catch((err) => {
        deleteCookie("accessToken");
        console.error(err.response);
        setLoading(false);
        setError(err.message);
      });
    isRefreshed.current = true;
  });

  useEffect(() => {
    const fetchSpotifyToken = async () => {
      try {
        setLoading(true);

        const { data, error } = await supabase.auth.getSession();

        if (error || !data?.session) {
          setLoading(false);
          return;
        }

        const spotifyAccessToken = data.session?.provider_token;
        const spotifyRefreshToken = data.session?.provider_refresh_token;
        const spotifyExpiresIn = data.session?.expires_in;

        if (!spotifyAccessToken || !spotifyRefreshToken || !spotifyExpiresIn) {
          throw new Error("Spotify tokens not found in user metadata.");
        }

        setCookie("accessToken", spotifyAccessToken, cookieOptions);
        setCookie("refreshToken", spotifyRefreshToken, cookieOptions);
        setExpiresIn(spotifyExpiresIn);

        const spotifyApi = new SpotifyWebApi({
          clientId: "226da25afbe64537a2574c7155cbc643",
        });
        spotifyApi.setAccessToken(spotifyAccessToken);

        await spotifyApi.getMe();
      } catch (err) {
        console.error("Error fetching Spotify token:", err);
        setError("Failed to authenticate with Spotify.");
      } finally {
        setLoading(false);
      }
    };

    if (!isLoginMounted.current) {
      fetchSpotifyToken();
      isLoginMounted.current = true;
    }
  }, [setLoading, setError]);

  useEffect(() => {
    if (!refreshToken || !expiresIn || isRefreshed.current) return;

    const interval = setInterval(async () => {
      try {
        const response = await axios.post("/api/refresh", {
          refreshToken,
        });

        const newAccessToken = response.data.accessToken;
        const newExpiresIn = response.data.expiresIn;

        // Update state and cookies
        setCookie("accessToken", newAccessToken, cookieOptions);
        setExpiresIn(newExpiresIn);
      } catch (err) {
        console.error("Error refreshing Spotify token:", err);
        setError("Failed to refresh Spotify session.");
      }
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn, setError]);

  return;
}
