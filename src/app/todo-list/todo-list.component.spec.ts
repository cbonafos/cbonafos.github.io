import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';
import { TodoListService } from '../services/todo-list.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { CreateTodoComponent } from '../create-todo/create-todo.component';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';

const mockTodoListService = {
  getAllTodos: jasmine.createSpy('getAllTodos').and.returnValue(of([
    { id: 1, title: 'Todo 1', isDone: false },
    { id: 2, title: 'Todo 2', isDone: true }
  ])),
  putTodo: jasmine.createSpy('putTodo').and.returnValue(of({})),
  deleteTodo: jasmine.createSpy('deleteTodo').and.returnValue(of({}))
};

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoListComponent, CreateTodoComponent],
      providers: [{ provide: TodoListService, useValue: mockTodoListService }],
      imports: [HttpClientTestingModule, HttpClientModule, MatCardModule, MatListModule, MatMenuModule, MatIconModule, MatFormFieldModule]
    });

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
  });

  it('should filter and sort todos correctly', () => {
    component.todos = [
      { id: 2, title: 'Todo 2', isDone: true },
      { id: 1, title: 'Todo 1', isDone: false }
    ];
    component.filterTodos();
    expect(component.todosDone).toEqual([{ id: 2, title: 'Todo 2', isDone: true }]);
    expect(component.todosNotDone).toEqual([{ id: 1, title: 'Todo 1', isDone: false }]);
  });

  
  it('should add new todo and call filterTodos', () => {
    spyOn(component, 'filterTodos');
    const todo = { id: 3, title: 'Todo 3', isDone: false };
    component.addNewTodo(todo);
    expect(component.todos).toContain(todo);
    expect(component.filterTodos).toHaveBeenCalled();
  });

  it('should delete todo and call filterTodos', () => {
    spyOn(component, 'filterTodos');
    component.todos = [
      { id: 1, title: 'Todo 1', isDone: false },
      { id: 2, title: 'Todo 2', isDone: true }
    ];
    component.deleteTodo(1);
    expect(mockTodoListService.deleteTodo).toHaveBeenCalledWith(1);
    expect(component.todos).toEqual([{ id: 2, title: 'Todo 2', isDone: true }]);
    expect(component.filterTodos).toHaveBeenCalled();
  });
  
});
