export default () => async (ctx, next) => {
    try{
        await next();
    } catch({ status = 500, message = "error"}){
        ctx.status = status;
        ctx.body = { status, message };
    }
};