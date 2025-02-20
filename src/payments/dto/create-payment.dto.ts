export class CreatePaymentDto {
  survey_id: number;
  participant_id: number;
  amount: number;
  payment_status: boolean;
  payment_date: Date;
}