# [House Visual Study Bible](https://hvsb.app/)

A mobile-first Visual Bible Study web app built for Dr. H. Wayne House's study Bible.

## Tech stack

Frontend:

[<img src="https://img.shields.io/badge/SvelteJS-3-orange.svg"></a>](https://svelte.dev/)
[<img src="https://img.shields.io/badge/SvelteKit-@next-orange.svg"></a>](https://kit.svelte.dev/)
[<img src="https://img.shields.io/badge/Tailwind-3-blue.svg"></a>](https://tailwindcss.com/)

Backend:

- Vercel SSR
- Firebase Authentication
- Firebase Cloud Firestore
- Firebase Cloud Functions, see [FUNCTIONS.md](docs/FUNCTIONS.md) to learn how to emulate functions locally (out-of-date)
- Firebase Storage
- Algolia Instant Search

## Contributing

Choose an already approved task from the [Development Roadmap](https://github.com/HVSBible/hvsb/projects/1) or [create an issue](https://github.com/HVSBible/hvsb/issues/new/choose) to propose a new feature (please await discussion before creating a pull request). Read [CONTRIBUTING.md](docs/CONTRIBUTING.md) to understand how to commit your changes using Git flow and then follow the instructions in _Developing_ to get started.

## Developing

Install dependencies with `npm install` and then run `npm run dev` then open on [localhost:3000](http://localhost:3000). The app will hot reload as you make changes. As an easy alternative you can use the Gitpod button here to open a ready-built dev environment w/ npm dependencies already installed:

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/HVSBible/hvsb)

\*_Note that on localhost you will not see the live (prod) site's data, but rather the data from the dev database, which allows us to develop and make changes freely without worrying about deleting or corrupting important data._

### Design Inspiration

The simple and clean look was inspired by https://github.com/ayndqy/notecards.

## Development Tools in Use

- Prettier for automatic code styling on save and commit (added automatically by `create-svelte`) - use the Prettier extension to activate on-save for all non-svelte files (otherwise this will only happen via the `prettier --write` cli command)
- ESLint for automatic linting to improve code quality on commit (added automatically by `create-svelte`)
- simple-git-hooks + lint-staged, Note: manually run `npx simple-git-hooks` every time the simple-git-hooks configuration in package.json is changed
- LighthouseCI
- Jest and WallabyJS for unit and integration tests
- Playwright (TODO) and possibly Checkly for E2E tests
