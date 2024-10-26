import fs from 'fs';

// استخدام حدود الكلمة \b لضمان مطابقة الكلمة بالكامل فقط
const toxicRegex = /قحبه|القحبة|القحبه|ممحون|كس|كسي|امك|كسختك|متناك|منيوك|قحبة|شرموطة|شرموط|انيكك|انيكك|زبي|زب|طيز|كسمك|طبون|زامل|مص|مصه|اركب|zap|zpi|dick|bitch|porno|sexe|sexy|mother|suck|cum|hentai/i;

export async function before(m, { conn }) {
  if (m.isBaileys && m.fromMe) {
    return true;
  }
  
  if (!m.isGroup) {
    return false;
  }

  // الوصول إلى إعدادات الدردشة من قاعدة البيانات أو أي مصدر بيانات آخر
  const chat = global.db.data.chats[m.chat];

  // التأكد مما إذا كانت خاصية "مضاد السب" مفعلة في إعدادات الدردشة
  if (!chat.antiToxic) {
    return true; // إذا كانت الخاصية معطلة، لا نفعل أي شيء
  }

  // التأكد من أن الرسالة تحتوي على كلمات ممنوعة فقط عند مطابقتها بالكامل
  const isToxic = toxicRegex.exec(m.text);

  if (isToxic) {
    try {
      // حذف الرسالة إذا كانت تحتوي على كلمة ممنوعة
      await conn.sendMessage(m.chat, { delete: m.key });
    } catch (e) {
      console.error(e);
    }
  }

  return false;
}
