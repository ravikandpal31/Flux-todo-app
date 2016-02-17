var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ToDoConstants = require('../constants/todoConstants');
var assign = require('object-assign');
var request = require('superagent');
var baseUrl = 'http://localhost:3000';
var async = require('async');

var CHANGE_EVENT = 'change';

var _todos = [];

function create(text){

	var todo = {
		task:text,
		active:true
	}
	var that = this;
	async.waterfall([
		function(cb){
			request
	 		.post(baseUrl + '/api/todos')
			 .set('Content-Type','application/json')
			 .send(JSON.stringify(todo))
	   		 .end(function(err, res){
				var data = JSON.parse(res.text);
				_todos.push(data);
	   		 	cb(null,res)
	   		 });	
		},
		function(res,cb){
			TodoStore.emitChange();
			cb(null);
		}
	]);	
}

function update(todo,id){

	async.waterfall([
        	function(cb){
        		request
        		.post(baseUrl + '/api/todos/'+id)
		        .set('Content-Type','application/json')
		        .send(JSON.stringify(todo))
		   	    .end(function(err, res){
		   	        cb(null,res);
		   	    });
        	},
        	function(res,cb){
        		console.log('load todo...');
        		request
				 .get(baseUrl + '/api/todos')
		   		 .end(function(err, res){
		   		 	_todos = JSON.parse(res.text);
		   		 	TodoStore.emitChange();
		   		 	cb(null,res)
		   		 });
        	}
        ], function(err,result){
        	if(err) throw err;
    })	
}

function getCompletedOrPendingTodos(url){
	request
    .get(url)
   	.end(function(err, res){
   	 	_todos = JSON.parse(res.text);
		TodoStore.emitChange();
   	});
}

function remove(id){

    async.waterfall([
        function(cb){
        		console.log('delete todo...');
        		request
        		.delete(baseUrl + '/api/todos/'+id)
		   	    .end(function(err, res){
		   	        cb(null,res);
		   	    });
        },
        function(res,cb){
        		console.log('load todo...');
        		request
				.get(baseUrl + '/api/todos')
		   		.end(function(err, res){
		   		 	_todos = JSON.parse(res.text);
					TodoStore.emitChange();
		   		 	cb(null,res)
		   		});
        }],
        function(err,result){
        	if(err) throw err;
       	}
    )
}

var TodoStore = assign({},EventEmitter.prototype,{

	getAll: function(){ 
		return _todos;
	},

	loadTodos: function(){
		console.log('This is loadTodos...');
		request
		.get(baseUrl + '/api/todos')
		.end(function(err, res){
		 	_todos = JSON.parse(res.text);
		 	TodoStore.emitChange();	 
		});	
	},

	emitChange: function(){
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback){
		this.on(CHANGE_EVENT,callback);
	},

	removeChangeListener: function(callback){
		this.removeListener(CHANGE_EVENT,callback);
	}
});

AppDispatcher.register(function(action){
		switch(action.actionType){
			case ToDoConstants.TODO_CREATE:
				var text = action.text.trim();
				if(text !== ''){
					create(text);
					//TodoStore.emitChange();
				}
				break;
			case ToDoConstants.TODO_UPDATE:
				var id = action.id.trim();
				if(id !== ''){
					update(action.todo,id);
				}
				break;
			case ToDoConstants.GET_COMPLETED_OR_PENDING:
				var url = action.url.trim();
				if(url !== ''){
					getCompletedOrPendingTodos(url);
				}
				break;
			case ToDoConstants.TODO_DELETE:
				var id = action.id.trim();
				if(id !== ''){
					remove(id);
				}
				break;
		}
		return true;
});

module.exports = TodoStore;