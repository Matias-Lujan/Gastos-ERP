export default class TransactionsService {
  constructor({ accountsRepo, transactionsRepo }) {
    this.accountsRepo = accountsRepo;
    this.transactionsRepo = transactionsRepo;
  }

  async createExpense({ userId, payload, idempotencyKey = null }) {
    const {
      account_id,
      amount,
      occurred_at,
      description,
      notes,
      source,
      category_id,
      merchant_id,
      memo,
    } = payload ?? {};

    if (!account_id) throw new Error('account_id es requerido');

    const nAmount = Number(amount);
    if (!Number.isFinite(nAmount) || nAmount <= 0) {
      throw new Error('amount debe ser un número > 0');
    }

    if (!occurred_at) throw new Error('occurred_at es requerido');
    const occurredAtDate = new Date(occurred_at);
    if (Number.isNaN(occurredAtDate.getTime())) {
      throw new Error('occurred_at inválido (ISO-8601 esperado)');
    }

    const origin = await this.accountsRepo.findById({ userId, accountId: account_id });
    if (!origin) throw new Error('Cuenta no encontrada');

    if (origin.is_internal) {
      throw new Error('No se permite usar cuentas internas como cuenta de origen');
    }

    const currency = origin.currency;

    await this.accountsRepo.ensureClearingAccounts({ userId });

    const expenseClearing = await this.accountsRepo.findExpenseClearingByCurrency({
      userId,
      currency,
    });

    if (!expenseClearing) {
      throw new Error(`No existe ExpenseClearing_${currency}`);
    }

    const txHeader = {
      type: 'expense',
      currency,
      occurred_at: occurredAtDate.toISOString(),
      description: description ?? null,
      notes: notes ?? null,
      source: source ?? 'manual',
      reversed_transaction_id: null,
    };

    const entries = [
      {
        account_id: origin.id,
        amount: -nAmount,
        category_id: null,
        merchant_id: null,
        memo: memo ?? null,
      },
      {
        account_id: expenseClearing.id,
        amount: +nAmount,
        category_id: category_id ?? null,
        merchant_id: merchant_id ?? null,
        memo: memo ?? null,
      },
    ];

    const sum = entries[0].amount + entries[1].amount;
    if (sum !== 0) throw new Error('Invariant violation: Σ entries.amount != 0');

    const { id } = await this.transactionsRepo.createWithEntries({
      userId,
      txHeader,
      entries,
      idempotencyKey,
    });

    const created = await this.transactionsRepo.findById({ userId, transactionId: id });
    if (!created) throw new Error('Transacción creada pero no recuperable (inconsistencia)');

    return created;
  }
}
