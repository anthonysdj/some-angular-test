import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CacheService } from 'src/app/shared/services/cache.service';
import { Article } from '../article';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit, OnChanges {
  @Input() article?: Article;

  loading$ = new BehaviorSubject(false);

  createArticleForm = this.formBuilder.group({
    title: ['', Validators.required],
    body: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private articleService: ArticleService, private cacheService: CacheService<Article>) {}

  createArticle(): void {
    this.loading$.next(true);

    this.articleService
      .createArticle(this.createArticleForm.value)
      .subscribe({
        next: response => {
          console.log('success create');
          console.log(response);

          this.createArticleForm.reset();
          this.cacheService.clear();
        },
        error: (err) => console.log(err),
        complete: () => {
          console.log('Work complete!');
          this.loading$.next(false);
        }
      })
  }

  updateArticle(): void {
    if (!this.article) {
      return;
    }

    this.loading$.next(true);

    this.articleService
      .updateArticle(this.createArticleForm.value, this.article.id)
      .subscribe({
        next: response => {
          console.log('success update');
          console.log(response);
          this.cacheService.clear();
        },
        error: (err) => console.log(err),
        complete: () => {
          console.log('Upgrade complete!');
          this.loading$.next(false);
        }
      })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['article'].currentValue === changes['article'].previousValue) {
      return;
    }

    this.createArticleForm.setValue({
      title: this.article?.title,
      body: this.article?.body
    })
  }

  ngOnInit(): void {}

}
