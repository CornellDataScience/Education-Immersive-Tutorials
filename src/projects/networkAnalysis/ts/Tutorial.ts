import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import TextCard from './TextCard';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import style from './Tutorial.module.css';
import VisualCard from './VisualCard';


const mainFeaturedPost = {
  title: 'Network Analysis',
  description:
    "A Beginner's Guide To What It Is, How To Implement, and Why It Matters",
  image: 'https://miro.medium.com/max/4800/1*bgVMjq95tEVbBKYqL7AGxA.png',
  imgText: 'main image description',
};

interface Posts {
  title: string;
  description: string;
}

const textPosts: Posts[] = [
  {
    title: 'What is a Node?',
    description:
      'A node is blah..',
  },
];

const visualPosts: Posts[] = [
  {
    title: 'What is a Node?',
    description:
      'A node is blah..',
  },
];

export default function Tutorial() {

  return (
    <React.Fragment>
    <CssBaseline />
    < div >
    <Container className= { style.container } maxWidth = "lg" >
      <Header title="Network Analysis" />
        <main>
        <MainFeaturedPost post={ mainFeaturedPost } />
          < Grid container spacing = { 4} >
          {
            textPosts.map((post) => (
              <TextCard key= { post.title } post = { post } />
              ))
          }
  {
    visualPosts.map((post) => (
      <VisualCard />
    ))
  }
  </Grid>


    < /main>
    < Footer title = "Contact" description = "[CDS Email] - Tanmay, Raye, Jerry" />
      </Container>
      < /div>
      < /React.Fragment>
  );
}