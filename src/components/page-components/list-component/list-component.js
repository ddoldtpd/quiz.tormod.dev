import React, { useState } from 'react';

function DynamicList(props) {
  const items = props.items;
  const setItems = props.setItems;

  const handleRemoveFields = (e, id) => {
    e.preventDefault();
    const values = [...items];
    values.splice(
      values.findIndex(value => value.id === id),
      1
    );
    setItems(values);
  };

  return (
    <div className="container">
      <div className="col-md-12 mb-3">
        {items.map((el, idx) => (
          <div className="row" key={idx}>
            <div className="col mb-2">{el}</div>
            <div className="col mb-2">
              <button
                className="btn btn-danger"
                disabled={items.length === 0}
                onClick={e => handleRemoveFields(e, idx)}
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DynamicList;

{
  /* <div className="form-group">
          <label htmlFor="correct-answer" className="text-muted mb-1">
            <small>Correct Answer</small>
          </label>
// var App = React.createClass({ */
}
//   getInitialState : function() {
//     return (
//       {
//         fruits : {
//           'fruit-1' : 'orange',
//           'fruit-2' : 'apple'
//         }
//       }
//      )
//     },
//     addFruit : function(fruit) {
//      //create a unike key for each new fruit item
//      var timestamp = (new Date()).getTime();
//      // update the state object
//      this.state.fruits['fruit-' + timestamp ] = fruit;
//      // set the state
//      this.setState({ fruits : this.state.fruits });
//     },
//     render: function() {
//       return (
//         <div className="component-wrapper">
//           <FruitList fruits={this.state.fruits} />
//           <AddFruitForm addFruit={this.addFruit} />
//         </div>
//       );
//      }
//     });

//     var FruitList = React.createClass({
//       render : function() {
//         return (
//           <div className="container">
//             <ul className="list-group text-center">
//               {
//                 Object.keys(this.props.fruits).map(function(key) {
//                   return <li className="list-group-item list-group-item-info">{this.props.fruits[key]}</li>
//                 }.bind(this))
//               }
//             </ul>
//            </div>
//          );
//        }
//      });

//     var AddFruitForm = React.createClass({
//       createFruit : function(e) {
//         e.preventDefault();
//         //get the fruit object name from the form
//         var fruit = this.refs.fruitName.value;
//         //if we have a value
//         //call the addFruit method of the App component
//         //to change the state of the fruit list by adding an new item
//         if(typeof fruit === 'string' && fruit.length > 0) {
//           this.props.addFruit(fruit);
//           //reset the form
//           this.refs.fruitForm.reset();
//         }
//        },
//        render : function() {
//         return(
//           <form className="form-inline" ref="fruitForm" onSubmit={this.createFruit}>
//           <div className="form-group">
//             <label for="fruitItem">
//               Fruit Name
//               <input type="text" id="fruitItem" placeholder="e.x.lemmon" ref="fruitName" className="form-control" />
//             </label>
//           </div>
//           <button type="submit" className="btn btn-primary">Add Fruit</button>
//          </form>
//         )
//        }
//       });

// <div id="wrapper">
//   <div class="container">
//     <div class="row">
//       <article class="col-md-12">
//         <h1 class="text-center">Simple List in React</h1>
//         <h2 class="text-center">Adding a dynamically generated list item</h2>
//         <div id="app" class="app-container">

//         </div>
//       </article>
//     </div>
//   </div>
// </div>
