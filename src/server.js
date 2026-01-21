import express from 'express';
import morgan from 'morgan';

const server = express();
const morganFormat = morgan(':method :url :status :res[content-length] - :response-time ms');

server.use(express.json());
server.use(morganFormat);

server.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido a la API de Gastos ERP',
    status: 'Ok',
  });
});


export default server;
