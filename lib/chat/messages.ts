import type { Locale } from '@/lib/i18n/types'

export const chatMessages: Record<
  Locale,
  {
    open: string
    title: string
    intro: string
    privacy: string
    placeholder: string
    send: string
    minimize: string
    close: string
    start: string
    newChat: string
    newChatTitle: string
    newChatDescription: string
    cancelNewChat: string
    confirmNewChat: string
    closed: string
    loading: string
    error: string
    you: string
    owner: string
    read: string
    unread: string
    newMessage: string
    reply: string
    replyingTo: string
    cancelReply: string
    unavailable: string
    sending: string
    assistant: string
    aiNotice: string
    suggestions: string[]
    askOwner: string
    humanRequest: string
    humanSent: string
    aiThinking: string
    aiCheck: string
    aiPending: string
    aiError: string
    aiLimit: string
    aiWarning: string
    aiUnavailable: string
    aiUnknown: string
    aiOutOfScope: string
  }
> = {
  en: {
    open: 'Open chat',
    title: 'Message Francisco',
    intro: 'Have a question? Leave a message and I will get back to you.',
    privacy:
      'Messages are stored until deleted. This conversation is only available in this browser. Please do not share sensitive information.',
    placeholder: 'Write a message',
    send: 'Send',
    minimize: 'Minimize chat',
    close: 'Close chat',
    start: 'Start a new conversation',
    newChat: 'New chat',
    newChatTitle: 'Start a new chat?',
    newChatDescription:
      'Your current conversation will be closed and cleared from this window. Francisco can still see the previous messages in his inbox.',
    cancelNewChat: 'Keep current chat',
    confirmNewChat: 'Close chat and start new',
    closed: 'This conversation is closed.',
    loading: 'Connecting to chat...',
    error: 'Chat could not connect. Please try again later.',
    you: 'You',
    owner: 'Francisco',
    read: 'Read',
    unread: 'Unread',
    newMessage: 'New message',
    reply: 'Reply',
    replyingTo: 'Replying to',
    cancelReply: 'Cancel reply',
    unavailable: 'Message unavailable',
    sending: 'Sending',
    assistant: 'AI assistant',
    aiNotice:
      'An AI assistant answers questions about Francisco and may make mistakes. Messages are visible to Francisco and questions are sent to Gemini. Free-tier limits apply; please avoid repeating questions already answered.',
    suggestions: [
      'Who is Francisco?',
      'What projects has he built?',
      'What are his career interests?',
    ],
    askOwner: 'Ask Francisco directly',
    humanRequest: 'I would like Francisco to respond to this conversation.',
    humanSent: 'Your message is in Francisco’s inbox. He may respond later.',
    aiThinking: 'The AI assistant is preparing a response...',
    aiCheck: 'Check the response',
    aiPending: 'The response is still being processed. Check again later.',
    aiError:
      'Your message was saved, but the AI assistant could not respond. Francisco can read it in his inbox.',
    aiLimit:
      'The AI question limit has been reached. Please avoid repeating answered questions and try again later. Francisco can read your message in his inbox.',
    aiWarning:
      'You are close to the hourly AI limit. Please avoid repeating questions already answered.',
    aiUnavailable:
      'The AI assistant is unavailable right now. Francisco can read your question in his inbox and may respond later.',
    aiUnknown:
      'I cannot confidently answer that from the available information. Francisco can read your question in his inbox and may respond later.',
    aiOutOfScope:
      'I can only answer questions about Francisco, his work, interests, and portfolio.',
  },
  id: {
    open: 'Buka chat',
    title: 'Pesan Francisco',
    intro: 'Ada pertanyaan? Tinggalkan pesan dan saya akan membalasnya.',
    privacy:
      'Pesan disimpan sampai dihapus. Percakapan ini hanya tersedia di browser ini. Jangan kirim informasi sensitif.',
    placeholder: 'Tulis pesan',
    send: 'Kirim',
    minimize: 'Minimalkan chat',
    close: 'Tutup chat',
    start: 'Mulai percakapan baru',
    newChat: 'Chat baru',
    newChatTitle: 'Mulai chat baru?',
    newChatDescription:
      'Percakapan saat ini akan ditutup dan dihapus dari jendela ini. Francisco tetap dapat melihat pesan sebelumnya di kotak masuknya.',
    cancelNewChat: 'Lanjutkan chat ini',
    confirmNewChat: 'Tutup dan mulai baru',
    closed: 'Percakapan ini ditutup.',
    loading: 'Menghubungkan chat...',
    error: 'Chat tidak dapat terhubung. Silakan coba lagi nanti.',
    you: 'Anda',
    owner: 'Francisco',
    read: 'Dibaca',
    unread: 'Belum dibaca',
    newMessage: 'Pesan baru',
    reply: 'Balas',
    replyingTo: 'Membalas',
    cancelReply: 'Batalkan balasan',
    unavailable: 'Pesan tidak tersedia',
    sending: 'Mengirim',
    assistant: 'Asisten AI',
    aiNotice:
      'Asisten AI menjawab pertanyaan tentang Francisco dan bisa salah. Francisco dapat melihat pesan Anda dan pertanyaan dikirim ke Gemini. Batas gratis berlaku; hindari mengulang pertanyaan yang sudah dijawab.',
    suggestions: ['Siapa Francisco?', 'Proyek apa yang pernah ia buat?', 'Apa minat kariernya?'],
    askOwner: 'Tanya Francisco langsung',
    humanRequest: 'Saya ingin Francisco membalas percakapan ini.',
    humanSent: 'Pesan Anda ada di kotak masuk Francisco. Ia mungkin membalas nanti.',
    aiThinking: 'Asisten AI sedang menyiapkan jawaban...',
    aiCheck: 'Periksa jawaban',
    aiPending: 'Jawaban masih diproses. Periksa lagi nanti.',
    aiError:
      'Pesan tersimpan, tetapi asisten AI tidak dapat menjawab. Francisco dapat membacanya di kotak masuk.',
    aiLimit:
      'Batas pertanyaan AI telah tercapai. Hindari mengulang pertanyaan yang sudah dijawab dan coba lagi nanti. Francisco dapat membaca pesan Anda.',
    aiWarning: 'Anda mendekati batas AI per jam. Hindari mengulang pertanyaan yang sudah dijawab.',
    aiUnavailable:
      'Asisten AI sedang tidak tersedia. Francisco dapat membaca pertanyaan Anda dan mungkin membalas nanti.',
    aiUnknown:
      'Saya tidak dapat menjawab dengan yakin dari informasi yang tersedia. Francisco dapat membaca pertanyaan Anda dan mungkin membalas nanti.',
    aiOutOfScope:
      'Saya hanya dapat menjawab pertanyaan tentang Francisco, karya, minat, dan portofolionya.',
  },
  ja: {
    open: 'チャットを開く',
    title: 'Franciscoにメッセージ',
    intro: 'ご質問があればメッセージをお送りください。後ほど返信します。',
    privacy:
      'メッセージは削除されるまで保存されます。この会話はこのブラウザでのみ利用できます。機密情報は送信しないでください。',
    placeholder: 'メッセージを入力',
    send: '送信',
    minimize: 'チャットを最小化',
    close: 'チャットを閉じる',
    start: '新しい会話を始める',
    newChat: '新しいチャット',
    newChatTitle: '新しいチャットを始めますか？',
    newChatDescription:
      '現在の会話を終了し、このウィンドウから消去します。以前のメッセージはFranciscoの受信箱に残ります。',
    cancelNewChat: '現在のチャットを続ける',
    confirmNewChat: '終了して新しいチャットを始める',
    closed: 'この会話は終了しました。',
    loading: 'チャットに接続中...',
    error: 'チャットに接続できません。後でもう一度お試しください。',
    you: 'あなた',
    owner: 'Francisco',
    read: '既読',
    unread: '未読',
    newMessage: '新着メッセージ',
    reply: '返信',
    replyingTo: '返信先',
    cancelReply: '返信をキャンセル',
    unavailable: 'メッセージを表示できません',
    sending: '送信中',
    assistant: 'AIアシスタント',
    aiNotice:
      'AIアシスタントがFranciscoについての質問に答えます。回答が間違っている場合があります。Franciscoはメッセージを確認でき、質問はGeminiに送信されます。無料枠には制限があるため、同じ質問の繰り返しはお控えください。',
    suggestions: [
      'Franciscoはどんな人ですか？',
      'どんなプロジェクトを作りましたか？',
      '希望する仕事は何ですか？',
    ],
    askOwner: 'Franciscoに直接質問',
    humanRequest: 'この会話にFranciscoからの返信を希望します。',
    humanSent: 'メッセージはFranciscoの受信箱に届きました。後ほど返信する場合があります。',
    aiThinking: 'AIアシスタントが回答を準備しています...',
    aiCheck: '回答を確認',
    aiPending: '回答を処理しています。後ほどもう一度確認してください。',
    aiError:
      'メッセージは保存されましたが、AIは回答できませんでした。Franciscoは受信箱で確認できます。',
    aiLimit:
      'AIへの質問の上限に達しました。回答済みの質問の繰り返しを避け、後ほどお試しください。Franciscoはメッセージを確認できます。',
    aiWarning: 'AIの1時間あたりの上限が近づいています。回答済みの質問の繰り返しはお控えください。',
    aiUnavailable:
      'AIアシスタントを現在利用できません。Franciscoは質問を確認し、後ほど返信する場合があります。',
    aiUnknown:
      '利用可能な情報からは確実に回答できません。Franciscoは質問を確認し、後ほど返信する場合があります。',
    aiOutOfScope: 'Franciscoの経歴、作品、関心、ポートフォリオについてのみ回答できます。',
  },
  zh: {
    open: '打开聊天',
    title: '给 Francisco 留言',
    intro: '有问题吗？请留言，我会回复您。',
    privacy: '消息会一直保存到被删除。此对话只能在当前浏览器中访问。请勿发送敏感信息。',
    placeholder: '输入消息',
    send: '发送',
    minimize: '最小化聊天',
    close: '关闭聊天',
    start: '开始新对话',
    newChat: '新建聊天',
    newChatTitle: '要开始新的聊天吗？',
    newChatDescription: '当前对话将被关闭并从此窗口清除。Francisco 仍可在收件箱中查看之前的消息。',
    cancelNewChat: '继续当前聊天',
    confirmNewChat: '关闭并开始新聊天',
    closed: '此对话已关闭。',
    loading: '正在连接聊天...',
    error: '无法连接聊天，请稍后重试。',
    you: '你',
    owner: 'Francisco',
    read: '已读',
    unread: '未读',
    newMessage: '新消息',
    reply: '回复',
    replyingTo: '正在回复',
    cancelReply: '取消回复',
    unavailable: '消息不可用',
    sending: '发送中',
    assistant: 'AI 助手',
    aiNotice:
      'AI 助手回答有关 Francisco 的问题，回答可能有误。Francisco 可以查看消息，问题会发送给 Gemini。免费额度有限，请避免重复已回答的问题。',
    suggestions: ['Francisco 是谁？', '他做过哪些项目？', '他的职业兴趣是什么？'],
    askOwner: '直接询问 Francisco',
    humanRequest: '我希望 Francisco 回复这段对话。',
    humanSent: '您的消息已进入 Francisco 的收件箱，他可能稍后回复。',
    aiThinking: 'AI 助手正在准备回答...',
    aiCheck: '查看回复',
    aiPending: '回复仍在处理中，请稍后再次查看。',
    aiError: '消息已保存，但 AI 助手无法回复。Francisco 可以在收件箱中查看。',
    aiLimit: '已达到 AI 问题上限。请避免重复已回答的问题，稍后再试。Francisco 可以查看您的消息。',
    aiWarning: '您即将达到每小时 AI 使用上限。请避免重复已回答的问题。',
    aiUnavailable: 'AI 助手暂时不可用。Francisco 可以查看您的问题，并可能稍后回复。',
    aiUnknown: '根据现有信息，我无法有把握地回答。Francisco 可以查看您的问题，并可能稍后回复。',
    aiOutOfScope: '我只能回答有关 Francisco、他的作品、兴趣和作品集的问题。',
  },
}
