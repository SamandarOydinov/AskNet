import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Bot } from "./schemas/bot.schema";
import { InjectBot } from "nestjs-telegraf";
import { BOT_NAME } from "src/app.constants";
import { Context, Markup, Telegraf } from "telegraf";
import { Model } from "mongoose";

@Injectable()
export class BotService {
  constructor(
    @InjectModel(Bot.name) private readonly botModel: Model<Bot>,
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>,
  ) {}

  async onStart(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findOne({ user_id: String(user_id) });
      console.log(user_id);
      console.log(user);
      if (!user) {
        await this.botModel.create({
          user_id,
          user_name: ctx.from?.username,
          first_name: ctx.from?.first_name,
          last_name: ctx.from?.last_name,
          user_lang: ctx.from?.language_code,
          status: false,
          last_state: 'phone_number',
          balance: 0,
        });
        await ctx.reply(
          'Xush kelibsiz, Iltimos telefon raqamingizni yuboring',
          {
            ...Markup.keyboard([
              Markup.button.contactRequest('Telefon raqamni yuborish'),
            ]).resize(),
          },
        );
      } else if (user && !user.status) {
        await ctx.reply(
          `Iltimos telefon raqamingizni yuborib, akkauntingizni faollashtiring`,
          {
            ...Markup.keyboard([
              Markup.button.contactRequest('Telefon raqamni yuborish'),
            ]).resize(),
          },
        );
      } else if (user && user.last_state == 'finish' && user.status) {
        await ctx.reply('Xush kelibsiz', {
          ...Markup.keyboard([
            ['👤 Profil', '💰 Balans'],
            ['📊 Statistika'],
          ]).resize(),
        });
      }
    } catch (error) {
      console.log('onStart error: ', error);
    }
  }

  async onGender(ctx: Context) {
    try {
      const user_id = ctx.callbackQuery!['data'].split('_')[1];
      const gender = ctx.callbackQuery!['data'].split('_')[0];
      const user = await this.botModel.findOne({ user_id: String(user_id) });
      console.log(user, user_id, gender, ctx.callbackQuery!['data']);

      if (!user || !user.status) {
        await ctx.reply('Iltimos akkauntingizni faollashtiring', {
          ...Markup.keyboard([['/start']]).resize(),
        });
      } else if (user && user.last_state == 'gender') {
        user.gender = gender;
        user.last_state = 'birth_year';
        await user.save();

        await ctx.reply(
          `Iltimos tug'ilgan yilingizni kiriting, masalan(2002)`,
          {
            ...Markup.removeKeyboard(),
          },
        );
      }
    } catch (error) {
      console.log('onActionGender error: ', error);
    }
  }

  async onContact(ctx: Context) {
    try {
      if ('contact' in ctx.message!) {
        const user_id = ctx.from?.id;
        const user = await this.botModel.findOne({ user_id: String(user_id) });

        if (!user) {
          await ctx.reply('Iltimos /start tugmasini bosing', {
            ...Markup.keyboard([['/start']])
              .resize()
              .oneTime(),
          });
        } else if (user && user.last_state == 'phone_number') {
          user.phone_number = ctx.message.contact.phone_number;
          user.last_state = 'real_name';
          user.status = true;
          await user.save();
          await ctx.reply(`Tabriklayman akkauntingiz faollashtirildi`, {
            ...Markup.removeKeyboard(),
          });
          await ctx.reply(`Do'stim faqat o'zingizning ismingizni kiriting`, {
            ...Markup.removeKeyboard(),
          });
        }
      }
    } catch (error) {
      console.log('onContact error: ', error);
    }
  }

  async onText(ctx: Context) {
    try {
      if ('text' in ctx.message!) {
        const user_id = ctx.from?.id;
        const user = await this.botModel.findOne({ user_id: String(user_id) });

        if (!user || !user.status) {
          await ctx.reply(
            'Iltimos /start tugmasini bosib, akkauntingizni faollashtiring',
            {
              ...Markup.keyboard([['/start']]).resize(),
            },
          );
        } else if (user && user.last_state == 'real_name') {
          user.real_name = ctx.message.text;
          user.last_state = 'gender';
          await user.save();

          await ctx.reply(`Jinsingizni tasdiqlang`, {
            reply_markup: {
              inline_keyboard: [
                [
                  { text: 'Erkak ', callback_data: `erkak_${user.user_id}` },
                  { text: 'Ayol', callback_data: `ayol_${user.user_id}` },
                ],
              ],
            },
          });
        } else if (user && user.last_state == 'birth_year') {
          user.birth_year = ctx.message.text;
          user.last_state = 'finish';
          await user.save();

          const userInfo =
            `Ro'yxatdan o'tish muvaffaqiyatli yakunlandi!\n\n` +
            `Ismingiz: ${user.real_name}\n` +
            `Telefon: ${user.phone_number}\n` +
            `Jins: ${user.gender === 'erkak' ? 'Erkak' : 'Ayol'}\n` +
            `Tug'ilgan yil: ${user.birth_year}`;

          await ctx.reply(userInfo, {
            ...Markup.keyboard([['Profil', 'Balans'], ['Statistika']]).resize(),
          });
        }
      }
    } catch (error) {
      console.log('onText error: ', error);
    }
  }
}
