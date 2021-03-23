import React, { useContext } from 'react'; 
// import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import { FontSizeContext } from '../../context/fontSizeContext';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { withStyles } from '@material-ui/core/styles';

const StyledToggleButton = withStyles({
  root: {
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',

  },
  label: {
    textTransform: 'capitalize',
  },
})(ToggleButton);

export const FontSizeButton = () => {

  const [fontSize, setFontSize] = useContext(FontSizeContext); //eslint-disable-line no-unused-vars
  const [selected, setSelected] = React.useState(false);

  // const classes = useStyles();

  return (
    <div>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <StyledToggleButton onClick={() => setFontSize('small')}>sm</StyledToggleButton>
        <StyledToggleButton onClick={() => setFontSize('medium')}>mg</StyledToggleButton>
        <StyledToggleButton onClick={() => setFontSize('large')}>lg</StyledToggleButton>
      </ButtonGroup>
    </div>
  )
}
