import { Component, OnInit } from '@angular/core';
import { ISearchResponse } from 'src/app/models/search.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchResults: ISearchResponse = Object.assign({});

  async ngOnInit(): Promise<void> {
    const responce = '../../../assets/responce.json';
    const res = await fetch(responce);
    this.searchResults = await res.json();
  }
}
