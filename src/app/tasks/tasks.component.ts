import { Component } from '@angular/core';

export interface Task {
  title: string;
  description?: string;
  completed: boolean;
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {

  tasks: Task[] = [
    { title: 'Go Grocery Shopping', description: 'Eggs, cheese, butter, milk', completed: false },
    { title: 'Walk dog', description: '3 laps around walking track', completed: false },
    { title: 'Write article', description: 'Linked List Data Structure', completed: false },
  ]
  counter: number;

  constructor() {
    this.counter = this.tasks.length;
  }

  toggleStatus(task: Task) {
    task.completed = !task.completed
  } 

  deleteItem(id: number) {
    // if the item does not exist, then return
    if (!(this.tasks[id])) return;
    this.tasks.splice(id, 1);
  }

  addTask() {
    this.tasks.push({
      title: `Dummy task ${this.counter + 1}`,
      description: 'Lorem Ipsum yada yada yada',
      completed: false
    });
    this.counter++;
  }

}
