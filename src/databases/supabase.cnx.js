import { createClient } from '@supabase/supabase-js';
import { config } from '../config/config.js';

class Database {
  static connect() {
    this.supabase = createClient(config.SUPABASE_URL, config.SUPABASE_API_KEY);

    return this.supabase;
  }
}

export default Database;
