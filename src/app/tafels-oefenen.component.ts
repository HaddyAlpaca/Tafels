import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-tafels-oefenen',
  templateUrl: './tafels-oefenen.component.html',
  styleUrl: './tafels-oefenen.component.scss',
  imports: [
    FormsModule,
  ],
})
export class TafelsOefenenComponent implements OnInit {
  tafel: number = 1;
  vraag: { a: number; b: number } = this.genereerVraag();
  antwoord: string = '';
  feedback: string = '';
  score: number = 0;
  totaal: number = 0;
  opVolgorde: boolean = false;
  teller = 0;
  
  tafels = Array.from({ length: 10 }, (_, i) => i + 1);

  ngOnInit(): void {
    this.reset();
  }

  genereerVraag(): { a: number; b: number } {
    const a = this.tafel;

    if (this.opVolgorde) {
      this.teller++;
      if (this.teller > 10) {
        this.teller = 1;
      }
  
      return { a, b: this.teller };
    }
   
    return { a: this.tafel, b: Math.floor(Math.random() * 10) + 1 };
  }

  nieuweVraag() {
    this.vraag = this.genereerVraag();
    this.antwoord = '';
    this.feedback = '';
    this.setFocusOnInput();
  }

  controleer() {
    const juist = this.vraag.a * this.vraag.b === Number(this.antwoord);
    this.feedback = juist ? 'Goed gedaan!' : `Helaas, het juiste antwoord is ${this.vraag.a * this.vraag.b}`;
    
    if (juist) {
      this.score++;
      this.confettiExplode();
    }

    this.totaal++;
    setTimeout(() => this.nieuweVraag(), 2000);
  }

  kiesTafel(n: number) {
    this.teller = 0;
    this.tafel = n === 99 ? Math.floor(Math.random() * 10) + 1 : n;
    this.nieuweVraag();
    this.setFocusOnInput();
  }

  reset() {
    this.tafel = 1;
    this.vraag = this.genereerVraag();
    this.antwoord = '';
    this.feedback = '';
    this.score = 0;
    this.totaal = 0;
    this.teller = 0;
    this.nieuweVraag();
  }

  toggleOpVolgorde(): void {
    this.opVolgorde = !this.opVolgorde;
    this.teller = 0;
    this.nieuweVraag();
  }

  private setFocusOnInput(): void {
    setTimeout(() => {
      const input = document.querySelector<HTMLInputElement>('input[type="number"], input[type="text"]');
      if (input) input.focus();
    });
  }

  private confettiExplode(): void {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }
}
