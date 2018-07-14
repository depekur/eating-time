import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchHighligth'
})
export class SearchHighligthPipe implements PipeTransform {

  transform(text: string, search): string {
    if (text && search) {
      let pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
      pattern = pattern.split(' ').filter((t) => {
        return t.length > 0;
      }).join('|');
      let regex = new RegExp(pattern, 'gi');

      return search ? text.replace(regex, (match) => `<span class="search-highlight">${match}</span>`) : text;
    } else {
      return text;
    }
  }
}
