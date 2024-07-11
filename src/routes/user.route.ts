import express from "express";
import UserService from "../services/user.service";
import {
  createUserSchema,
  getUserSchema,
  toggleFollowSchema,
  updateUserSchema,
} from "../schemas/user.schema";
import validatorHandler from "../middlewares/validator.handler";
import multer from "multer";
import passport from "passport";

const userRouter = express.Router();

const userService = new UserService();

const upload = multer({ dest: "uploads/" });

userRouter.get("/", async (req, res) => {
  const users = await userService.getAllUsers();
  res.json(users);
});

userRouter.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getUserSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      res.status(200).json(user);
    } catch (err: any) {
      next(err);
    }
  },
);

userRouter.post(
  "/",
  validatorHandler(createUserSchema, "body"),
  async (req, res, next) => {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (err: any) {
      next(err);
    }
  },
);

userRouter.patch(
  "/:id/update-photo",
  passport.authenticate("jwt", { session: false }),
  upload.single("profile-pic"),
  validatorHandler(getUserSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userService.updateUserPhoto(id, req.file!.path);
      res.status(200).json(user);
    } catch (err: any) {
      next(err);
    }
  },
)

userRouter.post(
  "/:id/toggle-follow",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getUserSchema, "params"),
  validatorHandler(toggleFollowSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      const user = await userService.toggleFollow(id, userId);
      res.status(200).json(user);
    } catch (err: any) {
      next(err);
    }
  },
);

userRouter.post(
  "/:id/bookmark",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { postId } = req.body;
      const user = await userService.bookmarkPost(id, postId);
      res.status(200).json(user);
    } catch (err: any) {
      next(err);
    }
  },
)

userRouter.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getUserSchema, "params"),
  validatorHandler(updateUserSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userService.updateUser(id, req.body);
      res.status(200).json(user);
    } catch (err: any) {
      next(err);
    }
  },
);

userRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getUserSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userService.deleteUser(id);
      res.status(200).json(user);
    } catch (err: any) {
      next(err);
    }
  },
);

export default userRouter;
