# Angular-Image-And-Content-Slider
A simple component which accepts an array of image or content for sliding.

#How to install
In app.odule.ts import `contentSlider`
```typescript
import {SafeHtmlPipe, contentSlider, printSlide} from './path-to-content-slider-github-download';
@NgModule({
  declarations: [//-----,
  SafeHtmlPipe,
  contentSlider,
  printSlide,
  // ------],
  imports: [
  //------------
  ],
  //-----
  });
```

Basic Usage
```typescript
    @Component({
        selector: 'ImageShow',
        template: `
        <contentSlider [slides]="images"></contentSlider>
        `
    })
    export class ImageShowComponent implements  AfterViewInit{
       images:Array<any> = [{"sType":"img","imgSrc":"..."},{"sType":"div","content":"...Hello It's slidable content"}];
      constructor(){
      }
    }
```

For having a full understanding of source-code please see this article

http://www.ravinderpayal.com/Simple-and-Light-Weight-Image-or-Content-Slider-for-Angular/
