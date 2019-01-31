import { Component, OnInit } from '@angular/core';
import{ApiService} from '../../services/api/api.service';

@Component({
  selector: 'app-viewdaily',
  templateUrl: './viewdaily.component.html',
  styleUrls: ['./viewdaily.component.css']
})
export class ViewdailyComponent implements OnInit {

  constructor(private api:ApiService) { }

  ngOnInit() {
  }
  viewdailybills(){
    
  }

}
