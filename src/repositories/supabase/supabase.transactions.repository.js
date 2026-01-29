export default class SupabaseTransactionsRepository {
  constructor(dbClient) {
    this.db = dbClient;
  }

  async createWithEntries({ userId, txHeader, entries, idempotencyKey = null }) {
    // destructuring de params
    const p_tx = {
      ...txHeader,
      user_id: userId,
      created_by: userId,
      idempotency_key: idempotencyKey,
    };

    const { data, error } = await this.db.rpc('rpc_create_transaction_with_entries', {
      p_tx,
      p_entries: entries,
    });

    if (error) throw error;

    return { id: data };
  }

  async findById({ userId, transactionId }) {
    const { data, error } = await this.db
      .from('transactions')
      .select(`
        id,
        user_id,
        type,
        currency,
        occurred_at,
        description,
        notes,
        source,
        reversed_transaction_id,
        created_at,
        entries (
          id,
          account_id,
          amount,
          category_id,
          merchant_id,
          memo,
          created_at
        )
      `)
      .eq('id', transactionId)
      .eq('user_id', userId)
      .order('created_at', { foreignTable: 'entries', ascending: true })
      .maybeSingle();

    if (error) throw error;

    return data ?? null;
  }

  // repositories/supabase/SupabaseTransactionsRepository.js
  async list({ userId, filters = {}, pagination = {} }) {
    const limit = pagination.limit ?? 50;
    const offset = pagination.offset ?? 0;

    const {
      from = null,
      to = null,
      type = null,
      currency = null,
      q = null,
      accountId = null,
      categoryId = null,
      merchantId = null,
    } = filters;

    const { data, error } = await this.db.rpc('rpc_list_transactions', {
      p_user_id: userId,
      p_from: from,
      p_to: to,
      p_type: type,
      p_currency: currency,
      p_q: q,
      p_account_id: accountId,
      p_category_id: categoryId,
      p_merchant_id: merchantId,
      p_limit: limit,
      p_offset: offset,
    });

    if (error) throw error;

    const rows = data ?? [];
    const count = rows.length ? Number(rows[0].total_count) : 0;

    // sacamos total_count de cada fila para no ensuciar el DTO
    const cleaned = rows.map(({ total_count, ...rest }) => rest);

    return {
      data: cleaned,
      meta: { limit, offset, count },
    };
  }
}
