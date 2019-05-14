
// import React, { Component } from 'react';

// class Completed extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       completed: false
//     }

//     this.toggleCompleted = this.toggleCompleted.bind(this);
//   }


//   toggleCompleted() {
//     this.setState({completed : !this.state.completed})
//   }
//   render() {
//     return (
//       <tr onClick={this.toggleCompleted}>
//         <td>{this.props.song.artist}</td>
//         <td>{this.props.song.title}</td>
//         <td>{this.props.song.time}</td>
//         {this.state.love ? <td>&hearts;</td> : <td></td>}
//       </tr>
//     );
//   }
// }

// export default Song;