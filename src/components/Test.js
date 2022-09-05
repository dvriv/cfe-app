import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class TablePasivosContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  async componentDidMount() {
    const data = [1, 2, 3 , 4, 5]
    this.setState(data);
  }

  render() {
    return (
      this.state.data
    );
  }
}

export default TablePasivosContainer;

