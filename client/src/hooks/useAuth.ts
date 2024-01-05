import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function useAuth(code: string | null) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [expiresIn, setExpiresIn] = useState<number | null>(null);

  const isMounted = useRef(false);

  useEffect(() => {
    if (code === null) return; //return if logging out (code is null)
    if (isMounted.current) {
      //useStrict double rendering countermeasure
      axios
        .post("http://localhost:3000/login", {
          code,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setRefreshToken(res.data.refreshToken);
          setExpiresIn(res.data.expiresIn);
          window.history.pushState({}, "", "/");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      isMounted.current = true;
    }
  }, [code]);

  useEffect(() => {
    if (code === null) return; //return if logging out (code is null)
    if (!refreshToken || !expiresIn) return; //return if no refresh token or expiresIn (prevent call just after login)
    if (isMounted.current) {
      //useStrict double rendering countermeasure
      const timeout = setTimeout(() => {
        axios
          .post("http://localhost:3000/refresh", {
            refreshToken,
          })
          .then((res) => {
            setAccessToken(res.data.accessToken);
            setExpiresIn(res.data.expiresIn);
            window.history.pushState({}, "", "/");
          })
          .catch((err) => {
            console.log(err);
          });
      }, (expiresIn - 60) * 1000);
      return () => {clearTimeout(timeout)};
    } else {
      isMounted.current = true;
    }
  }, [refreshToken, expiresIn]);

  return accessToken;
}
