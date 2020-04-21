import { DebugElement } from '@angular/core';
import { HomeComponent } from './home.component';
import { MapModule } from 'components/map/map.module';
import { FormModule } from 'components/form/form.module';
import { ListModule } from 'components/list/list.module';
import { HomeRoutingModule } from './home-routing.module';
import { LoadingComponent } from 'ui/loading/loading.component';
import { PostStoreService } from 'core/states/post/post.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('HomeComponent', () => {
  let debugElement: DebugElement;
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let postStoreService: PostStoreService;
  let postStoreServiceSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent, LoadingComponent ],
      imports: [
        HttpClientTestingModule,
        HomeRoutingModule,
        MapModule,
        FormModule,
        ListModule
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    postStoreService = debugElement.injector.get(PostStoreService);
  }));

  beforeEach(() => {
    fixture.detectChanges();
  });

  test('should create', () => {
    postStoreServiceSpy = spyOn(postStoreService, 'listAllPosts').and.callThrough();
    component.setupDisplayListener();
    expect(component).toBeTruthy();
  });
});
