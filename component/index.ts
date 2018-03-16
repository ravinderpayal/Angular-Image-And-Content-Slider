/**
  * @Author Ravinder Payal<mail@ravinderpayal.com> (c) 2017
  * License:- Open for any-usage/change/alteration, but first 4 lines of this file should remain intact. 
  */
import { Component, ElementRef, Renderer, Input, Output, Optional, EventEmitter, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

@Component({
    selector: 'contentSlider',
    template: `
<div class="slider">
<div class="sliderArrows">
                <a (click)="backWard()"><</a>
                <a (click)="forWard()">></a>
</div>
<ul class="slideShow">
        <li *ngFor="let li of slides" [ngStyle]="{'display':li?.hidden?'none':''}" [ngClass]="li?.classes">
            <printSlide [meta]="li"></printSlide>
        </li>
</ul>
</div>
    `,
    styleUrls:["style.css"],
    encapsulation:ViewEncapsulation.None
})
export class contentSlider {
    /**
     * Play Interval
     */
    @Input('playInterval') interval:any = 2000;
    slides:any;
    
    @Input("slides") set _slides(s){
        this.slides = s;
        console.log(this.slides);
        this.number = this.slides.length;
        if(this.slides.length)
            this.slides[0]["classes"] = ["active"];
    }

    @Input('autoPlay') set _autoPlay(b:boolean){
        this.autoPlay = b
        if(b){
            this.auto(this.interval);
        }
    }
    currentElement:number = 0;
    autoPlay = false;
    number:number=0;
    //lis:number = 0;
    intervalTime:number = 1000;//in ms(mili seconds)
    private delayHideSetTimeOutControl:any;
    constructor(){
        //this.slideShow=document.getElementById("slideShow");

        //this.lis = this.slides.length;

        //this.number=this.lis.length;
    }
    backWard(){
        if(this.autoPlay)
            clearInterval(this.interval);
        this.currentElement=this.currentElement-1;
        if(this.currentElement<0){
            this.currentElement=this.number-1;
        }
        this.removeClasses();
        var prev=this.currentElement==this.number-1?0:this.currentElement+1;
        //this.lis[prev].classList.add("animateForward");
        this.slides[prev].classes = ["animateForward"];
        this.show(this.slides[prev]);
        this.show(this.slides[this.currentElement]);

        clearTimeout(this.delayHideSetTimeOutControl);

        this.delayHideSetTimeOutControl=this.delayHide(this.slides[prev],1100);
        //this.lis[this.currentElement].classList.add("active");
        this.slides[this.currentElement].classes = ["active","backward"];
        //this.lis[this.currentElement].classList.add("backward");
        if(this.autoPlay)this.auto(this.intervalTime);
    }

    removeClasses(){
        for(var i=0;i<this.number;i++){
            this.slides[i].classes = {}
        }
    }
    forWard(){
        console.log("forward called")
        if(this.autoPlay)clearInterval(this.interval);
        this._forWard();
        if(this.autoPlay)this.auto(this.intervalTime);        
    }
    private _forWard(){
        this.currentElement=1+this.currentElement;
        //this.lis=this.slideShow.childNodes;
        if(this.currentElement>=this.number){
            this.currentElement=0;
        }
        this.removeClasses();
        var prev=this.currentElement==0?this.number-1:this.currentElement-1;
        //this.lis[prev].classList.add("animateBack");
        console.log(this.slides[prev]);
        this.slides[prev]["classes"] = ["animateBack"];

        this.show(this.slides[prev]);
        this.show(this.slides[this.currentElement]);

        clearTimeout(this.delayHideSetTimeOutControl);
        this.delayHideSetTimeOutControl=this.delayHide(this.slides[prev],1100);
        //this.lis[this.currentElement].classList.add("active");
        //this.lis[this.currentElement].classList.add("forward");
        this.slides[this.currentElement].classes = ["active","forward"];
    }
    auto(ms){
        this.autoPlay=true;
        this.intervalTime=ms;
        this.interval=setInterval(this._forWard.bind(this),ms);
    }
    delayHide(el,ms){
        return setTimeout(()=> el.hidden = true,ms);
    }
    show(el){
        el.hidden = false;
    }
}

@Component({
    selector:"printSlide",
    template:`
        <div *ngIf="meta.sType=='div'" [innerHtml]="meta.content | safeHtml">

        </div>
        <div *ngIf="meta.sType=='ajaxDiv'">
            <slideAjaxDiv [url]="meta.contentUrl"></slideAjaxDiv>
        </div>
        <img [src]="meta.imgSrc" *ngIf="meta.sType=='img'" />
    `
})
export class printSlide{
    @Input() meta:any;
    constructor(){

    }
}

@Component({
    selector:"slideAjaxDiv",
    template:`
    Hello Loading something delecious
    `
})
export class slideAjaxDiv{
    @Input("url") meta:any;
    constructor(){

    }
}
