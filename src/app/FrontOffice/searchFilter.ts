
import { Pipe, PipeTransform } from '@angular/core';
import { Recrutement } from '../BackOffice/recrutement.model';


@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
  transform(items: Recrutement[], searchText: string): Recrutement[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(item => {
  
      if (item && 
          (item.typeRecrutement || item.poste || item.experience || item.niveauDetude || 
          item.lieu || item.salaire || item.postesVacants)) {
       
        return (
          (item.typeRecrutement && item.typeRecrutement.toLowerCase().includes(searchText)) ||
          (item.poste && item.poste.toLowerCase().includes(searchText)) ||
          (item.experience && item.experience.toLowerCase().includes(searchText)) ||
          (item.niveauDetude && item.niveauDetude.toLowerCase().includes(searchText)) ||
          (item.lieu && item.lieu.toLowerCase().includes(searchText)) ||
          (item.salaire && item.salaire.toString().includes(searchText)) ||
          (item.postesVacants && item.postesVacants.toString().includes(searchText))
        );
      }
      return false;
    });
  
    
  }
}