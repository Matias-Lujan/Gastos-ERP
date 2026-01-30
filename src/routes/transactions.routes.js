import express from 'express';

export default function buildTransactionsRouter({ transactionsController }) {
  const router = express.Router();

  router.post('/expense', transactionsController.createExpense);

  return router;
}
