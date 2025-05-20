import { Account } from 'src/account/account.schema';

export interface TokenPayload {
  id: Account;
  name: string;
  role: string;
}
