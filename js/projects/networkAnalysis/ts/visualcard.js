"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const prop_types_1 = __importDefault(require("prop-types"));
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
const Tutorial_module_css_1 = __importDefault(require("@Main/projects/networkAnalysis/styles/Tutorial.module.css"));
function VisualCard(props) {
    const { post } = props;
    return (react_1.default.createElement(Grid_1.default, { className: Tutorial_module_css_1.default.vis, item: true, xs: 12, md: 6 },
        react_1.default.createElement("img", { src: post.image, alt: post.imageText })));
}
exports.default = VisualCard;
VisualCard.propTypes = {
    post: prop_types_1.default.object,
};
//# sourceMappingURL=visualcard.js.map