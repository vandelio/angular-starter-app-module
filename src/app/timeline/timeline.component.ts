import { Component, Input, OnInit } from '@angular/core';
import moment = require('moment');

export interface AssetTimelineRows {
  actionsPerRow: number;
  sizeOfEachAction: number;
  timelineLength: number;
  firstDate: string;
  lastDate: string;
}

export interface AssetInTimeline {
  name: string;
  actions: AssetActions[];
}
export interface AssetActions {
  date: moment.Moment;
  action: string;
  type?: string; // used to identify the first inject : today block
}

@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {
  @Input() assets: AssetInTimeline[];

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
