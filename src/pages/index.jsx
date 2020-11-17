import React, { Component } from "react"
import "@/css/common.scss"
import { observer, inject } from "mobx-react"

@inject("exampleStore")
@observer
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {

  }


  componentWillUnmount() {
  }

  render() {
    return (
      <div className="mainContainer flex column" style={{ maxWidth: '750px', margin: '0 auto', height: '100vh' }}>
        sdk - react - template
      </div>
    )
  }
}
export default App
