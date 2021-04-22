import React, { Component } from 'react';
import axios from 'axios';
import Chicago from './components/chicago.js';

// npm install axios
// yarn start

class App extends Component {

  state = {
    chicago: [],
    lat: '',
    lng: '',
    error: ''
  }

  handleChange_lat = e => {
    this.setState({ lat: e.target.value });
  }

  handleChange_lng = e => {
    this.setState({ lng: e.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    var lat = parseFloat(this.state.lat)
    var lng = parseFloat(this.state.lng)

    if (isNaN(lat) || isNaN(lng)) {
      this.setState({ error: "Invalid Input" })
      console.log("Invalid Input")
    }
    else {
      axios.get(`http://localhost:3001/chicago?lat=${lat}&lng=${lng}`)
        .then(res => {
          this.setState({ chicago: res.data })
        })
        .catch(console.log)
    }



  }

  /*
  componentDidMount(){
    axios.get('http://localhost:3001/chicago?lat=41.65&lng=-87.6000')
    .then(res => {
      this.setState({chicago: res.data})
    })
    .catch(console.log)
  
    console.log("Here we are")
  }
*/

  render() {
    return (
      <div class='container'>
        <div class='row'>
          <div class='col'>
            <h1>Get your score</h1>
            <form onSubmit={this.handleSubmit}>

              <div class="row mt-3">
                <label for='lat'>Latitude:</label>
                <input type="number" step='any' name="lat"
                  placeholder='41.6514'
                  onChange={this.handleChange_lat} />

              </div>

              <div class='row mt-3'>
                <label for='lng'>Longitude:  </label>
                <input type="number" step='any' name="lng"
                  placeholder='-87.600001'
                  onChange={this.handleChange_lng} />

              </div>

              <div class='row mt-3'>
                <button class='btn' type="submit">Get Scores</button>
              </div>
            </form>
            <div class='row mt-2'>
              <span class="badge badge-pill badge-danger">{this.state.error}</span>
            </div>
            <Chicago chicago={this.state.chicago}></Chicago>
          </div>

          <div class='col'>
            <img class="globe" src="img/third.svg" alt="model" />
          </div>

        </div>

        <div class='row'>

          <div class='col'>
            <div class='row'>Latitude: {this.state.lat}</div>
            <div class='row'>Longitude: {this.state.lng}</div>
            <div class='row'><p>{JSON.stringify(this.state.chicago)}</p></div>

          </div>

        </div>


      </div>


    );
  }
}

export default App;