import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TasksComponent } from './tasks.component';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  // create a new test suite
  describe('Data Manipulation', () => {
    // put tests here

    it('should successfully add a task to the list', () => {
      // LENGTH OF THE LIST AFTER SHOULD BE 1 MORE THAN THE LENGTH OF THE LIST BEFORE
      const numTasks = component.tasks.length;
      component.addTask();
      const newNumTasks = component.tasks.length;
      expect(newNumTasks).toBe(numTasks + 1);
    });

    it('should successfully delete a task', () => {
      const taskNum = component.tasks.length;
      component.deleteItem(1);
      const newTaskNum = component.tasks.length;
      expect(taskNum - 1).toBe(newTaskNum);
    });

    it('should not do anything when deleting an invalid task id', () => {
      const taskNum = component.tasks.length;
      component.deleteItem(-1);
      const newTaskNum = component.tasks.length;
      expect(taskNum).toEqual(newTaskNum);
    });

    it('should toggle a task\'s completion state', () => {
      // The state before should be opposite to the state after
      const task = component.tasks[1];
      const initialState = task.completed;
      component.toggleStatus(task)
      expect(task.completed).toEqual(!initialState);
    });
  });

  describe('UI Manipulation', () => {
    it('should start off with 3 default tasks', () => {
      const uiCards = fixture.debugElement.queryAll(By.css('.item-card'));
      expect(uiCards.length).toBe(3);

      for (const card of uiCards) {
        expect(card.query(By.css('.ribbon')).styles.backgroundColor).toBe('red');
        expect(card.query(By.css('.toggle-button')).nativeElement.innerText).toBe('Done');
      }
    });
    
     it('should display one more card when an item is added', () => {
      component.addTask();
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('.item-card')).length).toBe(4);
    });
    
     it('should display one less card when an item is deleted', () => {
      component.deleteItem(1);
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('.item-card')).length).toBe(2);
    });

    it('should render changes when an item is marked as complete', () => {
      const firstTask = component.tasks[0];
      component.toggleStatus(firstTask);
      fixture.detectChanges();

      const firstCard = fixture.debugElement.query(By.css('.item-card:first-of-type'));
      expect(firstCard.query(By.css('.ribbon')).styles.backgroundColor).toBe('green');
      expect(firstCard.query(By.css('.toggle-button')).nativeElement.innerText).toBe('Uncheck');
    });
  })
});
