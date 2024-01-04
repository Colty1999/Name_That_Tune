import express, { Express, Request, Response } from "express";
import spotifyWebApi from "spotify-web-api-node";

const app: Express = express();
const port = 3000;

app.post("/login", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new spotifyWebApi({
    redirectUri: "http://localhost:5173",
    clientId: "226da25afbe64537a2574c7155cbc643",
    clientSecret: "275eb241ad47431693fa8ada554c28cb",
  });

  spotifyApi.authorizationCodeGrant(code).then(data => {
    res.json({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in,
    });
  }).catch(() => {
    res.sendStatus(400);
  });
});
