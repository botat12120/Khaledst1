let قلوب = {
  isActive: false,
  players: {},
  الاصابه: 5,
  hearts: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎'],
  gameStarter: null // حفظ من بدأ اللعبة
};

let handler = async (m, { conn, command, text }) => {
  let args = text.trim().split(/\s+/).slice(1);

  switch (command) {
    case 'قلوب':
      if (!قلوب.isActive) {
        قلوب.isActive = true;
        قلوب.players = {};
        قلوب.gameStarter = m.sender.split('@')[0]; // حفظ من بدأ اللعبة
        await conn.sendMessage(m.chat, {
          text: '𒄟 ❰لـقـد بـدأت اللعـبة❱\n> ١. قم بالرد على هذه الرسالة لبدء المشاركة في اللعبة والحصول على 5 قلوب.\n> ٢. استخدم (.انقاص) لتقليل قلوب أحد اللاعبين عند الرد على رسالته.\n> ٣. اكتب (.نتيجه) لعرض قائمة اللاعبين وحالة قلوبهم.\n> ٤. اكتب (.انتهاء) لإنهاء اللعبة ',
          mentions: [m.sender]
        });
      } else {
        m.reply('> اللعبة شغالة حالياً');
      }
      break;
    case 'مشاركة':
      if (!قلوب.isActive) {
        m.reply('> لا توجد لعبة نشطة حالياً.');
        return;
      }
      let newPlayer = m.sender.split('@')[0];
      if (!قلوب.players[newPlayer]) {
        let playerCount = Object.keys(قلوب.players).length;
        قلوب.players[newPlayer] = { hearts: قلوب.الاصابه, icon: قلوب.hearts[playerCount % قلوب.hearts.length] };
        await conn.sendMessage(m.chat, {
          text: `تمت إضافة ${قلوب.الاصابه} قلوب للاعب @${newPlayer} ${قلوب.players[newPlayer].icon}`,
          mentions: [m.sender]
        });
      } else {
        await conn.sendMessage(m.chat, {
          text: `@${newPlayer} مشارك بالفعل.`,
          mentions: [m.sender]
        });
      }
      break;
    case 'انقاص':
      if (!قلوب.isActive) {
        m.reply('> لا توجد لعبة نشطة حالياً.');
        return;
      }
      let playerToInject = m.quoted ? m.quoted.sender.split('@')[0] : null;
      let requestingPlayer = m.sender.split('@')[0];
      if (requestingPlayer !== قلوب.gameStarter) {
        m.reply('> فقط الشخص الذي بدأ اللعبة يمكنه إنقاص قلوب اللاعبين.');
        return;
      }
      if (playerToInject && قلوب.players[playerToInject]) {
        قلوب.players[playerToInject].hearts--;
        if (قلوب.players[playerToInject].hearts <= 0) {
          delete قلوب.players[playerToInject];
          await conn.sendMessage(m.chat, {
            text: `خسر اللاعب @${playerToInject}`,
            mentions: [m.quoted.sender]
          });
        } else {
          await conn.sendMessage(m.chat, {
            text: `تم تقليل قلب واحد من @${playerToInject}. القلوب المتبقية: ${قلوب.players[playerToInject].icon.repeat(قلوب.players[playerToInject].hearts)}`,
            mentions: [m.quoted.sender]
          });
        }
        if (Object.keys(قلوب.players).length === 1) {
          let remainingPlayer = Object.keys(قلوب.players)[0];
          await conn.sendMessage(m.chat, {
            text: `اللعبة انتهت! الفائز هو @${remainingPlayer}`,
            mentions: [remainingPlayer + '@s.whatsapp.net']
          });
          قلوب.isActive = false;
        }
      } else {
        m.reply('> منشن المستخدم أو رد على رسالته لتقليل قلبه.');
      }
      break;
    case 'نتيجة':
      if (!قلوب.isActive) {
        m.reply('> لا توجد لعبة نشطة حالياً.');
        return;
      }
      let resultMessage = '*نتائج اللعبة*\n\n*اللاعبين الذين خسروا:*\n';
      let playersWithHeart = '*اللاعبين الذين لا يزال لديهم قلوب:*\n';
      let lostPlayers = [];
      for (let player in قلوب.players) {
        if (قلوب.players[player].hearts > 0) {
          playersWithHeart += `@${player} - قلوب: ${قلوب.players[player].icon.repeat(قلوب.players[player].hearts)}\n`;
        } else {
          lostPlayers.push(`@${player}`);
        }
      }
      resultMessage += lostPlayers.length ? lostPlayers.join('\n') : 'لا يوجد';
      resultMessage += '\n\n' + (Object.keys(قلوب.players).length ? playersWithHeart : 'لا يوجد');
      
      let mentions = Object.keys(قلوب.players).map(player => player + '@s.whatsapp.net');
      await conn.sendMessage(m.chat, {
        text: resultMessage,
        mentions: mentions
      });
      break;
    case 'انتهاء':
      if (!قلوب.isActive) {
        m.reply('> لا توجد لعبة نشطة حالياً.');
        return;
      }
      قلوب.isActive = false;
      m.reply('اللعبة انتهت. شكراً للمشاركة!');
      break;
    default:
      m.reply('أمر غير معروف.');
      break;
  }
}

handler.command = /^(قلوب|مشاركة|انقاص|نتيجة|انتهاء)$/i;
handler.botAdmin = true;
export default handler;