import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { MatDividerModule } from '@angular/material/divider';
import { Component, ElementRef, OnInit, Renderer2, ViewEncapsulation, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CarouselModule, ButtonModule, TagModule, MatDividerModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit{
  duration = 0;
  currentTime = 0;
  info: boolean = false;
  daysILover: string = "";
  isPlaying: boolean = false;
  title: string = 'You & I 💖';
  coverSrc: string = 'assets/images/rhoades.jpg';
  audioSrc: string = 'assets/songs/You & I.mp3';
  dateWeMet: Date = new Date("November 28, 2018 00:00:00");
  images: any[] = [
    { img: 'eu_e_nene_01.jpeg' },
    { img: 'eu_e_nene_02.jpeg' },
    { img: 'eu_e_nene_03.jpeg' }
  ];

  audioList: any[] = [
    {
      link: "assets/songs/You & I.mp3",
      title: "You & I",
      cover: "assets/images/rhoades.jpg"
    }

  ];

  @ViewChild('audio') audioRef!: ElementRef<HTMLAudioElement>;

  constructor(private _renderer: Renderer2) {}

  ngOnInit(): void {
    setInterval(() => {
      this.calculateDaysILoveHer();
    }, 1000); 
  }

  showInfo() {
    this.info = true;
    setInterval(() => {
      this.fallingHearts();
    }, 1000);
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

  fallingHearts() {
    const body = document.querySelector('body');
    const text = this._renderer.createText('💗');
    const heart = this._renderer.createElement('div');
  
    this._renderer.setStyle(heart, 'left', Math.random() * 100 + 'vw');
    this._renderer.appendChild(heart, text);
    this._renderer.appendChild(body, heart);
    this._renderer.addClass(heart, 'fallingHearts');

    setTimeout(() => {
      this._renderer.removeChild(body, heart);
    }, 6000);
  }

  togglePlay() {
    const audio = this.audioRef.nativeElement;
    this.isPlaying ? audio.pause() : audio.play();
    this.isPlaying = !this.isPlaying;
  }

  updateProgress() {
    const audio = this.audioRef.nativeElement;
    this.currentTime = audio.currentTime;
  }

  setDuration() {
    this.duration = this.audioRef.nativeElement.duration;
  }

  seekAudio() {
    this.audioRef.nativeElement.currentTime = this.currentTime;
  }

  formatTime(seconds: number): string {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  }
}
