import { maria } from "../../../connectors";

export async function getData(ctx){
    let user;
    try{
        user = await maria.query(`
            select 
                date_of_registration, 
                gender, 
                date_of_borth 
            from users 
            where id_user = ?;
        `, [Number(ctx.state.user)]);
    } catch(e){
        ctx.throw(500, {
            message: "error getting data"
        });
    }
};