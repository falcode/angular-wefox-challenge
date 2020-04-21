import { PostService } from './post.service';
import { of } from 'rxjs';
const mockPosts = [
  {
    title: '',
    id: 1,
    content: '',
    lat: 1, long: '',
    image_url: '',
    created_at: null,
    updated_at: null
  }
];
describe('PostService', () => {
  let service: PostService;
  const http = {
    get: jest.fn(() =>
      of(mockPosts)
    )
  };

  beforeEach(() => {
    service = new PostService(http as any);
  });

  test('should be list array of posts', () => {
    service.list().subscribe((airports) => {
      expect(http.get).toBeCalledWith('https://wf-challenge-d6haqugtoo.herokuapp.com/api/v1/posts');
      expect(airports.length).toBe(1);
    });
  });

});
