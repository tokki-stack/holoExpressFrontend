import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
	selector: 'kt-customer-new',
	templateUrl: './customer-new.component.html',
	styleUrls: ['./customer-new.component.scss']
})
export class CustomerNewComponent implements OnInit {
	customerForm: FormGroup;
	hasFormErrors = false;
	tempResult;

	constructor(public dialogRef: MatDialogRef<CustomerNewComponent>,
		private fb: FormBuilder,
		private customerService: CustomerService,

	) { }

	ngOnInit(): void {
		this.customerForm = this.fb.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			email: ['', Validators.compose([Validators.required, Validators.email])],
			phone: ['', Validators.compose([Validators.required])],
			mobile: ['', Validators.compose([Validators.required])],
			company: ['', Validators.compose([Validators.required])],
			ruc: ['', Validators.compose([Validators.required])],
			address: ['', Validators.compose([Validators.required])],
			type: ['', Validators.compose([Validators.required])]

		});

	}
	close() {
		this.dialogRef.close();
	}
	save() {
		this.hasFormErrors = false;


		if (this.customerForm.invalid) {
			this.hasFormErrors = true;
		}
		else {
			this.customerService.createNew(this.customerForm.value).then(result => {
				this.tempResult = result;
				if (this.tempResult.status = "ok") {
					this.dialogRef.close({ data: this.customerForm.value, status: 'success', registered: this.tempResult.registered });
				}
			});
		}

	}
	onAlertClose($event) {
		this.hasFormErrors = false;
	}
}
