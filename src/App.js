import React from 'react';
import './App.css';
import NewForm from './components/NewForm'
import BucketLogo from "./BucketLogo.png"
import EditForm from "./components/EditForm.js"
import Checkbox from "./square-regular.svg"
import CheckboxCompleted from "./check-square-regular.svg"



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
      adventure: {}
    }
    this.getAdventure = this.getAdventure.bind(this)
    this.getAdventures = this.getAdventures.bind(this)
    this.deleteAdventure = this.deleteAdventure.bind(this)
    this.handleAddAdventure = this.handleAddAdventure.bind(this)
    this.toggleCompleted = this.toggleCompleted.bind(this)
//this.updatedAdventure = this.updatedAdventure.bind(this)
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

// updatedAdventure(event) {
// event.preventDefault()
// const newAdventure = {
//   title: this.state.title,
//     img: this.state.img,
//     notes: this.state.notes
// }
// const updatedAdventure = [...this.state.adventure, newAdventure]

// this.setState ({
//   adventures: updatedAdventure

// })
// }
// updatedAdventure(resJSON) {

//     const copyUpdatedAdventure = [...this.state.adventure]
//     console.log(copyUpdatedAdventure)
    
//     const findIndex = this.state.adventure.findIndex(adventure => adventure._id === resJSON._id)
//     copyUpdateAdventure[findIndex] = resJSON
//     this.setState({
//         adventure: copyUpdateAdventure
//     })
    //this.setState({ edit: false })
//}

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
  //delete s
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

  //add to check fro img functionality
      getAdventure(adventure) {
        this.setState({adventure: adventure})

       }
//****** */

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

    // return (

    //   <div className="App">

    //     <img className="logo" src={BucketLogo} alt="Logo" />
    //     <div className="form-container">
    //       <h1>Bucket List Adventures</h1>
    //       <h4>Stop wishing. Start living!</h4>
         
    //       <NewForm handleAddAdventure={this.handleAddAdventure} />
    //     </div>
    //     <div className='container'>
    //       {this.state.adventures.map(adventure => {
    //         console.log(this.state.adventures)
    //         return (

      return (
        <div className="App">
            <header>
          <img className="logo" src={BucketLogo} alt="Logo" />
          <h4>stop wishing. start living!</h4>
          <NewForm handleAddAdventure={this.handleAddAdventure} />
          </header>
          <div className="form-container">
            
           
           
          </div>
          <div className='container'>
            {this.state.adventures.map(adventure => {
              console.log(this.state.adventures)
              return (

              <div className="card" key={adventure._id} >
                <div className="top-div"> {adventure.title}</div>
                <div>
                  <img src={adventure.img} alt='image' height='300' />
                  
                </div>
                <div className="bottom-div">
                

                <span className="edit" onClick={()=>
                  
                  console.log(adventure)
                  //this.updatedAdventure(adventure._id)
                }> Edit</span>
                  <span className="delete" onClick={() => this.deleteAdventure(adventure._id)}>Delete</span>
                  <span onClick={() => this.toggleCompleted(adventure)}
                  >
                    {adventure.completed ? <span><img className='check' src={CheckboxCompleted} alt="Check" /></span> :
                     <span><img className='check' src={Checkbox} alt="Check" />
                    </span>}
                  </span>
                </div>
              
                <EditForm 
                //onClick={ () => this.updatedAdventure(adventure)}
                // all my props go here, props===editItem={adventure}
                  editItem={adventure}
                  
                />

                </div>

                )
              })}
        </div>
        </div>
      
        );
    
      }
    }
    
    export default App;


