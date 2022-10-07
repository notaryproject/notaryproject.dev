# Contributing

1. Fork this repo and clone it to your development computer.
1. From the terminal, navigate to the directory for your cloned repo.
1. Add the main repo as a remote named `upstream`
    ```console
    git remote add upstream https://github.com/notaryproject/notaryproject.dev.git
    ```
1. Use `nvm` to install the latest [LTS release][] of **Node**.
    ```console
    nvm install --lts
    ```
1. Use `npm` to get NPM packages and install the git submodules. 
    ```console
    npm install
    ```
    **NOTE:** By default, this is done on the `origin/main` branch. This step must be performed on a branch based from `origin` before you start creating new branches based on `upstream/main`. If you skip this step, the submodules will fail to install correctly.

## Build or serve the site

To locally serve the site at [localhost:8888][], run the following command:

```console
$ npm run serve
```

To build and check links, run these commands:

```console
$ npm run build
$ npm run check-links
```

## Submitting a PR

1. Fetch the latest from `upstream` and create a new branch for your change.
    ```console
    git fetch upstream
    git checkout -b <branch_name> upstream/main
    ``` 
1. Make your changes.
1. Build and test the site on your development computer to verify your changes appear as you intended.
1. If you updated any CLI commands, manifest examples, or code/configuration examples, please test those changes as well to ensure they work as you intended.
1. Commit and push your changes.
    ```console
    git add <files_changed>
    git commit -m <commit_message>
    git push origin HEAD
    ```
1. File a PR to [notaryproject.dev](https://github.com/notaryproject/notaryproject.dev).
