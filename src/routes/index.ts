import { Application } from "express-serve-static-core"
import { Response, Request } from "express";
import postRouter from "./post.route"
import express from 'express';
import userRouter from "./user.route";
import categoryRouter from "./category.route";
import commentRouter from "./comment.route";
import swaggerUi from 'swagger-ui-express';
import authRoute from "./auth.route";
import messageRouter from "./message.route";

function routerApi(app: Application) {
  const router = express.Router()
  app.use("/api/v1", router)
  router.use("/posts", postRouter)
  router.use("/users", userRouter)
  router.use("/categories", categoryRouter)
  router.use("/comments", commentRouter)
  router.use("/auth", authRoute)
  router.use("/chat", messageRouter)

  router.use('/api-docs', swaggerUi.serve, async (req: Request, res: Response) => {
    return res.send(swaggerUi.generateHTML(await import("./../config/swagger.json")))
})

  router.get("/", (req, res) => {
    res.send("Hola api!")
  })
}

export default routerApi
