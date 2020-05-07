import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'ticketFormatter'})
export class TicketFormatterPipe implements PipeTransform {
  public transform(value: string): string {
    return value.replace(/_/g, ' ');
  }
}
