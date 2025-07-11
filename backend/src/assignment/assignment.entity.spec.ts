import { AssignmentEntity } from './assignment.entity';

describe('AssignmentEntity', () => {

  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2025-07-11T12:00:00.000Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should correctly calculate 2 remaining days for an assignment ending tomorrow', () => {
    const assignment = new AssignmentEntity();
    assignment.startDate = new Date('2025-07-11T00:00:00.000Z');
    assignment.numberOfDays = 2;

    assignment.calculateRemainingDays();

    expect(assignment.remainingDays).toBe(2);
  });

  it('should correctly calculate 5 remaining days for an ongoing assignment', () => {
    const assignment = new AssignmentEntity();
    assignment.startDate = new Date('2025-07-01T00:00:00.000Z');
    assignment.numberOfDays = 15;

    assignment.calculateRemainingDays();

    expect(assignment.remainingDays).toBe(5);
  });

  it('should show 1 day remaining for an assignment ending today', () => {
    const assignment = new AssignmentEntity();
    assignment.startDate = new Date('2025-07-10T00:00:00.000Z');
    assignment.numberOfDays = 2;

    assignment.calculateRemainingDays();

    expect(assignment.remainingDays).toBe(1);
  });

  it('should show 0 days remaining for a completed assignment', () => {
    const assignment = new AssignmentEntity();
    assignment.startDate = new Date('2025-06-01T00:00:00.000Z');
    assignment.numberOfDays = 5;

    assignment.calculateRemainingDays();

    expect(assignment.remainingDays).toBe(0);
  });
});
