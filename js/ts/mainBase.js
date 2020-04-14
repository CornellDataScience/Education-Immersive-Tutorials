"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
// import { Navbar, Nav, NavDropdown } from 'react-bootstrap/lib/Navbar';
const Navbar_1 = __importDefault(require("react-bootstrap/Navbar"));
const Nav_1 = __importDefault(require("react-bootstrap/Nav"));
const NavDropdown_1 = __importDefault(require("react-bootstrap/NavDropdown"));
const webconfig_1 = __importDefault(require("./constants/webconfig"));
const stylesMain = __importStar(require("../styles/main.css")); //'../styles/main.css'; //'../styles/main.css';
const crossProjectInfo_1 = require("./constants/crossProjectInfo");
const react_image_1 = __importDefault(require("react-image"));
const navbarTutorialDropdown = react_1.default.createElement(NavDropdown_1.default, { id: "navbar-tutorial-dropdown", title: "Tutorials", key: "navbar-tutorial-dropdown" },
    react_1.default.createElement(NavDropdown_1.default.Item, { key: "navbar-tutorial-dropdown-svm", href: webconfig_1.default.template_link(crossProjectInfo_1.Project.SVM) }, "Support Vector Machines"),
    react_1.default.createElement(NavDropdown_1.default.Item, { key: "navbar-tutorial-dropdown-network", href: webconfig_1.default.template_link(crossProjectInfo_1.Project.Network) }, "Network Analysis"));
class MainNavbar extends react_1.default.Component {
    render() {
        return react_1.default.createElement(Navbar_1.default, { bg: "light", expand: "lg", id: this.props.id ? this.props.id : "main-navbar" },
            react_1.default.createElement(Navbar_1.default.Brand, { href: webconfig_1.default.template_link() },
                react_1.default.createElement(react_image_1.default, { className: stylesMain["main-navbar-logo"], src: webconfig_1.default.asset_link("cds-logo.png") }),
                "CDS Education ",
                react_1.default.createElement("b", null, "Immersive Tutorials")),
            navbarTutorialDropdown,
            react_1.default.createElement(Navbar_1.default.Toggle, { "aria-controls": "basic-navbar-nav" }),
            react_1.default.createElement(Navbar_1.default.Collapse, { id: "basic-navbar-nav" },
                react_1.default.createElement(Nav_1.default, { className: "mr-auto" }, this.props.children)));
    }
}
exports.MainNavbar = MainNavbar;
class MainFooter extends react_1.default.Component {
    year() {
        let today = new Date();
        return today.getFullYear();
    }
    render() {
        return react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("footer", null,
                react_1.default.createElement("hr", null),
                react_1.default.createElement("div", { className: "pull-left" },
                    react_1.default.createElement("div", { className: "footer-link" },
                        react_1.default.createElement("a", { href: webconfig_1.default.info1998_links.homepage, target: "_blank", rel: "noopener noreferrer" }, "Cornell Data Science | Education Team"))),
                react_1.default.createElement("div", { className: "pull-right" },
                    "\u00A9 ",
                    this.year(),
                    " Cornell Data Science")));
    }
}
exports.MainFooter = MainFooter;
class MainBase extends react_1.default.Component {
    render() {
        return react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(MainNavbar, { id: "main-base-navbar" }, this.props.NavbarItems),
            react_1.default.createElement("div", { id: "base-content-container", className: "main" }, this.props.children),
            react_1.default.createElement(MainFooter, null));
    }
}
exports.default = MainBase;
// import { useState } from 'react';
// import {
//   NavItem,
//   NavLink,
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
//   NavbarText
// } from 'reactstrap';
// export const Example = (props) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggle = () => setIsOpen(!isOpen);
//   return (
//     <div>
//       <Navbar color="light" light expand="md">
//         <NavbarBrand href="/">reactstrap</NavbarBrand>
//         <NavbarToggler onClick={toggle} />
//         <Collapse isOpen={isOpen} navbar>
//           <Nav className="mr-auto" navbar>
//             <NavItem>
//               <NavLink href="/components/">Components</NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
//             </NavItem>
//             <UncontrolledDropdown nav inNavbar>
//               <DropdownToggle nav caret>
//                 Options
//               </DropdownToggle>
//               <DropdownMenu right>
//                 <DropdownItem>
//                   Option 1
//                 </DropdownItem>
//                 <DropdownItem>
//                   Option 2
//                 </DropdownItem>
//                 <DropdownItem divider />
//                 <DropdownItem>
//                   Reset
//                 </DropdownItem>
//               </DropdownMenu>
//             </UncontrolledDropdown>
//           </Nav>
//           <NavbarText>Simple Text</NavbarText>
//         </Collapse>
//       </Navbar>
//     </div>
//   );
// }
//# sourceMappingURL=mainBase.js.map