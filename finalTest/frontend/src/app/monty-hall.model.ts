export class MontyHall {


  switchWins: number;
  stayWins: number;
  switchWinRate: number;
  stayWinRate: number;

  constructor(

    switchWins: number,
    stayWins: number,
    switchWinRate: number,
    stayWinRate: number
  ) {

    this.switchWins = switchWins;
    this.stayWins = stayWins;
    this.switchWinRate = switchWinRate;
    this.stayWinRate = stayWinRate;
  }
}
