let client_id = require('./client_id.json');

const user = "496702762091-shp1g0pvli14uf34d9gsio0nft22cls9.apps.googleusercontent.com";
const refreshToken = "1/uRIpBbUmMLbw3w-rn1q4USGqJjgdbpmHgPmRPG2aS_I"
const accessToken = "ya29.GlsuB4tTvy54aiOAtPNORNzbf-TytyqPLEQKKEvDA9bZYLzyIz-jbcnkLlg6M3qwWY55LHTDD8aG6qL6jBCzMhx4hY46itpGOgilzIa7vewdrs3FwFvCXCQADDGi"

module.exports = {
  user,
  clientId: client_id.web.client_id,
  clientSecret: client_id.web.client_secret,
  refreshToken,
  accessToken
}