import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  events=[{
    name:"Technical", image:"gears.png",children:[
        {name:"byteWorld", image:"smart-tv.png", children:[
        ]}
    ]
  }, {
    name: "Creative",
    image: "smart-tv.png"
  }]
  constructor() { }

  ngOnInit() {
  }

}
