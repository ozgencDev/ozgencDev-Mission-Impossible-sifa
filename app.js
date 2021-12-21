const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const port = 3000;

const app = express();

const user = { UID: "Sevena2", email: "sevena@gmail.com", password: "15697" };
app.use(cookieParser("cookie-secret"));

app.get("/login-page", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/login", (req, res) => {
  const { email, password, redirectUrl } = req.query;
  console.log(email, password, redirectUrl);
  if (email === user.email && password === user.password) {
    console.log("Burada");
    // sign 1.parametre: Token içerisinde şifrelenmiş bilgi, sign 2.parametre: token sahi
    const token = jwt.sign({ UID: user.UID }, "jwt-secret-one", {
      expiresIn: "1d",
    });
    //Authorization=Token
    res.cookie("Authorization", token, {
      expires: new Date(new Date().setDate(new Date().getDate() + 1)),
      httpOnly: true,
      signed: true,
    });
    res.redirect(redirectUrl);
    return;
  }
  res.status(401).send();
});

/*app.get("/auth", (req, res) => {
  const authToken = req.signedCookies["Authorization"];
  const { redirectUrl } = req.query;
  if (!authToken) {
    return res.redirect(`/login-page?redirectUrl=${redirectUrl}`);
  }

  try {
    const { UID } = jwt.verify(authToken, "jwt-secret-one");
    if (user.UID) {
      const indentificationToken = jwt.sign({ UID }, "jwt-secret-two", {
        expiresIn: "30s",
      });

      return res.redirect(
        `${redirectUrl}?indentificationToken=${indentificationToken}`
      );
    }
  } catch (err) {
    return res.redirect(`/login-page?redirectUrl=${redirectUrl}`);
  }
});

app.get("/get-identity", (req, res, next) => {
  const { indentificationToken } = req.query;

  try {
    const { UID } = jwt.verify(indentificationToken, "jwt-secret-two");

    if (user.UID === UID) {
      res.json({ UID });
    }
  } catch {
    res.status(401).send();
  }
});*/

app.listen(port, () => {
  console.log(`${port} is working`);
});
