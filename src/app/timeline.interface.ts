export interface AssetTimelineRows {
  actionsPerRow: number;
  sizeOfEachAction: number;
  timelineLength: number;
  firstDate: string;
  lastDate: string;
}

export interface AssetInTimeline {
  name: string;
  actions: AssetAction[];
}
export interface AssetAction {
  date: moment.Moment;
  action: string;
  daysFromStart: number;
  type?: string; // used to identify the first inject : today block
}

export interface TimelineDays {
  name?: string;
  days: AssetAction[] | null[];
  firstDate?: moment.Moment;
  lastDate?: moment.Moment;
}
