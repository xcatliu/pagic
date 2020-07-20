const Footer = ({ sidebar }) => {
    if (sidebar) {
        return null;
    }
    return (React.createElement("footer", null,
        "Powered by",
        ' ',
        React.createElement("a", { href: "https://github.com/xcatliu/pagic", target: "_blank" }, "Pagic")));
};
export default Footer;
