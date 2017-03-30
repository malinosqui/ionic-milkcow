import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from 'ionic-angular';
import { MeasurementProvider } from '../../providers/measurement-provider'
import { ResultPage } from '../result/result'

/*
  Generated class for the Form page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-form',
  templateUrl: 'form.html'
})
export class FormPage {
  measurementForm: any;
  submitAttempt = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public measurementProvider: MeasurementProvider, public formBuilder: FormBuilder,
    public modalCtrl: ModalController) {

    this.measurementForm = formBuilder.group({
      cows: ['', Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
      dryCows: ['', Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
      area: ['', Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
      milkAmount: ['', Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
      milkPrice: ['', Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
      employees: ['', Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
    });

  }

  calculate() {
    this.submitAttempt = true;

    if (this.measurementForm.valid) {
      let measurement = this.measurementForm.value;
      measurement = this.measurementProvider.calculate(measurement);

      this.measurementProvider.saveMeasurement(measurement).then((response) => {
        let modal = this.modalCtrl.create(ResultPage, { measurement: measurement })

        modal.present();

        modal.onDidDismiss(() => {
          this.navCtrl.pop();
        });
      });
    }
  }


}
