import { MontyHall } from './monty-hall.model';

describe('MontyHall', () => {
  it('should create an instance', () => {
    const montyHall = new MontyHall(50, 50, 0.5, 0.5);
    expect(montyHall).toBeTruthy();
  });
});
