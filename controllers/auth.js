const axios = require("axios");

module.exports.auth = async (req, res) => {
  const code = req.query.code;
  const body = {
    code,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: "http://localhost:3000/auth",
    grant_type: "authorization_code",
  };
  const data = await axios.post(
    "https://www.googleapis.com/oauth2/v4/token",
    body
  );
  const access_token = data.data.access_token;
  res.send(`access token: ${access_token}`);
};
