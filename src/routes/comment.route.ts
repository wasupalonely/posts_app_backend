import express from "express";
import CommentService from "../services/comment.service";
import validatorHandler from "../middlewares/validator.handler";
import {
  createCommentSchema,
  getCommentByPostIdSchema,
  getCommentSchema,
  likeCommentSchema,
  updateCommentSchema,
} from "../schemas/comment.schema";
import passport from "passport";

const commentRouter = express.Router();

const commentService = new CommentService();

commentRouter.get("/", async (req, res) => {
  const comments = await commentService.getComments();
  res.send(comments);
});

commentRouter.get(
  "/:id",
  validatorHandler(getCommentSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const comment = await commentService.getCommentById(id);
      res.status(200).json(comment);
    } catch (err: any) {
      next(err);
    }
  },
);

commentRouter.get(
  "/post/:postId",
  validatorHandler(getCommentByPostIdSchema, "params"),
  async (req, res, next) => {
    try {
      const { postId } = req.params;
      const comments = await commentService.getCommentsByPostId(postId);
      res.status(200).json(comments);
    } catch (err: any) {
      next(err);
    }
  },
);

commentRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(createCommentSchema, "body"),
  async (req, res, next) => {
    try {
      const comment = await commentService.createComment(req.body);
      res.status(201).json(comment);
    } catch (err: any) {
      next(err);
    }
  },
);

commentRouter.post(
  "/:id/like",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getCommentSchema, "params"),
  validatorHandler(likeCommentSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      const post = await commentService.likeComment(id, userId);
      res.status(200).json(post);
    } catch (err: any) {
      next(err);
    }
  },
);

commentRouter.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getCommentSchema, "params"),
  validatorHandler(updateCommentSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const comment = await commentService.updateComment(id, req.body);
      res.status(200).json(comment);
    } catch (err: any) {
      next(err);
    }
  },
);

commentRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getCommentSchema, "params"),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await commentService.deleteComment(id);
    res.status(200).json(comment);
  } catch (err: any) {
    next(err);
  }
});

export default commentRouter;
