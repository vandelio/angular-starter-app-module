import { Component, Input, OnInit } from '@angular/core';
import moment = require('moment');
import {
  AssetInTimeline,
  AssetTimelineRows,
  TimelineDays,
  TimelineRows,
} from '../timeline.interface';

@Component({
  selector: 'milestone-timeline',
  templateUrl: './milestone-timeline.component.html',
  styleUrls: ['./milestone-timeline.component.scss'],
})
export class MilestoneTimelineComponent implements OnInit {
  @Input() assets: AssetInTimeline[];
  count: number = 0;
  daysInTimeline: number = 0;
  daysArray: TimelineRows;
  countMilestones: number = 0;

  ngOnInit() {
    // define timeline per asset
    let firstDate, lastDate;
    this.assets.forEach((asset, index) => {
      asset.actions.map((action) => {
        if (action.date.isBefore(firstDate)) {
          firstDate = action.date;
        }
        if (action.date.isAfter(lastDate)) {
          lastDate = action.date;
        }
      });

      const oddEven = index % 2 === 0 ? 'even' : 'odd';
      // calculate how many days is in between first and last date.
      this.daysInTimeline = lastDate.diff(firstDate, 'days');
      // create days arrays, which controls timeline
      this.createDaysArray(index, oddEven);

      console.log('this.daysArray', this.daysArray);

      //
      // add actions to days array
      this.addActionsToDaysArrayRows(
        asset,
        index,
        firstDate,
        lastDate,
        oddEven
      );
    });
    console.log(this.daysArray);
  }

  createDaysArray(index, oddEven) {
    // Create array to feed the days
    this.daysArray[oddEven][index] = { days: [] };

    // add an entry for each of the days in the period
    this.count = 0;
    while (this.count <= this.daysInTimeline) {
      this.daysArray[oddEven][index].days[this.count] = [];
      this.count++;
    }
  }

  addActionsToDaysArrayRows(asset, index, firstDate, lastDate, oddEven) {
    this.daysArray[oddEven][index].firstDate = firstDate;
    this.daysArray[oddEven][index].lastDate = lastDate;
    this.daysArray[oddEven][index].name = asset.name;

    asset.actions.map((action) => {
      // add action to the specific day
      this.addAction(
        action,
        index,
        action.date.diff(firstDate, 'days'),
        oddEven
      );
    });
  }
  addAction(action, index, daysFromStart, oddEven) {
    this.daysArray[oddEven][index].days[daysFromStart].push({ ...action });
  }

  // called from html
  getPeriod(asset) {
    console.log('getperiod');
    return (
      asset.firstDate.format('MMM Do YY') +
      '-' +
      asset.lastDate.format('MMM Do YY')
    );
  }
}
