function clockString(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor(ms % 3600000 / 60000);
    let s = Math.floor(ms % 60000 / 1000);
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = pkg;

const handler = async (m, {conn, usedPrefix, usedPrefix: _p, __dirname, text, isPrems}) => {
    let d = new Date(new Date + 3600000);
    let locale = 'ar';
    let week = d.toLocaleDateString(locale, { weekday: 'long' });
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
    let _uptime = process.uptime() * 1000;
    let uptime = clockString(_uptime);
    let user = global.db.data.users[m.sender];
    let name = conn.getName(m.sender)
    let { money, joincount } = global.db.data.users[m.sender];
    let { exp, limit, level, role } = global.db.data.users[m.sender];
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length;
    let more = String.fromCharCode(8206);
    let readMore = more.repeat(850);
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let taguser = '@' + m.sender.split("@s.whatsapp.net")[0];
  await conn.sendMessage(m.chat, { react: { text: '🦅', key: m.key } })
  const Elsony = 'https://files.catbox.moe/zd1cxj.jpg'
  const mentionId = m.key.participant || m.key.remoteJid;
 
conn.relayMessage(m.chat, { viewOnceMessage: { message: { interactiveMessage: { header: { title: `gataVidMenu`}, body: { text: `> *ما يلفظ من قول إلا لديه رقيب عتيد*
*ولكم يا 『‏@${mentionId.split('@')[0]}』  في بوت الفا الخاص بالإداريين فقط، للتعرف على المزيد اضغط على قائمة الاوامر فالاسفل 👇🏻*`
                                                                                                                        ,subtitle: "ALPHA",},header: { hasMediaAttachment: true,...(await prepareWAMessageMedia({ image : { url: Elsony } }, { upload: conn.waUploadToServer }, {quoted: m}))},
                    contextInfo: {
                        mentionedJid: [m.sender],
                        isForwarded: false,
                    },
footer: { text: `> *𝙋𝙤𝙬𝙚𝙧𝙚𝙙 𝙗𝙮 𝙆𝙎𝘼*`.trim() },


                                                                               nativeFlowMessage: { buttons: [
                {
                    name: 'single_select',
                    buttonParamsJson: JSON.stringify({
                        title: 'الأوامر',
                        sections: [{
                            title: '🌐 اوامر المشرفين 🌐',
                            highlight_label: '',
                            rows: [
                                { header: '🔰 قسم الاوامر 🔰', title: '1', description: '', id: '#AD' },
                                { header: '〽️ قسم الألقاب 〽️', title: '2', description: '', id: '#NC' },
                                { header: '🛡️ قسم الحماية 🛡️', title: '3', description: '', id: '#TC' },
                                { header: '⛔ قسم المضادات ⛔', title: '4', description: '', id: '#AT' }
                            ]
                        }]
                    }),
                    messageParamsJson: ''
                },
                {
                    name: 'quick_reply',
                    buttonParamsJson: '{"display_text":"المطور","id":".المطور"}'
                },
             
                     {
               name: "cta_url",
               buttonParamsJson: '{"display_text":"قناة البوت","url":"https://whatsapp.com/channel/0029VaoF4WxCsU9KSMOz7t0D","merchant_url":"https://whatsapp.com/channel/0029VaoF4WxCsU9KSMOz7t0D"}'
                            }
                        ]
                    }
                }
            }
        }
    }, {});
}
handler.help = ['info'];
handler.tags = ['main'];
handler.command = ['اوامر','الفا','بوت']

export default handler;