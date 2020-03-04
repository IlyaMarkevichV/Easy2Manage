import {User} from "./user";
import {Sprint} from "./sprint";
import {Project} from "./project";

export class Ticket {
  id: string;
  name: string;
  description: string;
  type: string;
  priority: string;
  status: string;
  assignee: User;
  reporter: User;
  project: Project;
  projectId: string;
  sprint: Sprint;
  startDate: Date;
  dueDate: Date;
  estimated: number;
  remaining: number;
  logged: number;
  parentTicket: Ticket;
}
