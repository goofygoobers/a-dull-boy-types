import React, { useContext } from 'react'; 
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import { FontSizeContext } from '../../context/fontSizeContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export const FontSizeButton = () => {

  const [fontSize, setFontSize] = useContext(FontSizeContext); //eslint-disable-line no-unused-vars

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button onClick={() => setFontSize('small')}>sm</Button>
        <Button onClick={() => setFontSize('medium')}>mg</Button>
        <Button onClick={() => setFontSize('large')}>lg</Button>
      </ButtonGroup>
    </div>
  )
}
