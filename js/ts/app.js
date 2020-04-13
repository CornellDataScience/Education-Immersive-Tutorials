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
const react_bootstrap_1 = require("react-bootstrap");
const tanmayImages = react_1.default.createElement(react_bootstrap_1.Nav.Link, { href: "https://www.google.com/search?tbm=isch&q=tanmay+bansal" }, "Google search of \"tanmay bansal\"");
const important = react_1.default.createElement(react_bootstrap_1.Nav.Link, { href: "https://data.whicdn.com/images/321678488/original.jpg" }, "Important");
class Main extends react_1.default.Component {
    render() {
        return react_1.default.createElement(mainBase_1.default, { NavbarItems: [tanmayImages, important] },
            react_1.default.createElement("div", null,
                react_1.default.createElement("h3", null, "Below is some markdown rendered by React!"),
                react_1.default.createElement(markdown_1.default, { src_fpath: webconfig_1.default.template_link("test.md") })));
    }
}
react_dom_1.default.render(react_1.default.createElement(Main, null), document.getElementById("main-container"));
//# sourceMappingURL=app.js.map