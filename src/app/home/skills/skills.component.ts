import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  maxRating = 8;

  skillRating = {
    docker: 7,
    angular: 5.8,
    java: 6.7,
  };

  constructor() { }

  ngOnInit() {
  }

}
