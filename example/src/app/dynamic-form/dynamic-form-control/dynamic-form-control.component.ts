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
    // Converting to a simple key/value type for type errors
    // FIXME: move label to a config object ?
    const ctrlObj = this.controlConfig.control as { [k: string]: any };
    return ctrlObj['label'] as string;
  }

  get ctrlName() {
    return this.controlConfig.controlName as string;
  }

  ngOnInit() {
  }

}
