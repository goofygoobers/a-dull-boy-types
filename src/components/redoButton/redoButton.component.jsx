import React from 'react'; 
import { FaRedoAlt } from "react-icons/fa";

const RedoButton = (props) => {
  return(
    <button>
      <FaRedoAlt onClick={props}/>
    </button>
  )
}

export default RedoButton;