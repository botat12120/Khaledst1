import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    const taguser = '@' + m.sender.split("@s.whatsapp.net")[0];

    // Send fake reply message with serial number
    const sn = '*جـاًر تـجـهيز الـقـائـمـه🛰️...*'; // replace with the actual serial number
    conn.fakeReply(m.chat, sn, '0@s.whatsapp.net', 'مرحبا بك👋🏻, في بوت ابوهايف:♡', 'status@broadcast');

    // Prepare the image
    var joanimiimg = await prepareWAMessageMedia({ image: { url: 'https://telegra.ph/file/ec15edb7e6568daafc093.png'' } }, { upload: conn.waUploadToServer });

    // Create the interactive message with the image
    const interactiveMessage = {
        header: {
            title: `*﹝❒═════﹝🍷﹞═════❒﹞*\n *اهلا* 👋🏻 『 ${m.pushName} 』 \n *• اسم البوت: بوت باتشيرا*\n *• اسم المطور: ابوهايف:♡*\n *• وَنَجّنَا بِرَحْمَتِكَ مِنَ القوم الكافرين*\n`
        },
        body: {
            text: '*افتح القائمة بواسطه الزر*🔘\n*اليك قائمه بقسم الاوامر وقسم المعلومات*📜\n*﹝❒═════﹝🍷﹞═════❒﹞*\n\n> *Copyright© 2024*.'
        },
        footer: {
            text: `تم صنع هذا البوت بواسطه ابوهايف:♡ يمنع سب البوت والبوت يعمل فقط في المجموعات وشكرا لك علي استخدام البوت\n\n\n© Bot by Abu Haif`
        },
        media: {
            media: joanimiimg, // Add the prepared image here
            mediaType: 'image' // Specify the type of media
        },
        nativeFlowMessage: {
            buttons: [
                {
                    name: 'single_select',
                    buttonParamsJson: JSON.stringify({
                        title: '🍷اخـتر القـسـم🍷',
                        sections: [
                            {
                                title: 'قسم الاوامر',
                                highlight_label: 'بوت باتشيرا',
                                rows: [
                                    {
                                        header: 'يعطيك قسم اوامر الجروب🗣️',
                                        title: 'قـسـم الجـروبـات👥✬⃝',
                                        description: '',
                                        id: '.قسم-الجروبات'
                                    },
                                    {
                                        header: 'يعطيك قسم اوامر التنزيلات📤',
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
                                        header: 'يعطيك قسم اوامر التحويل🛠️',
                                        title: 'قـسـم الـتحـويل🛠️✬⃝',
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
                                        title: 'قـسـم الـمـطور🙎🏻✬⃝',
                                        description: '',
                                        id: '.قسم-المطور'
                                    },
                                    {
                                        header: 'يعطيك قسم اوامر الألقاب🖊️',
                                        title: 'قـسـم الألقاب📕✬⃝',
                                        description: '',
                                        id: '.القاب-الاعضاء'
                                    },
                                    {
                                        header: 'يعطيك قـسم كل الاوامر🍷⃝',
                                        title: 'كل-الاوامر🍷⃝',
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
                    name: 'cta_url',
                    buttonParamsJson: JSON.stringify({
                        display_text: "قنـاة الـواتـساب📣",
                        url: "https://whatsapp.com/channel/0029VafG0N8I1rclRCFLaL0g",
                        merchant_url: "https://whatsapp.com/channel/0029VafG0N8I1rclRCFLaL0g"
                    })
                },
                {
                    name: 'cta_url',
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
                                highlight_label: 'ابوهايف:♡',
                                rows: [
                                    {
                                        header: 'صانع البوت👤',
                                        title: 'الـمطور👾',
                                        description: 'ابوهايف:♡',
                                        id: '.المطور'
                                    },
                                    {
                                        header: 'خصوصيه استخدام البوت❔❕',
                                        title: 'الاسـتخدام📜',
                                        description: '',
                                        id: '.الاستخدام'
                                    },
                                    {
                                        header: 'ابلاغ او ارسال رساله للمطور💭',
                                        title: 'طـلـب ابـلاغ📨',
                                        description: '',
                                        id: '.بلاغ'
                                    },
                                    {
                                        header: '🍷لتقييم البوت🍷',
                                        title: '♡تقييم البوت♡',
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
