import { Component } from '@angular/core';
import { MontyHallService } from '../monty-hall.service';

@Component({
  selector: 'app-monty-hall',
  templateUrl: './monty-hall.component.html',
  styleUrls: ['./monty-hall.component.css']
})
export class MontyHallComponent {

  doors: { prize: string, revealed: boolean }[] = [
    { prize: '🐐', revealed: false },
    { prize: '🐐', revealed: false },
    { prize: '🐐', revealed: false }
  ];
  state: 'PICK' | 'REVEAL' = 'PICK';
  pickedDoor: number | null = null;
  switchButtonVisible = false;
  stayButtonVisible = false;
  playAgainVisible = false;
  outcome = '';

  totalSwitchPlays = 0;
  totalStayPlays = 0;
  totalSwitchWins = 0;
  totalStayWins = 0;

  switchRate: number = 0;
  stayRate: number = 0;

  manullyswitchRate: number = 0;
  manullystayRate: number = 0;

  simulations: number = 0;
  changeDoor: boolean = true;

  email:string ='';

  constructor(private montyHallService: MontyHallService) {
  }

  ngOnInit() {
    this.startOver();
  }

  

  startOver() { 
    console.log('Starting over...');
    this.doors.forEach(door => door.revealed = false);

 
    const carIndex = Math.floor(Math.random() * this.doors.length); 
    this.doors.forEach((door, index) => door.prize = index === carIndex ? '🚓' : '🐐');


    this.state = 'PICK';
    this.pickedDoor = null;
    this.playAgainVisible = false;
    this.outcome = '';
  }

  pickDoor(index: number) {
    if (this.state === 'PICK') {
      console.log('Picking door:', index);
      this.pickedDoor = index;
      this.state = 'REVEAL';
      this.reveal();
    }
  }

  reveal() {
    const options = this.doors.filter((door, index) => index !== this.pickedDoor && door.prize === '🐐');

    const revealedDoorIndex = this.doors.indexOf(options[Math.floor(Math.random() * options.length)]);
    this.doors[revealedDoorIndex].revealed = true;

    this.switchButtonVisible = true;
    this.stayButtonVisible = true;
  }

  playerSwitch() {
    console.log('Player switching doors');
    this.totalSwitchPlays++;


    const newPick = this.doors.findIndex((door, index) =>
      index !== this.pickedDoor && !door.revealed);
    this.pickedDoor = newPick;

    this.checkWin(true);
  }

  playerStay() {
    console.log('Player stay with the current door');
    this.totalStayPlays++;
    this.checkWin(false);
  }

  checkWin(playerSwitch: boolean) {
    console.log('Checking win...');
    this.switchButtonVisible = false;
    this.stayButtonVisible = false;


    if (this.pickedDoor === null) {
      console.error('No door has been picked.');
      return;
    }


    const win = this.doors[this.pickedDoor].prize === '🚓';
    if (win) {
      console.log('You win!');
      this.outcome = 'You win!';
      if (playerSwitch) {
        this.totalSwitchWins++;
      } else {
        this.totalStayWins++;
      }
    } else {
      console.log('You lose!');
      this.outcome = 'You lose!';
    }

    this.manullyswitchRate = this.totalSwitchPlays === 0 ? 0 : (this.totalSwitchWins / this.totalSwitchPlays) * 100; // Calculate the switch rate (totalSwitchWins / totalSwitchPlays * 100)

    this.manullystayRate = this.totalStayPlays === 0 ? 0 : (this.totalStayWins / this.totalStayPlays) * 100;


    // Reveal the prize behind the picked door
    this.doors[this.pickedDoor].revealed = true;

    this.playAgainVisible = true;
  }


  runSimulations() {
    console.log('Running simulations.');
    this.montyHallService.runMontyHallSimulations(this.simulations, this.changeDoor)
      .subscribe((result) => {
        console.log('Simulation result:', result);
        this.switchRate = result.switchWinRate;
        this.stayRate = result.stayWinRate;
      });
  }
}
