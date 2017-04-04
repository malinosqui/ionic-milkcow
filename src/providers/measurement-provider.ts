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
    measurement.goodCowsPercentage = (+measurement.cows / (+measurement.dryCows + +measurement.cows) * 100).toFixed(2);
    measurement.goodCowsArea = (+measurement.cows / +measurement.area).toFixed(1);
    measurement.milkYearArea = ((+measurement.milkAmount * 365) / +measurement.area).toFixed(1);
    measurement.milkEmployee = (+measurement.milkAmount / +measurement.employees).toFixed(1);
    measurement.milkRevenue = ((+measurement.milkAmount * 365) * +measurement.milkPrice).toFixed(2);
    measurement.status = this.getStatus(+measurement.goodCowsPercentage);

    return measurement;
  }

  getStatus(result) {
    if (result < 60) {
      return 'Ruim';
    } else if (result >= 60 && result <= 69) {
      return 'Regular';
    } else if (result >= 70 && result <= 79) {
      return 'Bom';
    } else if (result >= 80) {
      return 'Ideal';
    }
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
