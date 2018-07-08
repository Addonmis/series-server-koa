import Router from "koa-router";

import * as authControllers from "./controllers";

const router = new Router({prefix: "/auth"});

router
    .post("/signIn", authControllers.auth.signIn)
    .post("/signUp", authControllers.auth.signUp)
    .post("/getOnTokens", authControllers.auth.getOnTokens)

export default router.routes();