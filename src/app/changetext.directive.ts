import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appChangetext]'
})
export class ChangetextDirective {

  constructor(Element: ElementRef) {
    console.log('element ref:', Element);
    Element.nativeElement.style.backgroundcolor = 'yellow';
   }

}
