import { Component } from '@angular/core';
import moment = require('moment');
import { AssetInTimeline } from './timeline.interface';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  actionsOptions = [
    'Replace Air Filter',
    'Replace Battery',
    'Replace other stuff',
    'Consultation Call',
    'Preventive maintenance',
    'Renewal engagement',
  ];
  generatedData = [];
  assets: AssetInTimeline[] = [
    {
      name: 'asdad',
      actions: [
        {
          date: moment(),
          action: 'Today',
          type: 'milestone',
        },
        {
          date: moment().endOf('year'),
          action: 'End Of Yeaar',
          type: 'milestone',
        },
        {
          date: moment().add(6, 'month').add(10, 'day'),
          action: 'Contract End',
          type: 'milestone',
        },
      ],
    },
    {
      name: 'asdad32',
      actions: [
        {
          date: moment(),
          action: 'Today',
          type: 'milestone',
        },
        {
          date: moment().endOf('year'),
          action: 'End Of Yeaar',
          type: 'milestone',
        },
        {
          date: moment().add(6, 'month').add(10, 'day'),
          action: 'Contract End',
          type: 'milestone',
        },
      ],
    },
    {
      name: 'asdad3332',
      actions: [
        {
          date: moment(),
          action: 'Today',
          type: 'milestone',
        },
        {
          date: moment().endOf('year'),
          action: 'End Of Yeaar',
          type: 'milestone',
        },
        {
          date: moment().add(6, 'month').add(10, 'day'),
          action: 'Contract End',
          type: 'milestone',
        },
      ],
    },
    {
      name: 'asdad32111',
      actions: [
        {
          date: moment(),
          action: 'Today',
          type: 'milestone',
        },
        {
          date: moment().endOf('year'),
          action: 'End Of Yeaar',
          type: 'milestone',
        },
        {
          date: moment().add(6, 'month').add(10, 'day'),
          action: 'Contract End',
          type: 'milestone',
        },
      ],
    },
  ];

  ngOnInit() {
    this.generateRandomData();
  }

  generateRandomData() {
    let count = 0;
    while (count < 8) {
      this.generatedData.push({
        date: this.someRandomDate(
          moment(),
          moment().add(6, 'month').add(10, 'day')
        ),
        action: this.someRandomAction(),
      });
      count++;
    }

    console.log('this.generatedData', this.generatedData);

    const test = [...this.assets[0].actions, ...this.generatedData];
    this.assets[0].actions = test;
    this.assets[1].actions = test;
    this.assets[2].actions = test;
    this.assets[3].actions = test;
    console.log(' this.assets', this.assets);
  }
  someRandomDate(date1, date2) {
    function randomValueBetween(min, max) {
      return Math.random() * (max - min) + min;
    }
    var date1 = date1;
    var date2 = date2 || new Date();
    date1 = new Date(date1).getTime();
    date2 = new Date(date2).getTime();
    if (date1 > date2) {
      return moment(new Date(randomValueBetween(date2, date1)));
    } else {
      return moment(new Date(randomValueBetween(date1, date2)));
    }
  }
  someRandomAction() {
    return this.actionsOptions[
      Math.floor(Math.random() * this.actionsOptions.length)
    ];
  }
}
