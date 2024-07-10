import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import env from "../config/config";
import validatorHandler from "../middlewares/validator.handler";
import { registerUserSchema } from "../schemas/user.schema";
import UserService from "../services/user.service";
import { IUser } from "../types";
import Boom from "@hapi/boom";

const authRoute = express.Router();

const userService = new UserService();

authRoute.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res, next) => {
    try {
      if (!req.user) {
        return next(Boom.unauthorized("Invalid credentials"));
      }
      const user = req.user as IUser;
      const payload = {
        sub: user._id,
        username: user.username,
        id: user._id,
        // role: user.role,
      };
      const token = jwt.sign(payload, env.JWT_SECRET);
      res.json({
        user,
        token,
      });
    } catch (error) {
      next(error);
    }
  },
);

authRoute.post(
  '/register',
  validatorHandler(registerUserSchema, 'body'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password, email } = req.body;
      const user = await userService.createUser({ username, email, password, role: 'user' });

      const { password: _, ...userWithoutPassword } = user;

      res.status(201).json(userWithoutPassword);
    } catch (error) {
      next(error);
    }
  }
);

export default authRoute;
