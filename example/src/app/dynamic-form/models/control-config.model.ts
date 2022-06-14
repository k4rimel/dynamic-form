import { AbstractControl, FormGroup } from '@angular/forms';

export class ControlConfig<T> {
    label: string;
    inputType: string;
    parentFormGroup: FormGroup;
    control: AbstractControl;
    childrenConfigs: ControlConfig<any>[];
    isFormGroup: boolean;
    controlName: string;
    required: boolean;
    order: number;
    options: { key: string; value: string }[];

    constructor(options: {
        label?: string;
        inputType?: string;
        control: AbstractControl;
        parentFormGroup: FormGroup;
        childrenConfigs: ControlConfig<any>[];
        controlName?: string;
        childFormGroup?: FormGroup;
        required?: boolean;
        order?: number;
        options?: { key: string; value: string }[];
    } = {} as ControlConfig<T>) {
        this.label = options.label || '';
        this.inputType = options.inputType || '';
        this.control = options.control;
        this.parentFormGroup = options.parentFormGroup;
        this.isFormGroup = this.control.constructor.name === 'FormGroup';
        this.childrenConfigs = options.childrenConfigs || null;
        this.controlName = options.controlName || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.options = options.options || [];
    }
}
