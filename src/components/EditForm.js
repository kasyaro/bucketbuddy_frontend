
 import React from 'react'

 let baseURL = process.env.REACT_APP_BASEURL
 
 if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003'
 } else {
  baseURL = 'https://dry-river-83879.herokuapp.com'
 }
 
 class EditForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: this.props.editItem.id,
      img: this.props.editItem.img,
      notes: this.props.editItem.notes
 
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
    fetch(baseURL + `/adventures/${this.props.editItem._id}`, {
      method: 'PUT',
      body: JSON.stringify({title: this.state.title, img: this.state.img, notes: this.state.notes}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then (res => res.json())
      .then( resJSON => {
        //this.props.handleAddAdventure(resJSON)
        this.setState({title: "", img: "", notes: ""})
      })
    // need to send our input to our App.js
 
  }
  render () {
      console.log(this.props)
    return (
        <div>
      <form  className = 'form-card' onSubmit={this.handleSubmit}>
        <label htmlFor="title"></label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={this.handleChange}
          defaultValue={this.props.editItem.title}
        />
        <label htmlFor="img"></label>
        <input
          type="text"
          id="img"
          name="img"
          onChange={this.handleChange}
          defaultValue={this.props.editItem.img}
         placeholder={this.props.editItem.img}
        />
        <label htmlFor="notes"></label>
        <textarea
          type="text"
          id="notes"
          name="notes"
          onChange={this.handleChange}
          defaultValue={this.props.editItem.notes}
          placeholder={this.props.editItem.notes}
        />
        <input className="input-submit"
          type="submit"
          value="Submit changes"
        />

      </form>
      </div>
    )
  }
 }
 
 export default EditForm



 