import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import ReactDOM from 'react-dom';
import Markdown from './markdown';
import webconfig from './constants/webconfig';
import MainBase from './mainBase'
import Nav from "react-bootstrap/Nav";

const tanmayImages: React.ReactNode = <Nav.Link href="https://www.google.com/search?tbm=isch&q=tanmay+bansal">Google search of "tanmay bansal"</Nav.Link>;

const important: React.ReactNode = <Nav.Link href="https://data.whicdn.com/images/321678488/original.jpg">Important</Nav.Link>;

class Main extends React.Component {

  render() {
    return <MainBase NavbarItems={[tanmayImages, important]}>
      <div>
        <h3>Below is some markdown rendered by React!</h3>
        <Markdown src_fpath={webconfig.template_link("test.md")} />
      </div>
    </MainBase>
  }
}

ReactDOM.render(<Main />, document.getElementById("main-container"));



