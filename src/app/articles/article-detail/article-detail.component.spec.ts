import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { ArticleViewService } from '../shared/article-view.service';
import { ArticleDetailComponent } from './article-detail.component';

describe('ArticleDetailComponent', () => {
  let component: ArticleDetailComponent;
  let fixture: ComponentFixture<ArticleDetailComponent>;
  // let mockArticleViewService: jasmine.SpyObj<ArticleViewService> = jasmine.createSpyObj(ArticleViewService, [ 'loading$' ]);
  const mockArticleViewService = {
    loading$: new BehaviorSubject(true)
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ ArticleDetailComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ id: '1' }) } },
        { provide: ArticleViewService, useValue: mockArticleViewService  }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    // mockArticleViewService.loading$.subscribe();
    fixture = TestBed.createComponent(ArticleDetailComponent);
    // spyOn(mockArticleViewService, 'loading$').and.returnValue(of(true));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
