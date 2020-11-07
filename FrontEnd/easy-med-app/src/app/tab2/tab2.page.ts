import { HttpClient, HttpRequest } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private http: HttpClient) {}

  makeRequest() {
    this.http.get("https://pokeapi.co/api/v2/pokemon/ditto").subscribe(res=>{
      console.log(res);
    })
  }
  makeErrorRequest() {
  this.http.get("https://pokeapi.co/api/v2/pokemon/ditt").subscribe(res=>{
    console.log(res);
  });
  }
}
