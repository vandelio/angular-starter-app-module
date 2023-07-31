import { Component } from '@angular/core';
import moment = require('moment');

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  assets = [
    {
      name: 'asdad',
      actions: [
        {
          date: moment().add(1, 'month').add(1, 'day').calendar(),
          action: 'Consultation Call',
        },
        {
          date: moment().add(1, 'month').add(10, 'day').calendar(),
          action: 'Preventive maintenance',
        },
        {
          date: moment().add(2, 'month').add(10, 'day').calendar(),
          action: 'Renewal engagement',
        },
        {
          date: moment().add(2, 'month').add(19, 'day').calendar(),
          action: 'Replace Air Filter',
        },
      ],
    },
  ];
}
