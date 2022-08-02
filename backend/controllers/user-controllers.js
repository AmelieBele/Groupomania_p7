const User = require("../models/user-models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)

    .then((hash) => {
      const user = new User({
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        email: req.body.email,
        password: hash,
      });

      console.log(user);
      user
        .save()
        .then(() =>
          res
            .status(201)
            .json({ message: "Création de l'utilisateur réussie !" })
        )
        .catch((error) => res.status(400).json(error));
    })

    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non inscrit !" });
      }

      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }

          const userId = user._id.toString();

          res.status(200).json({
            userId: userId,
            token: jwt.sign({ userId: userId }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
            lastname: user.lastname,
            firstname: user.firstname
          });
        })
        .catch((error) => res.status(500).json(error));
    })
    .catch((error) => res.status(500).json(error));
};

exports.getUser = (req, res, next) => {
  User.findOne({ userId: req.body.userId })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non inscrit !" });
      }
      return res.status(200).json(user)
    }).catch((error) => res.status(500).json(error));
};
