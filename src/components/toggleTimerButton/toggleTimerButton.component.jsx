import React, { useContext } from 'react';
import CheckIcon from '@material-ui/icons/Check';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { makeStyles } from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { TimerHiddenContext } from '../../context/timerHiddenContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
    backgroundColor: '#22232c',
    maxWidth: '40px',
    maxHeight: '40px',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function ToggleTimerButton() {
  const [selected, setSelected] = React.useState(false);
  const [timerHidden, setTimerHidden] = useContext(TimerHiddenContext);

  const classes = useStyles();

  return (
    <div>
      <ButtonGroup>
        <ToggleButton
          className={classes.root}
          value="check"
          selected={selected}
          onChange={() => {
            setSelected(!selected);
          }}
          onClick={() => {setTimerHidden(!timerHidden)}}
        >
          <CheckIcon/>
        </ToggleButton>
      </ButtonGroup>
    </div>
  );
}

