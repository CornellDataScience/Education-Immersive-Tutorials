import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import style from '@Main/projects/networkAnalysis/styles/Tutorial.module.css'

export default function VisualCard(props) {
  const { post } = props;

  return (
    <Grid className={style.vis} item xs={12} md={6}>
      <img src={post.image} alt={post.imageText} />
    </Grid>
  );
}

VisualCard.propTypes = {
  post: PropTypes.object,
};