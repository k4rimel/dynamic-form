import { Injectable } from '@angular/core';
import { BaseModel } from '../models/base.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ControlConfig } from '../models/control-config.model';

@Injectable({
    providedIn: 'root'
})
export class DynamicFormService {

    constructor() {
    }

    public getFormGroup(model: BaseModel, labelMappings: {[key: string]: any }): FormGroup {
        const mainGroup: any = {};
        const formGroup = new FormGroup(mainGroup);
        const entries = Object.entries(model);
        for (const [key, value] of entries) {
            const prop = this.getProperty(model, key as never) as BaseModel;
            mainGroup[key] = new FormControl(value || '', Validators.required);
            mainGroup[key]['label'] = labelMappings[key];
            switch (typeof prop) {
                case 'string':
                    // inputText | textarea | date
                    // FIXME: make required if it is inside the class
                    break;
                case 'number':
                    // inputNumber
                    break;
                case 'boolean':
                    // switch | checkbox | radio
                    break;
                case 'object':
                    // Subgroup
                    mainGroup[key] = this.getFormGroup(value, labelMappings[key].children);
                    console.log(labelMappings[key].label);
                    mainGroup[key]['label'] = labelMappings[key].label;
                    // FIXME: add props of obj
                    // Check for Array
                    // DropDown
                    if (Array.isArray(prop)) {
                        //
                    }
                    break;
                default:
                    break;
            }

        }
        return formGroup;
    }

    public getConfigs(model: BaseModel, parentFormGroup: FormGroup, labelMappings: {[key: string]: any }): ControlConfig<any>[] {
        const controlConfigs: ControlConfig<any>[] = [];
        const formGroup = this.getFormGroup(model, labelMappings);
        const entries = Object.entries(formGroup.controls);
        for (const [key, value] of entries) {
            const config = new ControlConfig<any>({
                parentFormGroup,
                control: value,
                controlName: key,
                label: key,
                required: true,
                inputType: 'text'
            } as ControlConfig<any>);
            if (value.constructor.name === 'FormGroup') {
                config.inputType = 'none';
                config.childrenConfigs = this.getConfigs(model[key as keyof BaseModel], value as FormGroup, labelMappings[key].children);
            }
            controlConfigs.push(config);
        }
        return controlConfigs;
    }

    getProperty<T, K extends keyof T>(obj: T, key: K) {
        return obj[key]; // Inferred type is T[K]
    }
}
