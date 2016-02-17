var React = require('react');
var TodoActions = require('../actions/TodoActions');

var TodoForm = React.createClass({
	getInitialState: function(){
		return {task:''};
	},
	handleTodoChange: function(e){
		this.setState({task:e.target.value})
	},
	handleSubmit: function(e){
		e.preventDefault();
		var task = this.state.task.trim();
		if(task !== ''){
			TodoActions.create(task);	
		}
		this.setState({task:''})
	},
	render: function(){
		return (
			<form className="todoForm" onSubmit={this.handleSubmit}>
				<input 
					type="text" 
					placeholder="your task"
					value={this.state.task}
					onChange={this.handleTodoChange}
				/>
				<input type="submit" value="Add todo"/>
			</form>
		);
	}
});

module.exports = TodoForm;