import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateTodoComponent } from './create-todo.component';
import { TodoListService } from '../services/todo-list.service';
import { Todo } from '../models/Todo';
import { of, throwError } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { fakeAsync } from '@angular/core/testing';

const mockTodo: Todo = { title: 'Todo 1', description: 'a wonderful description', isDone: false };

const mockTodoListService = {
  postTodo: jasmine.createSpy('postTodo').and.returnValue(of(mockTodo))
};

describe('CreateTodoComponent', () => {
  let component: CreateTodoComponent;
  let fixture: ComponentFixture<CreateTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTodoComponent ],
      imports: [ ReactiveFormsModule, MatCardModule, MatFormFieldModule ],
      providers: [
        { provide: TodoListService, useValue: mockTodoListService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTodoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should post todo', fakeAsync(() => {
    component.todoForm.setValue({ title: 'Todo 1', description: 'a wonderful description' });
    
    component.onSubmit();
    
    expect(mockTodoListService.postTodo).toHaveBeenCalledWith(mockTodo);
    expect(component.todoForm.value).toEqual({ title: '', description: '' });
  }));


  it('should handle error when posting todo fails', () => {
    component.todoForm.setValue({ title: 'Todo 1', description: 'a wonderful description' });
    
    mockTodoListService.postTodo.and.returnValue(throwError(() => 'An error occurred'));
    spyOn(console, 'error');
    
    component.onSubmit();
    
    expect(console.error).toHaveBeenCalledWith('Error creating todo:', 'An error occurred');
  });
});
