import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import ReactDOM from 'react-dom';
import Markdown from './markdown';
import webconfig from './constants/webconfig';
import MainBase from './mainBase'
import { NavDropdown } from "react-bootstrap";
import { Project } from './constants/crossProjectInfo'

const navbarTutorialDropdown: React.ReactNode =
  <NavDropdown id="navbar-tutorial-dropdown" title="Tutorials" key="navbar-tutorial-dropdown">
    <NavDropdown.Item key="navbar-tutorial-dropdown-svm" href={webconfig.template_link(Project.SVM)}>Support Vector Machines</NavDropdown.Item>
    <NavDropdown.Item key="navbar-tutorial-dropdown-network" href={webconfig.template_link(Project.Network)}>Network Analysis</NavDropdown.Item>
  </NavDropdown>


class Main extends React.Component {

  render() {
    return <MainBase NavbarItems={[navbarTutorialDropdown]}>
      <div>
        <h3>Below is some markdown rendered by React!</h3>
        <Markdown src_fpath={webconfig.template_link("test.md")} />
      </div>
    </MainBase>
  }
}

ReactDOM.render(<Main />, document.getElementById("main-container"));



