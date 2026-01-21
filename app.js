import { config } from './src/config/config.js';
//import DatabaseFactory from './src/databases/DatabaseFactory.js';
import server from './src/server.js';
import Database from './src/databases/supabase.cnx.js';

const runServer = async () => {
  try {
    /* if (config.DATABASE == "mongoose") {
            DatabaseFactory.getConnection()
        } */
    /*  DatabaseFactory.getConnection(config.DATABASE); */
    console.log('aaaaa');
    console.log(
      `${config.SUPABASE_URL} ${config.SUPABASE_API_KEY} ${config.SERVER_HOST} ${config.SERVER_PORT}`,
    );
    Database.connect();
    console.log('bbbbb');
    server.listen(
      config.SERVER_PORT,
      config.SERVER_HOST,
      console.log(`
                Server is running at: http://${config.SERVER_HOST}:${config.SERVER_PORT}
            `),
    );
  } catch (error) {
    console.log(`Error en el server`, error.message);
  }
};

runServer();
