import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { invitados } from '../invitados';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Importante para ngModel

@Component({
  selector: 'app-confirmacion',
  imports: [FormsModule], // Se añade FormsModule a los imports
  templateUrl: './confirmacion.html',
  styleUrl: './confirmacion.css',
})
export class Confirmacion {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  idInvitado: string | null = null;
  invitado?: { id: string, invitado: string, pases: number };
  manualName: string = ''; // Almacena el nombre ingresado de forma manual

  pasesIfNot: string | null = '1'

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.idInvitado = params.get('id');
      if (this.idInvitado) {
        this.invitado = invitados.find(i => i.id == this.idInvitado);
      }else{
        this.pasesIfNot = params.get('pases') ?? '1';
      }
    });
  }

  onConfirm(): void {
    const params = new URLSearchParams();

    if (this.invitado) {
      params.set('id', this.invitado.id);
      params.set('name', this.invitado.invitado);
      params.set('pases', String(this.invitado.pases));
    } else {
      if(this.manualName.trim().length == 0) return
      params.set('id', ''); // Se deja vacío si no hay invitado registrado
      params.set('name', this.manualName.trim());
      params.set('pases', this.pasesIfNot ?? '1');
    }

    fetch('https://script.google.com/macros/s/AKfycbxQGSoLoJ6wPEIeS9hHpYzkoc_vcXkH928UgWYjK3_-aE54shzGbyOU58IVHLpr4ZXU/exec', {
      method: 'POST',
      mode: 'no-cors',
      body: params
    }).then(() => console.log('Enviado (respuesta opaca, no se puede leer el contenido)'))
      .catch(err => console.error('Error real de red:', err));
  }
}
