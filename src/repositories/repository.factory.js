import SupabaseAccountsRepository from './supabase/supabase.accounts.repository';
import SupabaseCategoriesRepository from './supabase/supabase.categories.repository';
import SupabaseMerchantsRepository from './supabase/supabase.merchants.repository';
import SupabaseTransactionsRepository from './supabase/supabase.transactions.repository';

export default class RepositoryFactory {
  static createAll(dbType, dbClient) {
    switch (dbType?.toLowerCase()) {
      case 'supabase':
        return {
          accounts: new SupabaseAccountsRepository(dbClient),
          categories: new SupabaseCategoriesRepository(dbClient),
          merchants: new SupabaseMerchantsRepository(dbClient),
          transactions: new SupabaseTransactionsRepository(dbClient),
        };

      default:
        throw new Error(`DB not supported: ${dbType}`);
    }
  }
}
