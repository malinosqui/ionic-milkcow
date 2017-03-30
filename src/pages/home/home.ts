import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MeasurementProvider } from '../../providers/measurement-provider'
import { FormPage } from '../form/form'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  measurements: any = [];

  constructor(public navCtrl: NavController, public measurementProvider: MeasurementProvider) { }

  ionViewDidEnter() {
    this.getAll();
  }

  goToAdd() {
    this.navCtrl.push(FormPage);
  }

  getAll() {
    this.measurementProvider.getMeasurements().then((measurements) => {
      this.measurements = measurements;
    });
  }

}
