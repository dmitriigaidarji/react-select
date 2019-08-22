import React from 'react';
import ReactSelect from '../src/ReactSelect'
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
// import {linkTo} from '@storybook/addon-links';
// storiesOf('Button', module)
//   .add('with text', () => (
//     <Button>Hello Button</Button>
// ))
// .add('with emoji', () => (
//   <Button><span role="img" aria-label="so cool">😀 😎 👍 💯</span></Button>
// ));


const options = [];
for (let i = 0; i < 10000; i++) {
  options.push({
    value: i,
    label: Math.random().toString(36).substring(7)
  })
}
storiesOf('ReactSelect', module)
  .add('Standard', () => {
    return <div style={{padding: '20px 20px'}}>
      <ReactSelect options={options} placeholder="Select something.."
                 onChange={action('changed')}/>
    </div>
  })
  .add('Overflow', () => <div style={{padding: '20px'}}>
    <div style={{overflow: 'hidden', width: '400px', height: '150px', backgroundColor: '#e2f3ff'}}>
      <ReactSelect options={options} placeholder="Select something.."
                 onChange={action('changed')}/>
    </div>
  </div>)
  .add('Bottom', () => <div style={{padding: '20px'}}>
    <div style={{
      position: 'absolute',
      bottom: '20px',
      left: '20px'
    }}>
      <ReactSelect options={options} placeholder="Select something.."
                 onChange={action('changed')}/>
    </div>
  </div>)
  // .add('Promise', () => {
  //   const resultPromise = new Promise((resolve, reject) => {
  //     setTimeout(() => resolve(options), 2000)
  //   })
  //   return <div style={{padding: '20px 20px'}}>
  //     <ReactSelect options={resultPromise} placeholder="Select something.."
  //                onChange={action('changed')}/>
  //   </div>
  // })
  .add('Font styles', () => <div style={{padding: '20px'}}>
    <div style={{fontSize: '200%'}}>
      Big font text
      <ReactSelect options={options} placeholder="Select something.."
                 onChange={action('changed')} inputFontSize={16}/>
    </div>
    <div style={{marginTop: '50px'}}>
      Normal font text
      <ReactSelect options={options} placeholder="Select something.."
                 onChange={action('changed')}/>
    </div>
    <div style={{fontSize: '50%', marginTop: '50px'}}>
      Small font text
      <ReactSelect options={options} placeholder="Select something.."
                 onChange={action('changed')}/>
    </div>
  </div>)
  .add('Custom cell', () => <div style={{padding: '20px'}}>
    <ReactSelect options={options} placeholder="Select something.."
               onChange={action('changed')} listRowHeight={50} rowRenderer={(item, index) =>
      <div>
        <div>{index} Custom cell {item.value}</div>
        <div>{item.label}</div>
      </div>
    }/>
  </div>)

