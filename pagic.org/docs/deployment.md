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
          deno-version: v1.7.0

      - name: Build gh-pages
        run: |
          deno --version
          deno install --unstable --allow-read --allow-write --allow-net --allow-run --name=pagic https://deno.land/x/pagic@v1.4.0/mod.ts
          pagic build

      - name: Deploy gh-pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          cname: ts.xcatliu.com
```

Be sure to replace `ts.xcatliu.com` in the last line with your own domain.

If you don't have your own domain, you can also use the free domain `xxx.github.io` provided by GitHub, just delete the last line. Note that you may need to modify the `root` configuration in `pagic.config.ts` to support sub-paths.

For example: if your github project name is: `my-site` , then you should change `root` to `/my-site/`.

### Sub Directory

If you want your `pagic` run in the project sub directory, you should edit the `ci.yml` configure:

- Add `cd ./{sub-dir-name}` before `pagic build` in **Build gh-pages**.
- Change `publish_dir` to `./{sub-dir-name}/dist`

`{sub-dir-name}` is your sub-directory name.

## Vercel

Create a `deploy-vercel.sh` file in the project root directory:

```shell 
#!/bin/sh

# Install deno
curl -fsSL https://deno.land/x/install/install.sh | sh

# Install pagic
/vercel/.deno/bin/deno install --unstable --allow-read --allow-write --allow-net https://deno.land/x/pagic/mod.ts

# Pagic build
/vercel/.deno/bin/deno run --unstable --allow-read --allow-write --allow-net --allow-run https://deno.land/x/pagic/mod.ts build
```

Configure script command in `package.json`:

```diff
"scripts": {
+  "deploy:vercel": "sh deploy-vercel.sh"
},
```

Next, Complete the following steps on the vercel website:

1. [Home](https://vercel.com/dashboard) -- Overview -- [Import Project](https://vercel.com/import/git)
2. Enter the URL of a git repository, Import git repository, click continue
3. Configure project information

   - Enter project name, framework preset defaults to Other
   - Build and Output Settings, Build Command: `npm run deploy:vercel` Output Directory: `dist` (You can also fill in your own configuration)

4. Click Deploy，Wait for deployment to complete to visit 🎊
