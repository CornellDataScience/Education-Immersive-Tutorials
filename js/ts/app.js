"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("bootstrap/dist/css/bootstrap.min.css");
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const markdown_1 = __importDefault(require("./markdown"));
const webconfig_1 = __importDefault(require("./constants/webconfig"));
const mainBase_1 = __importDefault(require("./mainBase"));
const crossProjectInfo_1 = require("./constants/crossProjectInfo"); // hope this is good coding convention
const react_bootstrap_1 = require("react-bootstrap");
const core_1 = require("@material-ui/core");
const jerry = react_1.default.createElement(react_bootstrap_1.Nav.Link, { href: "https://www.google.com/search?tbm=isch&q=jerry+sun" }, "Important");
// function TutorialPrevs(props) {
//   return (
//     props.posts.map((post) => (
//       <li> {post.title} </li>
//       // <Card style={{ display: 'inline-block', width: 500, margin: "2rem" }}>
//       //   <CardActionArea>
//       //     <CardMedia
//       //       component="img"
//       //       height="250"
//       //       image={post.href}
//       //       alt={post.title}
//       //     />
//       //     <CardContent>
//       //       <Typography gutterBottom variant="h5" component="div">
//       //         {post.title}
//       //       </Typography>
//       //       <Typography component="p">
//       //         {post.desc}
//       //       </Typography>
//       //     </CardContent>
//       //     <CardActions disableSpacing>
//       //       <Button href={post.href} variant="contained" size="small">Learn More</Button>
//       //     </CardActions>
//       //   </CardActionArea>
//       // </Card>
//     ))
//   );
// }
class Main extends react_1.default.Component {
    render() {
        return react_1.default.createElement(mainBase_1.default, { NavbarItems: [jerry] },
            react_1.default.createElement("div", null,
                react_1.default.createElement(react_bootstrap_1.Jumbotron, null,
                    react_1.default.createElement("h1", null, "Welcome!"),
                    react_1.default.createElement("p", null, "This is a website containing various data science and machine learning tutorials.")),
                react_1.default.createElement(markdown_1.default, { src_fpath: webconfig_1.default.template_link("test.md") }),
                react_1.default.createElement(core_1.Card, { style: { display: 'inline-block', width: 500, margin: "2rem" } },
                    react_1.default.createElement(core_1.CardActionArea, null,
                        react_1.default.createElement(core_1.CardMedia, { component: "img", height: "250", image: "https://miro.medium.com/max/4800/1*bgVMjq95tEVbBKYqL7AGxA.png", alt: "Networks background" }),
                        react_1.default.createElement(core_1.CardContent, null,
                            react_1.default.createElement(core_1.Typography, { gutterBottom: true, variant: "h5", component: "div" }, "Networks Analysis")),
                        react_1.default.createElement(core_1.CardActions, { disableSpacing: true },
                            react_1.default.createElement(core_1.Button, { href: webconfig_1.default.template_link(crossProjectInfo_1.Project.Network), variant: "contained", size: "small" }, "Learn More")))),
                react_1.default.createElement(core_1.Card, { style: { display: 'inline-block', width: 500, margin: "2rem" } },
                    react_1.default.createElement(core_1.CardActionArea, null,
                        react_1.default.createElement(core_1.CardMedia, { component: "img", height: "250", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/SVM_margin.png/300px-SVM_margin.png", alt: "SVM background" }),
                        react_1.default.createElement(core_1.CardContent, null,
                            react_1.default.createElement(core_1.Typography, { gutterBottom: true, variant: "h5", component: "div" }, "Support Vector Machines")),
                        react_1.default.createElement(core_1.CardActions, { disableSpacing: true },
                            react_1.default.createElement(core_1.Button, { href: webconfig_1.default.template_link(crossProjectInfo_1.Project.SVM), variant: "contained", size: "small" }, "Learn More"))))));
    }
}
function TutorialPrevs(props) {
    return (react_1.default.createElement("ul", null, props.posts.map((post) => react_1.default.createElement("li", null, post.title))));
}
const numbers = [1, 2, 3, 4, 5];
react_dom_1.default.render(react_1.default.createElement(Main, null), document.getElementById("main-container"));
const posts = [
    {
        title: "Networks Analysis",
        desc: "A beginner's guide to a mathematical analysis of networks",
        image: "https://miro.medium.com/max/4800/1*bgVMjq95tEVbBKYqL7AGxA.png",
    },
    {
        title: "Support Vector Machines",
        desc: "Guide to SVMs: supervised learning algorithms for classification/regression problems",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/SVM_margin.png/300px-SVM_margin.png",
    }
];
//# sourceMappingURL=app.js.map