import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/users/user';
import { UserService } from 'src/app/users/user.service';
import { Article } from '../shared/article';
import { ArticleListService } from '../shared/article-list.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  articles: Article[];
  user: User;

  constructor(private articleListService: ArticleListService, public userService: UserService) { }

  ngOnInit(): void {
    this.userService.user$
      .subscribe(user => {
        this.user = user;
      });

    this.articleListService.getArticles();

    this.articleListService.articles$
      .subscribe(articles => {        
        this.articles = articles;
      })
  }
}
