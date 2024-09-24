import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
} from '@ngneat/spectator';
import { PostFormDataService } from './post-form-data.service';

describe('PostFormDataService', () => {
  let spectator: SpectatorHttp<PostFormDataService>;
  const createHttp = createHttpFactory(PostFormDataService);

  beforeEach(() => (spectator = createHttp()));

  it('should successfully post some form data', () => {
    spectator.service
      .signUpCustomer({
        info: {
          name: 'Jo Smith',
          email: 'josmith@lorem.com',
          phone: '12345678912',
        },
        plans: {
          plan: 'Pro',
          yearly: true,
        },
        addOns: {
          online: false,
          storage: false,
          customisableProfile: false,
        },
      })
      .subscribe();

    const req = spectator.expectOne(
      'http://localhost:5000/api/signup',
      HttpMethod.POST
    );
    expect(req.request.body['info']).toEqual({
      name: 'Jo Smith',
      email: 'josmith@lorem.com',
      phone: '12345678912',
    });
    expect(req.request.body['plans']).toEqual({
      plan: 'Pro',
      yearly: true,
    });
    expect(req.request.body['addOns']).toEqual({
      online: false,
      storage: false,
      customisableProfile: false,
    });
  });
});
