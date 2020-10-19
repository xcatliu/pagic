import { Helmet } from 'https://cdn.pagic.org/react-helmet@6.1.0/esnext/react-helmet.js';
const Head = ({ config, title, head, outputPath, contentHasKatex, isDark }) => {
    const [katexCssLoadOnce, setKatexCssLoadOnce] = React.useState(contentHasKatex);
    if (contentHasKatex && !katexCssLoadOnce)
        setKatexCssLoadOnce(true);
    const scriptSetIsDark = `
    const shouldSetIsDark = document.cookie.includes('is_dark=1') ? true : document.cookie.includes('is_dark=0') ? false : window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (shouldSetIsDark) {
      document.documentElement.classList.add('is_dark');
      document.getElementById('prismTheme').href = "${config.root}assets/prism_tomorrow.css";
    }
  `;
    return (React.createElement("head", null,
        React.createElement(Helmet, null,
            React.createElement("meta", { charSet: "utf-8" }),
            React.createElement("meta", { httpEquiv: "x-ua-compatible", content: "ie=edge" }),
            React.createElement("title", null, title ? (outputPath !== 'index.html' ? `${title} · ${config.title}` : title) : config.title),
            config.description && React.createElement("meta", { name: "description", content: config.description }),
            React.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
            React.createElement("link", { rel: "stylesheet", href: `${config.root}assets/index.css` }),
            React.createElement("link", { id: "prismTheme", rel: "stylesheet", href: isDark ? `${config.root}assets/prism_tomorrow.css` : `${config.root}assets/prism.css` }),
            katexCssLoadOnce && (React.createElement("link", { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css", integrity: "sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X", crossOrigin: "anonymous" })),
            React.createElement("script", null, scriptSetIsDark)),
        head));
};
export default Head;
