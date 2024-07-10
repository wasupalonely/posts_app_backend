import express from "express";
import UserService from "../services/user.service";
import {
  createUserSchema,
  getUserSchema,
  toggleFollowSchema,
  updateUserSchema,
} from "../schemas/user.schema";
import validatorHandler from "../middlewares/validator.handler";

const userRouter = express.Router();

const userService = new UserService();

userRouter.get("/", async (req, res) => {
  const users = await userService.getAllUsers();
  res.json(users);
});

userRouter.get(
  "/:id",
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

userRouter.post(
  "/:id/toggle-follow",
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
