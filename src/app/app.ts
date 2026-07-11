import { ChangeDetectorRef, Component, ElementRef, inject, NgZone, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import gsap from 'gsap';
import { MainScreen } from './main-screen/main-screen';
import { SecondSection } from './second-section/second-section';
import { Place } from './place/place';
import { Itinerario } from './itinerario/itinerario';
import { Regalos } from './regalos/regalos';
import { Recuerdos } from './recuerdos/recuerdos';

@Component({
  selector: 'app-root',
  imports: [MainScreen, SecondSection, Place, Itinerario, Regalos, Recuerdos],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  @ViewChild('envelopeContainer') envelopeContainer!: ElementRef;
  @ViewChild('topFlap') topFlap!: ElementRef;
  @ViewChild('bottomFlap') bottomFlap!: ElementRef;
  @ViewChild('seal') seal!: ElementRef;
  @ViewChild('instruction') instruction!: ElementRef;

  router = inject(Router);
  audio = new Audio('assets/fondomusic.mp3');
  private route = inject(ActivatedRoute);

  contentVisible = false;
  envelopeVisible = true;

  constructor(private cdr: ChangeDetectorRef, private zone: NgZone) {}

  startOpeningSequence() {
    // Desactivar clics adicionales en el sello durante la animación
    gsap.set(this.seal.nativeElement, { pointerEvents: 'none' });

    this.zone.run(() => {
      this.contentVisible = true;
      this.cdr.detectChanges();
    });

    const tl = gsap.timeline({
      onComplete: () => {
        this.zone.run(() => {
          this.envelopeVisible = false;
          this.cdr.detectChanges();
        });
      }
    });

    // Secuencia de animación del sobre
    tl.to(this.instruction.nativeElement, {
      opacity: 0,
      y: 10,
      duration: 0.4,
      ease: "power2.out"
    })
    .to(this.seal.nativeElement, {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      ease: "back.in(1.5)"
    }, 0.1)
    .to(this.topFlap.nativeElement, {
      yPercent: -100,
      rotateX: 20,
      opacity: 0,
      duration: 1.8,
      ease: "power3.inOut"
    }, 0.4)
    .to(this.bottomFlap.nativeElement, {
      yPercent: 100,
      rotateX: -20,
      opacity: 0,
      duration: 1.8,
      ease: "power3.inOut"
    }, 0.4)
    .to(this.envelopeContainer.nativeElement, {
      backgroundColor: 'rgba(253, 250, 251, 0)',
      opacity: 0,
      duration: 1.2,
      ease: "power2.inOut"
    }, 0.8);

    // Reproducción de audio opcional
    this.audio.loop = true;
    this.audio.volume = 0.4;
    this.audio.play().catch(err => {
      console.log("La reproducción automática de audio requiere interacción previa del usuario:", err);
    });
  }
}
