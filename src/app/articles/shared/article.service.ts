import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Article, ArticleFormRequest } from './article';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  public apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getArticleList(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl + '/posts')
      .pipe(catchError(this.handleError));
  }

  getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/posts/${id}`)
      .pipe(catchError(this.handleError))
  }

  createArticle(data: ArticleFormRequest): Observable<Article> {
    return this.http.post<Article>(`${this.apiUrl}/posts`, data)
      .pipe(catchError(this.handleError))
  }

  updateArticle(data: Partial<ArticleFormRequest>, id: number): Observable<Article> {
    return this.http.put<Article>(`${this.apiUrl}/posts/${id}`, data)
      .pipe(catchError(this.handleError))
  }

  private handleError(response: HttpErrorResponse | any) {
    console.error(response.error || response.body.error);
    return throwError(() => response.error || 'Server error');
  }
}
