import { Component, OnInit, OnDestroy, signal } from '@angular/core';

@Component({
  selector: 'app-main-screen',
  standalone: true,
  imports: [],
  templateUrl: './main-screen.html',
  styleUrl: './main-screen.css',
})
export class MainScreen implements OnInit, OnDestroy {
  targetDate: Date = new Date('2026-10-24T00:00:00');

  // Definición de propiedades usando Signals
  days = signal('000');
  hours = signal('00');
  minutes = signal('00');
  seconds = signal('00');

  private timerInterval: any;

  ngOnInit(): void {
    this.calculateTime();
    this.timerInterval = setInterval(() => {
      this.calculateTime();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  private calculateTime(): void {
    const now = new Date().getTime();
    const difference = this.targetDate.getTime() - now;

    if (difference <= 0) {
      this.days.set('000');
      this.hours.set('00');
      this.minutes.set('00');
      this.seconds.set('00');
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
      }
      return;
    }

    const d = Math.floor(difference / (1000 * 60 * 60 * 24));
    const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((difference % (1000 * 60)) / 1000);

    // Actualización de los valores de los Signals
    this.days.set(d.toString().padStart(3, '0'));
    this.hours.set(h.toString().padStart(2, '0'));
    this.minutes.set(m.toString().padStart(2, '0'));
    this.seconds.set(s.toString().padStart(2, '0'));
  }
}
