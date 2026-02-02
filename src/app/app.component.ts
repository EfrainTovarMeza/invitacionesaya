import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
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

  misaAddress = 'Parroquia del Senor de la Paz';
  comidaAddress = 'Casa Torre Eifel #1, Colonia Bellas Torres';

  ngOnInit(): void {
    this.updateCountdown();
    this.timer = window.setInterval(() => this.updateCountdown(), 1000);
  }

  ngOnDestroy(): void {
    if (this.timer) {
      window.clearInterval(this.timer);
    }
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
}
