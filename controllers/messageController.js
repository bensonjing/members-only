import Message from "../models/message";

export function message_list(req, res, next) {
  Message.find()
    .sort({ date: -1 })
    .populate("author")
    .exec((err, result) => {
      if (err) {
        return next(err);
      }
      console.log(result);
      res.render("index", { messages: result, user: req.user });
    });
}
