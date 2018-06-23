import { maria_connector, maria } from "./mariadb";
import server from "../server";

async function connectors(){
    try{
        await maria_connector();
    } catch(e){
        server.close();
        console.log("close", e);
    }
};

export { maria };

export default connectors;