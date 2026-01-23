import { config } from '../config/config.js';
import SupabaseClientSingleton from './supabase.cnx.js';

export default class DatabaseConnectionFactory {
  static async getClient() {
    const dbType = config.DATABASE ?? 'supabase';

    switch (dbType?.toLowerCase()) {
      case 'supabase':
        console.log('Connecting to Supabase database...');
        return SupabaseClientSingleton.connect();

      default:
        throw new Error(`Database type "${dbType}" is not supported.`);
    }
  }
}
