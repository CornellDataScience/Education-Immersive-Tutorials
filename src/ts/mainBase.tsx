import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import webconfig from '@Main/ts/constants/webconfig';
import * as stylesMain from '../styles/main.css';

export type MainBaseProps = {
  /**
   * The items to be displayed on the navbar. These should be bootstrap navbar
   * items, such as [Nav.Link], [Nav.Item], [Navbar.Text], [NavDropdown], etc.
   * Each element of this list should have either "id" or a "key" attribute (mostly
   * to prevent annoying warning messages in the console).
   */
  NavbarItems: React.ReactNode[];
}

export class MainNavbar extends React.Component<{ id: string }> {

  render() {
    return <Navbar bg="light" expand="lg" id={this.props.id ? this.props.id : "main-navbar"}>
      <Navbar.Brand href={webconfig.template_link()}>
        <image className={stylesMain["navbar-logo"]}>[insertlogo]</image>
        CDS Education <b>Immersive Tutorials</b>
      </Navbar.Brand>
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
