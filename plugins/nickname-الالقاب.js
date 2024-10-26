import mongoose from 'mongoose';

const uri = 'mongodb+srv://itachi3mk:mypassis1199@cluster0.zzyxjo3.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB')).catch(error => console.error('Error connecting to MongoDB:', error));

const bk9Schema = new mongoose.Schema({
    groupId: String,
    userId: String,
    bk9: String
});

const BK9 = mongoose.model('BK9', bk9Schema);

let handler = async function (message, { conn, text, command, isAdmin }) {
    try {
        if (command === 'الالقاب') {
            if (!message.isGroup) {
                message.reply('*الامر خاص بالقرربات*');
                return;
            }
            if (!isAdmin) {
                message.reply('*الأمر خاص بالمشرفين فقط*');
                return;
            }
            const nicknames = await BK9.find({ groupId: message.chat });
            if (nicknames.length === 0) {
                message.reply('> *لا يوجد القاب مسجلة حاليا 📮*');
            } else {
                let replyText = '> *┇الألقـاب المـسـجـلـة 📮:*\n\n';
                const mentions = [];
                for (const nickname of nicknames) {
                    const userId = nickname.userId + '@s.whatsapp.net';
                    replyText += `*『${nickname.bk9}』* - @${nickname.userId}\n`;
                    mentions.push(userId);
                }
                const imageUrl = 'https://files.catbox.moe/br8mn5.jpg';
                await conn.sendMessage(message.chat, { image: { url: imageUrl },caption: replyText + '\n*༺ ⌞┊𝐀𝐋𝐏𝐇𝐀 𝐁𝐎𝐓 ┊⌝ ༻*', mentions });
            }
        } else if (command === 'تسجيل') {
            if (!message.isGroup) {
                message.reply('*امر خاص بالقروبات*');
                return;
            }
            if (!isAdmin) {
                message.reply('*للمشرفين بس*');
                return;
            }
            if (!message.mentionedJid || !text || text.trim() === '') {
                message.reply('*مثال:*\n *.تسجيل @منشن اللقب*');
                return;
            }
            const userId = message.mentionedJid[0].replace('@s.whatsapp.net', '');
            const nickname = text.trim().split(' ').slice(1).filter(part => part.trim() !== '').join(' ');
            if (!/\S/.test(nickname)) {
                message.reply('*مثال:*\n *.تسجيل @منشن اللقب*');
                return;
            }
            const existingNickname = await BK9.findOne({ bk9: nickname, groupId: message.chat });
            if (existingNickname) {
                const userId = existingNickname.userId + '@s.whatsapp.net';
                message.reply('> *اللقب ' + nickname + ' ماخوذ من طرف* @' + existingNickname.userId, null, {
                    mentions: [userId]
                });
            } else {
                await BK9.findOneAndUpdate({ userId, groupId: message.chat }, { bk9: nickname }, { upsert: true });
                message.reply('> *تم تسجيله بلقب ' + nickname + ' بنجاح ☑️*');
            }
        } else if (command === 'حذف-تسجيل') {
            if (!message.isGroup) {
                message.reply('هذا الأمر يعمل فقط في المجموعات');
                return;
            }
            if (!isAdmin) {
                message.reply('هذا الأمر خاص للمشرفين');
                return;
            }
            if (!text || text.trim() === '') {
                message.reply('> *اكتب اللقب اللي تبغى تحذفه ⚠️*');
                return;
            }
            const nickname = text.trim();
            const result = await BK9.deleteOne({ bk9: nickname, groupId: message.chat });
            result.deletedCount > 0 ? message.reply('> *تم حذف اللقب ' + nickname + ' بنجاح ☑️*') : message.reply('اللّقب ' + nickname + ' غير مسجل لاحد اساسا');
        } else if (command === 'لقبي') {
            try {
                const userId = message.sender.split('@')[0];
                const userNickname = await BK9.findOne({ userId, groupId: message.chat });
                userNickname && userNickname.bk9 ? message.reply('> لقبك هو : ' + userNickname.bk9) : message.reply('> لم يتم تسجيلك بعد ❌');
            } catch (error) {
                console.error('Error fetching user\'s nickname:', error);
                message.reply('*حدث خطأ أثناء جلب لقبك*');
            }
        } else if (command === 'لقبه' && message.mentionedJid) {
            if (!message.mentionedJid || message.mentionedJid.length === 0) {
                message.reply('*منشن احد*');
                return;
            }
            const userId = message.mentionedJid[0].replace('@s.whatsapp.net', '');
            const userNickname = await BK9.findOne({ userId, groupId: message.chat });
            if (userNickname) {
                message.reply('> *لقبه هو :* ' + userNickname.bk9 );
            } else {
                message.reply('> *لم يتم تسجيله بعد فالبوت ‼️*');
            }
        } else if (command === 'متوفر') {
            if (!text || text.trim() === '') {
                message.reply('*اكتب لقب للتحقق منه 📮*');
                return;
            }
            const nickname = text.trim();
            const userNickname = await BK9.findOne({ bk9: nickname, groupId: message.chat });
            if (userNickname) {
                const userId = userNickname.userId.split('@')[0] + '@s.whatsapp.net';
                message.reply('> *لقب ' + nickname + ' ماخوذ من طرف* @' + userNickname.userId, null, {
                    mentions: [userId]
                });
            } else {
                message.reply('> *لقب ' + nickname + ' متوفر ☑️*');
            }
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

handler.command = ['الالقاب','تسجيل', 'لقبي', 'لقبه', 'حذف-تسجيل', 'متوفر'];
handler.tags = ['BK9'];

export default handler;
