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

      asset.actions.map((action) => {
        console.log('action.date', action.date);

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
      console.log('daysInTimeline', this.daysInTimeline);
      // create days arrays, which controls timeline
      this.createDaysArray(index);

      // add actions to days array
      this.addActionsToDaysArray(asset, index, firstDate, lastDate);
    });
    console.log('daysArray', this.daysArray);
  }

  createDaysArray(index) {
    // Create array to feed the days
    this.daysArray[index] = { days: { odd: [], even: [] } };

    // add an entry for each of the days in the period
    this.count = 0;
    while (this.count <= this.daysInTimeline) {
      this.daysArray[index].days[this.count % 2 === 0 ? 'even' : 'odd'] = [];
      this.count++;
    }
    console.log('created daysArray per asset', this.daysArray);
  }

  addActionsToDaysArray(asset, index, firstDate, lastDate) {
    this.daysArray[index].firstDate = firstDate;
    this.daysArray[index].lastDate = lastDate;
    this.daysArray[index].name = asset.name;

    asset.actions.map((action, actionIndex) => {
      // add action to the specific day
      this.addAction(
        action,
        index,
        actionIndex,
        action.date.diff(firstDate, 'days')
      );
    });

    console.log('actions added daysArray per asset', this.daysArray);
    // make sure we have all days in both rows
    if (!this.daysArray[index].days['odd'][this.daysInTimeline]) {
      // append final day
      this.daysArray[index].days['odd'][this.daysInTimeline] = undefined;
    }
    if (!this.daysArray[index].days['even'][this.daysInTimeline]) {
      // append final day
      this.daysArray[index].days['even'][this.daysInTimeline] = undefined;
    }
  }
  addAction(action, index, actionIndex, daysFromStart) {
    if (action.type === 'milestone') {
      // add to both rows
      this.daysArray[index].days['even'][daysFromStart] = {
        daysFromStart: daysFromStart,
        ...action,
      };

      this.daysArray[index].days['odd'][daysFromStart] = {
        daysFromStart: daysFromStart,
        ...action,
      };
    } else {
      // add to one row
      this.daysArray[index].days[actionIndex % 2 === 0 ? 'even' : 'odd'][
        daysFromStart
      ] = {
        daysFromStart: daysFromStart,
        ...action,
      };
    }
  }

  getPeriod(asset) {
    return (
      asset.firstDate.format('MMM Do YYYY') +
      ' - ' +
      asset.lastDate.format('MMM Do YYYY')
    );
  }
}
