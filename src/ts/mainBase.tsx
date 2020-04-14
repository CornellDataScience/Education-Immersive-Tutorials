import React from 'react';
// import { Navbar, Nav, NavDropdown } from 'react-bootstrap/lib/Navbar';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import webconfig from './constants/webconfig';
import * as stylesMain from '../styles/main.css' //'../styles/main.css'; //'../styles/main.css';
import { Project } from './constants/crossProjectInfo';
import Image from 'react-image'

export type MainBaseProps = {
  /**
   * The items to be displayed on the navbar. These should be bootstrap navbar
   * items, such as [Nav.Link], [Nav.Item], [Navbar.Text], [NavDropdown], etc.
   * Each element of this list should have either "id" or a "key" attribute (mostly
   * to prevent annoying warning messages in the console).
   */
  NavbarItems: React.ReactNode[];
}

const navbarTutorialDropdown: React.ReactNode =
  <NavDropdown id="navbar-tutorial-dropdown" title="Tutorials" key="navbar-tutorial-dropdown">
    <NavDropdown.Item key="navbar-tutorial-dropdown-svm" href={webconfig.template_link(Project.SVM)}>Support Vector Machines</NavDropdown.Item>
    <NavDropdown.Item key="navbar-tutorial-dropdown-network" href={webconfig.template_link(Project.Network)}>Network Analysis</NavDropdown.Item>
  </NavDropdown>

export class MainNavbar extends React.Component<{ id: string }> {

  render() {
    return <Navbar bg="light" expand="lg" id={this.props.id ? this.props.id : "main-navbar"}>
      <Navbar.Brand href={webconfig.template_link()}>
        <Image className={stylesMain["main-navbar-logo"]} src={webconfig.asset_link("cds-logo.png")} />
        CDS Education <b>Immersive Tutorials</b>
      </Navbar.Brand>
      {navbarTutorialDropdown}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {this.props.children}
        </Nav>
      </Navbar.Collapse>
    </Navbar >
  }
}

export class MainFooter extends React.Component {

  private year(): number {
    let today = new Date();
    return today.getFullYear();
  }
  render() {
    return <>
      <footer>
        <hr />
        <div className="pull-left">
          <div className="footer-link">
            <a href={webconfig.info1998_links.homepage}
              target="_blank" rel="noopener noreferrer">
              Cornell Data Science | Education Team
          </a>
          </div>
        </div>
        <div className="pull-right">
          &copy; {this.year()} Cornell Data Science
      </div>
      </footer>
    </>
  }
}

export default class MainBase extends React.Component<MainBaseProps> {

  render() {
    return <>
      <MainNavbar id="main-base-navbar">
        {this.props.NavbarItems}
      </MainNavbar>
      <div id="base-content-container" className="main">
        {this.props.children}
      </div>
      <MainFooter />
    </>
  }
}


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
