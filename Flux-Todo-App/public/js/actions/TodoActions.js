var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../constants/TodoConstants');

var TodoActions = {
	create: function(text){
		AppDispatcher.dispatch({
			actionType:TodoConstants.TODO_CREATE,
			text: text
		});
	},
	update: function(todo,id){
		AppDispatcher.dispatch({
			actionType:TodoConstants.TODO_UPDATE,
			todo: todo,
			id:id
		});
	},
	getCompletedOrPendingTodos: function(url){
		AppDispatcher.dispatch({
			actionType:TodoConstants.GET_COMPLETED_OR_PENDING,
			url:url
		});
	},
	delete: function(id){
		AppDispatcher.dispatch({
			actionType:TodoConstants.TODO_DELETE,
			id:id
		});
	}
}

module.exports = TodoActions;