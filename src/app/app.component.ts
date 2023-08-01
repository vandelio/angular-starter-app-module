import { Component } from '@angular/core';
import moment = require('moment');

interface AssetTimelineRows {
  actionsPerRow: number;
  sizeOfEachAction: number;
  timelineLength: number;
  firstDate: string;
  lastDate: string;
}

interface AssetInTimeline {
  name: string;
  actions: AssetActions[];
}
interface AssetActions {
  date: moment.Moment;
  action: string;
  type?: string; // used to identify the first inject : today block
}

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
          date: moment().subtract(4, 'month').add(1, 'day'),
          action: 'Consultation Call',
        },
        {
          date: moment().subtract(3, 'month').add(10, 'day'),
          action: 'Preventive maintenance',
        },
        {
          date: moment().subtract(2, 'month').add(10, 'day'),
          action: 'Renewal engagement',
        },
        {
          date: moment().add(2, 'month').add(19, 'day'),
          action: 'Replace Air Filter',
        },
        {
          date: moment().add(2, 'month').add(29, 'day'),
          action: 'Replace Air Filter',
        },
        {
          date: moment().add(3, 'month').add(19, 'day'),
          action: 'Replace Air Filter',
        },
        {
          date: moment().add(4, 'month').add(19, 'day'),
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
  ];

  timelinePeriod: number = 0;
  TSfirstDate: number;
  TSlastDate: number;
  firstDate: moment.Moment;
  lastDate: moment.Moment;
  assetRows: AssetTimelineRows[] = [];
  sizeOfEachActionLabel: number;
  eachActionSizePercent: number;

  ngOnInit() {
    this.loopAssets();
  }

  loopAssets() {
    // Get first date and last date
    // Set timeline row, count per row and size per action
    this.assets.forEach((asset, index) => {
      asset.actions.unshift({
        date: moment(),
        action: 'Today',
        type: 'first',
      });
      asset.actions.find((action) => {
        if (
          typeof this.TSfirstDate === 'undefined' ||
          action.date.isBefore(this.TSfirstDate)
        ) {
          this.firstDate = action.date;
          this.TSfirstDate = Number(action.date.format('X'));
        }

        if (
          typeof this.TSlastDate === 'undefined' ||
          action.date.isAfter(this.TSlastDate)
        ) {
          this.lastDate = action.date;
          this.TSlastDate = Number(action.date.format('X'));
        }

        this.timelinePeriod = this.TSlastDate - this.TSfirstDate;
        // get number of actions per row, per asset
        this.setTimelineRow(
          index,
          Math.round(asset.actions.length / 2),
          this.timelinePeriod,
          this.firstDate,
          this.lastDate
        );
      });
    });

    console.log('this.TSlastDate', this.TSlastDate);
    console.log('this.TSfirstDate', this.TSfirstDate);
  }

  convertSizeToPercent(timelinePeriod, size) {
    return (size / 100 / (timelinePeriod / 100)) * 100;
  }

  setTimelineRow(index, perRow, timelinePeriod, firstDate, lastDate) {
    // actions in row / full timeline length = size of each action label
    this.assetRows[index] = {
      sizeOfEachAction: this.convertSizeToPercent(
        timelinePeriod,
        Number(timelinePeriod / perRow)
      ),
      actionsPerRow: perRow,
      timelineLength: timelinePeriod,
      firstDate: firstDate,
      lastDate: lastDate,
    } as AssetTimelineRows;
    console.log(this.assetRows);
  }
}
