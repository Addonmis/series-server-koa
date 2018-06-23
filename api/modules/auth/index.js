import Router from "koa-router";

import * as authController from "./controllers/auth";

const router = new Router({prefix: "/auth"});

router
    .post("/signIn", authController.signIn)
    .post("/signUp", authController.signUp)
    .post("/getOnTokens", authController.getOnTokens)

export default router.routes();