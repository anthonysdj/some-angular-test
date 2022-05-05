import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Article } from 'src/app/articles/shared/article';
import { CacheService } from './cache.service';

describe('CacheService', () => {
  let service: CacheService<Article>;
  const endpoint =  'https://endpoint.test/posts';
  const articles = [
    {
      id: 1,
      userId: 1,
      title: 'Post 1',
      body: 'Post body 1'
    },
    {
      id: 2,
      userId: 1,
      title: 'Post 2',
      body: 'Post body 2'
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClient]
    });
    service = TestBed.inject(CacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set a new cache object', () => {
    expect(service.get(endpoint)).toBeNull();
    service.set(endpoint, articles);
    expect(service.get(endpoint)).toBe(articles);
  });

  it('should append to existing cache object', () => {
    const newEndpoint = `${endpoint}\new`;
    const newArticles = [ ...articles, { id: 3, userId: 2, title: 'new', body: 'wave'} ];
    service.set(endpoint, articles);
    expect(service.get(endpoint)).toBe(articles);
    service.set(newEndpoint, newArticles)
    expect(service.get(newEndpoint)).toBe(newArticles);
  });

  it('should return null if cache is expired or cache is empty', () => {
    Object.defineProperty(service, 'cache', { value: {
      expiredCacheKey: {
        expires: 0,
        value: articles
      }
    } });

    expect(service.get('expiredCacheKey')).toBeNull();
    expect(service.get('nonExistingCacheKey')).toBeNull();
  });

  it('when cache is cleared, should return null', () => {
    service.set(endpoint, articles);
    expect(service.get(endpoint)).toBe(articles);
    service.clear();
    expect(service.get(endpoint)).toBeNull();
  });
});
