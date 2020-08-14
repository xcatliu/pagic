# 部署

构建完成后的 `dist` 目录可以作为一个网站部署到你的服务器上。我们强烈推荐通过持续集成让部署过程自动化，下面列出几种常见的部署方式：

## GitHub Pages

GitHub Pages 是最常见的一种托管静态网站的服务，通过 GitHub 官方提供的 CI 工具 [GitHub Actions](https://github.com/features/actions)，我们可以轻松的实现提交代码后自动构建并部署网站。

实现自动部署网站到 GitHub Pages 非常简单，只需要在你的 GitHub 项目中创建一个 `.github/workflows/ci.yml` 文件，内容如下：

```yml
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
          deno-version: v1.2.3

      - name: Build gh-pages
        run: |
          curl -fsSL https://deno.land/x/install/install.sh | sh
          export DENO_INSTALL="/home/runner/.deno"
          export PATH="$DENO_INSTALL/bin:$PATH"
          deno --version
          deno install --unstable --allow-read --allow-write --allow-net -n pagic https://deno.land/x/pagic@v0.8.4/mod.ts
          pagic build

      - name: Deploy gh-pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          cname: ts.xcatliu.com
```

注意替换掉最后一行的 `ts.xcatliu.com` 为你自己的域名。

如果没有自己的域名的话，也可以使用 GitHub 提供的免费域名 `xxx.github.io`，此时只要将最后一行删除即可。注意此时可能需要修改 `pagic.config.ts` 中的 `root` 配置来支持子路径，详细可参考[配置文件](./config.md#root)章节。
