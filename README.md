## React Select

A react dropdown multiselect component powered by <a href='https://github.com/bvaughn/react-virtualized'>react-virtualized</a> for ability to display a long list of values

### Installation

```yarn add @dmitriig/react-select```

### Usage
##### Basic
```$xslt
// Format data into value and label pair
const options = [];
for (let i = 0; i < 10000; i++) {
  options.push({
    value: i,
    label: Math.random().toString(36).substring(7)
  })
}

...
<ReactSelect options={options} placeholder="Select something.."
                 onChange={(items)=>console.log(items)}/>
```

Demo: https://codesandbox.io/embed/hopeful-jang-zzv8e?fontsize=14
