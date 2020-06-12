// @deno-types="https://deno.land/x/types/react/v16.13.1/react.d.ts"

const Layout = ({ title, content }) => (React.createElement("html", null,
    React.createElement("head", null,
        React.createElement("title", null, title),
        React.createElement("meta", { charSet: "utf-8" })),
    React.createElement("body", null, content)));
export default Layout;
