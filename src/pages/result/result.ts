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

    this.resultText = this.getResultText(this.measurement.status);
  }

  getResultText(status: String) {
    switch (status.toLowerCase()) {
      case 'ruim':
        return 'Infelizmente sua medição está <b>ruim</b>, continue trabalhando.';
      case 'regular':
        return 'Sua média está <b>regular</b>, ainda está longe do ideal, continue trabalhando.';
      case 'bom':
        return 'Parabéns sua média está <b>boa</b>, continue trabalhando para chegar no ideal.';
      case 'ideal':
        return 'Meus parabéns você teve um resultado <b>ideal</b>, mantenha-se focado.';
    }
  }

  back() {
    this.viewCtrl.dismiss();
  }

}
