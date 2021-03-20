import React, { useContext } from 'react'; 
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import { FontFamilyContext } from '../../context/fontFamilyContext';

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

export const FontFamilyButton = () => {

  const [theme, setTheme] = useContext(FontFamilyContext); //eslint-disable-line no-unused-vars

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button onClick={() => setTheme('papyrus')}>Papyrus</Button>
        <Button onClick={() => setTheme('helvetica')}>Helvetica</Button>
        <Button onClick={() => setTheme('monospace')}>Monospace</Button>
      </ButtonGroup>
    </div>
  )
}
