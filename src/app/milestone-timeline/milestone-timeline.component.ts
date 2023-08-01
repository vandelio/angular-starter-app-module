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

  daysInTimeline: number = 0;
  daysArray: TimelineDays[] = [];

  ngOnInit() {
    // define timeline per asset
    this.defineTimeline();
  }

  defineTimeline() {
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

      // add today to each asset
      asset = this.addMilestone(
        {
          date: moment(),
          action: 'Today',
          type: 'milestone',
        },
        { ...asset },
        firstDate
      );
      // add endOfYear to each asset
      this.addMilestone(
        {
          date: moment().endOf('year'),
          action: 'EndOfYear',
          type: 'milestone',
        },
        { ...asset },
        firstDate
      );

      // add contractEnd to each asset
      this.addMilestone(
        {
          date: moment().add(2, 'year').add(1, 'month').add(6, 'day'),
          action: 'ContractEnd',
          type: 'milestone',
        },
        { ...asset },
        firstDate
      );

      // calculate how many days is in between first and last date.
      this.daysInTimeline = lastDate.diff(firstDate, 'days');
      // create days arrays, which controls timeline
      this.createDaysArray(index);
      // add actions to days array
      this.addActionsToDaysArray(asset, index, firstDate, lastDate);
    });
  }

  addMilestone(milestone, asset, firstDate) {
    switch (milestone.action) {
      case 'Today':
        //Prepend as the first
        asset.actions.unshift(milestone);
        break;
      case 'EndOfYear':
        //Add at specific index (days from first date + 1(today))
        asset.actions.splice(
          milestone.date.diff(firstDate, 'days') + 1,
          0,
          milestone
        );
        break;
      case 'ContractEnd':
        //Contract end is the final date of timeline
        asset.actions.push(milestone);
        break;
      default:
        console.log(`Sorry no milestone to add by that name.`);
    }
    return asset;
  }

  createDaysArray(index) {
    // Create array to feed the days
    this.daysArray[index] = { days: [] };

    // add an entry for each of the days in the period
    let count = 0;
    while (count <= this.daysInTimeline) {
      this.daysArray[index].days.push(null);
      count++;
    }
  }

  addActionsToDaysArray(asset, index, firstDate, lastDate) {
    asset.actions.map((action) => {
      this.daysArray[index].firstDate = firstDate;
      this.daysArray[index].lastDate = lastDate;
      this.daysArray[index].name = asset.name;
      this.daysArray[index].days[action.date.diff(firstDate, 'days')] = {
        ...action,
        type: 'action',
      };
    });

    console.log(this.daysArray);
  }

  getPeriod(asset) {
    return (
      asset.firstDate.format('MMM Do YY') +
      '-' +
      asset.lastDate.format('MMM Do YY')
    );
  }
}
