import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

class User {
  public name?: string;
  public age?: number;
  public address?: {
    street?: string
    state?: string
    country?: string
  };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'example';
  public mappings = {
    name: 'Nom',
    age: 'Âge',
    address: {
      label: 'Adresse',
      children: {
        street: 'Rue',
        state: 'Etat/Région',
        country: 'Pays',
      }
    }
  };
  public model: User = {
    name: 'Jack Sparrow',
    age: 35,
    address: {
      street: '99999, Black Pearl Ocean',
      country: 'Caribbeans',
      state: ''
    }
  };

  public onSubmit($event: FormGroup): void {
    console.log($event);
  }

  public modelJSON(): any {
    return JSON.stringify(this.model, null, 4)
  }

  public mappingsJSON(): any {
    return JSON.stringify(this.mappings, null, 4)
  }
}
