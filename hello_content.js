const Hello = () => {
    const [count, setCount] = React.useState(0);
    return (React.createElement(React.Fragment, null,
        React.createElement("h1", null, "Hello world"),
        React.createElement("p", null,
            "Count: ",
            count),
        React.createElement("button", { onClick: () => setCount(count + 1) }, "Count +1")));
};
export default Hello;
