import React, { Component } from 'react'

import Header from './Components/Header/Header'

const AppStyles = {
   fontFamily: 'Avenir, Helvetica, Arial, sans-serif'
}

// ES6
class ES6 extends Component {
   render() {
      return (
         <div>
            <p>Hot Reloading Works</p>
            <p>Here is an ES6 Component</p>
         </div>
      );
   }
}

class App extends Component {
   render() {
      return (
         <div style={AppStyles}>
            <Header />
            <ES6 />
         </div>
      )
   }
}

export default App
