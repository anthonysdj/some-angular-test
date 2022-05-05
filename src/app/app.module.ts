import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleListComponent } from './articles/article-list/article-list.component';
import { ArticleDetailComponent } from './articles/article-detail/article-detail.component';
import { ArticleService } from './articles/shared/article.service';
import { ArticleViewService } from './articles/shared/article-view.service';
import { HttpClientModule } from '@angular/common/http';
import { ArticleCreateComponent } from './articles/article-create/article-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleEditComponent } from './articles/article-edit/article-edit.component';
import { ArticleFormComponent } from './articles/shared/article-form/article-form.component';
import { ArticleSearchComponent } from './articles/article-search/article-search.component';
import { ArticleListService } from './articles/shared/article-list.service';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoaderComponent } from './ui/loader/loader.component';
import { FieldErrorComponent } from './shared/forms/field-error/field-error.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticleListComponent,
    ArticleDetailComponent,
    ArticleCreateComponent,
    ArticleEditComponent,
    ArticleFormComponent,
    ArticleSearchComponent,
    LoginComponent,
    DashboardComponent,
    LoaderComponent,
    FieldErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [ArticleService, ArticleViewService, ArticleListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
