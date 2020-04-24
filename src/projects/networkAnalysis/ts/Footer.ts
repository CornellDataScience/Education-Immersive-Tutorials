import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import style from './Tutorial.module.css';
function Copyright() {
  return (
    <Typography className={style.whitetext} variant="body2" align="center">
      {'Copyright ©  Cornell Data Science '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Footer(props) {
  const { description, title } = props;

  return (
    <footer className={style.footer}>
      <Container maxWidth="lg" className={style.container}>
        <Typography variant="h6" align="center" gutterBottom className={style.whitetext}>
          {title}
        </Typography>
        <Typography variant="subtitle1" align="center" className={style.whitetext} component="p">
          {description}
        </Typography>
        <Copyright />
      </Container>
    </footer>
  );
}

Footer.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};