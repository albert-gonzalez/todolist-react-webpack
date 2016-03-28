import React from 'react';
import { Link } from 'react-router';

var todoRepository;

export default class TodoList extends React.Component {
    constructor(props) {
        super(props);

        todoRepository = this.props.todoRepository;
        this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    }
    render() {
        var todoClass=`done-${this.props.todo.done}`;
        return (
            <li>
                <input onChange={this.handleChangeCheckbox} type="checkbox" defaultChecked={this.props.todo.done}/>
                <span className={todoClass}><Link to={`/edit/${this.props.todo.id}`}>{this.props.todo.text}</Link></span>
            </li>
        )
    }
    handleChangeCheckbox(e) {
        this.props.todo.done = e.target.checked;
        todoRepository.save(this.props.todo).then(() => {
            if (typeof this.props.callback === 'function') {
                this.props.callback();
            }
        });
    }
}