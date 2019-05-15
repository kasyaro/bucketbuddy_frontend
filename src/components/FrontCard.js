import React from 'react'
import Checkbox from "../square-regular.svg"
import CheckboxCompleted from "../check-square-regular.svg"

let baseURL = process.env.REACT_APP_BASEURL

if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://localhost:3003'
} else {
    baseURL = 'https://dry-river-83879.herokuapp.com'
}





class FrontCard extends React.Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         title: this.props.adventure.id,
    //         img: this.props.adventure.img,
    //         notes: this.props.adventure.notes

    //     }
        
    // }

    render() {
        console.log(this.props.toggleCompleted)
        return (
            <div>
                <div className="top-div" key="front"> {this.props.adventure.title}</div>
                <div>
                    <img src={this.props.adventure.img} alt='image' height='300' />
                </div>
                <div className="bottom-div">
                {this.props.children}
                  
                    <span className="delete" onClick={() => this.props.deleteAdventure(this.props.adventure._id)}>Delete</span>
                    <span onClick={() => this.props.toggleCompleted(this.props.adventure)}
                    >
                        {this.props.adventure.completed ? <span><img className='check' src={CheckboxCompleted} alt="Check" /></span> :
                            <span><img className='check' src={Checkbox} alt="Check" />
                            </span>}
                    </span>
                </div>
            </div>

        )
    }
}

export default FrontCard