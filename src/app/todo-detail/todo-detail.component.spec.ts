import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { TodoDetailComponent } from './todo-detail.component';
import { TodoListService } from '../services/todo-list.service';
import { Todo } from '../models/Todo';
import { MatCardModule } from '@angular/material/card';

const mockTodo: Todo = { id: 1, title: 'Todo 1', description: 'a wonderful description', isDone: false };

const mockTodoListService = {
  getTodoById: jasmine.createSpy('getTodoById').and.returnValue(of(mockTodo))
};

const mockActivatedRoute = {
  snapshot: {
    paramMap: {
      get: jasmine.createSpy('get').and.returnValue('1')
    }
  }
};

describe('TodoDetailComponent', () => {
  let component: TodoDetailComponent;
  let fixture: ComponentFixture<TodoDetailComponent>;

  beforeEach(async () => {
    mockTodoListService.getTodoById.calls.reset();;
    await TestBed.configureTestingModule({
      declarations: [ TodoDetailComponent ],
      providers: [
        { provide: TodoListService, useValue: mockTodoListService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
      imports: [MatCardModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoDetailComponent);
    component = fixture.componentInstance;
  });

  it('should handle error when fetching todo details fails', () => {
    mockTodoListService.getTodoById.and.returnValue(throwError(() => 'An error occurred'));
    spyOn(console, 'error');

    fixture.detectChanges();
    expect(console.error).toHaveBeenCalledWith('Error fetching todo details:', 'An error occurred');
  });
});
