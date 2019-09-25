import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-my-timer',
  templateUrl: './my-timer.component.html',
  styleUrls: ['./my-timer.component.css']
})

export class MyTimerComponent implements OnInit {

  sub: Subscription;
  intervalStream$ = interval(1000)
  h: number = 0;
  m: number = 0;
  s: number = 0;
  time: number = 0;
  paused: boolean = false;
  
  constructor() { }

  public start() {
    if(this.sub){
      this.paused = !this.paused;
    }
      if (!this.sub) {
        this.sub = this.intervalStream$.subscribe(
          (value) => {
            if (!this.paused) {
              this.plusTime(this.time++);
            } 
          console.log(value)
        }
      )
    }
  }

  plusTime(Time) {
    this.h = this.getHours(Time)
    this.m = this.getMinutes(Time)
    this.s = this.getSeconds(Time)
  }

  public stop() {
    if(this.sub){
      this.paused = !this.paused;
    }
  }

  public reset() {
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = null;
      this.time = 0;
      this.h = 0;
      this.m = 0;
      this.s = 0;
      this.paused = false;
    }
  }

  ngOnInit() {
  }

  private getSeconds(ticks: number) {
    return this.pad(ticks % 60);
  }

  private getMinutes(ticks: number) {
    return this.pad((Math.floor(ticks / 60)) % 60);
  }

  private getHours(ticks: number) {
    return this.pad(Math.floor((ticks / 60) / 60));
  }

  private pad(num: any) {
    if(num <=9 ) {
      return '0' + num;
    } else { return num}
    //return num <= 9 ? '0' + num : num; <- тернарно
  }
}
