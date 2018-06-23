import dotenv from "dotenv";

dotenv.config();

const ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 8080;
const SECRET_ACCESS_TOKEN = process.env.SECRET_ACCESS_TOKEN;
const SECRET_REFRESH_TOKEN = process.env.SECRET_REFRESH_TOKEN;

export { ENV, PORT, SECRET_ACCESS_TOKEN, SECRET_REFRESH_TOKEN };