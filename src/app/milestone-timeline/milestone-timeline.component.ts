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
  actionCount: number = 0;

  ngOnInit() {
    console.log('assets', this.assets);
    this.localAssets = this.assets;
    // define timeline per asset
    this.defineTimeline();
  }

  defineTimeline() {
    let firstDate, lastDate;
    this.localAssets.forEach((asset, index) => {
      ///////////////////
      // foreach asset

      // this could be done more smooth - maybe reduce
      asset.actions.map((action) => {
        // set action first date and last date
        if (action.date.isBefore(firstDate)) {
          firstDate = action.date;
        }
        if (action.date.isAfter(lastDate)) {
          lastDate = action.date;
        }
      });

      // calculate how many days is in between first and last date.
      this.daysInTimeline = lastDate.diff(firstDate, 'days');
      // add actions to days array
      this.addActionsToDaysArray(asset, index, firstDate, lastDate);
    });
  }

  addActionsToDaysArray(asset, index, firstDate, lastDate) {
    this.daysArray[index] = {
      days: [],
      firstDate: firstDate,
      lastDate: lastDate,
      name: asset.name,
    };

    asset.actions.map((action, actionIndex) => {
      // add action to the specific day
      this.addAction(action, index, action.date.diff(firstDate, 'days'));
    });
  }
  addAction(action, index, daysFromStart) {
    // TODO: make sure we are not overwriting an existing on day
    if (this.isDayEmpty(this.daysArray[index].days[daysFromStart])) {
      this.daysArray[index].days[daysFromStart] = {
        daysFromStart: daysFromStart,
        ...action,
      };
    } else {
      // day not empty
      // 2 options
      // change each day to array, to contain multiple

      // just inject it after
      // make room for it
      this.daysArray[index].days.splice(daysFromStart + 1, 0, {
        daysFromStart: daysFromStart,
        ...action,
      });
    }
  }

  isDayEmpty(day) {
    return day === undefined;
  }

  getPeriod(asset) {
    return (
      asset.firstDate.format('MMM Do YYYY') +
      ' - ' +
      asset.lastDate.format('MMM Do YYYY')
    );
  }
}
