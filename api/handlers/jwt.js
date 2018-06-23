import * as tokenServices from "../services/tokens";
import { maria } from "../connectors";

export default () => async (ctx, next) => {

    const { authorization } = ctx.headers;

    if (authorization && authorization.match(/^Bearer\s/)){
        
        const tokens = authorization.replace(/^Bearer\s/, "").split(" ");
        const accessToken = tokens[0];
        const refreshToken = tokens[1];

        const getAccessPayload = await tokenServices.getPayload(accessToken, "access");

        // note: getAccessPayload.err.JsonWebTokenError and getAccessPayload.err.TokenExpiredError
        if (getAccessPayload.err !== null){
            const getRefreshPayload = await tokenServices.getPayload(refreshToken, "refresh");
            if (getRefreshPayload.err === null){
                const correctRefreshToken = await maria.query("select refresh_token from users where id_user = ?", [getRefreshPayload.data.id_user]).then(rows => rows);
                if (refreshToken == correctRefreshToken[0].refresh_token){
                    const new_tokens = await tokenServices.generateTokens(getRefreshPayload.data.id_user);
                    ctx.state.user = getRefreshPayload.data.id_user;
                    ctx.state.new_tokens = {
                        accessToken: new_tokens.accessToken,
                        refreshToken: new_tokens.refreshToken
                    };
                } else{
                    // logout
                    console.log("1 logout");
                }
            } else{
                // logout
                console.log("2 logout");
            }
        } else{
            ctx.state.user = getAccessPayload.data.id_user;
        }
    }
    await next();
};