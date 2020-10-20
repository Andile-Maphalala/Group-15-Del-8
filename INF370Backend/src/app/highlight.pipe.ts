import {PipeTransform, Pipe} from '@angular/core';

@Pipe({ name: 'highlight' })
export class HighlightPipe implements PipeTransform {
  transform(value: string, search: string): string {
    const valueStr = value + ''; // Ensure numeric values are converted to strings
    return valueStr.replace(new RegExp('(?![^&;]+;)(?!<[^<>]*)(' + search + ')(?![^<>]*>)(?![^&;]+;)', 'gi'), '<strong class="highlight">$1</strong>');
  }
}