import { Component } from '@angular/core';
import moment = require('moment');
import { AssetInTimeline } from './timeline.interface';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  assets: AssetInTimeline[] = [
    {
      name: 'asdad',
      actions: [
        {
          date: moment().add(1, 'day'),
          action: 'Consultation Call',
        },
        {
          date: moment().add(2, 'day'),
          action: 'Preventive maintenance',
        },
        {
          date: moment().add(3, 'day'),
          action: 'Renewal engagement',
        },
        {
          date: moment().add(1, 'month').add(19, 'day'),
          action: 'Replace Air Filter',
        },
        {
          date: moment().add(2, 'month').add(1, 'day'),
          action: 'Replace Air Filter',
        },
        {
          date: moment().add(2, 'month').add(19, 'day'),
          action: 'Replace Air Filter',
        },
        {
          date: moment().add(3, 'month').add(4, 'day'),
          action: 'Replace Air Filter',
        },
      ],
    },
    /*
    {
      name: 'asdad2',
      actions: [
        {
          date: moment().add(1, 'month').add(1, 'day'),
          action: 'Consultation Call',
        },
        {
          date: moment().add(1, 'month').add(10, 'day'),
          action: 'Preventive maintenance',
        },
        {
          date: moment().add(2, 'month').add(10, 'day'),
          action: 'Renewal engagement',
        },
        {
          date: moment().add(2, 'month').add(19, 'day'),
          action: 'Replace Air Filter',
        },
        {
          date: moment().add(2, 'month').add(19, 'day'),
          action: 'Replace Air Filter',
        },
      ],
    },
    {
      name: 'asdad 4',
      actions: [
        {
          date: moment().add(1, 'month').add(1, 'day'),
          action: 'Consultation Call',
        },
        {
          date: moment().add(1, 'month').add(10, 'day'),
          action: 'Preventive maintenance',
        },
        {
          date: moment().add(2, 'month').add(10, 'day'),
          action: 'Renewal engagement',
        },
        {
          date: moment().add(2, 'month').add(19, 'day'),
          action: 'Replace Air Filter',
        },
        {
          date: moment().add(2, 'month').add(19, 'day'),
          action: 'Replace Air Filter',
        },
        {
          date: moment().add(2, 'month').add(19, 'day'),
          action: 'Replace Air Filter',
        },
        {
          date: moment().add(2, 'month').add(19, 'day'),
          action: 'Replace Air Filter',
        },
        {
          date: moment().add(2, 'month').add(19, 'day'),
          action: 'Replace Air Filter',
        },
        {
          date: moment().add(2, 'month').add(19, 'day'),
          action: 'Replace Air Filter',
        },
      ],
    },
    */
  ];

  ngOnInit() {}
}
