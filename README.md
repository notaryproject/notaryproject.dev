
<br />
<p align="center">
  <a href="https://notaryproject.dev/">
  <img src="/static/Notary_project_logo.png" alt="Notary Project logo">
  </a>
  <br />
    <br />
    <b>Welcome to the Notary Project! This is the repository for the Notary Project website: https://notaryproject.dev/</b>
    <br/>
    <b>Our website, powered by Hugo and hosted on Netlify, and serves as your go-to hub for all things related to Notary Project and its associated repositories.</b>
    <br />
    <br />
</p>

---

## Introduction
[**Checkout Notary Project's website!**](https://notaryproject.dev/)

The Notary Project is a set of specifications and tools intended to provide a cross-industry standard for securing software supply chains by using authentic container images and other OCI artifacts. Notary Project specification and tooling provides signing and verification workflows for OCI artifacts, signature portability across OCI compliant registries, and integration with 3rd party key management solutions through a plugin model

This website serves as a comprehensive resource for information and documentation on the Notary Project.

> You can learn about the overall Notary Project and organization governance from [Notary Project README](https://github.com/notaryproject/.github/blob/main/README.md). For detailed information on how to use tools from the Notary Project (such as [Notation](https://github.com/notaryproject/notation)), see the [Notary Project documentation](https://notaryproject.dev/docs/). The remaining content in this README file is specifically intended for building and contributing to the Notary Project website.

## Installation
1. **Fork** this repository and **clone** it to your development computer.
2. From the terminal, navigate to the directory of your cloned repository.
3. Add the `notaryproject/notaryproject.dev` repository as a remote named **upstream**:

```console
git remote add upstream https://github.com/notaryproject/notaryproject.dev.git
```

Use npm to get the required NPM packages and install the git submodules, or can add `-lts` to install the latest LTS release of Node:
```console
npm install
```

>Note: By default, this process is performed on the `origin/main` branch. Ensure you perform this step on a branch based on `origin` before creating new branches based on `upstream/main`. Skipping this step may result in incorrect submodule installations.

### Building and Serving the Site
To locally serve the site at `localhost:8888`, run the following command:
```console
npm run serve
```

To build the site and check links:
```console
npm run build
```

## Cloud-Based IDE
Visit this link to launch it - [Gitpod.io IDE-Notary](https://gitpod.io/#https://github.com/notaryproject/notaryproject.dev). Start building, previewing, and making changes to this repository.

## Contributing
We welcome contributors to contribute to The Notary Project website! We are actively enhancing this site, so we encourage interested individuals to join us and contribute code and documentation. If you encounter any issues or want to share any ideas, please open an issue/PR. You can also provide feedback by joining our [Slack Community](https://app.slack.com/client/T08PSQ7BQ/CQUH8U287/). For more information, see the [contribution guide](https://github.com/notaryproject/notaryproject.dev/blob/main/CONTRIBUTING.md).

## Join Us
Join our growing community around the world! 
- Check out our official [Blogs](https://notaryproject.dev/blog/)
- Join our [Slack community](https://app.slack.com/client/T08PSQ7BQ/CQUH8U287/) in the  `#notaryproject` channel
- Follow us on [Twitter](https://twitter.com/NotaryProject).

## License
notaryproject.dev is licensed under [Apache 2.0](https://github.com/notaryproject/notaryproject.dev/blob/main/LICENSE).

The Notary Project documentation (e.g., `.md` files in `/content/docs`) is licensed under [CC-BY-4.0](https://github.com/notaryproject/notaryproject.dev/blob/main/LICENSE).

