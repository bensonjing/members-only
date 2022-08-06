import Message from "../models/message";

export function message_list(req, res, next) {
  Message.find()
    .sort({ date: -1 })
    .populate("author")
    .exec((err, result) => {
      if (err) {
        return next(err);
      }
      res.render("index", { messages: result, user: req.user });
    });
}

export function create_message_get(req, res) {
  res.render("message_form", { title: "Create New Message" });
}

export function create_message_post(req, res, next) {
  const message = new Message({
    title: req.body.title,
    text: req.body.text,
    author: req.user,
  });

  message.save((err) => {
    if (err) {
      return next(err);
    }

    res.redirect("/");
  });
}
