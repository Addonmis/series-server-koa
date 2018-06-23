import helmet from "koa-helmet";
import bodyParser from "koa-bodyparser";
import cors from "koa2-cors";
import jwt from "./jwt";
import error from "./error";

export default (app) => {
    app.use(cors());
    app.use(bodyParser());
    app.use(helmet());
    app.use(error());
    app.use(jwt());
};