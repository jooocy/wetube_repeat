import User from "../models/User";
import fetch from "node-fetch";
import bcrypt from "bcrypt";
import { emit } from "nodemon";

export const getLogin = async (req, res) => {
  res.render("login", { pageTitle: "login" });
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(201).render("login", {
        pageTitle: "LOGIN",
        errorMsg: "email doesn't exist",
      });
    }

    const checkPW = await bcrypt.compare(password, user.password);
    if (!checkPW) {
      console.log("pw does not match");
      return res.status(201).render("login", {
        pageTitle: "LOGIN",
        errorMsg: "incorrect password.",
      });
    }

    req.session.user = user;
    req.session.loggedIn = true;
    return res.status(200).redirect("/");
  } catch (error) {
    console.log("find error: ", error);
  }
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.status(200).redirect("/");
};

export const setting = (req, res) => {
  res.render("setting", { pageTitle: "setting" });
};

export const utubeApp = (req, res) => {
  res.render("utubeApp", { pageTitle: "utubeApp" });
};

export const search = (req, res) => {
  res.render("search", { pageTitle: "search" });
};

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "JOIN" });
};

export const postJoin = async (req, res) => {
  const { name, email, password, password2 } = req.body;

  if (password !== password2) {
    return res.render("join", {
      pageTitle: "JOIN",
      errorMsg: "Password was not same",
    });
  }
  const exist = await User.exists({ $or: [{ name }, { email }] });

  if (exist) {
    return res.render("join", {
      pageTitle: "JOIN",
      errorMsg: "already exist",
    });
  }

  try {
    await User.create({
      name,
      email,
      password,
    });
    return res.status(200).redirect("/users/login");
  } catch (error) {
    console.log("make accout error: ", error);
  }
};

export const startGithubLogin = (req, res) => {
  const baseUrl = `https://github.com/login/oauth/authorize`;
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };

  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
  const baseUrl = `https://github.com/login/oauth/access_token`;
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;

  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();

  if ("access_token" in tokenRequest) {
    const apiUrl = "https://api.github.com";
    const { access_token } = tokenRequest;
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    const email = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    console.log(email);
    if (!email) {
      return res.redirect("/login");
    } else {
      const user = {
        name: userData.login,
        email: email,
      };
      req.session.user = user;
      req.session.loggedIn = true;
      return res.status(201).redirect("/");
    }
  }
};
