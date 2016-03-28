import React from 'react';
import { Link } from 'react-router'

import TodoRepository from "../services/todo.repository";
import TodoListElement from "./todo.list.element.jsx";

var todoRepository;

export default class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {todos: []};
        todoRepository = new TodoRepository();

        todoRepository.all().then(todos => {
            this.setState({todos: todos});
            this.updateRemaining();
        });

        this.archive = this.archive.bind(this);
    }
    render() {
        var list = this.state.todos.map(todo => {
            return (
                <TodoListElement key={todo.id} todo={todo} todoRepository={todoRepository} callback={this.updateRemaining.bind(this)}/>
            );
        });

        return (
            <div>
                <span>{this.state.remaining} of {this.state.todos.length} remaining <a onClick={this.archive}>archive</a></span>
                <div className="row callout primary">
                    <h3>List of Todos</h3>
                        <ul className="unstyled">
                            {list}
                        </ul>
                </div>
                <div className="row">
                    <div className="columns small-6 medium-4 small-centered">
                        <Link className="button expanded" to={`/new`}>New Todo</Link>
                    </div>
                </div>
            </div>
        )
    }
    updateRemaining() {
        this.setState({remaining: this.state.todos.reduce((count, todo) => count + +!todo.done, 0)});
    }

    archive(): void {
        var oldTodos = this.state.todos,
            todos = [];
        oldTodos.forEach(todo => {
            if (!todo.done) {
                todos.push(todo);
            } else {
                todoRepository.remove(todo.id);
            }
        });

        this.setState({todos: todos});
        this.updateRemaining();
    }
}