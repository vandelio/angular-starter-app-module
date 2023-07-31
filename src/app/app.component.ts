import { Component, OnInit } from '@angular/core';
import moment = require('moment');

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  assets = [
    {
      name: 'asdad',
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
      ],
    },

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
      ],
    },
  ];

  actionSizeOnTimeline: number = 0;
  TSfirstDate: string;
  TSlastDate: string;
  firstDate: moment.Moment;
  lastDate: moment.Moment;

  OnInit() {
    this.calculateSizeOfEachActionLabel();
  }

  calculateSizeOfEachActionLabel() {
    // calculate action size

    // get timestamp for start date (first date)
    // get timestamp for end date (last date)
    // end - start = full timeline length

    this.getFirstAndLastDates();

    console.log(this.lastDate, this.firstDate);

    // Split the actions into 2 rows by dividing
    // asset.actions / 2 = actions in row

    // actions in row / full timeline length = size of each action label
  }
  getFirstAndLastDates() {
    this.assets.forEach((asset) => {
      asset.actions.find((action) => {
        if (action.date.isBefore(this.TSfirstDate)) {
          this.firstDate = action.date;
          this.TSfirstDate = action.date.format('X');
        }

        if (action.date.isAfter(this.TSlastDate)) {
          this.lastDate = action.date;
          this.TSlastDate = action.date.format('X');
        }
      });
    });
  }
}
