import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todos',
  standalone: false,
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todos: { id: number; title: string; completed: boolean }[] = [];
  newTodo: string = '';
  showPending: boolean = false;
  searchQuery: string = '';

  ngOnInit() {
    // Load todos from local storage on component initialization
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);
    }
  }

  addTodo() {
    if (this.newTodo.trim()) {
      this.todos.push({
        id: this.todos.length + 1,
        title: this.newTodo.trim(),
        completed: false,
      });
      this.newTodo = '';
      this.saveTodosToLocalStorage();
    }
  }

  toggleCompletion(todo: { id: number; title: string; completed: boolean }) {
    todo.completed = !todo.completed;
    this.saveTodosToLocalStorage();
  }

  deleteTodo(todoId: number) {
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
    this.saveTodosToLocalStorage();
  }

  get filteredTodos() {
    let filtered = this.todos;

    if (this.showPending) {
      filtered = filtered.filter((todo) => !todo.completed);
    }

    if (this.searchQuery.trim()) {
      filtered = filtered.filter((todo) =>
        todo.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    return filtered;
  }

  private saveTodosToLocalStorage() {
    // Save todos to local storage
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}







// import { Component } from '@angular/core';
// @Component({
//   selector: 'app-todos',
//   standalone: false,
//   templateUrl: './todos.component.html',
//   styleUrls: ['./todos.component.css'],
// })
// export class TodosComponent {
//   todos: { id: number; title: string; completed: boolean }[] = [
//     { id: 1, title: 'Learn Angular', completed: true },
//     { id: 2, title: 'Build a project', completed: false },
//     { id: 3, title: 'Play Cricket', completed: false },
//   ];

//   newTodo: string = '';
//   showPending: boolean = false;
//   searchQuery: string = '';

//   addTodo() {
//     if (this.newTodo.trim()) {
//       this.todos.push({
//         id: this.todos.length + 1,
//         title: this.newTodo.trim(),
//         completed: false,
//       });
//       this.newTodo = '';
//     }
//   }

//   toggleCompletion(todo: { id: number; title: string; completed: boolean }) {
//     todo.completed = !todo.completed;
//   }

//   deleteTodo(todoId: number) {
//     this.todos = this.todos.filter((todo) => todo.id !== todoId);
//   }

//   get filteredTodos() {
//     let filtered = this.todos;

//     if (this.showPending) {
//       filtered = filtered.filter((todo) => !todo.completed);
//     }

//     if (this.searchQuery.trim()) {
//       filtered = filtered.filter((todo) =>
//         todo.title.toLowerCase().includes(this.searchQuery.toLowerCase())
//       );
//     }

//     return filtered;
//   }
// }






