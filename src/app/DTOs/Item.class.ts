import { ItemDTO } from './ItemDTO';

export class Item implements ItemDTO {
  id?: number;
  task: string;
  done: boolean = false;
  due?: Date;

  constructor(task: string) {
    this.task = task;
  }
  setId (id: number) {
    this.id = id;
  }
  setTask (task: string) {
    this.task = task;
  }

  isDone (done: boolean) {
    this.done = true;
  }

  setDue (date: Date) {
    this.due = date;
  }
}

