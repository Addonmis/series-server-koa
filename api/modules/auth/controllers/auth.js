import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import * as tokenServices from "../../../services/tokens";
import { maria } from "../../../connectors";

export async function signIn(ctx){

    const { username, password } = ctx.request.body;

    // валидация
    //

    const user = await maria.query(`select id_user, username, password, id_role, access_token, refresh_token 
                                    from users where username = ?;`, [username]).then(rows => rows);
    
    if (!user.length){
        ctx.throw(400, {
            message: "user not found"
        });
    }

    const result = await bcrypt.compare(password, user[0].password);
    
    if (result == false){
        ctx.throw(400, {
            message: "wrong password"
        });
    }

    const tokens = await tokenServices.generateTokens(user[0].id_user);

    ctx.body = { tokens: tokens, id_role: user[0].id_role };
};

export async function signUp(ctx){

    const { username, password } = ctx.request.body;

    // валидация
    //

    try{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        await maria.query("insert into users(username, password, id_role, access_token, refresh_token) values(?, ?, 2, ?, ?)", [username, hash, "", ""]);
        const user = await maria.query("select id_user from users order by id_user desc limit 1;", rows => rows);
        
        const tokens = await tokenServices.generateTokens(user[0].id_user);
    } catch(e){
        ctx.throw(400, {
            message: e.toString()
        });
    }

    ctx.body = { tokens: tokens, id_role: 2 };
};

export async function getOnTokens(ctx){
    const user = await maria.query("select username, id_role from users where id_user = ?;", [Number(ctx.state.user)]).then((rows) => rows);
    let tokens = ctx.state.new_tokens;
    ctx.body = {id_role: user[0].id_role, tokens: tokens};
};