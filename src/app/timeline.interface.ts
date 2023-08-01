export interface AssetTimelineRows {
  actionsPerRow: number;
  sizeOfEachAction: number;
  timelineLength: number;
  firstDate: string;
  lastDate: string;
}

export interface AssetInTimeline {
  name?: string;
  actions?: AssetActions[];
}
export interface AssetActions {
  date: moment.Moment;
  action: string;
  type?: string; // used to identify the first inject : today block
}
