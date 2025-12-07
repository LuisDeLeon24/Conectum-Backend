import express from "express";
import cors from 'cors';
import helmet from "helmet";
import morgan from "morgan";

import limiter from "../src/middlewares/request-Limit.js";
import dbConnection from "./postgres.js";
import testRoutes from "../src/test/test.routes.js";

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(limiter)
}

const routes = (app) => {
      app.use('/Conectum/test', testRoutes); 
}

export const initServer = async () => {
    const app = express();
    const port = process.env.PORT || 3000;
    try {
        middlewares(app);
        routes(app);
        app.listen(port);
        await dbConnection();
        console.log(`server running on port ${port}`)
    } catch (error) {
        console.log(`server init failed: ${error}`);
    }
}