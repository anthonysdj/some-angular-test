import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, debounceTime, distinctUntilChanged } from 'rxjs';
import { Article } from '../shared/article';
import { ArticleListService } from '../shared/article-list.service';

@Component({
  selector: 'app-article-search',
  templateUrl: './article-search.component.html',
  styleUrls: ['./article-search.component.scss']
})
export class ArticleSearchComponent implements OnInit {

  searchFilters: { key: keyof Pick<Article, 'title' | 'id' | 'userId'>, label: string }[] = [
    { key: 'title', label: 'Title' },
    { key: 'id', label: 'ID' },
    { key: 'userId', label: 'User ID' },
  ];
  searchText: BehaviorSubject<string> = new BehaviorSubject('');

  searchForm = this.formBuilder.group({
    searchInput: [''],
    searchFilter: [this.searchFilters[0].key]
  })

  constructor(private formBuilder: FormBuilder, private articleListService: ArticleListService) { }

  search() {
    this.searchText.next(this.searchForm.get('searchInput')!.value);
  }

  ngOnInit(): void {

    this.searchText
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
      )
      .subscribe({
        next: () => {
          this.articleListService.searchArticles({
            filter: this.searchForm.get('searchFilter')?.value,
            text: this.searchText.getValue()
          });
        },
        error: error => {
          // handle error
          console.log(error)
        }
      });
  }

}
