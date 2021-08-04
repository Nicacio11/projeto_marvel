import { Component, OnInit } from '@angular/core';
import { ComicService } from './comic.service';
import { Comic } from './comic.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.css']
})
export class ComicComponent implements OnInit {
  comic: Comic;
  lowValue: number = 0;
  highValue: number = 5;

  constructor(private comicService: ComicService) { }

  ngOnInit(): void {
    this.comicService.getAll().subscribe(x => console.log(this.comic = x))
  }
  // handlePageChange(page) {
  //   const searchParams = {
  //     limit: this.itemsPerPage,
  //     nameStartsWith: this.searchFG.get('nameStartsWith')?.value,
  //     startPage: page,
  //     orderBy: this.searchFG.get('orderBy')?.value,
  //   } as SearchCharactersParamsDTO;
  // }
  // used to build an array of papers relevant at any given time
  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }
}
