export default class SupabaseAccountsRepository {
  constructor(dbClient) {
    this.db = dbClient;
  }

  async findById({ userId, accountId }) {
    const { data, error } = await this.db
      .from('accounts')
      .select('id, user_id, currency, is_internal, type, status, name')
      .eq('id', accountId)
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;
    return data ?? null;
  }

  async ensureClearingAccounts({ userId }) {
    const { error } = await this.db.rpc('ensure_clearing_accounts', {
      p_user_id: userId,
    });

    if (error) throw error;
  }

  async findExpenseClearingByCurrency({ userId, currency }) {
    const name = `ExpenseClearing_${currency}`;

    const { data, error } = await this.db
      .from('accounts')
      .select('id, user_id, currency, is_internal, type, status, name')
      .eq('user_id', userId)
      .eq('is_internal', true)
      .eq('type', 'clearing')
      .eq('currency', currency)
      .eq('name', name)
      .maybeSingle();

    if (error) throw error;
    return data ?? null;
  }
}
