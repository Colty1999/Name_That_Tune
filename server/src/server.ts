import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import SpotifyWebApi from "spotify-web-api-node";
import dotenv from "dotenv";

// const dotenv = require('dotenv');
dotenv.config();

const frontend = "https://" + process.env.FRONTEND_URI;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const app: Express = express();
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT;

app.post("/login", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: frontend,
    clientId: clientId,
    clientSecret: clientSecret,
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
    redirectUri: frontend,
    clientId: clientId,
    clientSecret: clientSecret,
    refreshToken,
  });
  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      console.log("token refreshed");
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
