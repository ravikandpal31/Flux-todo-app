var React = require('react');
var ReactDOM = require('react-dom');

var TodoBox = require('./components/TodoBox.react');

ReactDOM.render(
	<TodoBox  />,
	document.getElementById('content')
);