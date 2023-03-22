# Latest news releases from the CDC

**See it live: [https://wdzajicek.github.io/cdc-rss/](https://wdzajicek.github.io/cdc-rss/)**

This project uses the CDC's RSS feed (along with Google Sheet's `=IMPORTFEED()` to bypass CORS issues) to fetch the latest news releases from the CDC website.

-----

## Prerequisites

* [NVM](https://github.com/nvm-sh/nvm), run `nvm use` in project folder, OR
* Nodejs - install the version specified in `.nvmrc`.
* `ruby-2.6.3` and Jekyll


## Installation
```bash
git clone git@github.com:wdzajicek/cdc-rss.git
cd cdc-rss
npm i && bundle i
```

## Build

```bash
npm run production
npm run development
npm run gh-pages
```
