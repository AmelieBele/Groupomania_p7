const Post = require("../models/posts-models");
const fs = require("fs");

// Récupration de touts les posts ...............................................
exports.getAllPosts = (req, res, next) => {
  Post.find()
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};
// Recuperation d'un post ...............................................
exports.getOnePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(400).json({ error }));
};

// Creation d'un post ..................................................
exports.createPost = (req, res, next) => {
  const postObject = JSON.parse(req.body.post);
  delete postObject._id;
  const post = new Post({
    ...postObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    likes: 0,
    usersLiked: ["string"],
  });
  post
    .save()
    .then(() => res.status(201).json({ message: "Post créer !" }))
    .catch((error) => res.status(400).json({ error }));
};

//modification d'un post ....................................................
exports.modifyPost = (req, res, next) => {
  const postObject = req.file
    ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Post modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

//Suppression d'un post .....................................................
exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id }).then((post) => {
    const filename = post.imageUrl.split("/images/"[1]);
    fs.unlink(`images/${filename}`, () => {
      Post.deleteOne({ _id: req.params.id })
        .then(() => {
          res.status(200).json({
            message: "Deleted!",
          });
        })
        .catch((error) => {
          res.status(400).json({
            error: error,
          });
        });
    });
  });
};

exports.likePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (req.body.like == 1) {
        post.usersLiked.push(req.body.userId);
        post.likes += req.body.like;
      }
      if (
        post.usersLiked.indexOf(req.body.userId) != -1 &&
        req.body.like == 0
      ) {
        const likesIndex = post.usersLiked.findIndex(
          (user) => user === req.body.userId
        );
        post.usersLiked.splice(likesIndex, 1);
        post.likes -= 1;
      }
      post.save();
      res.status(201).json({ message: "Avis modifié !" });
    })
    .catch((error) => res.status(500).json({ error }));
};
