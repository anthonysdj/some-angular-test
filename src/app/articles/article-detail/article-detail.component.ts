import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleViewService } from '../shared/article-view.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {

  loading: boolean = false;

  constructor(private route: ActivatedRoute, public articleViewService: ArticleViewService) { }

  ngOnInit(): void {
    this.articleViewService.loading$.subscribe(loading => {
      this.loading = loading
    });

    this.route.params.subscribe(params => {
      this.articleViewService.getArticle(params['id']);
    });
  }

}
