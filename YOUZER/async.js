const fetchData = async () => {
  return fetch('https://randomuser.me/api/')
}

const printData = aync () => {
  try {
    const data = await fetchData()
    const json = await data.json()
    console.log(json)
  } catch(e) {
    console.error("Problem", e);
  }
}


import React, {Component} from 'react'
import { render } from 'react-dom'

class Counter extends Component {
  state= {count: 0}

  componentDidMount() {
    setInterval(() => {
      this.setState({count: this.state.count + 1})
    }, 1000)
  }

  render() {
    const {count} = this.state
    const {color, size} = this.props

    return (
      <div style={{color, fontSize: size}}>
      {count}
      </div>
    )
  }
}

class App extends Component {
  render() {
    const style = {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }

    return (
      <div style={style}>
        <Counter color={'lightblue'} size={16} />
        <Counter color={'skyblue'} size={32} />
        <Counter color={'steelblue'} size={80} />
        <Counter color={'darkblue'} size={16} />
      </div>

    )
  }
}

render(<App />, document.querySelector('#app'))
