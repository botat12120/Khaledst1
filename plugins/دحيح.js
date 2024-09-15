import fetch from 'node-fetch';
import uploadImage from '../lib/uploadImage.js';

let handler = async (message, { text, conn, usedPrefix, command }) => {
  // التحقق من وجود النص أو وجود رسالة مقتبسة
  if (!text && !(message.quoted && message.quoted.text)) {
    throw "\n\n*👨🏻‍🔧⤺┇ استخدام خاطئ، يرجى الرد على رسالة تحتوي على نص.*\n\n";
  }

  try {
    const encodedText = encodeURIComponent(text);
    let attachment = null;
    let mediaURL = '';
    let quotedMessage = message.quoted ? message.quoted : message;

    // التحقق من المرفقات إذا كانت صورة أو فيديو
    if ((quotedMessage.msg || quotedMessage).mimetype || quotedMessage.mediaType || '') {
      let mimeType = (quotedMessage.msg || quotedMessage).mimetype || quotedMessage.mediaType || '';

      if (mimeType.startsWith('video/')) {
        return message.reply("\n\n*👨🏻‍🔧⤺┇ يرجى الرد على صورة، لا فيديو!*\n\n");
      }

      attachment = await quotedMessage.download();
      let isImage = /image\/(png|jpe?g|gif)/.test(mimeType);
      mediaURL = await uploadImage(attachment);
    }

    // إعداد الرابط النهائي لاستدعاء الـ API
    const endpointURL = mediaURL 
      ? `https://api-darkman-3cf8c6ef66b9.herokuapp.com/googlegenai?query=${encodedText}&url=${mediaURL}`
      : `https://api-darkman-3cf8c6ef66b9.herokuapp.com/googlegenai?query=${encodedText}`;

    // تحديث حالة الكتابة
    conn.sendPresenceUpdate("composing", text.chat);

    // استدعاء الـ API
    const response = await fetch(endpointURL);
    const result = await response.json();
    const output = result.result;

    // إرسال الرد
    message.reply(output);
  } catch (error) {
    console.error("Error:", error);
    // رسالة خطأ مخصصة باللغة العربية
    throw "\n\n*👨🏻‍🔧⤺┇ حدث خطأ أثناء المعالجة، يرجى المحاولة لاحقًا.*\n\n";
  }
};

// إعداد المساعدة والأوامر
handler.help = ["googlegenai"];
handler.tags = ['AI'];
handler.command = ["عمرو", "googlegenai", "gemini", 'جيميناي', "دحيح"];

export default handler;
