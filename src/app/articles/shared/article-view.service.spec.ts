import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ArticleViewService } from './article-view.service';
import { ArticleService } from './article.service';

describe('ArticleViewService', () => {
  let service: ArticleViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ArticleService ]
    });
    service = TestBed.inject(ArticleViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
