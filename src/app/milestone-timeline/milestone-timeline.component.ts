import { Component, Input, OnInit } from '@angular/core';
import moment = require('moment');
import {
  AssetInTimeline,
  AssetTimelineRows,
  TimelineDays,
} from '../timeline.interface';

@Component({
  selector: 'milestone-timeline',
  templateUrl: './milestone-timeline.component.html',
  styleUrls: ['./milestone-timeline.component.scss'],
})
export class MilestoneTimelineComponent implements OnInit {
  @Input() assets: AssetInTimeline[];

  localAssets: AssetInTimeline[];
  count: number = 0;
  daysInTimeline: number = 0;
  daysArray: TimelineDays[] = [];
  countMilestones: number = 0;

  ngOnInit() {
    this.localAssets = this.assets;
    // define timeline per asset
    this.defineTimeline();
  }

  defineTimeline() {
    let firstDate, lastDate;
    this.localAssets.forEach((asset, index) => {
      asset.actions.map((action) => {
        if (action.date.isBefore(firstDate)) {
          firstDate = action.date;
        }
        if (action.date.isAfter(lastDate)) {
          lastDate = action.date;
        }
      });

      // calculate how many days is in between first and last date.
      this.daysInTimeline = lastDate.diff(firstDate, 'days');
      // create days arrays, which controls timeline
      this.createDaysArray(index);

      console.log('this.daysArray', this.daysArray);
      // add actions to days array
      this.addActionsToDaysArray(asset, index, firstDate, lastDate);
    });
  }

  createDaysArray(index) {
    // Create array to feed the days
    this.daysArray[index] = { days: [] };

    // add an entry for each of the days in the period
    this.count = 0;
    while (this.count <= this.daysInTimeline) {
      this.daysArray[index].days[this.count] = [];
      this.count++;
    }
  }

  addActionsToDaysArray(asset, index, firstDate, lastDate) {
    this.daysArray[index].firstDate = firstDate;
    this.daysArray[index].lastDate = lastDate;
    this.daysArray[index].name = asset.name;

    asset.actions.map((action) => {
      // add action to the specific day
      this.addAction(action, index, action.date.diff(firstDate, 'days'));
    });
  }
  addAction(action, index, daysFromStart) {
    this.daysArray[index].days[daysFromStart].push({ ...action });
  }

  getPeriod(asset) {
    return (
      asset.firstDate.format('MMM Do YY') +
      '-' +
      asset.lastDate.format('MMM Do YY')
    );
  }
}
