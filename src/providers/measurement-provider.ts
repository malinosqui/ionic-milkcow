import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

/*
  Generated class for the MeasurementProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
const momentConstructor: (value?: any) => moment.Moment = (<any>moment).default || moment;

@Injectable()
export class MeasurementProvider {

  constructor(public storage: Storage) {

  }

  calculate(measurement) {
    measurement.result = '80';
    measurement.status = 'Regular';
    return measurement;
  }

  getMeasurements(): any {
    return new Promise((resolve, err) => {
      this.storage.get('measurements').then((measurements) => {
        resolve(measurements || []);
      }).catch((error) => {
        err(error);
      });
    });
  }

  saveMeasurement(measurement): any {
    return new Promise((resolve, err) => {
      this.getMeasurements().then((measurements) => {
        measurement.date = moment().format('DD/MM/YYYY');
        measurements.push(measurement);
        this.storage.set('measurements', measurements).then((measurements) => {
          resolve(measurements);
        }).catch((error) => {
          err(error);
        });
      });
    });
  }

}
