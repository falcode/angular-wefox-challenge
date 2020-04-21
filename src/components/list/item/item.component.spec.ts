import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemComponent } from './item.component';
import { UiService } from 'core/services/ui.service';
import { PostStoreService } from 'core/states/post/post.service';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;
  let debugElement: DebugElement;
  let postStoreService: PostStoreService;
  let postStoreServiceSpy;
  let uiService: UiService;
  let uiServiceSpy;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemComponent],
      providers: [
        UiService,
        PostStoreService,
      ], imports: [
        HttpClientTestingModule,
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    postStoreService = debugElement.injector.get(PostStoreService);

    uiService = debugElement.injector.get(UiService);


  }));

  beforeEach(() => {
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should call removePost', () => {
    postStoreServiceSpy = spyOn(postStoreService, 'removePost').and.callThrough();

    component.removePost(1);
    expect(postStoreServiceSpy).toHaveBeenCalled();
  });

  test('editingPost should call editPost + setFormDisplay', () => {
    postStoreServiceSpy = spyOn(postStoreService, 'editPost').and.callThrough();
    uiServiceSpy = spyOn(uiService, 'setFormDisplay').and.callThrough();

    component.editingPost({
      title: '',
      id: 1,
      content: '',
      lat: 1, long: '',
      image_url: '',
      created_at: null,
      updated_at: null
    });
    expect(uiServiceSpy).toHaveBeenCalled();
    expect(postStoreServiceSpy).toHaveBeenCalled();

  });
});
