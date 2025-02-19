import { Context } from 'telegraf';
import { BotService } from './bot.service';
import { Action, Ctx, Hears, On, Start, Update } from 'nestjs-telegraf';

@Update()
export class BotUpdate {
  constructor(private readonly botService: BotService) {}

  @Start()
  async onStart(@Ctx() ctx: Context) {
    await this.botService.onStart(ctx);
  }

  @Action(/^[a-z]_\d+$/)
  async onGender(@Ctx() ctx: Context) {
    await this.botService.onGender(ctx);
  }

  @On('contact')
  async onContact(@Ctx() ctx: Context) {
    await this.botService.onContact(ctx);
  }
  
  @On('text')
  async onText(@Ctx() ctx: Context) {
    await this.botService.onText(ctx);
  }

}
