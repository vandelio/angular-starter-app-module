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

    console.log('test', moment().diff(moment(), 'days'));
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
      /*
      // add today to each asset
      this.addMilestone(
        {
          date: moment(),
          action: 'Today',
          type: 'milestone',
        },
        index,
        firstDate
      );
      // add endOfYear to each asset
      this.addMilestone(
        {
          date: moment().endOf('year'),
          action: 'EndOfYear',
          type: 'milestone',
        },
        index,
        firstDate
      );

      // add contractEnd to each asset
      this.addMilestone(
        {
          date: moment().add(1, 'year').add(6, 'month').add(7, 'day'),
          action: 'ContractEnd',
          type: 'milestone',
        },
        index,
        firstDate
      );
      */

      // calculate how many days is in between first and last date.
      this.daysInTimeline = lastDate.diff(firstDate, 'days');
      // create days arrays, which controls timeline
      this.createDaysArray(index);

      console.log('this.daysArray', this.daysArray);
      // add actions to days array
      this.addActionsToDaysArray(asset, index, firstDate, lastDate);
    });
  }
  /*
  addMilestone(milestone, index, firstDate) {
    this.countMilestones++;
    switch (milestone.action) {
      case 'Today':
        //Prepend as the first
        this.localAssets[index].actions.splice(0, 0, milestone);
        break;
      case 'EndOfYear':
        //Add at specific index (days from first date + 1(today))
        this.localAssets[index].actions.splice(
          milestone.date.diff(firstDate, 'days'),
          0,
          milestone
        );
        break;
      case 'ContractEnd':
        //Contract end is the final date of timeline
        this.localAssets[index].actions.push(milestone);
        break;
      default:
        console.log(`Sorry no milestone to add by that name.`);
    }
  }
*/
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
    console.log('before daysArray', asset.actions);
    this.daysArray[index].firstDate = firstDate;
    this.daysArray[index].lastDate = lastDate;
    this.daysArray[index].name = asset.name;

    asset.actions.map((action) => {
      // add action to the specific day
      this.addAction(action, index, action.date.diff(firstDate, 'days'));
    });

    console.log('after ', this.daysArray);
  }
  addAction(action, index, daysFromStart) {
    console.log(
      'addaction this.daysArray[index].days[daysFromStart]',
      this.daysArray[index].days[daysFromStart]
    );
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
