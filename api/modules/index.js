import Router from "koa-router";
import checkUser from "../handlers/checkUser";

import auth from "./auth";
import profile from "./profile";

const router = new Router({prefix: "/api"});

router.use(auth);
router.use(profile);

router.get("/test", checkUser(), (ctx) => {
    ctx.body = {text: "test", tokens: ctx.state.new_tokens, response: {}};
});

export default router.routes();