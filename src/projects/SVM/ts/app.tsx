import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import ReactDOM from 'react-dom';
import Markdown from '@Main/ts/markdown';
import webconfig from '@Main/ts/constants/webconfig';
import { Project } from '@Main/ts/constants/crossProjectInfo'
import MainBase from '@Main/ts/mainBase'

class Main extends React.Component {

  render() {
    return <MainBase NavbarItems={[]}>
      <div>
        <h3>SVM</h3>
        <hr />
        <hr />
        <hr />
        <a href={webconfig.template_link(Project.Network)}>This link brings us the the Network page</a>
        <hr />
        <h3>Below is some markdown rendered by React!</h3>
        <Markdown src_fpath={webconfig.template_link(Project.SVM, "test.md")} />
      </div>
    </MainBase>
  }
}

ReactDOM.render(<Main />, document.getElementById("main-container"));



