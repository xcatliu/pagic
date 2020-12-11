# Deployment

The output `dist` directory can be deployed to your server as a website. We strongly recommend to use CI to automate the deployment process. Here are a few common deployment methods:

## GitHub Pages

GitHub Pages is the most common service for hosting static websites. Through the official CI tool [GitHub Actions](https://github.com/features/actions) provided by GitHub, we can automatically build and deploy the website.

It is very simple to automatically build and deploy the website to GitHub Pages. You only need to create a `.github/workflows/ci.yml` file in your GitHub project with the following content:

```yml {33}
name: gh-pages

on:
  push:
    branches:
      - master

jobs:
  build-and-deploy:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v2

      - name: Setup deno
        uses: denolib/setup-deno@v2
        with:
          deno-version: v1.6.0

      - name: Build gh-pages
        run: |
          deno --version
          deno install --unstable --allow-read --allow-write --allow-net --allow-run --name=pagic https://deno.land/x/pagic@v1.0.0-beta.3/mod.ts
          pagic build

      - name: Deploy gh-pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          cname: ts.xcatliu.com
```

Be sure to replace `ts.xcatliu.com` in the last line with your own domain.

If you don't have your own domain, you can also use the free domain `xxx.github.io` provided by GitHub, just delete the last line. Note that you may need to modify the `root` configuration in `pagic.config.ts` to support sub-paths. For details, please refer to the [Config](./config.md#root) chapter.
