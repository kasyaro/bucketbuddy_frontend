import React from 'react'

let baseURL = process.env.REACT_APP_BASEURL

if (process.env.NODE_ENV === 'development') {
 baseURL = 'http://localhost:3003'
} else {
 baseURL = 'https://fathomless-sierra-68956.herokuapp.com'
}

class NewForm extends React.Component {
 constructor (props) {
   super(props)
   this.state = {
     title: '',
     img: '',
     notes: ''

   }
   this.handleChange = this.handleChange.bind(this)
   this.handleSubmit = this.handleSubmit.bind(this)
 }
 handleChange (event) {
   this.setState({[event.currentTarget.id]: event.currentTarget.value})
 }
 handleSubmit(event) {
   event.preventDefault()
   // make server/db call to put in our database
   fetch(baseURL + '/adventures', {
     method: 'POST',
     body: JSON.stringify({title: this.state.title}, {img: this.state.img}),
     headers: {
       'Content-Type': 'application/json'
     }
   }).then (res => res.json())
     .then( resJSON => {
       this.props.handleAddAdventure(resJSON)
       this.setState({title: "", img: ""})
     })
   // need to send our input to our App.js

 }
 render () {
   return (
     <form onSubmit={this.handleSubmit}>
       <label htmlFor="title"></label>
       <input
         type="text"
         id="title"
         name="title"
         onChange={this.handleChange}
         value={this.state.title}
         placeholder="Add an Adventure!"
       />
       <label htmlFor="img"></label>
       <input
         type="text"
         id="img"
         name="img"
         onChange={this.handleChange}
         value={this.state.img}
         placeholder="Add an image URL"
       />
       <input
         type="submit"
         value="Add a New Adventure!"
       />
     </form>
   )
 }
}

export default NewForm