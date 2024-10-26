const handler = async (m, {isOwner, isAdmin, conn, text, participants, args, command, usedPrefix}) => {
  if (usedPrefix == 'a' || usedPrefix == 'A') return;
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }
  const pesan = args.join` `;
  const oi = `*الرسالة :* ${pesan}`;
  let teks = `الادمن قال : ${oi} \n`;
  for (const mem of participants) {
    teks += `- @${mem.id.split('@')[0]}\n`;
  }
  teks += `> *𝙋𝙤𝙬𝙚𝙧𝙚𝙙 𝙗𝙮 𝙆𝙎𝘼*`;
  conn.sendMessage(m.chat, {text: teks, mentions: participants.map((a) => a.id)} );
};
handler.help = ['منشن <رسالة>', 'جماعي <رسالة>'];
handler.tags = ['group'];
handler.command = /^(منشن|جماعي|ازعاج)$/i;
handler.admin = true;
handler.group = true;
export default handler;
