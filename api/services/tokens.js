import jwt from "jsonwebtoken";

import { SECRET_ACCESS_TOKEN, SECRET_REFRESH_TOKEN } from "../../config";
import { maria } from "../connectors";

export async function generateTokens(id_user){
    const accessToken = await jwt.sign({ id_user }, SECRET_ACCESS_TOKEN, { expiresIn: "10m" });
    const refreshToken = await jwt.sign({ id_user }, SECRET_REFRESH_TOKEN, { expiresIn: "30d" });

    const tokens = {
        accessToken,
        refreshToken,
        expiresIn: jwt.decode(accessToken).exp
    };

    await maria.query("update users set access_token = ?, refresh_token = ? where id_user = ?;", [accessToken, refreshToken, id_user]);

    return tokens;
};

export async function getPayload(token, type){
    try{
        let data;
        if (type == "access") data = await jwt.verify(token, SECRET_ACCESS_TOKEN);
        if (type == "refresh") data = await jwt.verify(token, SECRET_REFRESH_TOKEN);
        return { data: data, err: null };
    } catch(e){
        return { data: null, err: e };
    }
};