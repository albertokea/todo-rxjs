/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TaskService } from './task.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import tasks from '../../../stubbs/data/todo-tasks.json'
import { HttpClient } from '@angular/common/http';

const httpMock = {
  get: jest.fn(),
  post: jest.fn()
}

describe('Service: Task', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskService, {provide: HttpClient, useValue: httpMock}],
      imports: [RouterTestingModule, HttpClientTestingModule]
    });
  });

  it("should get all tasks", () => {
        const taskService = new TaskService(httpMock as any);
        const tasks = [
            { id: 1, description: "Task 1", status: 1 },
            { id: 2, description: "Task 2", status: 0 },
            { id: 3, description: "Task 3", status: 1 }
        ];
        httpMock.get.mockReturnValueOnce({ pipe: jest.fn().mockReturnValueOnce({ subscribe: jest.fn().mockImplementationOnce(({ next }) => next(tasks)) }) });
        taskService.getAllTasks();
        expect(httpMock.get).toHaveBeenCalledWith('allTasks');
        expect(taskService.tasks.getValue()).toEqual(tasks);
        expect(taskService.allTasks.getValue()).toEqual(tasks);
        expect(taskService.tasksCount.getValue()).toBe(3);
        expect(taskService.pendingTasksCount.getValue()).toBe(1);
    });

    it("should add task", () => {
      const taskService = new TaskService(httpMock as any);
      const taskDescription = "New Task";
      const task = { id: 1, description: taskDescription, status: 0 };
      httpMock.post.mockReturnValueOnce({ pipe: jest.fn().mockReturnValueOnce({ subscribe: jest.fn().mockImplementationOnce(({ next }) => next(tasks)) }) });
      taskService.addTask(taskDescription);
      expect(httpMock.post).toHaveBeenCalledWith('task', { task });
      expect(taskService.tasks.getValue()[0]).toEqual(task);
      expect(taskService.allTasks.getValue()[0]).toEqual(task);
      expect(taskService.tasksCount.getValue()).toBe(1);
      expect(taskService.pendingTasksCount.getValue()).toBe(1);
  });

  it("should delete a task", () => {
    const taskService = new TaskService(httpMock as any);
    const tasks = [
        { id: 1, description: "Task 1", status: 1 },
        { id: 2, description: "Task 2", status: 0 },
        { id: 3, description: "Task 3", status: 1 }
    ];
    taskService.tasks.next(tasks);
    taskService.allTasks.next(tasks);
    taskService.tasksCount.next(3);
    taskService.pendingTasksCount.next(1);
    const idToDelete = 2;
    httpMock.post.mockReturnValueOnce({ pipe: jest.fn().mockReturnValueOnce({ subscribe: jest.fn().mockImplementationOnce(({ next }) => next(tasks)) }) });
    taskService.deleteTask(idToDelete);
    expect(httpMock.post).toHaveBeenCalledWith('deleteTask', { id: idToDelete });
    expect(taskService.tasks.getValue().length).toBe(2);
    expect(taskService.allTasks.getValue().length).toBe(2);
    expect(taskService.tasks.getValue().find(task => task.id === idToDelete)).toBeUndefined();
    expect(taskService.allTasks.getValue().find(task => task.id === idToDelete)).toBeUndefined();
    expect(taskService.tasksCount.getValue()).toBe(2);
    expect(taskService.pendingTasksCount.getValue()).toBe(0);
});

it("should filter tasks", () => {
  const taskService = new TaskService({} as any);
  const tasks = [
      { id: 1, description: "Task 1", status: 1 },
      { id: 2, description: "Task 2", status: 0 },
      { id: 3, description: "Task 3", status: 1 }
  ];
  taskService.allTasks.next(tasks);
  taskService.filterTasks(1);
  expect(taskService.tasks.getValue().length).toBe(2);
  expect(taskService.tasks.getValue()[0].status).toBe(1);
  taskService.filterTasks(2);
  expect(taskService.tasks.getValue().length).toBe(3);
  expect(taskService.tasks.getValue()).toEqual(tasks);
});
});
