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
     body: JSON.stringify({title: this.state.title}),
     headers: {
       'Content-Type': 'application/json'
     }
   }).then (res => res.json())
     .then( resJSON => {
       this.props.handleAddAdventure(resJSON)
       this.setState({title: ''})
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
       
       <input
         type="submit"
         value="Add a Reason to Celebrate"
       />
     </form>
   )
 }
}

export default NewForm