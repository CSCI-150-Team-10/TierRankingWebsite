const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");

const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const List = require("../../models/List");

// The route user will take    POST api/list
// description of action     Create a List
// the route will be granted access level of:   Private
router.post(
  "/",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newList = new List({
        text: req.body.text,
        category: req.body.category,
        item1: req.body.item1,
        item2: req.body.item2,
        item3: req.body.item3,
        item4: req.body.item4,
        item5: req.body.item5,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });

      const list = await newList.save();

      res.json(list);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// The route user will take    GET api/list
// description of action     Get all lists
// the route will be granted access level of:   Private
router.get("/", auth, async (req, res) => {
  try {
    const list = await List.find().sort({ date: -1 });
    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// The route user will take    GET api/list/:id
// description of action     Get list by ID
// the route will be granted access level of:   Private
router.get("/:id", auth, async (req, res) => {
  try {
    const list = await List.findById(req.params.id);

    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !list) {
      return res.status(404).json({ msg: "list not found" });
    }

    res.json(list);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

// The route user will take    DELETE api/list/:id
// description of action     Delete a list
// the route will be granted access level of:   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const list = await List.findById(req.params.id);

    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !list) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check user
    if (list.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await list.remove();

    res.json({ msg: "list removed" });
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

// The route user will take    PUT api/list/like/:id
// description of action     Like a list
// the route will be granted access level of:   Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const list = await List.findById(req.params.id);

    // Check if the list has already been liked
    if (
      list.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: "list already liked" });
    }

    list.likes.unshift({ user: req.user.id });

    await list.save();

    res.json(list.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// The route user will take    PUT api/list/unlike/:id
// description of action     Like a list
// the route will be granted access level of:   Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const list = await List.findById(req.params.id);

    // Check if the list has already been liked
    if (
      list.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ msg: "List has not yet been liked" });
    }

    // Get remove index
    const removeIndex = list.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    list.likes.splice(removeIndex, 1);

    await list.save();

    res.json(list.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// The route user will take    POST api/list/comment/:id
// description of action     Comment on a list
// the route will be granted access level of:   Private
router.post(
  "/comment/:id",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      list.comments.unshift(newComment);

      await list.save();

      res.json(list.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// The route user will take    DELETE api/list/comment/:id/:comment_id
// description of action     Delete comment
// the route will be granted access level of:   Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const list = await List.findById(req.params.id);

    // Pull out comment
    const comment = list.comments.find(
      comment => comment.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Get remove index
    const removeIndex = list.comments
      .map(comment => comment.id)
      .indexOf(req.params.comment_id);

    list.comments.splice(removeIndex, 1);

    await post.save();

    res.json(list.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
