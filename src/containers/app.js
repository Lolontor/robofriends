import React, { Component } from "react";
import CardList from '../components/cardlist';
import SearchBox from "../components/searchbox";
import Scroll from "../components/scroll";
import './app.css';
import ErrorBoundry from "../components/errorBoundry"


class App extends Component {
  constructor() {
    super()
    this.state = {
      robots: [],
      searchfield: ''
    }
  }
  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json()).then(user => this.setState({ robots: user }))

  }

  render() {
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase())
    })
    return !robots.length ?
      <h1>Loading...</h1> :
      (<div className="tc">
        <h1 className="f1">Robofrieds</h1>
        < SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <ErrorBoundry>
            < CardList robots={filteredRobots} />
          </ErrorBoundry>
        </Scroll>
      </div>);

  }
}



export default App;