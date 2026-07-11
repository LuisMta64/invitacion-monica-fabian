import { Component } from '@angular/core';

@Component({
  selector: 'app-regalos',
  imports: [],
  templateUrl: './regalos.html',
  styleUrl: './regalos.css',
})
export class Regalos {
  cardCopied = false;
  clabeCopied = false;

  copyToClipboard(text: string, type: 'card' | 'clabe'): void {
    navigator.clipboard.writeText(text).then(() => {
      if (type === 'card') {
        this.cardCopied = true;
        setTimeout(() => this.cardCopied = false, 2500);
      } else {
        this.clabeCopied = true;
        setTimeout(() => this.clabeCopied = false, 2500);
      }
    }).catch(err => {
      console.error('Error al intentar copiar el texto: ', err);
    });
  }
}
