import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function useAuth(code: string | null) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [expiresIn, setExpiresIn] = useState<number | null>(null);

  const isMounted = useRef(false);

  useEffect(() => {
    if (code === null) return;
    if (isMounted.current) {
      axios
        .post("http://localhost:3000/login", {
          code,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setRefreshToken(res.data.refreshToken);
          setExpiresIn(res.data.expiresIn);
          // window.history.pushState({}, "", "/")
        })
        .catch((err) => {
          console.log(err);
          // window.location.href = "/";
          // window.history.pushState({}, "", "/")
        });
    } else {
      isMounted.current = true;
    }
  }, [code]);

  useEffect(() => {
    if (code === null) return;
    if (!refreshToken || !expiresIn) return;
    if (isMounted.current) {
      axios
        .post("http://localhost:3000/refresh", {
          refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
          window.history.pushState({}, "", "/")
        })
        .catch((err) => {
          console.log(err);
          // window.location.href = "/";
          // window.history.pushState({}, "", "/")
        });
    } else {
      isMounted.current = true;
    }
  }, [refreshToken, expiresIn]);

  return accessToken;
}
