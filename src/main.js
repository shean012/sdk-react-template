// import React, { Component } from "react"
import React, {
  Component
} from "react"
import ReactDOM from "react-dom"
import App from "./pages/index.jsx"
import {
  Provider
} from 'mobx-react'
import store from '@/store/index.js'
import AuthorizeMiddleWare from "@/middleware/authorize.js"

AuthorizeMiddleWare(() => {
  ReactDOM.render( 
    <Provider {...store}>
      <App / >
    </Provider>,
    document.getElementById("app"))
})

