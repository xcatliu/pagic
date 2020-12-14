# Usage

This chapter will introduce how to install and use Pagic.

## Installation

### Install Deno

Pagic is based on Deno, so you need to install Deno before using it.

```bash
# Shell (Mac, Linux):
curl -fsSL https://deno.land/x/install/install.sh | sh
```

Other installation methods (PowerShell, Homebrew, etc.) can be found in [Deno official website](https://deno.land/#installation)。

### Install Pagic

Execute the following command to install the latest version of Pagic:

```bash
deno install --unstable --allow-read --allow-write --allow-net --allow-run --name=pagic https://deno.land/x/pagic/mod.ts
```

If you need to install a specific version of Pagic, you can add the version in the URL:

```bash
deno install --unstable --allow-read --allow-write --allow-net --allow-run --name=pagic https://deno.land/x/pagic@v1.0.0/mod.ts
```

> Pagic will only require the necessary permissions. If you want to further restrict Pagic's runtime permissions, you can limit it by specifying the read and write directories:
>
> ```bash
> deno install --unstable --allow-read=/home/xcatliu/site --allow-write=/home/xcatliu/site --allow-net --allow-run --name=pagic https://deno.land/x/pagic/mod.ts
> ```

### Install via Docker

Execute the following command to install Pagic via Docker:

```bash
alias pagic='docker run -it --rm -v $PWD:/pagic xcatliu/pagic'
```

It should be noted that executing the above command will only take effect in the current shell. If you want to take effect permanently, it is recommended to write it in `~/.bashrc` or `~/.bash_profile` or `~/.zshrc`.

## Initialize the project

To use `pagic` to build a static website, the project must include at least one `pagic.config.ts` config file and one `md/tsx` page file:

```
site/
├── pagic.config.ts
└── README.md
```

Of course, `pagic.config.ts` can only export an empty object at the beginning:

```ts
export default {};
```

`README.md` can be a simple markdown file:

```md
# Hello world
```

> You can create the above `site` project by running the following command:
>
> ```bash
> mkdir site && cd site && echo "export default {};" > pagic.config.ts && echo "# Hello world" > README.md
> ```

You can also run `pagic init` and select `site` to generate a `pagic.config.ts` file in the current directory.

## Run `pagic build`

Next, we can use the `pagic build` command in the project. Its basic usage is as follows:

```bash
# Build a static website
pagic build [options]
# --watch   Watch file changes to rebuild
# --serve   Start local service, preview static website
# --port    Specify the port of the local service
```

Try running the following code in the `site` directory:

```bash
pagic build --watch --serve
```

Then open http://127.0.0.1:8000/ with a browser, and see if it shows `Hello world`?

Note that the build result is in the dist directory (some minor files are hidden here):

```
site/
|── dist    # Output directory
|   └── index.html
├── pagic.config.ts
└── README.md
```

> Normal markdown files will be constructed as HTML files with the same name, but `README.md` is constructed as `index.html`, which is a kind of humanized processing, which is convenient for displaying the content of the homepage in GitHub and static websites at the same time .
