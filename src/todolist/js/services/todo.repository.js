const KEY = 'todoStorage';

export default class TodoRepository {
    constructor() {
        this.currentIdentity = 0;
        this.todoData = [];
        
        if (!localStorage.getItem(KEY)) {
            this.saveJsonData([]);
        } else {
            this.currentIdentity = this.getJsonData()
                .reduce((maxId, todo) => todo.id > maxId ? todo.id : maxId, 0)
        }

        this.todoData = this.getJsonData();
    }

    nextIdentity() {
        return ++this.currentIdentity;
    }

    getJsonData() {
        return JSON.parse(localStorage.getItem(KEY)) || [];
    }

    saveJsonData(data) {
        this.todoData = data;
        localStorage.setItem(KEY, JSON.stringify(data));
    }

    findInLocalStorage(id) {
        var todoData = this.todoData;
        return todoData.find(storedTodo => storedTodo.id === parseInt(id, 10));
    }

    save(todo) {
        var todoData = this.todoData;
        if (!todo.id) {
            todo.id = this.nextIdentity();
            todoData.push(todo);
        } else {
            var storedTodo = this.findInLocalStorage(todo.id);
            storedTodo.text = todo.text;
            storedTodo.done = todo.done;
        }

        this.saveJsonData(todoData);

        return Promise.resolve(todo);
    }

    all() {
        return Promise.resolve(this.getJsonData());
    }

    find(id) {
        return Promise.resolve(this.findInLocalStorage(id));
    }

    remove(id) {
        var todoData = this.todoData;

        this.saveJsonData(todoData.filter(storedTodo => storedTodo.id !== parseInt(id, 10)));
        return Promise.resolve({deleted: todoData !== this.getJsonData()});
    }
}