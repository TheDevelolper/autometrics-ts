import { delayRandomDuration, shouldError } from "./util.js";
import {
  Autometrics,
  Objective,
  ObjectiveLatency,
  ObjectivePercentile,
} from "@autometrics/autometrics";

interface User {
  id: number;
  name: string;
}

export const API_SLO: Objective = {
  name: "api",
  successRate: ObjectivePercentile.P99,
  latency: [ObjectiveLatency.Ms250, ObjectivePercentile.P99],
};

@Autometrics({ objective: API_SLO })
export class DatabaseClient {
  public users: User[];
  constructor() {
    this.users = [
      {
        id: 1,
        name: "John",
      },
      {
        id: 2,
        name: "Jane",
      },
    ];
  }

  public async getUsers() {
    shouldError();
    await delayRandomDuration();
    return this.users;
  }

  public async getUser(id: number) {
    shouldError();
    await delayRandomDuration();
    return this.users.find((user) => user.id === id);
  }

  public async addUser(user: User) {
    shouldError();
    await delayRandomDuration();
    this.users.push(user);
    return user;
  }

  public async deleteUser(id: number) {
    shouldError();
    await delayRandomDuration();
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new Error("User not found");
    }
    this.users = this.users.filter((user) => user.id !== id);
    return user;
  }
}

export const db = new DatabaseClient();
