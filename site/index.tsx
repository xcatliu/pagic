// @deno-types="https://deno.land/x/pagic@v0.8.6/src/types/react/v16.13.1/react.d.ts"
import React from 'https://dev.jspm.io/react@16.13.1';

const style = `
h2 {
  font-weight: normal;
}
.main_article {
  width: 960px;
  max-width: 960px;
  padding-bottom: 0;
}
.cards {
  display: flex;
  justify-content: center;
  margin: 3rem -1rem 0 -1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}
.cards > div {
  width: 20rem;
  padding: 0 1rem;
}
.cards ul {
  color: var(--color-text-muted);
}
.btn {
  padding: 0.5rem 1rem;
  margin: 0 1rem;
  border: 0;
  cursor: pointer;
  opacity: 0.9;
  font-size: 14px;
  text-decoration: none;
  background-color: var(--color-border);
  color: var(--color-text);
}
.btn:hover {
  text-decoration: none;
}
.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-background);
}
.btn:hover {
  opacity: 1;
}
@media screen and (max-width: 44rem) {
  h2 {
    text-align: center;
  }
  .cards {
    flex-direction: column;
  }
  .cards > div {
    width: 100vw;
  }
  .cards ul {
    text-align: center;
    padding-left: 0;
    list-style: none;
  }
  pre {
    margin-left: -1rem;
    margin-right: -1rem;
  }
}
`;

const IndexPage = () => (
  <>
    <div>
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <h1
        style={{
          marginTop: '3.5rem',
          textAlign: 'center',
          fontSize: '64px',
          color: 'hsl(210, 70%, 50%)'
        }}
      >
        <img
          src="/assets/pagic_logo.png"
          style={{
            width: 128,
            verticalAlign: 'bottom',
            margin: -16,
            opacity: 1
          }}
        />
        agic
      </h1>
      <p
        style={{
          fontSize: '28px',
          marginTop: '2rem',
          textAlign: 'center',
          color: 'var(--color-text-muted)'
        }}
      >
        Deno + React 驱动的静态网站生成器
      </p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '2rem'
        }}
      >
        <a className="btn btn-primary" href="/docs/introduction.html">
          开始使用
        </a>
        <a className="btn" href="/demos/">
          示例网站
        </a>
      </div>
    </div>
    <div className="cards">
      <div>
        <h2>配置简单</h2>
        <ul>
          <li>约定优于配置</li>
          <li>
            一个入口 <code>pagic.config.ts</code>
          </li>
          <li>符合直觉的设计</li>
        </ul>
      </div>
      <div>
        <h2>支持 md 和 tsx</h2>
        <ul>
          <li>支持 md 文件渲染成页面</li>
          <li>支持 tsx 文件渲染成页面</li>
          <li>预渲染生成静态 HTML，加载后作为 SPA 运行</li>
        </ul>
      </div>
      <div>
        <h2>主题和插件</h2>
        <ul>
          <li>内置 default, docs, blog 等主题，支持黑暗模式</li>
          <li>构建过程由插件组成，可随意组合</li>
          <li>通过 url 引入第三方主题或插件</li>
        </ul>
      </div>
    </div>
    <h2>只需几行命令，快来体验吧</h2>
    <pre
      style={{
        fontSize: '1rem'
      }}
    >
      <code
        dangerouslySetInnerHTML={{
          __html: `# 安装 pagic
deno install --unstable --allow-read --allow-write --allow-net --name=pagic https://deno.land/x/pagic/mod.ts

# 创建 pagic.config.ts 和 README.md
mkdir site && cd site && echo "export default {};" > pagic.config.ts && echo "# Hello world" > README.md

# 运行 pagic
pagic build`
        }}
      />
    </pre>
  </>
);

export default IndexPage;
