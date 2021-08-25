require("dotenv").config();
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { createConnection } from "typeorm";
import chalk from "chalk";
import cookieParser from "cookie-parser";

import * as middlewares from "./middleware";
import api from "./routes";

const main = async () => {
    const conn = await createConnection();
    console.log(chalk`{bold.yellow running migrations}`);
    await conn.runMigrations();
    console.log(chalk`{bold.green migrations finished!}`);

    const app = express();

    app.use(express.json());
    app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
    app.use(cookieParser());

    app.use(morgan("dev"));

    const port = process.env.PORT || 4001;
    app.listen(port, () => {
        console.log(`app running on http://localhost:${port}`);
    });

    app.use("/", api);

    app.use(middlewares.ErrorHandler);
    app.use(middlewares.NotFound);
};

main();
