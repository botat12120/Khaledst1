import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    const taguser = '@' + m.sender.split("@s.whatsapp.net")[0];

    // Send fake reply message with serial number
    const sn = '*جـاًر تـجـهيز الـقـائـمـه🛰️...*'; // replace with the actual serial number
    conn.fakeReply(m.chat, sn, '0@s.whatsapp.net', 'مرحبا بك👋🏻, في بوت باتشيرا', 'status@broadcast');

    // Prepare the image
    var joanimiimg = await prepareWAMessageMedia({ image: { url: 'https://telegra.ph/file/9ea7c13e92000839267ab.jpg' } }, { upload: conn.waUploadToServer });

    // Create the interactive message with the image
    const interactiveMessage = {
        header: {
            title: `*﹝❒═════﹝🍷﹞═════❒﹞*\n\n *ارحبوو ¦🍷『 ${m.pushName}』*\n * اسم البوت: بوت باتشيرا¦🍷*\n *اسم المطور: ابوهايف:♡¦🍷*\n *🍷¦وَنَجّنَا بِرَحْمَتِكَ مِنَ القوم الكافرين*\n`,
            hasMediaAttachment: true,
            imageMessage: joanimiimg.imageMessage,
        },
        body: {
            text: ' *`افتح القائمة بواسطه الزر`🔘*\n\n*﹝❒═════﹝🍷﹞═════❒﹞*\n\n',
        },
        footer: { text: `تم صنع هذا البوت بواسطه ابوهايف:♡ يمنع سب البوت والبوت يعمل فقط في المجموعات وشكرا لك علي استخدام البوت \n\n\n© Bot by ابوهايف بكل مكان`.trim() },
        nativeFlowMessage: {
            buttons: [
                {
                    name: 'single_select',
                    buttonParamsJson: JSON.stringify({
                        title: '🍷اخـتر القـسـم🍷',
                        sections: [
                            {
                                title: 'قسم الاوامر',
                                highlight_label: 'ابوهايف:♡',
                                rows: [
                                    {
                                        header: 'يعطيك قسم اوامر الجروب🗣️',
                                        title: 'قـسـم الجـروبـات👥✬⃝',
                                        description: '',
                                        id: '.قسم-الجروبات'
                                    },
                                    {
                                        header: 'يعطيك قسم اوامر التنزيلات و البحث📤',
                                        title: 'قـسـم الـتنـزيلات📥✬⃝',
                                        description: '',
                                        id: '.قسم-التنزيلات'
                                    },
                                    {
                                        header: 'يعطيك قسم اوامر الترفيه🛸',
                                        title: 'قـسـم الـتـرفيـه🎮✬⃝',
                                        description: '',
                                        id: '.قسم-الترفيه'
                                    },
                                    {
                                        header: 'يعطيك قسم اوامر التحويل🃏',
                                        title: 'قـسـم الـتحـويل🪄✬⃝',
                                        description: '',
                                        id: '.قسم-التحويل'
                                    },
                                    {
                                        header: 'يعطيك قسم اوامر الدين والأسلام👳🏻‍♂️',
                                        title: 'قـسـم الـديـني✨✬⃝',
                                        description: '',
                                        id: '.قسم-ديني'
                                    },
                                    {
                                        header: 'يعطيك قسم اوامر المطور⚙️',
                                        title: ' قـسـم الـمـطور🙎🏻✬⃝',
                                        description: '',
                                        id: '.قسم-المطور'
                                    },
                                    {
                                        header: 'يعطيك قسم اوامر الألقاب🖊️',
                                        title: ' قـسـم الألقاب📕✬⃝',
                                        description: '',
                                        id: '.القاب-الاعضاء'
                                    },
                                    {
                                        header: '🍷يعطيك كل الاوامر🍷',
                                        title: '🍷كل الاوامر🍷',
                                        description: '',
                                        id: '.كل-الاوامر'
                                    }
                                ]
                            }
                        ]
                    }),
                    messageParamsJson: ''
                },
                {
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: "قنـاة الـواتـساب📣",
                        url: "https://whatsapp.com/channel/0029VafG0N8I1rclRCFLaL0g",
                        merchant_url: "https://whatsapp.com/channel/0029VafG0N8I1rclRCFLaL0g"
                    })
                },
                {
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: "مشاهده البوت🎦",
                        url: "https://youtu.be/-XdmFcY3zQI?si=bzJfbQGwjUk-4rZO",
                        merchant_url: "https://youtu.be/-XdmFcY3zQI?si=bzJfbQGwjUk-4rZO"
                    })
                },
                {
                    name: 'single_select',
                    buttonParamsJson: JSON.stringify({
                        title: '🔎معلومات البوت🔎',
                        sections: [
                            {
                                title: '📜معلومات عن البوت📜',
                                highlight_label: 'By🍷ابوهايف:♡',
                                rows: [
                                    {
                                        header: 'صانع البوت👤',
                                        title: 'الـمطور👾',
                                        description: '',
                                        id: '.المطور'
                                    },
                                    {
                                        header: 'خصوصيه استخدام البوت❔❕',
                                        title: 'الاسـتخدام📜',
                                        description: '',
                                        id: '.قوانين'
                                    },
                                    {
                                        header: 'ابلاغ او ارسال رساله للمطور💭',
                                        title: 'طـلـب ابـلاغ📨',
                                        description: '',
                                        id: '.بلاغ'
                                    },
                                    {
                                        header: 'تقيم البوت⭐',
                                        title: 'طـلب تقـيم🌟',
                                        description: '',
                                        id: '.تقيم'
                                    }
                                ]
                            }
                        ]
                    }),
                    messageParamsJson: ''
                }
            ]
        }
    };

    // Generate the message
    let msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                interactiveMessage,
            },
        },
    }, { userJid: conn.user.jid, quoted: m });

    // Send the message
    conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
}

handler.help = ['info'];
handler.tags = ['main'];
handler.command = ['أوامر', 'اوامر', 'الاوامر', 'ألاوامر', 'menu', 'Menu'];

export default handler;
