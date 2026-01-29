import { config } from './src/config/config.js';
//import DatabaseFactory from './src/databases/DatabaseFactory.js';
import server from './src/server.js';
import Database from './src/databases/supabase.cnx.js';
import DatabaseConnectionFactory from './src/databases/DatabaseConnectionFactory.js';

const runServer = async () => {
  try {
    DatabaseConnectionFactory.getClient();
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
