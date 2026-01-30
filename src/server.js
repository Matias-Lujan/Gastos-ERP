import express from 'express';
import morgan from 'morgan';

import DatabaseConnectionFactory from './databases/DatabaseConnectionFactory.js';
import RepositoryFactory from './repositories/repository.factory.js';

import TransactionsService from './services/transactions.service.js';
import TransactionsController from './controllers/transactions.controller.js';
import buildRoutes from './routes/index.js';

export default async function createServer() {
  const server = express();
  const morganFormat = morgan(':method :url :status :res[content-length] - :response-time ms');

  server.use(express.json());
  server.use(morganFormat);

  // health
  server.get('/', (req, res) => {
    res.json({ message: 'Bienvenido a la API de Gastos ERP', status: 'Ok' });
  });

  // --- DEPENDENCIES (DI simple) ---
  const dbClient = await DatabaseConnectionFactory.getClient();
  const repos = RepositoryFactory.createAll('supabase', dbClient);

  const transactionsService = new TransactionsService({
    accountsRepo: repos.accounts,
    transactionsRepo: repos.transactions,
  });

  const transactionsController = new TransactionsController({ transactionsService });

  // --- ROUTES ---
  server.use(buildRoutes({ transactionsController }));

  // --- ERROR HANDLER mínimo ---
  server.use((err, req, res, next) => {
    console.error(err);
    return res.status(500).json({
      error: 'INTERNAL_ERROR',
      message: err.message ?? 'Unexpected error',
    });
  });

  return server;
}
