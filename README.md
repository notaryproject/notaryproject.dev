<br />
<p align="center">
  <img src="https://github.com/sanjayk0508/notaryproject.dev/assets/102804548/63986f73-9669-4efe-a571-4d1935e0a3d4" alt="image 36">
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

The Notary Project enables signatures for  [OCI Artifacts](https://github.com/opencontainers/artifacts), such as container images, to be stored in an [OCI-compliant](https://github.com/opencontainers/oci-conformance) registry. It consists of various components, including requirements, scenarios, CLI tools, and libraries that implement these requirements.

This website serves as a comprehensive resource for information and documentation on the Notary Project.

> For detailed information on how to use tools from The Notary Project (such as [Notation](https://github.com/notaryproject/notation)), including quickstarts, tutorials, and other helpful guides, see the [Notary Project documentation](https://notaryproject.dev/docs/). The remaining content in this README file and other support files in this repository are specifically intended for building and contributing to the website.

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
Join our growing community around the world! Check out our official [Blogs](https://notaryproject.dev/blog/). Join our [Slack community](https://app.slack.com/client/T08PSQ7BQ/CQUH8U287/) - `#notaryproject` channel for any assistance and discussions. And follow us on [Twitter](https://twitter.com/NotaryProject).

## License
notaryproject.dev is licensed under [Apache 2.0](https://github.com/notaryproject/notaryproject.dev/blob/main/LICENSE).

The Notary Project documentation (e.g., `.md` files in `/content/docs`) is licensed under [CC-BY-4.0](https://github.com/notaryproject/notaryproject.dev/blob/main/LICENSE).

