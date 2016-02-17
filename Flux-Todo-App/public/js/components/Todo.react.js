var React = require('react');
var TodoActions = require('../actions/TodoActions');

var Todo = React.createClass({
    handleDltClick: function(){
        TodoActions.delete(this.props.todoId);
    },
    handleClick: function(){
        console.log("clicked...");
        var todo = {
            task:this.props.task,
            active:false
        }
        TodoActions.update(todo,this.props.todoId);
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

module.exports = Todo;
