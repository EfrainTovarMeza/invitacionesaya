import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

  export interface GuestItem {
    id: number;
    name: string;
    slug: string;
    audioFile: string;
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
  speechText = '';
  names = '';
  texto = 'Hola. Este es un ejemplo de lectura más natural. Habla con pausas, y sin correr demasiado.';
  private audioPlayer?: HTMLAudioElement;
  pendingAudioFile: string | null = null;
  private pendingFallbackText: string | null = null;
  showPlayAudioButton = false;
  private readonly unlockAudio = () => {
    if (!this.pendingAudioFile) {
      return;
    }

    const audioFile = this.pendingAudioFile;
    const fallbackText = this.pendingFallbackText ?? this.texto;
    this.pendingAudioFile = null;
    this.pendingFallbackText = null;
    this.showPlayAudioButton = false;
    this.reproducirAudio(audioFile, fallbackText);
  };

  public GUEST_LIST: GuestItem[] = [
    {
      id: 1,
      name: 'Estefanía Méndez y Luis Armando López Padrinos de Aristeo',
      slug: 'estefania-mendez-y-luis-armando-lopez-padrinos-de-aristeo',
      audioFile: 'uno.mp3'
    },
    {
      id: 2,
      name: 'Yolanda Alvarado Madrina de Karla',
      slug: 'yolanda-alvarado-madrina-de-karla',
      audioFile: 'dos.mp3'
    },
    {
      id: 3,
      name: 'Yaqui y Jorge',
      slug: 'yaqui-y-jorge',
      audioFile: 'tres.mp3'
    },
    {
      id: 4,
      name: 'Sandra y Pepe Mariles',
      slug: 'sandra-y-pepe-mariles',
      audioFile: 'cuatro.mp3'
    },
    {
      id: 5,
      name: 'Mary Cruz y Edgar Ventura',
      slug: 'mary-cruz-y-edgar-ventura',
      audioFile: 'cinco.mp3'
    },
    {
      id: 6,
      name: 'Alejandra y Edgar',
      slug: 'alejandra-y-edgar',
      audioFile: 'seis.mp3'
    },
    {
      id: 7,
      name: 'Rosita y Mariela',
      slug: 'rosita-y-mariela',
      audioFile: 'siete.mp3'
    },
    {
      id: 8,
      name: 'Amigo Joselito',
      slug: 'amigo-joselito',
      audioFile: 'ocho.mp3'
    },
    {
      id: 9,
      name: 'Maestra Irandi',
      slug: 'maestra-irandi',
      audioFile: 'nueve.mp3'
    },
    {
      id: 10,
      name: 'Maestra Liz',
      slug: 'maestra-liz',
      audioFile: 'diez.mp3'
    },
    {
      id: 11,
      name: 'Chany y David',
      slug: 'chany-y-david',
      audioFile: 'once.mp3'
    },
    {
      id: 12,
      name: 'Ana y Marcos',
      slug: 'ana-y-marcos',
      audioFile: 'doce.mp3'
    },
    {
      id: 13,
      name: 'Elba y Chispas',
      slug: 'elba-y-chispas',
      audioFile: 'trece.mp3'
    },
    {
      id: 14,
      name: 'Padre Cipriano',
      slug: 'padre-cipriano',
      audioFile: 'catorce.mp3'
    },
    {
      id: 15,
      name: 'Padre Juan Martín',
      slug: 'padre-juan-martin',
      audioFile: 'quince.mp3'
    },
    {
      id: 16,
      name: 'Madre Anel',
      slug: 'madre-anel',
      audioFile: 'diezseis.mp3'
    },
    {
      id: 17,
      name: 'Madre Irma',
      slug: 'madre-irma',
      audioFile: 'diezsiete.mp3'
    },
    {
      id: 18,
      name: 'Madre Paty',
      slug: 'madre-paty',
      audioFile: 'diexocho.mp3'
    },
    {
      id: 19,
      name: 'Neto y Adriana',
      slug: 'neto-y-adriana',
      audioFile: 'dieznueve.mp3'
    },
    {
      id: 20,
      name: 'Amigo nery',
      slug: 'amigo-nery',
      audioFile: 'veinte.mp3'
    },
    {
      id: 21,
      name: 'Hany y chole',
      slug: 'hany-y-chole',
      audioFile: 'veinteuno.mp3'
    },
    {
      id: 22,
      name: 'Liz y sus Papás',
      slug: 'liz-y-sus-papas',
      audioFile: 'veintedos.mp3'
    },
    {
      id: 23,
      name: 'Consuelo y Enrique',
      slug: 'consuelo-y-enrique',
      audioFile: 'veintetres.mp3'
    },
    {
      id: 24,
      name: 'Familia Canedo Andrade',
      slug: 'familia-canedo-andrade',
      audioFile: 'veintecuatro.mp3'
    },
    {
      id: 25,
      name: 'Consuelo y Rafael',
      slug: 'consuelo-y-rafael',
      audioFile: 'veintecinco.mp3'
    },
    {
      id: 26,
      name: 'Familia Espinoza Meza',
      slug: 'familia-espinoza-meza',
      audioFile: 'veinteseis.mp3'
    },
    {
      id: 27,
      name: 'Familia Meza Matias',
      slug: 'familia-meza-matias',
      audioFile: 'veintesiete.mp3'
    },
    {
      id: 28,
      name: 'Tia miros',
      slug: 'tia-miros',
      audioFile: 'veinteocho.mp3'
    },
    {
      id: 29,
      name: 'Tia Kika',
      slug: 'tia-kika',
      audioFile: 'veintenueve.mp3'
    },
    {
      id: 30,
      name: 'Karla y Gonzalo',
      slug: 'karla-y-gonzalo',
      audioFile: 'treinta.mp3'
    },
    {
      id: 31,
      name: 'Belén y Efraín',
      slug: 'efrain-y-belen',
      audioFile: 'treintauno.mp3'
    },
    {
      id: 32,
      name: 'Liz y Dario',
      slug: 'dario-y-liz',
      audioFile: 'treintados.mp3'
    },
    {
      id: 33,
      name: 'Paty y Familia Vega',
      slug: 'dario-y-liz',
      audioFile: 'treintatres.mp3'
    }
  ];

  misaAddress = 'Parroquia del Senor de la Paz, Ecuandureo Michoacán';
  comidaAddress = 'Casa Torre Eifel #1, Colonia Bellas Torres, Ecuandureo Michoacán';
  private routeSub?: Subscription;

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.updateCountdown();
    this.timer = window.setInterval(() => this.updateCountdown(), 1000);
    document.addEventListener('click', this.unlockAudio, { passive: true });
    document.addEventListener('touchstart', this.unlockAudio, { passive: true });
    this.routeSub = this.route.paramMap.subscribe((paramMap) => {
      setTimeout(() => {
        const param = paramMap.get('encodedNames');
        
        if(param) {
          const idParam = Number(param);
          const guest = this.GUEST_LIST.find(item => item.id === idParam);
          this.names = guest?.name || '';
          this.speechText = 'Hola, ' + this.names + '. Te invitamos a compartir con nosotros este día tan especial, lleno de fe, amor y bendiciones. Acompáñanos en la celebración del Bautizo y la Primera Comunión de Aristeo y Karla.';
          if (guest?.audioFile) {
            this.reproducirAudio(guest.audioFile, this.speechText);
          } 
        }
      }, 500);

    });
  }

  ngOnDestroy(): void {
    if (this.timer) {
      window.clearInterval(this.timer);
    }
    document.removeEventListener('click', this.unlockAudio);
    document.removeEventListener('touchstart', this.unlockAudio);
    this.audioPlayer?.pause();
    this.audioPlayer = undefined;
    window.speechSynthesis.cancel();
    this.routeSub?.unsubscribe();
  }

  playPendingAudio(): void {
    this.unlockAudio();
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

  private reproducirAudio(audioFile: string, fallbackText: string): void {
    this.audioPlayer?.pause();
    this.audioPlayer = new Audio(`/audios/${audioFile}`);
    this.audioPlayer.load();

    void this.audioPlayer.play().catch((error) => {
      if (error instanceof DOMException && error.name === 'NotAllowedError') {
        this.pendingAudioFile = audioFile;
        this.pendingFallbackText = fallbackText;
        this.showPlayAudioButton = true;
        return;
      }

      console.error(`No se pudo reproducir el audio ${audioFile}`, error);
      this.pendingAudioFile = null;
      this.pendingFallbackText = null;
      this.showPlayAudioButton = false;
    });
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
