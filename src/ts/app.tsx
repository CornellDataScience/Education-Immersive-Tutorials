import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import ReactDOM from 'react-dom';
import Markdown from './markdown';
import webconfig from './constants/webconfig';
import MainBase from './mainBase'
import { Project } from './constants/crossProjectInfo'; // hope this is good coding convention
import * as stylesMain from '../styles/main.css' //'../styles/main.css'; //'../styles/main.css';
import { Jumbotron, Nav, } from 'react-bootstrap';
import { Button, Card, CardActions, CardContent, CardActionArea, CardMedia, Link, Typography } from '@material-ui/core';

const jerry: React.ReactNode = <Nav.Link href="https://www.google.com/search?tbm=isch&q=jerry+sun">Important</Nav.Link>;

class Main extends React.Component {

  render() {
    return <MainBase NavbarItems={[jerry]}>
      <div>
        <Jumbotron>
          <h1>Welcome!</h1>
          <p>
            This is a website containing various data science and machine learning tutorials.
          </p>
        </Jumbotron>

        <Markdown src_fpath={webconfig.template_link("test.md")} />

        <Card style={{ display: 'inline-block', width: 500, margin: "2rem" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="250"
              image="https://miro.medium.com/max/4800/1*bgVMjq95tEVbBKYqL7AGxA.png"
              alt="Networks background"
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Networks Analysis
              </Typography>
            </CardContent>

            <CardActions disableSpacing>
              <Button href={webconfig.template_link(Project.Network)} variant="contained" size="small">Learn More</Button>
            </CardActions>
          </CardActionArea>
        </Card>

        <Card style={{ display: 'inline-block', width: 500, margin: "2rem" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="250"
              image="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/SVM_margin.png/300px-SVM_margin.png"
              alt="SVM background"
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Support Vector Machines
              </Typography>
            </CardContent>

            <CardActions disableSpacing>
              <Button href={webconfig.template_link(Project.SVM)} variant="contained" size="small">Learn More</Button>
            </CardActions>
          </CardActionArea>
        </Card>

      </div>
    </MainBase>
  }
}

ReactDOM.render(<Main />, document.getElementById("main-container"));



