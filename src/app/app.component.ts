import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

  export interface GuestItem {
    id: number;
    name: string;
    slug: string;
  }
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  eventDate = new Date('2026-03-14T10:00:00');
  days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;
  private timer?: number;
  texto = 'Hola. Este es un ejemplo de lectura más natural. Habla con pausas, y sin correr demasiado.';

  public GUEST_LIST: GuestItem[] = [
    {
      id: 1,
      name: 'Estefanía Méndez y Luis Armando López Padrinos de Aristeo',
      slug: 'estefania-mendez-y-luis-armando-lopez-padrinos-de-aristeo'
    },
    {
      id: 2,
      name: 'Yolanda Alvarado Madrina de Karla',
      slug: 'yolanda-alvarado-madrina-de-karla'
    },
    {
      id: 3,
      name: 'Jarely y Jorge',
      slug: 'jarely-y-jorge'
    },
    {
      id: 4,
      name: 'Sandra y Pepe Mariles',
      slug: 'sandra-y-pepe-mariles'
    },
    {
      id: 5,
      name: 'Mary Cruz y Edgar Ventura',
      slug: 'mary-cruz-y-edgar-ventura'
    },
    {
      id: 6,
      name: 'Alejandra y Edgar',
      slug: 'alejandra-y-edgar'
    },
    {
      id: 7,
      name: 'Rosita y Mariela',
      slug: 'rosita-y-mariela'
    },
    {
      id: 8,
      name: 'Amigo Joselito',
      slug: 'amigo-joselito'
    },
    {
      id: 9,
      name: 'Maestra Irandi',
      slug: 'maestra-irandi'
    },
    {
      id: 10,
      name: 'Maestra Liz',
      slug: 'maestra-liz'
    },
    {
      id: 11,
      name: 'Chay y David',
      slug: 'chay-y-david'
    },
    {
      id: 12,
      name: 'Ana y Marcos',
      slug: 'ana-y-marcos'
    },
    {
      id: 13,
      name: 'Elia y Chispas',
      slug: 'elia-y-chispas'
    },
    {
      id: 14,
      name: 'Padre Cipriano',
      slug: 'padre-cipriano'
    },
    {
      id: 15,
      name: 'Padre Juan Martín',
      slug: 'padre-juan-martin'
    },
    {
      id: 16,
      name: 'Madre Anel',
      slug: 'madre-anel'
    },
    {
      id: 17,
      name: 'Madre Irma',
      slug: 'madre-irma'
    },
    {
      id: 18,
      name: 'Madre Paty',
      slug: 'madre-paty'
    },
    {
      id: 19,
      name: 'Neto y Adriana',
      slug: 'neto-y-adriana'
    },
    {
      id: 20,
      name: 'Amigo nery',
      slug: 'amigo-nery'
    },
    {
      id: 21,
      name: 'Hany y chole',
      slug: 'hany-y-chole'
    },
    {
      id: 22,
      name: 'Liz y sus Papás',
      slug: 'liz-y-sus-papas'
    },
    {
      id: 23,
      name: 'Consuelo y Enrique',
      slug: 'consuelo-y-enrique'
    },
    {
      id: 24,
      name: 'Familia Canedo Andrade',
      slug: 'familia-canedo-andrade'
    },
    {
      id: 25,
      name: 'Consuelo y Rafael',
      slug: 'consuelo-y-rafael'
    },
    {
      id: 26,
      name: 'Familia Espinoza Meza',
      slug: 'familia-espinoza-meza'
    },
    {
      id: 27,
      name: 'Familia Meza Matias',
      slug: 'familia-meza-matias'
    },
    {
      id: 28,
      name: 'Tia miros',
      slug: 'tia-miros'
    },
    {
      id: 29,
      name: 'Tia Kika',
      slug: 'tia-kika'
    },
    {
      id: 30,
      name: 'Karla Y Gonzalo',
      slug: 'karla-y-gonzalo'
    },
    {
      id: 31,
      name: 'Efraín y Belén',
      slug: 'efrain-y-belen'
    },
    {
      id: 32,
      name: 'Dario y Liz',
      slug: 'dario-y-liz'
    }
  ];

  misaAddress = 'Parroquia del Senor de la Paz';
  comidaAddress = 'Casa Torre Eifel #1, Colonia Bellas Torres';
  private routeSub?: Subscription;

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.updateCountdown();
    this.timer = window.setInterval(() => this.updateCountdown(), 1000);
    this.routeSub = this.route.paramMap.subscribe((paramMap) => {
      setTimeout(() => {
        const param = paramMap.get('encodedNames');
        console.log(param);
        
        if(param) {
          const speechText = this.buildSpeechTextFromParam(paramMap.get('encodedNames')) + ' a compartir con nosotros este día tan especial, lleno de fe, amor y bendiciones, en la celebración de su Bautizo y Primera Comunión de Aristeo y Karla. ';
          this.leerTexto(speechText);
        } else {
          this.leerTexto(this.texto);
        }
      }, 500);

    });
  }

  ngOnDestroy(): void {
    if (this.timer) {
      window.clearInterval(this.timer);
    }
    this.routeSub?.unsubscribe();
  }

  copyInvite(): void {
    const text =
      'Invitacion Primera Comunion y Bautizo\n' +
      'Karla Canedo Meza y Aristeo Canedo Meza\n' +
      '14 de marzo de 2026\n' +
      'Misa: 10:00 a. m. en Parroquia del Senor de la Paz\n' +
      'Comida: Casa Torre Eifel #1, Colonia Bellas Torres';
    navigator.clipboard?.writeText(text);
  }

  openWhatsApp(): void {
    const text =
      'Estas invitado a la Primera Comunion de Karla y al Bautizo de Aristeo. ' +
      '14 de marzo de 2026, misa 10:00 a. m. en Parroquia del Senor de la Paz. ' +
      'Comida en Casa Torre Eifel #1, Colonia Bellas Torres.';
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  }

  addToCalendar(): void {
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//invitacionesaya//ES',
      'BEGIN:VEVENT',
      `DTSTART:${this.formatIcsDate(this.eventDate)}`,
      `DTEND:${this.formatIcsDate(new Date(this.eventDate.getTime() + 2 * 60 * 60 * 1000))}`,
      'SUMMARY:Primera Comunion y Bautizo - Karla y Aristeo',
      `LOCATION:${this.misaAddress}`,
      'DESCRIPTION:Misa a las 10:00 a. m. y comida en Casa Torre Eifel #1, Colonia Bellas Torres.',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\n');

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'invitacion.ics';
    link.click();
    URL.revokeObjectURL(link.href);
  }

  openMapMisa(): void {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(this.misaAddress)}`, '_blank');
  }

  openMapComida(): void {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(this.comidaAddress)}`, '_blank');
  }

  copyMisa(): void {
    navigator.clipboard?.writeText(this.misaAddress);
  }

  copyComida(): void {
    navigator.clipboard?.writeText(this.comidaAddress);
  }

  leerTexto(texto: string): void {
    if (!texto?.trim()) return;

    if (!('speechSynthesis' in window)) {
      console.error('Este navegador no soporta síntesis de voz');
      return;
    }

    const mensaje = new SpeechSynthesisUtterance(texto);
    mensaje.lang = 'es-MX';
    mensaje.rate = 1.3;
    mensaje.pitch = 1;
    mensaje.volume = 19;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(mensaje);
  }

  private updateCountdown(): void {
    const now = new Date().getTime();
    const diff = this.eventDate.getTime() - now;
    if (diff <= 0) {
      this.days = 0;
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;
      return;
    }
    const totalSeconds = Math.floor(diff / 1000);
    this.days = Math.floor(totalSeconds / 86400);
    this.hours = Math.floor((totalSeconds % 86400) / 3600);
    this.minutes = Math.floor((totalSeconds % 3600) / 60);
    this.seconds = totalSeconds % 60;
  }

  private formatIcsDate(date: Date): string {
    const pad = (value: number) => value.toString().padStart(2, '0');
    return (
      date.getUTCFullYear().toString() +
      pad(date.getUTCMonth() + 1) +
      pad(date.getUTCDate()) +
      'T' +
      pad(date.getUTCHours()) +
      pad(date.getUTCMinutes()) +
      pad(date.getUTCSeconds()) +
      'Z'
    );
  }

  private buildSpeechTextFromParam(encodedNames: string | null): string | null {
    if (!encodedNames) {
      return null;
    }

    const decodedValue = this.decodeUriSegment(encodedNames).trim();
    if (!decodedValue) {
      return null;
    }

    const normalized = decodedValue.replace(/^\[|\]$/g, '');
    const names = normalized
      .split(/[|,;]+/)
      .map((name) => name.replace(/^['"]|['"]$/g, '').trim())
      .filter(Boolean)
      .slice(0, 3);

    if (!names.length) {
      return null;
    }

    return `Bienvenidos ${names.join(', ')}`;
  }

  private decodeUriSegment(value: string): string {
    try {
      return decodeURIComponent(value.replace(/\+/g, '%20'));
    } catch {
      return value;
    }
  }
}
