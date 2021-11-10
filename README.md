# Notary Project Website

The [notaryproject.dev][] website, built using [Hugo][] and hosted on [Netlify][].

## Build prerequisites

### Local

To build and serve the site, you'll need the latest [LTS release][] of **Node**.
Like Netlify, we use **[nvm][]**, the Node Version Manager, to install and
manage Node versions:

```console
$ nvm install --lts
```

#### Setup

 1. Clone this repo.
 2. From a terminal window, change to the cloned repo directory.
 3. Get NPM packages and git submodules, including the the [Docsy][] theme:
    ```console
    $ npm install
    ```

#### Build or serve the site

To locally serve the site at [localhost:8888][], run the following command:

```console
$ npm run serve
```

To build and check links, run these commands:

```console
$ npm run build
$ npm run check-links
```

### Cloud IDE

This repository has been setup to use a [Gitpod.io](https://gitpod.io) remote development environment. The for example, visiting [https://gitpod.io/#https://github.com/notaryproject/notaryproject.dev](https://gitpod.io/#https://github.com/notaryproject/notaryproject.dev) launches an in browser editor and preview environment for the [NotaryProject.dev](https://notaryproject.dev) site.

# License

notaryproject.dev is licensed under an [Apache 2.0 license](./LICENSE).

The Notary Project documentation (e.g., `.md` files in the `/content/docs` folder) is licensed under a [CC-BY-4.0 license](./LICENSE).

The notaryproject.dev site uses [Docsy](https://www.docsy.dev/), and was cloned from the [etcd-io/website](https://github.com/etcd-io/website/) repo to capture CNCF specific edits.

[Docsy]: https://www.docsy.dev
[Hugo]: https://gohugo.io
[localhost:8888]: http://localhost:8888
[LTS release]: https://nodejs.org/en/about/releases/
[Netlify]: https://netlify.com
[notaryproject.dev]: https://notaryproject.dev/
[nvm]: https://github.com/nvm-sh/nvm/blob/master/README.md#installing-and-updating
