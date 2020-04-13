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
        <h3>Network Analysis</h3>
        <hr />
        <hr />
        <hr />
        <a href={webconfig.template_link(Project.SVM)}>This link brings us the the SVM page</a>
        <h3>Below is some markdown rendered by React!</h3>
        <hr />
        <Markdown src_fpath={webconfig.template_link(Project.Network, "test.md")} />
      </div>
    </MainBase>
  }
}

ReactDOM.render(<Main />, document.getElementById("main-container"));



