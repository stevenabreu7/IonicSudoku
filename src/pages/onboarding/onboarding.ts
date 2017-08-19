import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { PlayPage } from '../play/play';

/**
 * Generated class for the OnboardingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-onboarding',
  templateUrl: 'onboarding.html',
})
export class OnboardingPage {

  slides = [
    {
      title: "Welcome to Sudoku",
      description: "This is a small Sudoku game with an intelligent solving algorithm that will solve any Sudoku (almost) instantly.",
      image: "assets/img/ica-slidebox-img-1.png",
    },
    {
      title: "Who made this?",
      description: "My name is Steven Abreu and I am very passionate about developing software. I made this game for you to download competely free of charge. Please let me know about any improvement ideas or other feedback!",
      image: "assets/img/ica-slidebox-img-2.png",
    },
    {
      title: "How to play?",
      description: "It's very simple. Once you finish this tutorial, you will be able to choose between three difficulties. <br>In order to fill a field, you need to press on the number you want to enter, and then on the field in which to enter this number.",
      image: "assets/img/ica-slidebox-img-3.png",
    },
    {
      title: "How to use the AI solver?",
      description: "In any Sudoku puzzle, you can press the button below to start the AI solving algorithm.",
      image: "assets/img/ica-slidebox-img-3.png",
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }
  
  skip() {
    this.navCtrl.setRoot(PlayPage, {}, {animate: true, direction: 'forward'});
  }
}
