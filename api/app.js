import Koa from "koa";
const app = new Koa();

import handlers from "./handlers";
handlers(app);

import connectors from "./connectors";
connectors();

import modules from "./modules";
app.use(modules);

app.use(async ctx => {
    ctx.body = "default context";
});

export default app;