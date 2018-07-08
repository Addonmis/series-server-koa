import Router from "koa-router";

import * as profileControllers from "./controllers";

import checkUser from "../../handlers/checkUser";

const router = new Router({prefix: "/profile"});

router
    .post("/", checkUser(), profileControllers.profile.getData);

export default router.routes();