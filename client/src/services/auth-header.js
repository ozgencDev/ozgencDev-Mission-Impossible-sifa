export default function authHeader() {
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.accessToken) {
    /* Places an access token in the header for processing in the isAuthorized middleware */
    return { "x-access-token": user.accessToken }; // for Node.js Express back-end
  } else {
    return {};
  }
}
