import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe para substituir caracteres em strings usando regex.
 * Usado principalmente para formatar telefones para links WhatsApp.
 * 
 * @example
 * {{ telefone | replace:'[^0-9]':'' }} // Remove todos os caracteres não numéricos
 */
@Pipe({
    name: 'replace',
    standalone: true
})
export class ReplacePipe implements PipeTransform {
    transform(value: string | null | undefined, pattern: string, replacement: string): string {
        if (!value) return '';
        try {
            const regex = new RegExp(pattern, 'g');
            return value.replace(regex, replacement);
        } catch (e) {
            console.error('ReplacePipe: Invalid regex pattern', pattern, e);
            return value;
        }
    }
}
