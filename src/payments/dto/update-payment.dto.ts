import { PartialType } from '@nestjs/swagger';
import { CreatePaymentDto } from './create-payment.dto';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
    survey_id?: number | undefined;
    participant_id?: number | undefined;
    amount?: number | undefined;
    payment_status?: boolean | undefined;
    payment_date?: Date | undefined;
}