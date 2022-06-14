import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlConfig } from '../models/control-config.model';

@Component({
  selector: 'app-dynamic-form-control',
  templateUrl: './dynamic-form-control.component.html',
  styleUrls: ['./dynamic-form-control.component.scss'],
})
export class DynamicFormControlComponent implements OnInit {
  @Input() public controlConfig!: ControlConfig<string>;
  @Input() form!: FormGroup;

  constructor() {
  }

  get label() {
    return this.controlConfig.control.get('label')?.value as string;
  }

  get ctrlName() {
    return this.controlConfig.controlName as string;
  }

  ngOnInit() {
    console.log(this.controlConfig);
  }

}
