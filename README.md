# Notion, but Cooler! 🌈

Host Notion on your own domain, with custom scripts & styling! (Not created or maintained by Notion.)

Code forked from [this Google Doc](https://docs.google.com/document/d/1pJ0Qeuqblp7NYQn3fhFttJKfXsdCuzkAoLnWqLBCjd8/edit) for hosting on Glitch!

**Disclaimer: This is a very hacky method that could break at any time.** Customize Notion at your own risk, and enjoy it while it still works!

(Last updated May 4, scroll down for the changelog. Pull requests welcome on [Github](https://github.com/pixelyunicorn/notion-but-cooler)!)

## Examples 🖼

If you want inspiration, here are some styled Notion pages remixed from this project:

- Melody's Notion Page: [notion.melody.dev](https://notion.melody.dev) / [style.css](https://glitch.com/edit/#!/melody-notion?path=public%2Fstyle.css)

## How to Setup Your Project 👋

1. Remix this project!
1. Open up the Glitch editor, click the dropdown in the top left corner, and rename your project!
1. Open up server.js - this is where your configration goes.
1. Change `MY_DOMAIN` (server.js, line 18) to reflect your new project name (project-name.glitch.me).
1. In Notion, share your desired page with the public, and copy the page link.
1. Paste your public page link into `START_PAGE` (server.js, line 19)
1. Congrats! Your **Notion but Cooler 🌈** page is now live!

## What's Next? 🤔

In server.js, the `INJECT_INTO_HEAD` & `INJECT_INTO_FOOT` variables contain what gets injected into the HTML as the page loads.

- In `INJECT_INTO_HEAD`, you can include stylesheets, analytics scripts, meta tags and more.
- In `INJECT_INTO_HEAD`, there is also a section for meta tags to control what previews appear when the page is shared on chat apps and socail media. Make it your own by adding a title, description, social card, and favicon for your Notion page!
- In `INJECT_INTO_FOOT`, you can include javascript and other HTML code: this include analytics scripts, live chats, Glitch project details, and more.

I've also included some blank selectors in public/style.css to help get you started!

## Adding Custom Colours 🎨

Notion has a light mode (dark text on light bg) and a dark mode (light text on dark bg).

In the 5th/6th sections of public/style.css, you can edit the background colours of both modes to your liking.

Changing text colours consistently for the entire document is nearly impossible, however you can add text colours to individual items (like page titles).

(Note that `color` in CSS is spelled without a `u`, thanks America! 🇺🇸)

## Adding Google Fonts ✏️

1. Open up [fonts.google.com](https://fonts.google.com) and find a few fonts you like (for header, content, and monospace fonts).
1. Notion uses 400/500/700 weight (normal/book/bold) fonts. Add fonts with these weights if possible.
1. Copy your embed code that starts with `<link...`
1. Paste your embed code into `INJECT_INTO_HEAD` (server.js, line 26), replacing the existing line containing Google Fonts.
1. Update the top 4 sections of public/style.css with your desired fonts!

## Custom Domains 🌍

To add a custom domain on Glitch, you need to have 2 thanks from people. Alternatively, you can host this yourself!

1. Follow these steps: [glitch.com/help/custom-domain](https://glitch.com/help/custom-domain/)
1. Change MY_DOMAIN variable to reflect your new domain (server.js, line 17)
1. Wait up to 48 hours for changes to roll out

(PS If all you wanted to do was host Notion on a custom domain, without additional styling, you can clear the contents of public/style.css.)

## Limitations ⛔️

- This is a very hacky way of doing things that could break at any time.
- You may be able to access the Notion login or home but you can't actually login.
- Inline database titles may not follow your font settings.

## Changelog 🆕

**style.css**

- Minor Update #1 on May 3, 2020: fixed code for frosted topbar on dark mode
- Minor Update #2 on May 4, 2020: added some more blank selectors for editor sidebars (for theming desktop app)

**server.js**

- Nothing here yet!

## Made by Melody ✨

Original project can be found at [glitch.com/~notion](https://glitch.com/~notion).

You can find me online at [melody.dev](https://melody.dev) or [@pixelyunicorn](https://twitter.com/pixelyunicorn).
