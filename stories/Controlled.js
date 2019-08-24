import * as React from 'react';
import ReactSelect from "../src/ReactSelect";
import {action} from "@storybook/addon-actions";

let index = 5;
const styles = {
  button: {
    padding: '10px 15px',
    backgroundColor: 'grey',
    color: 'white',
    fontWeight: 'bold',
    display: 'inline-block',
    margin: '10px 20px',
    cursor: 'pointer'
  }
}

function Controlled(props) {
  const {options} = props;
  const [selection] = React.useState(options.slice(0, index));
  const [flag, setFlag] = React.useState(false);

  function handleAdd() {
    selection.push(options[index++]);
    setFlag(!flag);
  }

  function handleRemove() {
    selection.splice(0, 1);
    setFlag(!flag);
  }

  return <div style={{padding: '20px 20px'}}>
    <div>
      <div style={styles.button} onClick={handleAdd}>
        Add a token
      </div>
      <div style={styles.button} onClick={handleRemove}>
        Remove a token
      </div>
    </div>
    <ReactSelect options={options} placeholder="Select something.." selection={selection}
                 onChange={action('changed')}/>
  </div>
}

export default Controlled;
