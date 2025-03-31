import { TagModule } from 'primeng/tag';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CarouselModule, ButtonModule, TagModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  daysILover: string = "";
  dateWeMet: Date = new Date("November 28, 2018 00:00:00");
  images: any[] = [
    { img: 'eu_e_nene_01.jpeg' },
    { img: 'eu_e_nene_02.jpeg' },
    { img: 'eu_e_nene_03.jpeg' }
  ];

  ngOnInit(): void {
    setInterval(() => this.calculateDaysILoveHer(), 1000); 
  }

  calculateDaysILoveHer() {
    const totalTime = new Date().getTime() - this.dateWeMet.getTime();
    
    const years = Math.floor(totalTime / (1000 * 60 * 60 * 24 * 365));
    const days = Math.floor((totalTime % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((totalTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((totalTime % (1000 * 60)) / 1000);
    
    const formatUnit = (value: any, singular: any, plural: any) => `${value} ${value === 1 ? singular : plural}`;
    
    this.daysILover =  `${formatUnit(years, "ano", "anos")}, ` +
                       `${formatUnit(days, "dia", "dias")}, ` +
                       `${formatUnit(hours, "hora", "horas")}, ` +
                       `${formatUnit(minutes, "minuto", "minutos")}, ` +
                       `${formatUnit(seconds, "segundo", "segundos")}`;
  }
}
