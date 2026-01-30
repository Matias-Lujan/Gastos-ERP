import { createClient } from '@supabase/supabase-js';
import { config } from '../config/config.js';

class SupabaseClientSingleton {
  static #instance = null;

  static connect() {
    if (!this.#instance) {
      //this.#instance = createClient(config.SUPABASE_URL, config.SUPABASE_API_KEY);
      this.#instance = createClient(config.SUPABASE_URL, config.SUPABASE_SERVICE_ROLE_KEY);

      console.log('Supabase connected successfully.');
    }

    return this.#instance;
  }
}

export default SupabaseClientSingleton;
