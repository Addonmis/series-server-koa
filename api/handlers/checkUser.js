export default () => async (ctx, next) => {
    console.log("checkUser");
    if (!ctx.state.user){
        ctx.throw(403, { message: "forbidden" });
    }
    await next();
};