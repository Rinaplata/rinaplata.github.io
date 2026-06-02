import { Pipe, PipeTransform } from '@angular/core';
import { I18nService } from '../../core/services/i18n.service';

@Pipe({
  name: 't',
  standalone: true,
  pure: false
})
export class TranslatePipe implements PipeTransform {
  constructor(private i18nService: I18nService) {}

  transform(key: string, params?: Record<string, string | number>): string {
    return params
      ? this.i18nService.translateWithParams(key, params)
      : this.i18nService.translate(key);
  }
}
