import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-field-error',
  templateUrl: './field-error.component.html',
  styleUrls: ['./field-error.component.scss']
})
export class FieldErrorComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() field: string;
  @Input() message: string;

  constructor() { }

  ngOnInit(): void {
  }

}
