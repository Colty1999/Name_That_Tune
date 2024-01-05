import { useEffect, useState } from "react";
import axios from "axios";


export default function useAuth(code: string) {
  // let accessToken = useStorageState({ state: "accessToken" });
  // let refreshToken = useStorageState({ state: "refreshToken" });
  // let expiresIn = useStorageState({ state: "expiresIn" });
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [expiresIn, setExpiresIn] = useState<number | null>(null);

  useEffect(() => {
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
        window.location.href = "/";
        // window.history.pushState({}, "", "/")
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    axios
      .post("http://localhost:3000/refresh", {
        refreshToken,
      })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setExpiresIn(res.data.expiresIn);
        // window.history.pushState({}, "", "/")
      })
      .catch((err) => {
        console.log(err);
        window.location.href = "/";
        // window.history.pushState({}, "", "/")
      });
  }, [refreshToken, expiresIn]);

  return accessToken;
}
