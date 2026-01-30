export default class TransactionsController {
  constructor({ transactionsService }) {
    this.transactionsService = transactionsService;
  }

  // POST /transactions/expense
  createExpense = async (req, res, next) => {
    try {
      // TEMPORAL hasta que implementes auth:
      const userId = (req.header('x-user-id') ?? '').trim();
      if (!userId) throw new Error('Missing x-user-id header (temporal)');

      const created = await this.transactionsService.createExpense({
        userId,
        payload: req.body,
      });

      return res.status(201).json(created);
    } catch (err) {
      return next(err);
    }
  };
}
