import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'

import TodoList from "./todo.list.jsx";
import TodoForm from "./todo.form.jsx";

class TodoApp extends React.Component {
    render() {
        return <div className="row">
            <div className="columns small-10 small-centered">
                {this.props.children}
            </div>
        </div>
    }
}

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={TodoApp}>
            <IndexRoute component={TodoList} />
            <Route path="list" component={TodoList} />
            <Route path="new" component={TodoForm} />
            <Route path="edit/:id" component={TodoForm} />
        </Route>
    </Router>
), document.getElementById('app'));