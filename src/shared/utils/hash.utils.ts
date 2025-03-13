import * as bcrypt from 'bcrypt';
const salt = 5;

export interface ICompareProps {
  value: string;
  hash: string;
}

export class HashUtils {
  public static async hash(value: string): Promise<string> {
    return await bcrypt.hash(value, salt);
  }

  public static async compare({
    value,
    hash,
  }: ICompareProps): Promise<boolean> {
    return await bcrypt.compare(value, hash);
  }
}
