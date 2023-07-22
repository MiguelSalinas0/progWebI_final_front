import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() user_id!: number;
  @Input() profile!: string;
  @Input() nombre!: string;
  @Input() apellido!: string;

  constructor() { }

  ngOnInit(): void { }

}
