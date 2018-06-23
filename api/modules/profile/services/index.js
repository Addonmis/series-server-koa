import Joi from "joi";

import schema from "../schema";
import tokenServices from "../../../services/tokens";

async function isAuthorized(req){
    const { error, value } = Joi.validate(req, schema);

    if (err) return false;

    // запросить из бд
    const correctPassword = "demoPass";

    return value.password == correctPassword;
}

// async function hasValidRefreshToken(token){
//     const { username } = await tokenServices.getPayload(refreshToken);
//     // получение токена из бд
//     const correctRefreshToken = "";

//     return correctRefreshToken == token;
// }

export default {
    isAuthorized
}