import express, { Application, Request, Response } from "express"
import cors from "cors"
import http from "http";
import morgan from "morgan"

import env from "./config/config";
import connectDb from "./config/db";
import routerApi from "./routes";
import { logErrors, errorHanlder, boomErrorHanlder } from "./middlewares/error.handler";

const app = express()

// TODO ---> LIMIT ACCESS
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
}))

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
});
// Initialaze passport
import "./utils/auth"
import { initChat } from "./chat";

const server = http.createServer(app);

initChat(server);

app.use(express.json())
app.use(morgan('dev'))

connectDb()

routerApi(app)

app.use(logErrors)
app.use(boomErrorHanlder)
app.use(errorHanlder)

server.listen(env.PORT, () => {
  console.log(`Servidor socket corriendo en el puerto ${env.PORT}`)
})

// app.listen(env.PORT, () => {
//   console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)
// })

