"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("bootstrap/dist/css/bootstrap.min.css");
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const markdown_1 = __importDefault(require("@Main/ts/markdown"));
const webconfig_1 = __importDefault(require("@Main/ts/constants/webconfig"));
const crossProjectInfo_1 = require("@Main/ts/constants/crossProjectInfo");
const mainBase_1 = __importDefault(require("@Main/ts/mainBase"));
const kernelVisual_1 = __importDefault(require("./kernelVisual"));
class Main extends react_1.default.Component {
    render() {
        return react_1.default.createElement(mainBase_1.default, { NavbarItems: [] },
            react_1.default.createElement("div", null,
                react_1.default.createElement("h3", null, "SVM"),
                react_1.default.createElement("hr", null),
                react_1.default.createElement("hr", null),
                react_1.default.createElement("hr", null),
                react_1.default.createElement("a", { href: webconfig_1.default.template_link(crossProjectInfo_1.Project.Network) }, "This link brings us the the Network page"),
                react_1.default.createElement("hr", null),
                react_1.default.createElement(kernelVisual_1.default, null),
                react_1.default.createElement("h3", null, "Below is some markdown rendered by React!"),
                react_1.default.createElement(markdown_1.default, { src_fpath: webconfig_1.default.template_link(crossProjectInfo_1.Project.SVM, "kernels.md") }),
                react_1.default.createElement("hr", null),
                react_1.default.createElement("hr", null),
                react_1.default.createElement("h3", null, "Example markdown (test.md):"),
                react_1.default.createElement(markdown_1.default, { src_fpath: webconfig_1.default.template_link(crossProjectInfo_1.Project.SVM, "test.md") })));
    }
}
react_dom_1.default.render(react_1.default.createElement(Main, null), document.getElementById("main-container"));
//# sourceMappingURL=app.js.map