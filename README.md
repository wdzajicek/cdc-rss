# Latest US & International Outbreaks and News Releases from the CDC

[![Deploy Jekyll site to Pages](https://github.com/wdzajicek/cdc-rss/actions/workflows/deploy.yml/badge.svg)](https://github.com/wdzajicek/cdc-rss/actions/workflows/deploy.yml)

**See it live: [https://wdzajicek.github.io/cdc-rss/](https://wdzajicek.github.io/cdc-rss/)**

This project uses the CDC's RSS feed (along with Google Sheet's `=IMPORTFEED()` to bypass CORS issues) to fetch the latest US outbreaks, international outbreaks, and news releases from the CDC website.

-----

## Prerequisites

* [NVM](https://github.com/nvm-sh/nvm), run `nvm use` in project folder, OR:
  * [Nodejs](https://nodejs.org) - install the version specified in `.nvmrc`.
* Ruby version specified in `.ruby-version` file.


## Installation
```bash
git clone git@github.com:wdzajicek/cdc-rss.git
cd cdc-rss
npm i && bundle i
```

## Build

```bash
# Production build with minified assets
npm run production

# Development build with inline CSS and development bundle
npm run development
```

## GitHub Pages

A GitHub action is used to build the site and deploy to GitHub pages.
Pushing to the `master` branch triggers the action.
See the actions file: [`.github/workflows/deploy.yml`](https://github.com/wdzajicek/cdc-rss/blob/master/.github/workflows/deploy.yml)
