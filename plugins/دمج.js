import { sticker } from '../lib/sticker.js'
import MessageType from '@adiwajshing/baileys'
import fetch from 'node-fetch'
import fs from "fs"

let handler = async (m, { conn, text, args }) => {
  // التحقق من وجود الرموز التعبيرية
  if (!args[0]) throw '*استخدام هذا الأمر يجب أن يكون بالشكل التالي: دمج <إيموجي 1>+<إيموجي 2>*\n*مثال:*\n*.دمج 🤨+😣*'
  
  let [emoji1, emoji2] = text.split`+`

  // تأكد من وضع مفتاح API الصحيح هنا
  const apiKey = 'YOUR_TENOR_API_KEY'; 

  // طلب الحصول على نتائج من API
  let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=${apiKey}&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)

  // إرسال الملصقات
  for (let res of anu.results) {
    let stiker = await sticker(false, res.url, global.packname, global.author)
    conn.sendFile(m.chat, stiker, null, { asSticker: true })
  }
}

// إعداد المساعدة والأوامر
handler.help = ['دمج'].map(v => v + ' emot1|emot2>')
handler.tags = ['fun']
handler.command = /^(دمج)$/i

export default handler

// دالة fetchJson
const fetchJson = (url, options) => new Promise(async (resolve, reject) => {
  fetch(url, options)
    .then(response => response.json())
    .then(json => resolve(json))
    .catch((err) => reject(err))
})
