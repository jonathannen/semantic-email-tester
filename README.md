# Test Your Semantic Markup

In my blog I was musing on [the use of JSON-LD "Semantic" Email and the potential for email bots](https://jonathannen.com/semantic-email.html). But I wanted to try out some semantic emails for myself.

Being able to view semantic snippests in GMail is one of it's most touted features. You can see a list of their supported JSON-LD markup at: https://developers.google.com/gmail/markup/reference/

Amazing stuff. But. It's surprisingly hard to test for yourself. Firstly, you need an email account with DKIM and SPF correctly configured. Even then, you need to be [whitelisted by Google](https://developers.google.com/gmail/markup/registering-with-google).

There is an option of sending emails to yourself to bypass this. However, I found sending via GMail SMTP wasn't enough. For some reason this doesn't include valid DKIM and SPF, surprisingly. The next option was to authenticate via the API, but that was a bunch of plumbing I didn't want to do (and would be a pain for others to replicate).

So my last resort was to generate all the combinations I needed and then turn into a Google Apps Script. You can take code.gs directly and head on over to https://script.google.com to run. Hit run and it'll send a series of emails 

# Instructions

This is just a generator.

    $ node index.js > code.gs

This re-generates the code.gs file, which is already checked in to this repo.

If you head over to https://script.google.com you'll be able to use this code.gs file to run the scripts.