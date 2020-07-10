const Layout = ({ title, content }) => (React.createElement("html", null,
    React.createElement("head", null,
        React.createElement("title", null, title),
        React.createElement("meta", { charSet: "utf-8" })),
    React.createElement("body", null, content)));
export default Layout;
