import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import ReactDOM from 'react-dom';
import Markdown from './markdown';
import webconfig from './constants/webconfig';
import MainBase from './mainBase'
import { Jumbotron, Nav, } from 'react-bootstrap';

const jerry: React.ReactNode = <Nav.Link href="https://www.google.com/search?tbm=isch&q=jerry+sun">Important</Nav.Link>;

class Main extends React.Component {

  render() {
    return <MainBase NavbarItems={[jerry]}>
      <div>
        <Markdown src_fpath={webconfig.template_link("test.md")} />
        <Jumbotron>
          <h1>Welcome!</h1>
          <p>
            This is a website containing various data science and machine learning tutorials.
          </p>
        </Jumbotron>
      </div>
    </MainBase>
  }
}

ReactDOM.render(<Main />, document.getElementById("main-container"));



