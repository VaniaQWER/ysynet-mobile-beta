import React, { Component } from 'react';
import Screen from '../component/screen';
class Test extends Component {
  render () {
    return (
      <section style={{width: '100%'}}>
        <Screen />
        <div>其他东西</div>
      </section>  
    )
  }
}
export default Test;