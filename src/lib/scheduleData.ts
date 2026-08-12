export interface OperationSchedule {
  id: number;
  activity: string;
  area: string;
  schedule: string[]; // Raw strings as provided
}

export const operationSchedules: OperationSchedule[] = [
  {
    id: 1,
    activity: 'Health & Hospital Solutions Setup',
    area: 'Healthcare',
    schedule: [
      'Monday – Sunday',
      '8:00 AM – 6:00 PM (Ethiopian Local Time)'
    ]
  },
  {
    id: 2,
    activity: 'IT & Network Support Consulting',
    area: 'IT Consulting',
    schedule: [
      'Monday – Sunday',
      '8:00 AM – 6:00 PM (Ethiopian Local Time)'
    ]
  },
  {
    id: 3,
    activity: 'Electromechanical Site Engineering',
    area: 'Electromechanical',
    schedule: [
      'Monday – Friday',
      '8:00 AM – 6:00 PM (Ethiopian Local Time)'
    ]
  },
  {
    id: 4,
    activity: 'Medical Imaging Calibration Support',
    area: 'Medical Imaging',
    schedule: [
      'Monday – Friday',
      'By appointment (Ethiopian Local Time)'
    ]
  }
];
