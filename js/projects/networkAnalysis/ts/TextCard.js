"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const prop_types_1 = __importDefault(require("prop-types"));
const react_highlight_js_1 = __importDefault(require("react-highlight.js/"));
const Typography_1 = __importDefault(require("@material-ui/core/Typography"));
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const Code_1 = __importDefault(require("@material-ui/icons/Code"));
const TextFields_1 = __importDefault(require("@material-ui/icons/TextFields"));
const Tutorial_module_css_1 = __importDefault(require("@Main/projects/networkAnalysis/styles/Tutorial.module.css"));
function TextCard(props) {
    function codeConverter(array, fn) {
        var result = [];
        for (var i = 0; i < array.length; i++) {
            var mapping = fn(array[i]);
            result = result.concat(mapping);
        }
        return result;
    }
    const { post } = props;
    const [open, setOpen] = react_1.default.useState(false);
    const revealCode = () => {
        setOpen(true);
    };
    const revealText = () => {
        setOpen(false);
    };
    const codeText = (open) => {
        if (!open)
            return null;
        var result = post.code;
        result = codeConverter(result.split('\n '), function (part) {
            return [part, react_1.default.createElement("br", null)];
        });
        return (react_1.default.createElement(react_highlight_js_1.default, { className: "python" }, result));
    };
    const explainText = (open) => {
        if (open)
            return null;
        return (react_1.default.createElement("div", null, post.description));
    };
    return (react_1.default.createElement("div", { className: Tutorial_module_css_1.default.explanations },
        react_1.default.createElement(Grid_1.default, { container: true, xs: 12 },
            react_1.default.createElement(Grid_1.default, { item: true, xs: 9 },
                react_1.default.createElement(Typography_1.default, { component: "h2", variant: "h5" },
                    react_1.default.createElement("b", null, post.title))),
            react_1.default.createElement(Grid_1.default, { item: true, xs: 3 },
                react_1.default.createElement(Button_1.default, { onClick: revealText },
                    react_1.default.createElement(TextFields_1.default, null)),
                react_1.default.createElement(Button_1.default, { onClick: revealCode },
                    react_1.default.createElement(Code_1.default, null)))),
        react_1.default.createElement("div", { className: Tutorial_module_css_1.default.textspacing },
            explainText(open),
            codeText(open))));
}
exports.default = TextCard;
TextCard.propTypes = {
    post: prop_types_1.default.object,
};
//# sourceMappingURL=textcard.js.map