export default class SupabaseTransactionsRepository {
  constructor(dbClient) {
    this.db = dbClient;
  }
}
