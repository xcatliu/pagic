const Hello = () => (React.createElement("div", null,
    React.createElement("h1", { onClick: () => {
            console.log(123);
        } }, "Hello World"),
    React.createElement("a", { href: "./index.html" }, "index")));
export default Hello;
export const frontMatter = {
    title: 'Hello World',
    author: 'xcatliu'
};
