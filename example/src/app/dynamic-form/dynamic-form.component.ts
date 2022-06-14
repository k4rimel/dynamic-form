import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ControlConfig } from './models/control-config.model';
import { DynamicFormService } from './services/dynamic-form.service';
import { BaseModel } from './models/base.model';

@Component({
    selector: 'app-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
    @Output() public submitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
    @Input() public model!: BaseModel;
    @Input() public labelMappings!: { [key: string]: any };
    public form!: FormGroup;
    public configs!: ControlConfig<any>[];

    constructor(private formBuilder: FormBuilder, private service: DynamicFormService) {
    }

    ngOnInit() {
        // FIXME : build object containing {FormGroup + FormControlConfigs} from service
        this.form = this.formBuilder.group(
            { mobile: ['', [Validators.required]] }
        );
        if (this.model) {
            this.form = this.service.getFormGroup(this.model, this.labelMappings);
            if (this.form) {
                this.configs = this.service.getConfigs(this.model, this.form, this.labelMappings);
            }
        }
    }

    public onSubmit(): void {
        this.submitted.emit(this.form);
        if (this.form.valid) {
            //
        } else {
            //
        }
    }
}
