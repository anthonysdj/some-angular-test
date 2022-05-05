import { Injectable } from '@angular/core';
import { BehaviorSubject, map, shareReplay } from 'rxjs';
import { CacheService } from 'src/app/shared/services/cache.service';
import { Article } from './article';
import { ArticleService } from './article.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleListService {

  articles$ = new BehaviorSubject<Article[]>([]);

  constructor(private articleService: ArticleService, private cacheService: CacheService<Article>) { }

  searchArticles(search: { text: string, filter: keyof Pick<Article, 'id' | 'userId' | 'title'> }): void {
    this.articleService
        .getArticleList()
        .subscribe(articles => {          
          const response = articles.filter(article => {
              return search.filter === 'title'
                ? `${article[search.filter]}`.match(search.text)
                : `${article[search.filter]}` === search.text;
            });            
            this.articles$.next(response);
          });
  };

  getArticles(): void {
    const endpoint = `${this.articleService.apiUrl}/posts`;
    const cachedArticles = this.cacheService.get(endpoint);

    if (cachedArticles && cachedArticles.length > 0) {
      this.articles$.next(cachedArticles);
      return;
    }

    this.articleService
      .getArticleList()
      .pipe(
        map(articles => articles),
        shareReplay(1)
      ).subscribe(articles => {
        this.cacheService.set(`${this.articleService.apiUrl}/posts`, articles);
        this.articles$.next(articles);
      });
  };
}
