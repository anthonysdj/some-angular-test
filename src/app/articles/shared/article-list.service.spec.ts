import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CacheService } from 'src/app/shared/services/cache.service';

import { ArticleListService } from './article-list.service';
import { ArticleService } from './article.service';

describe('ArticleListService', () => {
  let service: ArticleListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ArticleService, CacheService ]
    });
    service = TestBed.inject(ArticleListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
