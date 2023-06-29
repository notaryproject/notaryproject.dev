<br />
<p align="center">
  <img src="https://github.com/sanjayk0508/notaryproject.dev/assets/102804548/63986f73-9669-4efe-a571-4d1935e0a3d4" alt="image 36">
  <br />
    <br />
    <b>Welcome to the Notary Project! Our website serves as a comprehensive resource for information and documentation on Notary. Powered by Hugo and hosted on Netlify, it's your go-to hub for all things related to Notary.</b>
    <br />
    <br />
</p>

---

## Introduction
[**Checkout Notary Project's website!**](https://notaryproject.dev/)

The Notary project enables multiple signatures of an [OCI Artifact](https://github.com/opencontainers/artifacts), such as container images, to be stored in an [OCI-compliant](https://github.com/opencontainers/oci-conformance) registry. It consists of various components, including requirements, scenarios, CLI tools, and libraries that implement these requirements.

This website serves as a comprehensive resource for information and documentation on Notary. Whether you're new to Notary or an experienced user, this is your go-to hub for all things related to Notary.

> For detailed information on how to use Notary, including quickstarts, tutorials, and other helpful guides, please refer to the comprehensive [Notary documentation](https://notaryproject.dev/docs/). The remaining content in this README file and other support files in this repository are specifically intended for building and contributing to the website.

## Installation
1. **Fork** this repository and **clone** it to your development computer.
2. From the terminal, navigate to the directory of your cloned repository.
3. Add the main repository as a remote named **upstream**:

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

## Cloud-Based Website
Visit this link to launch it - [Gitpod.io IDE-Notary](https://gitpod.io/#https://github.com/notaryproject/notaryproject.dev). Start building, previewing, and making changes to this repository.

## Contributing
We welcome contributors to contribute to the Notary website! We are still in the development phase, we eagerly encourage interested individuals to join us. Whether you're interested in updating code or improving documentation. If you encounter any issues or want to share any ideas, simply open an issue/PR or  let us know by joining our [Slack Community](https://app.slack.com/client/T08PSQ7BQ/CQUH8U287/). If you wish to help, you can learn more about how you can contribute to this project in the [contribution guide](https://github.com/notaryproject/notaryproject.dev/blob/main/CONTRIBUTING.md).

## Join Us
Join our growing community around the world! Check out our official [Blogs](https://notaryproject.dev/blog/). Join our [Slack community](https://app.slack.com/client/T08PSQ7BQ/CQUH8U287/) - `#notaryproject` channel for any assistance and discussions. And follow us on [Twitter](https://twitter.com/NotaryProject).

## License
notaryproject.dev is licensed under [Apache 2.0](https://github.com/notaryproject/notaryproject.dev/blob/main/LICENSE).

The Notary Project documentation (e.g., `.md` files in `/content/docs`) is licensed under [CC-BY-4.0](https://github.com/notaryproject/notaryproject.dev/blob/main/LICENSE).

