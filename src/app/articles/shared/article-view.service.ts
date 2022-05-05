import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Article } from './article';
import { ArticleService } from './article.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleViewService {

  article: Article;
  loading$ = new BehaviorSubject(false);

  constructor(private articleService: ArticleService ) {}

  getArticle(id: number): void {
    this.loading$.next(true);
    this.articleService.getArticle(id).subscribe(article => {
      this.article = article;
      this.loading$.next(false);
    });
  }
}
