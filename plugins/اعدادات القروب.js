function clockString(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor(ms % 3600000 / 60000);
    let s = Math.floor(ms % 60000 / 1000);
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = pkg;

const handler = async (m, { conn, usedPrefix }) => {
    let d = new Date(new Date + 3600000);
    let locale = 'ar';
    let week = d.toLocaleDateString(locale, { weekday: 'long' });
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
    let _uptime = process.uptime() * 1000;
    let uptime = clockString(_uptime);
    let user = global.db.data.users[m.sender];
    let name = conn.getName(m.sender);
    let { money, joincount } = global.db.data.users[m.sender];
    let { exp, limit, level, role } = global.db.data.users[m.sender];
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length;
    let more = String.fromCharCode(8206);
    let readMore = more.repeat(850);
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let taguser = '@' + m.sender.split("@s.whatsapp.net")[0];
    await conn.sendMessage(m.chat, { react: { text: '⚡', key: m.key } });
    const harley = 'https://files.catbox.moe/jno4j2.jpg';
    const mentionId = m.key.participant || m.key.remoteJid;

    await conn.relayMessage(m.chat, {
        viewOnceMessage: {
            message: {
                interactiveMessage: {
                    header: { title: `ALPHA` },
                    body: {
                        text: `
> *اللَّهُمَّ صلِّ وسلِّم على نبيّنا مُحَمّد* 
> *• اختر احد الخيارين فالاسفل لفتح او قفل القروب.*`,
                        subtitle: "𝐀𝐋𝐏𝐇𝐀 ",
                    },
                    header: {
                        hasMediaAttachment: true,
                        ...(await prepareWAMessageMedia({ image: { url: harley } }, { upload: conn.waUploadToServer }, { quoted: m }))
                    },
                    footer: { text: `> *𝙋𝙤𝙬𝙚𝙧𝙚𝙙 𝙗𝙮 𝙆𝙎𝘼*`.trim() }, 
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: "quick_reply",
                                buttonParamsJson: "{\"display_text\":\"فتح\",\"id\":\"" + usedPrefix + "group فتح\"}"
                            },
                            {
                                name: "quick_reply",
                                buttonParamsJson: "{\"display_text\":\"قفل\",\"id\":\"" + usedPrefix + "group غلق\"}"
                            }
                        ]
                    },
                    messageParamsJson: 'KSA ALPHA'
                }
            }
        }
    }, {});
}

handler.help = ['group *open/close*'];
handler.tags = ['group'];
handler.command = ['القروب', 'روم','اعدادات'];
handler.admin = true;
handler.botAdmin = true;

export default handler;
