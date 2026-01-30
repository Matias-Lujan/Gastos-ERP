import { config } from './src/config/config.js';
import createServer from './src/server.js';
import DatabaseConnectionFactory from './src/databases/DatabaseConnectionFactory.js';

const runServer = async () => {
  try {
    // asegura cliente listo
    DatabaseConnectionFactory.getClient();

    const server = await createServer();

    server.listen(config.SERVER_PORT, config.SERVER_HOST, () => {
      console.log(`Server is running at: http://${config.SERVER_HOST}:${config.SERVER_PORT}`);
    });
  } catch (error) {
    console.log('Error en el server', error.message);
  }
};

runServer();
