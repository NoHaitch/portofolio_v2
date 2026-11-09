# Chat setup and operation

The support widget uses Firebase anonymous authentication and Firestore realtime listeners.
It does not require a separate WebSocket server.
The owner signs in using the existing Firebase Google or email/password account.
The guest and admin use separate Firebase app instances so that their browser sessions do not replace each other.

## Required Firebase setup

Do not use the chat with Firestore test mode or other permissive rules.
The UI's sign-in check is not an authorization boundary.
Firestore rules protect the data even if someone bypasses the UI.

1. In Firebase Authentication, enable the Anonymous sign-in provider.
2. In Authentication's Users tab, find the intended owner account and copy its UID.
3. Set `NEXT_PUBLIC_FIREBASE_ADMIN_UID` to that UID and `NEXT_PUBLIC_FIREBASE_ADMIN_EMAIL` to the same account's email in the local environment and production deployment environment.
4. Open [firestore.rules](../firestore.rules), copy its contents into the Firestore Rules editor, and replace `REPLACE_WITH_ADMIN_UID` with the exact owner UID in the editor.
5. Review the rules before publishing them.
   The provided rules deny all collections other than `conversations`, so merge them carefully if the Firebase project contains other data.
6. Publish the rules and redeploy the site after setting production environment variables.
7. Test with two separate browser sessions: send a guest message, sign in as the owner, reply, close the conversation, and delete it.
   Confirm an unrelated authenticated user cannot read or modify the conversations.

The UID and Firebase Web app configuration are public identifiers, not credentials.
Never put passwords, service-account keys, or other secrets in `NEXT_PUBLIC_` variables.
The rules file deliberately contains a placeholder to prevent accidental access before the owner UID is configured.
The admin email and UID in the environment must describe the same account as the UID in the published rules.

## Behavior and limitations

The widget connects when opened or when this browser has a saved conversation.
For a saved conversation it listens for new messages even when the widget is minimized or closed, while the site is open.
An unread indicator appears on the minimized tab or closed launcher.
This is an in-site indicator, not a browser push notification, and does not work after the site is closed.
An anonymous guest can return to the current conversation in the same browser while its Firebase authentication state and local site data remain available.
Clearing browser data or switching browsers or devices loses that access.
Once an owner closes a conversation, the visitor can start another one.
An active chat means one that has not been closed, not a visitor who is currently online.
Unread counts represent conversations with unread messages, not the number of messages.
Sent messages show whether the recipient has read them.
Messages from the same sender within five minutes are grouped, with a timestamp on each message and the most recent receipt shown once per group.
Both participants can reply to an individual message.
Reply previews reference a message in the same conversation and are unavailable if that message no longer exists.
Publish the updated Firestore rules before sending replies.
Messages are marked read when the recipient opens the conversation in a visible browser tab.
Existing messages without a receipt are treated as unread until their recipient opens the conversation.
After upgrading, publish the current Firestore rules again to permit recipients to update message receipts.

Messages are retained until the owner deletes a conversation from the inbox.
Deletion closes the chat and deletes its messages in batches before removing the conversation.
If deletion fails, retry it from the inbox.
The widget warns visitors not to share sensitive information.
Backups, Firebase logs, or other configured retention mechanisms may retain copies separately.

No email, push notifications, spam prevention, AI responses, ratings, or visit analytics are included.
Firebase's free quotas are limited, and anonymous users can create accounts and send messages, so monitor usage and configure budget or quota alerts before making the feature public.
Security Rules enforce ownership and message size, but do not by themselves provide robust rate limiting or protect against deliberate quota exhaustion.
The inbox currently loads all conversations and all messages in the selected conversation; add pagination and abuse controls before scaling beyond small personal use.
The inbox search matches the visitor code, latest-message preview, and message content.
Content search checks the 200 most recent messages in each conversation and requires read access to those messages under the published Firestore rules.

## Firebase AI connectivity test

The owner-only `/admin/ai-test` page makes a single short request to Gemini through Firebase AI Logic.
It does not save the test prompt or response and is separate from the guest chat.

Enable Firebase AI Logic with the Gemini Developer API in the Firebase console, register the web app with the reCAPTCHA Enterprise App Check provider, and enforce App Check for Firebase AI Logic.
Set `NEXT_PUBLIC_FIREBASE_APP_CHECK_RECAPTCHA_SITE_KEY` to the public site key from the reCAPTCHA Enterprise web key's setup instructions.
The key is a public site identifier, not a secret.
For local testing, the key must allow the local development hostname, or use a separately registered App Check debug token; do not put localhost on the production key.
Restart the development server after adding the environment variable, then sign in as the configured admin and open `/admin/ai-test`.

The test uses `gemini-3.8-flash` with a small output limit.
Model availability, free quotas, and billing requirements can change; monitor usage in Firebase and Google Cloud before enabling AI for public visitors.
