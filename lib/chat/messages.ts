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
  },
}
