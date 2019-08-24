## React Select

A react dropdown multiselect component powered by <a href='https://github.com/bvaughn/react-virtualized'>react-virtualized</a> for ability to display a long list of values

### Installation

```yarn add @dmitriig/react-select```
### Props
```typescript
// Options should be provided as {value,label} pairs 
export interface IItem {
  value: number,
  label: string
}

// Component props
export interface IReactSelectProps {
  // possible options
  options: IItem[],
  // string placeholder
  placeholder: string,
  // callback on selection change
  onChange: (items: IItem[]) => void,
  // custom cell renderer
  rowRenderer?: (item: any, index: number) => void,
  // custom container style
  style?: any,
  // custom input style
  inputStyle?: any,
  // custom list dropdown style
  listStyle?: any,
  // custom list row height
  listRowHeight?: number,
  // custom input font size
  inputFontSize?: number,
  // custom message for no search results
  noResultsMessage?: string
  // controlled selection array
  selection?: IItem[]
}
```

### Usage
##### Basic
```typescript
// Format data into value and label pair
const options = [];
for (let i = 0; i < 10000; i++) {
  options.push({
    value: i,
    label: Math.random().toString(36).substring(7)
  })
}

return <ReactSelect options={options} placeholder="Select something.."
                 onChange={(items)=>console.log(items)}/>
```

Demo: https://codesandbox.io/embed/hopeful-jang-zzv8e?fontsize=14

##### Controlled
```javascript
function Controlled(props) {
  const {options} = props;
  // use an initial selection
  const [selection] = React.useState(options.slice(0, index));
  const [flag, setFlag] = React.useState(false);

  // dynamically update the selection  
  function handleAdd() {
    selection.push(options[index++]);
    setFlag(!flag);
  }

  // dynamically update the selection
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
```
