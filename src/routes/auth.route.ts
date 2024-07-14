import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import validatorHandler from "../middlewares/validator.handler";
import UserService from "../services/user.service";
import { IUser } from "../types";
import Boom from "@hapi/boom";
import AuthService from "../services/auth.service";
import { changePasswordSchema, loginSchema, recoverySchema, registerSchema } from '../schemas/auth.schema';

const authRoute = express.Router();

const authService = new AuthService();
const userService = new UserService();

authRoute.post(
  "/login",
  validatorHandler(loginSchema, "body"),
  passport.authenticate("local", { session: false }),
  (req, res, next) => {
    try {
      if (!req.user) {
        return next(Boom.unauthorized("Invalid credentials"));
      }
      const user = req.user as IUser;
      res.json(authService.signToken(user));
    } catch (error) {
      next(error);
    }
  },
);

authRoute.post(
  '/register',
  validatorHandler(registerSchema, 'body'),
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

authRoute.post(
  '/recovery',
  validatorHandler(recoverySchema, 'body'), 
  async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    const rta = await authService.sendRecoveryEmail(email);
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

authRoute.post(
  '/change-password',
  validatorHandler(changePasswordSchema, 'body'), 
  async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, newPassword } = req.body;
    const rta = await authService.changePassword(token, newPassword);
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

export default authRoute;
