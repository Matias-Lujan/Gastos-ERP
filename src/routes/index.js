import express from 'express';
import buildTransactionsRouter from './transactions.routes.js';

export default function buildRoutes({ transactionsController }) {
  const router = express.Router();

  router.use('/transactions', buildTransactionsRouter({ transactionsController }));

  return router;
}
