import React, { Component } from 'react';

class BgColor extends Component {
  previousColor = null;

  setBackgroundColor = (color) => {
    document.body.style.background = color;
  }

  componentDidMount() {
    const { color } = this.props;
    this.previousColor = document.body.style.background;
    this.setBackgroundColor(color);
  }

  componentWillUnmount() {
    this.setBackgroundColor(this.previousColor);
  }
  
  render() {
    return <div/>;
  }
}

export default BgColor;