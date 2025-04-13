export class CreateProductDto {
  title_uzb: string;
  title_rus: string;
  description_uzb: string;
  description_rus: string;
  clientId: string;
  location: bigint;
  radius: bigint;
  reward_per_participant: string;
  total_budget: bigint;
  start_age: bigint;
  finish_age: bigint;
  start_date: Date;
  finish_date: Date;
  target_lang: string;
  status: string;
}
