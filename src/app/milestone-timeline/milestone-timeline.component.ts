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
    // define timeline per asset
    this.defineTimeline();
  }

  defineTimeline() {
    let firstDate, lastDate;
    this.assets.forEach((asset, index) => {
      asset.actions.find((action) => {
        if (action.date.isBefore(firstDate)) {
          firstDate = action.date;
        }

        if (action.date.isAfter(lastDate)) {
          lastDate = action.date;
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
      // add today to each asset
      asset.actions.unshift({
        date: moment(),
        action: 'Today',
        type: 'first',
      });

      // calculate how many days is in between first and last date.
      this.daysInTimeline = lastDate.diff(firstDate, 'days');
      console.log('daysInTimeline', this.daysInTimeline);

      let count = 0;
      this.daysArray[index] = {
        name: '',
        actions: [],
        firstDate: '',
        lastDate: '',
      };
      while (count <= this.daysInTimeline) {
        // check first date diff to
        this.daysArray[index].actions.push(null);
        count++;
      }

      // add actions to days array
      this.addActionsToDaysArray(asset, index, firstDate);
    });
  }

  addActionsToDaysArray(asset, index, firstDate) {
    asset.actions.map((action) => {
      this.daysArray[index].firstDate = asset.firstDate;
      this.daysArray[index].lastDate = asset.lastDate;
      this.daysArray[index].name = asset.name;
      this.daysArray[index].actions[action.date.diff(firstDate, 'days')] = {
        ...action,
      };
    });

    console.log(this.daysArray);
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
