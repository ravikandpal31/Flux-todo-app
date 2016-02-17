var React = require('react');
var ReactDOM = require('react-dom');
var request = require('superagent');
var async = require('async');
var TodoStore = require('../stores/TodoStore');
var TodoActions = require('../actions/TodoActions');

var baseUrl = 'http://localhost:3000';
/*********************************** Todo-Box Start ********************************************/
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
    handleButtonClick: function(type){
        var url = baseUrl + '/api/todos';
        switch(type){
            case "Pending":
                url = url + '?active=true';
                break;
            case "Completed":
                url = url + '?active=false';
                break;
        }
        TodoActions.getCompletedOrPendingTodos(url);
    },
    handleTodoClick: function(todo,id){
    	if(id !== ''){
        	TodoActions.update(todo,id);
        }
    },
	loadFromServer: function(){
		request
		 .get(baseUrl + this.props.url)
   		 .end(function(err, res){
   		 	var data = JSON.parse(res.text);
   		 	 this.setState({data: data});
   		 });
	},
	handleTodoSubmit: function(todo){
		if(todo.task.trim() !== ''){
			TodoActions.create(todo.task);	
		}
	},
	handleTodoDltClick: function(id){
    	if(id !== ''){
    		TodoActions.delete(id);
    	}
    },
	render: function(){
		return(
			<div className="todoBox">
				<h1>Hello world!!! I am a todoBox</h1>
				<TodoForm onTodoSubmit={this.handleTodoSubmit} />
                <TodoList onTodoDltClick={this.handleTodoDltClick} onTodoClick={this.handleTodoClick} onButtonClick={this.handleButtonClick} data={this.state.data}/>
			</div>
		);
	}
});
/*********************************** Todo-Box End ********************************************/

/*********************************** Todo-List Start ********************************************/
var TodoList = React.createClass({
	handleTodoDltClick: function(id){
        console.log('this is handleTodoDltClick...');
        this.props.onTodoDltClick(id);
    },
    handleTodoClick: function(todo,id){
        console.log('this is handleTodoClick...');
        this.props.onTodoClick(todo,id);
    },
    handleClickAll: function(){
        console.log("handleClickAll...");
        this.props.onButtonClick("All");	
    },
    handleClickPending: function(){
        console.log("handleClickPending...");
        this.props.onButtonClick("Pending");	
    },
    handleClickCompleted: function(){
        console.log("handleClickCompleted...");
        this.props.onButtonClick("Completed");	
    },
	render: function(){
		console.log(this.props.data);
		var todoNodes = this.props.data.map(function(todo){
			return(
				<Todo onTodoDltClick={this.handleTodoDltClick} onTodoClick={this.handleTodoClick} task={todo.task} todoId={todo._id} active={todo.active} key={todo._id}/>
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
/*********************************** Todo-List End ********************************************/

/*********************************** Todo Start ********************************************/
var Todo = React.createClass({
	handleDltClick: function(){
    	console.log("handleDltClick : "+this.props.todoId);
        this.props.onTodoDltClick(this.props.todoId);
    },
    handleClick: function(){
        console.log("clicked...");
        var todo = {
            task:this.props.task,
            active:false
        }
        this.props.onTodoClick(todo,this.props.todoId);
    },
	render: function(){
        console.log(this.props.active);
        var clsName = "todo-inactive";
        if(this.props.active)
            clsName = "todo-active";
        return (
                <div className={clsName}>
                	<form>
	                    <input className="task" type="checkbox" onClick={this.handleClick}>
	                        {this.props.task}
	                    </input>
	                    <input className="deleteBtn" type="Button" onClick={this.handleDltClick} value="Delete" />
                    </form>
                </div>
            );
	}
})
/*********************************** Todo End ********************************************/

/*********************************** Todo-Form Start ********************************************/
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
		if(!task)
			return;
		this.props.onTodoSubmit({task:task,active:true})
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
/*********************************** Todo-Form End ********************************************/

ReactDOM.render(
	<TodoBox  />,
	document.getElementById('content')
);