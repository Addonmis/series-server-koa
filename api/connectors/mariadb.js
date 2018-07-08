import dotenv from "dotenv";
import mariadb from "mariasql-promise";

dotenv.config();

import { ENV } from "../../config";

let options = {};

if (ENV == "development"){
    options = {
        host: process.env.mariaDB_host,
        user: process.env.mariaDB_user,
        password: process.env.mariaDB_password,
        db: process.env.mariaDB_db,
        charset: "utf8"
    };
}

const maria = new mariadb();

function maria_connector(){
    maria.connect(options).then(() => {
        console.log("connected to maria");
    });
}

export { maria_connector, maria };