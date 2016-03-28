import React from 'react';
import { Link } from 'react-router';

import TodoRepository from "../services/todo.repository";

var todoRepository;

export default class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {todo: {id: false, text: '', done: false}};
        todoRepository = new TodoRepository();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeTodoText = this.handleChangeTodoText.bind(this);

    }
    componentDidMount() {
        var id = this.props.params.id;
        if (id) {
            todoRepository.find(id).then(todo => {
                this.setState({todo: todo});
            });
        }
    }
    render() {
        return (
            <div>
                <div className="callout primary">
                    <h3>{this.todoHeaderText()}</h3>
                <form onSubmit={this.handleSubmit}>
                    <input name="text" type="text" size="30" placeholder="add new todo here"
                           onChange={this.handleChangeTodoText}
                           value={this.state.todo.text} />
                    <input className="button" type="submit" value="Save" />
                </form>
                </div>
                <Link className="button" to={`/`}>Back</Link>
            </div>
        )
    }

    todoHeaderText() {
        if (this.state.todo.id) {
            return `Edit of Todo ${this.state.todo.id}`;
        } else {
            return 'New Todo';
        }
    }

    saveTodo(todo) {
        todoRepository.save(todo).then(todo => {
            window.location='#/';
        });
    }

    handleChangeTodoText(e) {
        var todo = this.state.todo;

        todo.text= e.target.value;
        this.setState({todo: todo});
    }

    handleSubmit(e) {
        var textValue = this.state.todo.text;
        e.preventDefault();

        if (textValue) {
            this.saveTodo(this.state.todo);
        }
    }
}