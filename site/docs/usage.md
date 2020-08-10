# 基本用法

本章会介绍 Pagic 的安装和使用方式。

## 安装

### 安装 Deno

Pagic 是基于 Deno 实现的，所以使用前需要先安装 Deno。

```bash
# Shell (Mac, Linux):
curl -fsSL https://deno.land/x/install/install.sh | sh
```

其他安装方式（PowerShell、Homebrew 等）可以参考 [Deno 官网](https://deno.land/#installation)。

中国大陆用户可以[使用镜像加速](https://x.deno.js.cn/)安装。

### 安装 Pagic

执行以下命令以安装最新版本的 Pagic：

```bash
deno install --unstable --allow-read --allow-write --allow-net --name pagic https://deno.land/x/pagic/mod.ts
```

若需要安装指定版本的 Pagic，则可以在安装的 url 中加入版本号：

```bash
deno install --unstable --allow-read --allow-write --allow-net --name pagic https://deno.land/x/pagic@v1.0.0/mod.ts
```

> Pagic 只会要求必须用到的权限，如果你希望更进一步限制 Pagic 运行时的权限，可以通过指定读写目录的方式加以限制：
>
> ```bash
> deno install --unstable --allow-read=/home/xcatliu/site --allow-write=/home/xcatliu/site --allow-net https://deno.land/x/pagic@v1.0.0/mod.ts
> ```

## 初始化项目

要使用 `pagic` 构建静态网站，则该项目**至少需要包含**一个 `pagic.config.ts` 配置文件和一个 `md/tsx` 页面文件：

```
site/
├── pagic.config.ts
└── README.md
```

当然，`pagic.config.ts` 一开始可以只导出一个空对象：

```ts
export default {};
```

`README.md` 可以是一个简单的 Markdown 文件：

```md
# Hello world
```

> 你可以运行以下命令一次性创建出上面的 `site` 项目：
>
> ```bash
> mkdir site && cd site && echo "export default {};" > pagic.config.ts && echo "# Hello world" > README.md
> ```

## 运行 `pagic` 命令

接下来，我们就可以在项目中使用 `pagic` 命令了。它的基本用法如下：

```bash
# 构建静态网站
pagic build [options]
# --watch   监听文件变动以重新构建
# --serve   启动本地服务，预览静态网站
# --port    指定本地服务的端口号
```

不妨试试运行以下代码：

```bash
pagic build --watch --serve
```

然后用浏览器打开 `http://127.0.0.1:8000/`，看看是不是显示出 `Hello world` 了呢？

> 构建结果在 dist 目录中。
>
> 需要注意的是，一般的 Markdown 文件会被构建为同名的 HTML 文件，但是 `README.md` 被构建为了 `index.html`，这是一种人性化的处理，方便同时在 GitHub 中和静态网站中展示首页的内容。
