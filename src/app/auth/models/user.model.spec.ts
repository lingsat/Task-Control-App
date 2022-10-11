import { User } from './user.model';

describe('UserModel', () => {
  let newUser: User;

  beforeEach(() => {
    newUser = new User(
      'Andy',
      'andy@gmail.com',
      '1',
      'Bearer 123123nkl1n312n3ln1321l3n123l12lnndsfsl1'
    );
  });

  it('should create', () => {
    expect(newUser).toBeTruthy();
    expect(newUser.login).toBe('Andy');
  });

  it('return correct token', () => {
    expect(newUser.token).toEqual(
      'Bearer 123123nkl1n312n3ln1321l3n123l12lnndsfsl1'
    );
  });
});
