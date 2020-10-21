import { dateFormatter } from './_utils.js';
const Posts = (props) => {
    const { config, contentTitle, blog } = props;
    return (React.createElement("section", { className: "main" },
        React.createElement("div", { className: "main_article" },
            React.createElement("article", null,
                contentTitle,
                React.createElement("ul", { className: "main_posts" }, blog === null || blog === void 0 ? void 0 : blog.posts.map(({ title, link, date }) => (React.createElement("li", { key: link },
                    React.createElement("time", { dateTime: date }, dateFormatter['YYYY-MM-DD'](date)),
                    React.createElement("a", { href: `${config.root}${link}` }, title)))))))));
};
export default Posts;
