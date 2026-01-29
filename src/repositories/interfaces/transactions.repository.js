export default class TransactionsRepository {
  /**
   * Crea una transacción de ledger completa (transaction + entries) de forma atómica.
   * @param {Object} params
   * @param {string} params.userId
   * @param {Object} params.txHeader
   * @param {'expense'|'income'|'transfer'|'adjustment'|'reversal'} params.txHeader.type
   * @param {'ARS'|'USD'} params.txHeader.currency
   * @param {string} params.txHeader.occurred_at
   * @param {'manual'|'import'|'api'} params.txHeader.source
   * @param {string|null} [params.txHeader.description]
   * @param {string|null} [params.txHeader.notes]
   * @param {string|null} [params.txHeader.reversed_transaction_id]
   * @param {Array<Object>} params.entries
   * @param {string} params.entries[].account_id
   * @param {number} params.entries[].amount
   * @param {string|null} [params.entries[].category_id]
   * @param {string|null} [params.entries[].merchant_id]
   * @param {string|null} [params.entries[].memo]
   * @param {string|null} [params.idempotencyKey]
   * @returns {Promise<{id: string}>}
   */
  async createWithEntries(params) {
    throw new Error('TransactionsRepository.createWithEntries not implemented');
  }

  /**
   * Obtiene una transacción con sus entries (detalle).
   * @param {Object} params
   * @param {string} params.userId
   * @param {string} params.transactionId
   * @returns {Promise<Object|null>} // futuro con DTO
   */
  async findById(params) {
    throw new Error('TransactionsRepository.findById not implemented');
  }

  /**
   * Lista transacciones (summary, sin entries) con filtros y paginación offset-based.
   * @param {Object} params
   * @param {string} params.userId
   * @param {Object} [params.filters]
   * @param {string} [params.filters.from]        // ISO date/time
   * @param {string} [params.filters.to]          // ISO date/time
   * @param {'expense'|'income'|'transfer'|'adjustment'|'reversal'} [params.filters.type]
   * @param {'ARS'|'USD'} [params.filters.currency]
   * @param {string} [params.filters.q]           // search in description/notes
   * @param {Object} [params.pagination]
   * @param {number} [params.pagination.limit]
   * @param {number} [params.pagination.offset]
   * @returns {Promise<{ data: Array<Object>, meta: { limit: number, offset: number, count: number } }>}
   */
  async list(params) {
    throw new Error('TransactionsRepository.list not implemented');
  }
}
