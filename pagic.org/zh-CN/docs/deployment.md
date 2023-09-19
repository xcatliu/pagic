# 部署

构建完成后的 `dist` 目录可以作为一个网站部署到你的服务器上。我们强烈推荐通过持续集成让部署过程自动化，下面列出几种常见的部署方式：

## GitHub Pages

GitHub Pages 是最常见的一种托管静态网站的服务，通过 GitHub 官方提供的 CI 工具 [GitHub Actions](https://github.com/features/actions)，我们可以轻松的实现提交代码后自动构建并部署网站。

实现自动部署网站到 GitHub Pages 非常简单，只需要在你的 GitHub 项目中创建一个 `.github/workflows/ci.yml` 文件，内容如下：

```yml {33}
name: gh-pages

on:
  push:
    branches:
      - master

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup deno
        uses: denoland/setup-deno@v1
        with:
          deno-version: vx.x.x

      - name: Build gh-pages
        run: |
          deno --version
          deno install --unstable --allow-read --allow-write --allow-net --allow-env --allow-run --name=pagic https://deno.land/x/pagic@v1.6.3/mod.ts
          pagic build

      - name: Deploy gh-pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          cname: ts.xcatliu.com
```
请确认已经开启了 Actions 的读写权限，如果没有开启会导致构建失败，要开启它，请到 Settings - Actions - General - Workflow permissions 找到 Read and write permissions 选择并保存。

注意替换掉最后一行的 `ts.xcatliu.com` 为你自己的域名。

如果没有自己的域名的话，也可以使用 GitHub 提供的免费域名 `xxx.github.io`，此时只要将最后一行删除即可。注意此时需要修改 `pagic.config.ts` 中的 `root` 配置来支持子路径，详细可参考[配置文件](./config.md#root)章节。

比如：你的项目名为 `my-site` ，你就需要将 `root` 设置为 `/my-site/`

### 子目录

如果你希望你的 `pagic` 运行于仓库的子目录中，你需要对 `ci.yml` 进行简单编辑：

- 在 `Build gh-pages` 中的 `pagic build` 前面添加 `cd ./{sub-dir-name}`
- 将 `publish_dir` 更换为 `./{sub-dir-name}/dist`（加上子目录的路径）

`{sub-dir-name}` 就是你子目录的名称。

## Vercel

在项目根目录创建 `deploy-vercel.sh` 文件：

```shell 
#!/bin/sh

# Install deno
curl -fsSL https://deno.land/x/install/install.sh | sh

# Install pagic
/vercel/.deno/bin/deno install --unstable --allow-read --allow-write --allow-net https://deno.land/x/pagic/mod.ts

# Pagic build
/vercel/.deno/bin/deno run --unstable --allow-read --allow-write --allow-net --allow-env --allow-run https://deno.land/x/pagic/mod.ts build
```

在 `package.json` 配置脚本命令：

```diff
"scripts": {
+  "deploy:vercel": "sh deploy-vercel.sh"
},
```

接下来，在 [Vercel](https://vercel.com/) 网站完成以下步骤：

1. 在[首页](https://vercel.com/dashboard)点击导入项目 (Import Project)
2. [填写](https://vercel.com/import/git)仓库地址，从 Github [导入](https://vercel.com/import)要部署的仓库，点击继续
3. 配置项目信息

   - 填写项目名，框架预设默认 Other 即可
   - 打包与输出配置，构建命令: `npm run deploy:vercel` 输出目录: `dist` (也可以根据自己的配置填写)

4. 点击部署，等待部署完成即可访问 🎊
