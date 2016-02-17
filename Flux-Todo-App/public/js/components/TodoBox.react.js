var React = require('react');
var request = require('superagent');
var async = require('async');

var TodoForm = require('./TodoForm.react');
var TodoList = require('./TodoList.react');

var TodoStore = require('../stores/TodoStore');
var TodoActions = require('../actions/TodoActions');

function getTodoState(){
	return {
		data: TodoStore.getAll()
	}
}

var TodoBox = React.createClass({
    _onChange: function(){
    	console.log('onChange is called...')
    	this.setState(getTodoState());
    },
    getInitialState: function(){
		//return {data:[]};
		return getTodoState();
	},
	componentDidMount: function(){
		 //this.loadFromServer();
		 //setInterval(this.loadFromServer,this.props.pollInterval);
		 TodoStore.addChangeListener(this._onChange);
		 TodoStore.loadTodos();
	},
	componentWillUnmount: function(){
		TodoStore.removeChangeListener(this._onChange);
	},
	render: function(){
		return(
			<div className="todoBox">
				<h1>Hello world!!! I am a todoBox</h1>
				<TodoForm onTodoSubmit={this.handleTodoSubmit} />
                <TodoList data={this.state.data}/>
			</div>
		);
	}
});

module.exports = TodoBox;