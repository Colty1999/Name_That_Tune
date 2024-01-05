import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import SpotifyWebApi from "spotify-web-api-node";

const app: Express = express();
app.use(cors());
app.use(bodyParser.json());
const port = 3000;

app.post("/login", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:5173",
    clientId: "226da25afbe64537a2574c7155cbc643",
    clientSecret: "275eb241ad47431693fa8ada554c28cb",
  });
  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      res.status(err.statusCode).send(err);
      // res.sendStatus(400);
    });
});

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:5173",
    clientId: "226da25afbe64537a2574c7155cbc643",
    clientSecret: "275eb241ad47431693fa8ada554c28cb",
    refreshToken,
  });
  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      res.status(err.statusCode).send(err);
    });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
