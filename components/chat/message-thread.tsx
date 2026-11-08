'use client'

import { Reply, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { groupMessages } from '@/lib/chat/group-messages'
import { getReplyPreview } from '@/lib/chat/reply-preview'
import type { ChatMessage } from '@/lib/chat/types'
import type { Locale } from '@/lib/i18n/types'

export type ThreadLabels = {
  you: string
  other: string
  read: string
  unread: string
  reply: string
  replyingTo: string
  cancelReply: string
  unavailable: string
  sending: string
}

function senderName(message: ChatMessage, role: 'guest' | 'admin', labels: ThreadLabels) {
  return message.sender === role ? labels.you : labels.other
}

export function ReplyPreview({
  message,
  role,
  labels,
  onCancel,
}: {
  message: ChatMessage
  role: 'guest' | 'admin'
  labels: ThreadLabels
  onCancel: () => void
}) {
  return (
    <div className="bg-muted flex items-center gap-2 rounded-lg px-3 py-2 text-sm">
      <div className="min-w-0 flex-1">
        <p className="text-primary text-xs font-medium">
          {labels.replyingTo} {senderName(message, role, labels)}
        </p>
        <p className="text-muted-foreground truncate text-xs">{getReplyPreview(message.text)}</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="size-8"
        aria-label={labels.cancelReply}
        onClick={onCancel}
      >
        <X className="size-4" />
      </Button>
    </div>
  )
}

export function MessageThread({
  messages,
  role,
  locale,
  labels,
  canReply,
  onReply,
}: {
  messages: ChatMessage[]
  role: 'guest' | 'admin'
  locale: Locale
  labels: ThreadLabels
  canReply: boolean
  onReply: (message: ChatMessage) => void
}) {
  const groups = groupMessages(messages)
  const messageById = new Map(messages.map((message) => [message.id, message]))
  const dateFormatter = new Intl.DateTimeFormat(locale, { dateStyle: 'medium' })
  const timeFormatter = new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit' })

  return (
    <div className="space-y-4">
      {groups.map((group, index) => {
        const first = group[0]
        const last = group[group.length - 1]
        const own = first.sender === role
        const date = first.createdAt?.toDate()
        const precedingDate = groups[index - 1]?.[0].createdAt?.toDate()
        const showDate =
          date && (!precedingDate || date.toDateString() !== precedingDate.toDateString())
        return (
          <div key={first.id}>
            {showDate && (
              <p className="text-muted-foreground mb-4 text-center text-xs">
                <time dateTime={date.toISOString()}>{dateFormatter.format(date)}</time>
              </p>
            )}
            <div
              className={
                own
                  ? 'ml-auto flex max-w-[min(90%,36rem)] flex-col items-end'
                  : 'mr-auto flex max-w-[min(90%,36rem)] flex-col items-start'
              }
            >
              <p className="text-muted-foreground mb-1 px-1 text-xs">
                {senderName(first, role, labels)}
              </p>
              <div
                className={
                  own
                    ? 'flex w-full flex-col items-end gap-1'
                    : 'flex w-full flex-col items-start gap-1'
                }
              >
                {group.map((message) => {
                  const target = message.replyTo ? messageById.get(message.replyTo) : undefined
                  const sentAt = message.createdAt?.toDate()
                  return (
                    <div
                      key={message.id}
                      className={
                        own
                          ? 'group/message flex max-w-full flex-row-reverse items-center gap-1'
                          : 'group/message flex max-w-full items-center gap-1'
                      }
                    >
                      <div
                        className={
                          own
                            ? 'bg-primary text-primary-foreground min-w-0 rounded-2xl rounded-br-sm px-3 py-2'
                            : 'bg-muted min-w-0 rounded-2xl rounded-bl-sm px-3 py-2'
                        }
                      >
                        {message.replyTo && (
                          <div
                            className={
                              own
                                ? 'mb-2 max-w-[18rem] rounded-md border-l-2 border-current bg-black/10 px-2 py-1 text-xs'
                                : 'border-primary bg-background/70 mb-2 max-w-[18rem] rounded-md border-l-2 px-2 py-1 text-xs'
                            }
                          >
                            <p className="font-semibold">
                              {target ? senderName(target, role, labels) : labels.unavailable}
                            </p>
                            {target && (
                              <p className="line-clamp-2 break-words whitespace-pre-wrap">
                                {getReplyPreview(target.text)}
                              </p>
                            )}
                          </div>
                        )}
                        <p className="text-left text-sm break-words whitespace-pre-wrap">
                          {message.text}
                        </p>
                        <p className="mt-1 text-right text-[10px] leading-none opacity-75">
                          {sentAt ? (
                            <time dateTime={sentAt.toISOString()}>
                              {timeFormatter.format(sentAt)}
                            </time>
                          ) : (
                            labels.sending
                          )}
                        </p>
                      </div>
                      {canReply && message.createdAt && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground size-8 shrink-0 opacity-0 transition-opacity group-hover/message:opacity-100 focus-visible:opacity-100 [@media(hover:none)]:opacity-100"
                          aria-label={`${labels.reply}: ${message.text.slice(0, 60)}`}
                          title={labels.reply}
                          onClick={() => onReply(message)}
                        >
                          <Reply className="size-4" />
                        </Button>
                      )}
                    </div>
                  )
                })}
              </div>
              {own && (
                <p className="text-muted-foreground mt-1 px-1 text-xs">
                  {last.createdAt ? (last.read ? labels.read : labels.unread) : labels.sending}
                </p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
