import Boom from "@hapi/boom";
import UserService from "./user.service";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import env from "../config/config";
import { IUser } from "../types";
import nodemailer from "nodemailer";

const userService = new UserService();
class AuthService {
  async getUser(identifier: string, password: string) {
    const user = await userService.getUserByIdentifier(identifier);

    if (!user) {
      throw Boom.unauthorized("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw Boom.unauthorized("Invalid credentials");
    }

    const { password: _, ...userWithoutPassword } = user.toObject();

    return userWithoutPassword;
  }

  signToken(user: IUser) {
    const payload = {
      sub: user._id,
      username: user.username,
      id: user._id,
      // role: user.role,
    };
    const token = jwt.sign(payload, env.JWT_SECRET);
    return {
      user,
      token,
    };
  }

  async sendRecoveryEmail(email: string) {
    const user = await userService.getUserByIdentifier(email);

    if (!user) {
      throw Boom.unauthorized("Invalid credentials");
    }

    const payload = {
      sub: user._id,
      username: user.username,
    };

    const token = jwt.sign(payload, env.RECOVER_PASSWORD_SECRET, { expiresIn: "15m" });

    const url = `http://localhost:5173/api/v1/auth/recovery/?token=${token}`;
    await userService.updateUser(user._id, { recoveryToken: token });

    const mail = {
      from: env.EMAIL_MAILER,
      to: email,
      subject: "PostsApp - Recupera tu contraseña 🗝️",
      html: `
        <b>Ingresa a este link 👇👇 para recuperar tu cuenta 🗝️</b>
        <br>
        <p>${url}</p>
        <a href="${url}" target="_blank">Recuperar cuenta</a>
      `,
    };

    const rta = await this.sendMail(mail);

    return rta;
  }

  async changePassword(token: string, newPassword: string) {
    try {
      if (!env.RECOVER_PASSWORD_SECRET) {
        throw new Error('RECOVER_PASSWORD_SECRET is not defined');
      }
  
      const payload = jwt.verify(token, env.RECOVER_PASSWORD_SECRET) as JwtPayload;
      if (typeof payload !== 'object' || !payload.sub) {
        throw Boom.unauthorized('Invalid token payload');
      }
  
      const user = await userService.getUserById(payload.sub);
      if (user?.recoveryToken !== token) {
        throw Boom.unauthorized('Invalid token');
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await userService.updateUser(user?._id, { password: hashedPassword, recoveryToken: null });
      return { message: 'Password changed successfully' };
    } catch (error) {
      throw Boom.unauthorized("Error changing password");
    }
  }

  async sendMail(infoMail: any) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: env.EMAIL_MAILER,
        pass: env.PASSWORD_MAILER,
      },
    });

    await transporter.sendMail(infoMail);

    return { message: "Email sent" };
  }
}

export default AuthService;
