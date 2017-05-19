// This is your entry .js file
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const render = (Component) => {
   ReactDOM.render(
      <App />,
      document.getElementById('sportsyou')
   )
}

render(App)

// Opt-in to Webpack hot module replacement
if (module.hot) {
   module.hot.accept(App, () => {
      render(App)
   })
}
