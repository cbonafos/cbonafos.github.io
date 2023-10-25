import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoListService } from '../services/todo-list.service';
import { Todo } from '../models/Todo';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {

  todo: Todo = <Todo>{};

  constructor(private todoService: TodoListService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.todoService.getTodoById(id).subscribe({
      next: todo => this.todo = todo,
      error: err => console.error("Error fetching todo details:", err)
    });
  }
}
