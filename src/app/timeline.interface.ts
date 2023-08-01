export interface AssetTimelineRows {
  actionsPerRow: number;
  sizeOfEachAction: number;
  timelineLength: number;
  firstDate: string;
  lastDate: string;
}

export interface AssetInTimeline {
  name?: string;
  actions?: AssetActions[] | null;
  firstDate: moment.Moment;
  lastDate: moment.Moment;
}
export interface AssetActions {
  date: moment.Moment;
  action: string;
  type?: string; // used to identify the first inject : today block
}
