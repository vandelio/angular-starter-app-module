import { Component, Input, OnInit } from '@angular/core';
import moment = require('moment');
import { AssetInTimeline, AssetTimelineRows } from '../timeline.interface';

@Component({
  selector: 'milestone-timeline',
  templateUrl: './milestone-timeline.component.html',
  styleUrls: ['./milestone-timeline.component.scss'],
})
export class MilestoneTimelineComponent implements OnInit {
  @Input() assets: AssetInTimeline[];

  localAssets: AssetInTimeline[];
  daysInTimeline: number = 0;
  TSfirstDate: number;
  TSlastDate: number;
  firstDate: moment.Moment;
  lastDate: moment.Moment;

  daysArray: AssetInTimeline[] = [];

  assetRows: AssetTimelineRows[] = [];
  sizeOfEachActionLabel: number;
  eachActionSizePercent: number;

  ngOnInit() {
    this.loopAssets();
  }

  loopAssets() {
    // Get first date and last date
    // Set timeline row, count per row and size per action
    this.assets.map((asset, index) => {
      asset.actions.unshift({
        date: moment(),
        action: 'Today',
        type: 'first',
      });

      // find the first and last date, to define timeline length
      this.defineTimeline(asset, index);
      this.addActionsToDaysArray(asset, index);
      return asset;
    });

    console.log('this.TSlastDate', this.TSlastDate);
    console.log('this.TSfirstDate', this.TSfirstDate);
  }

  defineTimeline(asset, index) {
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
      //this.timelinePeriod = this.TSlastDate - this.TSfirstDate;

      // get number of actions per row, per asset
      /* this.setTimelineRow(
        index,
        Math.round(asset.actions.length / 2),
        this.timelinePeriod,
        this.firstDate,
        this.lastDate
      );*/
    });

    // calculate how many days is in between first and last date.
    this.daysInTimeline = this.lastDate.diff(this.firstDate, 'days');
    console.log('daysInTimeline', this.daysInTimeline);

    let count = 0;
    while (count <= this.daysInTimeline) {
      // check first date diff to
      this.daysArray.push();
      count++;
    }
  }

  addActionsToDaysArray(asset, index) {
    asset.actions.map((action) => {
      this.daysArray[index][action.date.diff(this.firstDate, 'days')] = action;
    });
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
