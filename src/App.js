import React from 'react';
import './App.css';
import NewForm from './components/NewForm'

let baseURL = process.env.REACT_APP_BASEURL
//alternate baseURL = 'https://fathomless-sierra-68956.herokuapp.com'
if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003'
} else {
  baseURL = 'https://fathomless-sierra-68956.herokuapp.com'
}



class App extends React.Component {
constructor(props) {
  super(props)
  this.state = {
    adventures: []
  }
  this.getAdventures = this.getAdventures.bind(this)
  this.deleteAdventure = this.deleteAdventure.bind(this)
 this.handleAddAdventure = this.handleAddAdventure.bind(this)
}
componentDidMount(){
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

getAdventures () {
  fetch(baseURL+ '/adventures')
  .then(data => {
    return data.json()},
    err=> console.log(err))
    .then(parsedData => {
      //console.log(parsedData)
       this.setState({adventures:parsedData})
  },
  err=> console.log(err))
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
  render() {

    return (
      
      <div className="App">
      <h1>Save Your Adventure!</h1>
       <NewForm handleAddAdventure={this.handleAddAdventure}/>
        <h1>List of "Adventures"</h1>
<ul class='card'> 
{this.state.adventures.map(adventure => {
  console.log(this.state.adventures)
  return (
    

    <div  key={adventure._id} >
<li> {adventure.title}</li>
<img src={adventure.img} alt='image' width='250'/>
<li>{adventure.notes}</li>
<li>{adventure._v}</li>
<li>{adventure.completed}</li>
<h2 onClick={() => this.deleteAdventure(adventure._id)}>Delete X</h2>
    </div>

  )
})}
</ul>

      </div>
    );

  }
  }

export default App;
