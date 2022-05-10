import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  say = '';

  constructor(private firestore: Firestore){

  }
  ngOnInit(): void {
    const c = collection(this.firestore, 'helloworld');
    collectionData(c).subscribe(value => this.say = value[0]['sayit']);
  }

}
