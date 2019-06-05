import express from "express";
import morgan from "morgan";
import "reflect-metadata";
import ExpressSession from "express-session";


import {createConnection} from "typeorm";
import { User } from "./models";


const app = express();
const port = 80;
const connection = createConnection({
    type: "sqlite",
    database: "./app.db",
    entities: [
      User,
    ],
    synchronize: true,
}).then(connection => {
    console.log("success init")
    // here you can start to work with your entities
}).catch(error => console.log(error));;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded());

app.use(ExpressSession({
    secret: 'IOT_IOT',
    resave: false,
    saveUninitialized: true
}));

import arudinoRouter from "./routes/arduino";
import userRouter from "./routes/user";


app.use("/api/arduino", arudinoRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
    res.send("Hello World!");
});


app.listen(port, () => {
    console.log("server start");
});


