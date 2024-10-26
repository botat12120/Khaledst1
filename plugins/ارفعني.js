const handler = async (m, {conn, isAdmin}) => {
  if (m.fromMe) return;
  if (isAdmin) throw '> *❐ يا دلخ انت ادمن اصلا 😎*';
  try {
    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote');
  } catch {
    await m.reply('> *❐ دز ما اقدر*');
  }
};
handler.command = /^autoadmin|adm|ادمني|ارفعني$/i;
handler.rowner = true;
handler.owner = true;
handler.group = true;
handler.premium = true; 
handler.botAdmin = true;
export default handler;