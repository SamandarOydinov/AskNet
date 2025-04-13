import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { OwnerModule } from './owner/owner.module';
import { CatModule } from './cat/cat.module';
import { BOT_NAME } from './app.constants';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotModule } from './bot/bot.module';
import { ClientModule } from './client/client.module';
import { SurveysModule } from './surveys/surveys.module';
import { StatisticsModule } from './statistics/statistics.module';
import { QuestionsModule } from './questions/questions.module';
import { ResponsesModule } from './responses/responses.module';
import { AnswerOptionsModule } from './answer_options/answer_options.module';
import { SurveyStatusModule } from './survey_status/survey_status.module';
import { PaymentsModule } from './payments/payments.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    TelegrafModule.forRoot({
      botName: BOT_NAME,
      token: process.env.BOT_TOKEN!,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    AdminModule,
    AuthModule,
    OwnerModule,
    CatModule,
    BotModule,
    ClientModule,
    SurveysModule,
    StatisticsModule,
    QuestionsModule,
    ResponsesModule,
    AnswerOptionsModule,
    SurveyStatusModule,
    PaymentsModule,
    ProductsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
