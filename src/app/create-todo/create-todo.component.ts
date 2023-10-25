import { Component, EventEmitter, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { TodoListService } from '../services/todo-list.service';
import { Todo } from '../models/Todo';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent {

  @Output() formSubmitted: EventEmitter<Todo> = new EventEmitter<Todo>();

  constructor(private fb: FormBuilder, private todoListService: TodoListService) { }

  todoForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
  });

  onSubmit(){
    const todoData = this.prepareTodoData();
    this.todoListService.postTodo(todoData).subscribe({
      next: todo => this.formSubmitted.emit(todo),
      error: err => console.error("Error creating todo:", err)
    });
    this.todoForm.reset({
      title: '',
      description: ''
    });
  }

  private prepareTodoData(): Todo {
    return {
      title: this.todoForm.value.title!,
      description: this.todoForm.value.description!,
      isDone: false
    };
  }
}
