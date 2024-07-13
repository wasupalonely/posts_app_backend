import express, { NextFunction, Request, Response } from "express";
import PostService from "../services/post.service";
import validatorHandler from "../middlewares/validator.handler";
import {
  createPostSchema,
  getBookmarksSchema,
  getPostsSchema,
  likePostSchema,
  updatePostSchema,
} from "../schemas/post.schema";
import multer from "multer";
import passport from "passport";
import { uploadImage } from "../utils/utils";

const postRouter = express.Router();

const postService = new PostService();
const upload = multer({ dest: "uploads/" });

postRouter.get("/", async (req, res) => {
  const posts = await postService.getPosts();
  res.json(posts);
});

postRouter.get(
  "/:id",
  validatorHandler(getPostsSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const post = await postService.getPostById(id);
      res.status(200).json(post);
    } catch (err: any) {
      next(err);
    }
  },
);

postRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.array("images"),
  validatorHandler(createPostSchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const maxSize = 10485760;

      for (const file of imageFiles) {
        if (file.size > maxSize) {
          return res
            .status(400)
            .json({ message: "File size too large. Maximum is 10 MB." });
        }
      }

      const imageUrls = await Promise.all(
        imageFiles.map((file) => uploadImage(file.path)),
      );

      const post = await postService.createPost({
        ...req.body,
        media: imageUrls,
      });
      res.status(201).json(post);
    } catch (err: any) {
      next(err);
    }
  },
);

postRouter.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getPostsSchema, "params"),
  validatorHandler(updatePostSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const post = await postService.updatePost(id, req.body);
      res.status(200).json(post);
    } catch (err: any) {
      next(err);
    }
  },
);

postRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getPostsSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const post = await postService.deletePost(id);
      res.status(200).json(post);
    } catch (err: any) {
      next(err);
    }
  },
);

postRouter.post(
  "/:id/like",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getPostsSchema, "params"),
  validatorHandler(likePostSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      const post = await postService.likePost(id, userId);
      res.status(200).json(post);
    } catch (err: any) {
      next(err);
    }
  },
);

postRouter.get(
  "/:userId/bookmarks",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getBookmarksSchema, "params"),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const posts = await postService.getBookmarkedPosts(userId);
      res.status(200).json(posts);
    } catch (err: any) {
      next(err);
    }
  },
);

export default postRouter;
