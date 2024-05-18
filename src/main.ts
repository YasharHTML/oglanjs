import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";

import { PrismaClient } from "@prisma/client";

const app = express();

const prismaClient = new PrismaClient();

app.use(express.json());
app.use(morgan("common"));

app.get("/", (req, res, next) => {
    prismaClient.user
        .findMany()
        .then((users) => {
            res.json(users);
        })
        .catch((error) => {
            next(error);
        });
});

app.post("/", (req, res, next) => {
    const { username } = req.body;
    prismaClient.user
        .create({ data: { username } })
        .then((user) => {
            res.json(user);
        })
        .catch((error) => {
            next(error);
        });
});

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(err)
    res.status(500).json(err);
});

app.listen(3000, () => {
    console.log("Started");
});
