import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the Result page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-result',
  templateUrl: 'result.html'
})
export class ResultPage {
  measurement: any = {};
  resultText: String = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController) {
    this.measurement = navParams.get('measurement')
  }

  back() {
    this.viewCtrl.dismiss();
  }

}
