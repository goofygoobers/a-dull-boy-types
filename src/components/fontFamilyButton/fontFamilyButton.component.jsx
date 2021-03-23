import React, { useContext } from 'react'; 
import ToggleButton from '@material-ui/lab/ToggleButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { FontFamilyContext } from '../../context/fontFamilyContext';
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

export const FontFamilyButton = () => {

  const [theme, setTheme] = useContext(FontFamilyContext); //eslint-disable-line no-unused-vars



  return (
    <div>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <StyledToggleButton onClick={() => setTheme('papyrus')}>Papyrus</StyledToggleButton>
        <StyledToggleButton onClick={() => setTheme('helvetica')}>Helvetica</StyledToggleButton>
        <StyledToggleButton onClick={() => setTheme('monospace')}>Monospace</StyledToggleButton>
      </ButtonGroup>
    </div>
  )
}
