import React from 'react';
import PropTypes from 'prop-types';
import Highlight from 'react-highlight.js/';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import CodeIcon from '@material-ui/icons/Code';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import style from '@Main/projects/networkAnalysis/styles/Tutorial.module.css'

export default function TextCard(props) {

  function codeConverter(array: Array<string>, fn) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
      var mapping = fn(array[i]);
      result = result.concat(mapping);
    }
    return result;
  }

  const { post } = props;
  const [open, setOpen] = React.useState(false);
  const revealCode = () => {
    setOpen(true);
  }
  const revealText = () => {
    setOpen(false);
  }
  const codeText = (open: boolean) => {
    if (!open) return null;
    var result = post.code;
    result = codeConverter(result.split('\n '), function (part: string) {
      return [part, <br></br>];
    });
    return (
      <Highlight className="python">
        {result}
      </Highlight>
    );
  };
  const explainText = (open: boolean) => {
    if (open) return null;
    return (
      <div>
        {post.description}
      </div>
    );
  };
  return (
    <div className={style.explanations} >
      <Grid container xs={12}>
        <Grid item xs={9}>
          <Typography component="h2" variant="h5">
            <b>{post.title}</b>
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={revealText}>
            <TextFieldsIcon />
          </Button>
          <Button onClick={revealCode}>
            <CodeIcon />
          </Button>
        </Grid>
      </Grid>

      <div className={style.textspacing}>
        {explainText(open)}
        {codeText(open)}

      </div>
    </div >
  );
}

TextCard.propTypes = {
  post: PropTypes.object,
};