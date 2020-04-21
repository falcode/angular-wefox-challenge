import { DebugElement } from '@angular/core';
import { FormComponent } from './form.component';
import { UiService } from 'core/services/ui.service';
import { PostQuery } from 'core/states/post/post.query';
import { PostStoreService } from 'core/states/post/post.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('FormComponent', () => {
  let debugElement: DebugElement;
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let postStoreService: PostStoreService;
  let postStoreServiceSpy;
  let uiService: UiService;
  let uiServiceSpy;
  const emptyPost = {
    title: '',
    id: 1,
    content: '',
    lat: 1, long: '',
    image_url: '',
    created_at: null,
    updated_at: null
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(FormComponent);
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

  test('close should call setFormDisplay', () => {
    uiServiceSpy = spyOn(uiService, 'setFormDisplay').and.callThrough();
    component.close();
    expect(uiServiceSpy).toHaveBeenCalled();
  });

  test('setPost should create and clean', () => {
    postStoreServiceSpy = spyOn(postStoreService, 'createPost').and.callThrough();
    component.setPost(emptyPost);
    expect(postStoreServiceSpy).toHaveBeenCalled();
  });

  test('setEditPost should call update and select', () => {
    postStoreServiceSpy = spyOn(postStoreService, 'selectPost').and.callThrough();
    const postStoreServiceSpy2 = spyOn(postStoreService, 'updatePost').and.callThrough();
    component.setEditedPost(1, emptyPost);
    expect(postStoreServiceSpy && postStoreServiceSpy2).toHaveBeenCalled();
  });

});
