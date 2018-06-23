import * as profileServices from "../services/index";

export async function getProfile(ctx){

    const isAuthorized = profileServices.isAuthorized(ctx.request.body);

    if (isAuthorized){
        const tokens = generateTokens();
        ctx.status = 200;
        ctx.body = tokens;
    } else{
        ctx.status = 401;
    }
};