"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
class KernelVisual extends React.Component {
    constructor(props) {
        super(props);
        this.width = 500;
        this.height = 500;
        this.margin = { top: 10, right: 30, bottom: 30, left: 60 };
        this.data = [[1, 1], [2, 2], [3, 3]];
        this.svgId = "kernel-visual-" + (KernelVisual.idCount++).toString();
        console.log(this.svgId);
    }
    componentDidMount() {
    }
    render() {
        return React.createElement(React.Fragment, null);
    }
}
KernelVisual.idCount = 0;
exports.default = KernelVisual;
//# sourceMappingURL=kernelVisual.js.map