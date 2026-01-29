// src/repositories/interfaces/accounts.repository.js
export default class AccountsRepository {
  /**
   * Devuelve una cuenta del usuario o null
   */
  async findById({ userId, accountId }) {
    throw new Error('Not implemented');
  }

  /**
   * Garantiza que existan las clearing accounts internas del usuario
   */
  async ensureClearingAccounts({ userId }) {
    throw new Error('Not implemented');
  }

  /**
   * Devuelve la ExpenseClearing para una moneda
   */
  async findExpenseClearingByCurrency({ userId, currency }) {
    throw new Error('Not implemented');
  }
}
