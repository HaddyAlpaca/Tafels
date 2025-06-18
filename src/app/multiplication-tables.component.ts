import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-multiplication-tables',
  templateUrl: './multiplication-tables.component.html',
  styleUrl: './multiplication-tables.component.scss',
  imports: [FormsModule],
})
export class MultiplicationTablesComponent {
  private _counter = 0;
  private _inputElement = viewChild<ElementRef<HTMLInputElement>>('answerInput');

  protected readonly table = signal(1);
  protected readonly answer = signal('');
  protected readonly feedback = signal('');
  protected readonly score = signal(0);
  protected readonly total = signal(0);
  protected readonly ordered = signal(false);
  protected readonly tables = Array.from({ length: 10 }, (_, i) => i + 1);
  
  public readonly question = signal<{ table: number; multiplier: number }>({ table: 1, multiplier: 1 });
  
  public generateQuestion(): void {
    if (this.ordered()) {
      this._counter = (this._counter % 10) + 1;
    }

    const multiplier = this.ordered() ? this._counter : Math.floor(Math.random() * 10) + 1;
    const table = this.table();
    this.question.set({ table: table === 99 ? Math.floor(Math.random() * 10) + 1 : table, multiplier });

    this.answer.set('');
    this.feedback.set('');
    this.setFocusOnInput();
  }

  protected checkAnswer() {
    const correct = this.question().table * this.question().multiplier === Number(this.answer());
    this.feedback.set(correct ?
      'Goed gedaan!' :
      `Helaas, het juiste antwoord is ${this.question().multiplier * this.question().table}`);
    
    if (correct) {
      this.score.update(s => s + 1);
      this.confettiExplode();
    }

    this.total.update(t => t + 1);

    if (!this.testRunning()) {
      setTimeout(() => this.generateQuestion(), 2000);
    }
  }

  protected selectTable(n: number) {
    this.table.set(n);
    this.generateQuestion();
  }

  protected reset() {
    this.table.set(1);
    this._counter = 0;
    this.score.set(0);
    this.total.set(0);
    this.generateQuestion();
  }

  protected toggleOrdered(): void {
    this.ordered.update(o => !o);
    this.generateQuestion();
  }

  private setFocusOnInput(): void {
    setTimeout(() => {
      this._inputElement()?.nativeElement.focus();
    });
  }

  private confettiExplode(): void {
    if (this.testRunning()) {
      return; // Skip confetti in test environment
    }

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }

  private testRunning(): boolean {
    return typeof window !== 'undefined' && (window as any)['__karma__'];
  }
}
