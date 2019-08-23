import * as React from "react"
import {List} from 'react-virtualized'
import './ReactSelect.scss';
import CloseIcon from "./CloseIcon";
import {debounce} from "./helpers";

interface IItem {
  value: number,
  label: string
}

export interface IReactSelectProps{
  options: IItem[] | object,
  placeholder: string,
  onChange: (items: IItem[]) => void,
  rowRenderer?: (item: any, index: number) => void,
  style?: any,
  inputStyle?: any,
  listStyle?: any,
  listRowHeight?: number,
  inputFontSize?: number,
  noResultsMessage?: string
}

interface IState {
  listItems: any[],
  options: any[],
  query: string,
  tokens: IItem[],
  inputWidth: number,
  listWidth: number,
  isFocused: boolean,
  isLoading: boolean,
  listRowHeight: number
}

const maxRows = 10;

export class ReactSelect extends React.Component <IReactSelectProps, IState> {
  static defaultProps = {
    inputFontSize: 12,
    noResultsMessage: 'No results'
  };

  static onInputClick(event: any) {
    event.stopPropagation();
  }

  static css(element: any, property: any) {
    return window.getComputedStyle(element, null).getPropertyValue(property);
  }

  queryInput = React.createRef<HTMLInputElement>();
  containerRef = React.createRef<HTMLDivElement>();
  wrapperRef = React.createRef<HTMLDivElement>();
  textTestRef = React.createRef<HTMLDivElement>();
  listRef = React.createRef<HTMLDivElement>();

  debouncedResize() {
  };

  constructor(props: IReactSelectProps) {
    super(props);
    this.state = {
      listItems: [],
      options: [],
      query: '',
      tokens: [],
      inputWidth: 20,
      listWidth: 100,
      isFocused: false,
      isLoading: false,
      listRowHeight: props.listRowHeight ? props.listRowHeight : 24
    };

    this.debouncedResize = debounce(this.onResize.bind(this), 200);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.onInputFocus = this.onInputFocus.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addToken = this.addToken.bind(this);
    this.removeToken = this.removeToken.bind(this);
    this.rowClick = this.rowClick.bind(this);
    this.rowRenderer = this.rowRenderer.bind(this);
    this.onWrapperClick = this.onWrapperClick.bind(this);
    this.calculateTextSize = this.calculateTextSize.bind(this);
  }


  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    window.removeEventListener('resize', this.debouncedResize);
  }

  componentDidMount() {
    const {placeholder, options, listRowHeight} = this.props;
    const self = this;
    // Load options
    if (options instanceof Array) {
      const newOptions = options.sort((a: IItem, b: IItem) => a.label > b.label ? 1 : -1);
      this.setState({options: newOptions, listItems: newOptions.slice()})
    } else if (options instanceof Promise) {
      this.setState({isLoading: true});
      options.then((data) => {
        const {query} = self.state;
        const newOptions = data.sort((a: IItem, b: IItem) => a.label > b.label ? 1 : -1);
        if (query.length > 0) {
          self.setState({
            options: newOptions,
            listItems: newOptions.filter((item: IItem) =>
              item.label.toLowerCase().indexOf(query.toLowerCase()) !== -1
            ),
            isLoading: false
          })
        } else {
          const newOptions = data.sort((a: IItem, b: IItem) => a.label > b.label ? 1 : -1);
          self.setState({
            options: newOptions,
            listItems: newOptions.slice(),
            isLoading: false
          })
        }
      })
    } else {
      throw Error('Options type is neither Array nor Promise. Expected [{value, label}]')
    }

    //Set row height
    if (listRowHeight == null) {
      const font = ReactSelect.css(this.containerRef.current, 'font');
      const fontSizeRes = /\S+px/.exec(font);
      console.log('font', font, fontSizeRes);

      if (fontSizeRes) {
        const fontSizeValue = Math.max(12, parseInt(fontSizeRes[0]) * 1.2);
        this.setState({listRowHeight: fontSizeValue})
      }
    }

    // Set list width and focus callbacks
    const wrapper = this.wrapperRef.current;
    if (wrapper) {
      this.queryInput.current!.onfocus = () => this.onInputFocus(wrapper);
      this.queryInput.current!.onblur = () => ReactSelect.onInputBlur(wrapper);
      if (placeholder != null) {
        this.setState({
          listWidth: wrapper.clientWidth,
          inputWidth: this.calculateTextSize(placeholder).width
        });
      } else {
        this.setState({listWidth: wrapper.clientWidth});
      }
      //TODO Conditional position of list on TOP of input
      // const listContainer = document.getElementById("react-select-list-container");
      // const offset = Select.getOffset(wrapper);
      // if (listContainer != null){
      //   listContainer.style.top = offset.top;
      //   listContainer.style.left = offset.left;
      // }
    }
    document.addEventListener('mousedown', this.handleClickOutside);
    window.addEventListener('resize', this.debouncedResize);
  }

  onResize(event: any) {
    const wrapper = this.wrapperRef.current;
    if (wrapper != null) {
      this.setState({
        listWidth: wrapper.clientWidth,
      });
    }
  }

  handleClickOutside(event: any) {
    if (this.containerRef.current && !this.containerRef.current.contains(event.target)) {
      this.setState({isFocused: false})
    }
  };

  onInputFocus(wrapper: HTMLElement) {
    wrapper.style.boxShadow = 'inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6)';
    wrapper.style.borderColor = '#66afe9';
    this.setState({isFocused: true})
  };

  static onInputBlur(wrapper: HTMLElement) {
    wrapper.style.boxShadow = '';
    wrapper.style.borderColor = '#d0d0d0';
  };

  static getOffset(el: any) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }

  handleInputChange(event: any) {
    const {value} = event.target;
    const {options, tokens} = this.state;
    const {placeholder} = this.props;
    let width = 0;
    if (value.length > 0) {
      width = this.calculateTextSize(value).width;
    } else if (placeholder != null) {
      width = this.calculateTextSize(placeholder).width;
    }
    this.setState({
      query: value,
      listItems: options.filter((item) =>
        item.label.toLowerCase().indexOf(value.toLowerCase()) !== -1 && !tokens.some((token) => token.label === item.label)
      ),
      inputWidth: width
    })
  };

  addToken(index: number) {
    const {tokens, listItems} = this.state;
    const {onChange} = this.props;
    const item = listItems.splice(index, 1)[0];
    tokens.push(item);
    this.setState({tokens: tokens, query: '', listItems: listItems});
    if (onChange != null) {
      onChange(tokens);
    }
  };

  removeToken(event: any) {
    const {tokens, listItems, query} = this.state;
    const {onChange, placeholder} = this.props;
    const index = parseInt(event.target.dataset.index);
    const item = tokens.splice(index, 1)[0];
    let i = 0,
      flag = true;
    while (i < listItems.length && flag) {
      if (listItems[i].label.toLowerCase() > item.label) {
        listItems.splice(i, 0, item);
        flag = false;
      } else {
        i++;
      }
    }
    if (flag) {
      listItems.push(item);
    }
    if (onChange) {
      onChange(tokens);
    }
    let inputWidth = 0;
    if (query.length > 0) {
      inputWidth = this.calculateTextSize(query).width;
    } else if (placeholder != null) {
      inputWidth = this.calculateTextSize(placeholder).width;
    }
    this.setState({tokens, listItems, inputWidth})
  };

  calculateTextSize(text: string) {
    const font = ReactSelect.css(this.queryInput.current, 'font');
    const test = this.textTestRef.current;
    const wrapper = this.wrapperRef.current;
    if (wrapper != null && test != null) {
      test.style.font = font;
      // if (!test.style.fontSize) {
      //   test.style.fontSize = this.props.inputFontSize! + 1 + 'px'
      // }
      test.innerHTML = text;
      const height = (test.clientHeight + 2);
      const width = (test.clientWidth + 2);
      // 16 is padding
      return {width: Math.min(width, wrapper.clientWidth - 16), height};
    }
    return {width: 0, height: 0};
  }

  rowClick(event: any) {
    this.addToken(parseInt(event.target.dataset.index))
  };

  rowRenderer({index, key, style}: any) {
    const {listItems} = this.state;
    const item = listItems[index];
    let view = item.label;
    if (this.props.rowRenderer) {
      view = this.props.rowRenderer(item, index)
    }
    return (
      <div key={key} style={style} data-index={index} onClick={this.rowClick} className="react-select-list-item">
        {view}
      </div>
    )
  };

  onWrapperClick() {
    if (this.queryInput.current) {
      this.queryInput.current.focus();
    }
  };

  render() {
    const {query, listItems, tokens, inputWidth, listWidth, isFocused, isLoading, listRowHeight} = this.state;
    const {placeholder, style, listStyle, inputStyle} = this.props;
    const showList = isFocused && listItems.length > 0;
    const showInfo = isFocused && (isLoading || (listItems.length === 0 && query.length > 0));
    let listHeight = maxRows * listRowHeight;
    if (listItems.length < maxRows) {
      listHeight = listItems.length * listRowHeight;
    }
    console.log(listRowHeight);
    return (
      <div className="react-select-container" ref={this.containerRef} style={style ? style : {}}>
        <div className="react-select-wrapper" ref={this.wrapperRef} onClick={this.onWrapperClick} tabIndex={-1}>
          {tokens.map((item, index) => <div key={index} data-index={index} className="react-select-token"
                                            onClick={this.removeToken}>
            {item.label}
            <CloseIcon/>
          </div>)}
          <input value={query} onChange={this.handleInputChange} ref={this.queryInput}
                 style={inputStyle ? Object.assign({
                     width: `${inputWidth}px`,
                     fontSize: `${this.props.inputFontSize}px`
                   },
                   inputStyle
                 ) : {width: `${inputWidth}px`, fontSize: `${this.props.inputFontSize}px`}}
                 onClick={ReactSelect.onInputClick}
                 placeholder={tokens.length === 0 ? placeholder : undefined}/>
        </div>
        {showInfo &&
        <div className='react-select-info-message'>
          {isLoading ? <span>Loading..</span> : <span>{this.props.noResultsMessage}</span>}
        </div>
        }
        {showList &&
        <div className="react-select-list-container" style={listStyle ? listStyle : {}} ref={this.listRef}>
          <List
            height={listHeight}
            rowHeight={listRowHeight}
            rowRenderer={this.rowRenderer}
            rowCount={listItems.length}
            width={listWidth}
          />
        </div>
        }
        <div className="react-select-test" ref={this.textTestRef}/>
      </div>
    )
  }
}

export default ReactSelect;
