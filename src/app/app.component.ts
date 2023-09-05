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
      /*[
        
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

        {
          date: moment().add(1, 'day'),
          action: 'Consultation Call',
        },
        {
          date: moment().add(7, 'day'),
          action: 'Preventive maintenance',
        },
        {
          date: moment().add(12, 'day'),
          action: 'Renewal engagement',
        },
        {
          date: moment().add(2, 'month').add(19, 'day'),
          action: 'Replace Air Filter',
        },
        {
          date: moment().add(3, 'month').add(1, 'day'),
          action: 'Replace Air Filter',
        },
        {
          date: moment().add(3, 'month').add(19, 'day'),
          action: 'Replace Air Filter',
        },
        {
          date: moment().add(6, 'month').add(4, 'day'),
          action: 'Replace Air Filter - last',
        }
      ],,´*/
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
        /* 
        {
          date: moment().add(1, 'day'),
          action: 'Consultation Call',
        },
        {
          date: moment().add(2, 'day'),
          action: 'Preventive maintenance',
        },
        {
          date: moment().add(4, 'day'),
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
          date: moment().add(6, 'month').add(4, 'day'),
          action: 'Replace Air Filter - last',
        },*/
      ],
    },
  ];

  ngOnInit() {
    this.generateRandomData();
  }

  generateRandomData() {
    let count = 0;
    while (count < 12) {
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
