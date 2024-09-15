import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  // التحقق من النص المُدخل
  if (!text) throw `*يستخدم هذا الأمر لإنشاء صورة باستخدام الذكاء الاصطناعي.*\n\n*مثال لاستخدام الأمر (يفضل كتابة الوصف باللغة الإنجليزية للحصول على نتائج دقيقة):*\n*◉ ${usedPrefix + command} beautiful anime girl*\n*◉ ${usedPrefix + command} a man driving a pizza car*`;

  try {
    // إرسال رسالة للمستخدم قبل تجهيز الصورة
    m.reply('*ثانية واحدة، الصورة قيد التحضير...*');

    // استدعاء API باستخدام النص المُدخل
    const endpoint = `https://gurugpt.cyclic.app/dalle?prompt=${encodeURIComponent(text)}`;
    const response = await fetch(endpoint);

    // التحقق من نجاح الطلب
    if (response.ok) {
      const imageBuffer = await response.buffer(); // الحصول على الصورة كـ buffer
      await conn.sendFile(m.chat, imageBuffer, 'image.png', null, m); // إرسال الصورة
    } else {
      throw '*فشل في إنشاء الصورة. حاول مجددًا لاحقًا.*';
    }
  } catch (error) {
    console.error(error); // طباعة تفاصيل الخطأ في وحدة التحكم لمزيد من التتبع
    throw '*حدث خطأ أثناء توليد الصورة. يرجى المحاولة مرة أخرى لاحقًا.*';
  }
};

// إعداد المساعدة والأوامر
handler.help = ['صورهai'];
handler.tags = ['tools'];
handler.command = ['dalle', 'صورهai', 'gimg', 'openai2'];

export default handler;
