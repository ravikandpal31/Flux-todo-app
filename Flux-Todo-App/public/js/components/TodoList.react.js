var React = require('react');
var Todo = require('./Todo.react');
var TodoActions = require('../actions/TodoActions');
var baseUrl = 'http://localhost:3000';

var TodoList = React.createClass({
    handleClickAll: function(){
        console.log("handleClickAll...");
        //this.props.onButtonClick("All");  
        var url = baseUrl + '/api/todos';
        TodoActions.getCompletedOrPendingTodos(url);
    },
    handleClickPending: function(){
        console.log("handleClickPending...");
        //this.props.onButtonClick("Pending"); 
        var url = baseUrl + '/api/todos' + '?active=true';
        TodoActions.getCompletedOrPendingTodos(url); 
    },
    handleClickCompleted: function(){
        console.log("handleClickCompleted...");
        //this.props.onButtonClick("Completed");  
        var url = baseUrl + '/api/todos' + '?active=false';
        TodoActions.getCompletedOrPendingTodos(url); 
    },
    render: function(){
      console.log(this.props.data);
      var todoNodes = this.props.data.map(function(todo){
        return(
          <Todo task={todo.task} todoId={todo._id} active={todo.active} key={todo._id} />
        )
      },this);
      return (
        <div className="todoList">
          {todoNodes}
                  <form className="todoAction" >
          <input 
            type="button" 
            value="All Todo"
            onClick={this.handleClickAll}
          />
          <input 
            type="button" 
            value="Completed Todo"
            onClick={this.handleClickCompleted}
          />
                  <input 
            type="button" 
            value="Pending Todo"
            onClick={this.handleClickPending}
          />
        </form>
        </div>
      );
  }
}) ;

module.exports = TodoList;