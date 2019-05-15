import React from 'react';
import './App.css';
import ReactCardFlip from 'react-card-flip';
import NewForm from './components/NewForm'
import BucketLogo from "./BucketLogo.png"
import EditForm from "./components/EditForm.js"
// import Checkbox from "./square-regular.svg"
// import CheckboxCompleted from "./check-square-regular.svg"
import FrontCard from './components/FrontCard';
let baseURL = process.env.REACT_APP_BASEURL
//alternate baseURL = 'https://fathomless-sierra-68956.herokuapp.com'
if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003'
} else {
  baseURL = 'https://dry-river-83879.herokuapp.com'
}
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      adventures: [],
      adventure: {},
      isFlipped: false
    }
    this.handleFlip = this.handleFlip.bind(this);
    // this.getAdventure = this.getAdventure.bind(this)
    this.getAdventures = this.getAdventures.bind(this)
    this.deleteAdventure = this.deleteAdventure.bind(this)
    this.handleAddAdventure = this.handleAddAdventure.bind(this)
    this.toggleCompleted = this.toggleCompleted.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
    //this.updatedAdventure = this.updatedAdventure.bind(this)
    this.toggleUpdatedAdv = this.toggleUpdatedAdv.bind(this)
  }
  componentDidMount() {
    this.getAdventures()
  }
  deleteAdventure(id) {
    fetch(baseURL + '/adventures/' + id, {
      method: 'DELETE'
    }).then(response => {
      const findIndex = this.state.adventures.findIndex(adventure => adventure._id === id)
      const copyAdventures = [...this.state.adventures]
      copyAdventures.splice(findIndex, 1)
      this.setState({ adventures: copyAdventures })
    })
  }
  handleFlip(event, selectedAdventure) {
    event.preventDefault();
    // const findIndex = this.state.adventures.findIndex(adventure => adventure._id === selectedAdventure._id)
    //   const copyAdventures = [...this.state.adventures]
    //   copyAdventures[findIndex].isFlipped=!copyAdventures[findIndex].isFlipped
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
  }
  getAdventures() {
    fetch(baseURL + '/adventures')
      .then(data => {
        return data.json()
      },
        err => console.log(err))
      .then(parsedData => {
        //console.log(parsedData)
        this.setState({ adventures: parsedData })
      },
        err => console.log(err))
  }
  handleAddAdventure(adventures) {
    const copyAdventures = [...this.state.adventures]
    console.log(copyAdventures)
    copyAdventures.unshift(adventures)
    console.log(copyAdventures)
    this.setState({
      adventures: copyAdventures,
      title: '',
      img: ''
    })
  }
  
  // handleSubmit(event) {
  //   event.preventDefault()
  //   // make server/db call to put in our database
  //   fetch(baseURL + `/adventures/${this.props.editItem._id}`, {
  //     method: 'PUT',
  //     body: JSON.stringify({title: this.state.title, img: this.state.img, notes: this.state.notes}),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }).then (res => res.json())
  //     .then( resJSON => {
  //       //this.props.handleAddAdventure(resJSON)
  //       // this.setState({title: "", img: "", notes: ""})
  //       this.props.handleUpdate(resJSON)
  //     })
  //   // need to send our input to our App.js

  // }
  toggleUpdatedAdv(adventure) {

    const copyUpdateAdv = [...this.state.adventures]
    const findIndex = this.state.adventures.findIndex(adventure1 => adventure1._id === adventure._id)
    copyUpdateAdv[findIndex] = adventure
    this.setState({adventures: copyUpdateAdv})
 }
  //add to check fro img functionality
  // getAdventure(adventure) {
  //   this.setState({ adventure: adventure })
  // }
  toggleCompleted(adventure) {
    fetch(baseURL + '/adventures/' + adventure._id, {
      method: 'PUT',
      body: JSON.stringify({ completed: !adventure.completed }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(resJson => {
        const copyAdventures = [...this.state.adventures]
        const findIndex = this.state.adventures.findIndex(adventure => adventure._id === resJson._id)
        copyAdventures[findIndex].completed = resJson.completed
        this.setState({ adventures: copyAdventures })
      })
  }
  render() {
    console.log(baseURL)
    return (
      <div className="App">
        <header>
          <img className="logo" src={BucketLogo} alt="Logo" />
          <h4>stop wishing. start living!</h4>
          <NewForm handleAddAdventure={this.handleAddAdventure} />
        </header>
        <div className='container'>
          {this.state.adventures.map(adventure => {
            console.log(this.state.adventures)
            adventure.isFlipped=false
            return (
              <div className="card" key={adventure._id} >

                <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal" flipSpeedBackToFront={2}flipSpeedFrontToBack={2}>
                  <FrontCard key="front"
                    adventure={adventure}
                    deleteAdventure={this.deleteAdventure}
                    toggleCompleted={this.toggleCompleted}
                    handleUpdate = {this.toggleUpdatedAdv}
                    >
                    <span className="edit" onClick={(event) => this.handleFlip(event, adventure)}> Edit</span>
                  </FrontCard>
                  
                  <EditForm key="back"
                  handleUpdate = {this.toggleUpdatedAdv}
                    editItem={adventure}
                    
                    >
                    <input className="input-submit"
                      type="submit"
                      value="flip card"
                      onClick={this.handleFlip}

                    />
                  </EditForm>
                </ReactCardFlip>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}
export default App;

