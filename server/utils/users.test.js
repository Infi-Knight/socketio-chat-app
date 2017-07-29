const expect = require('expect');
const {Users} = require('./users');

describe('# Users', () => {

  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [
                    {
                      id: '1',
                      name: 'Jon Snow',
                      room: 'Winterfell'
                    },
                    {
                      id: '2',
                      name: 'Arya Stark',
                      room: 'Winterfell'
                    },
                    {
                      id: '3',
                      name: 'Tyrion',
                      room: 'Casterly Rock'
                    }
                  ]
  });

  it ('should add new user', () => {
    var users = new Users();
    var user = {
      id: 'alpha',
      name: 'Jon Snow',
      room: 'Winterfell'
    };
    var resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    var userId = users.users[1].id;
    var user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    var userId = '7';
    var user = users.removeUser(userId);

    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find a user', () => {
    var userId = users.users[0].id;
    var user = users.getUser(userId);

    expect(user).toBe(users.users[0]);
  });

  it('should not find a user', () => {
    var user = users.getUser('6');
    expect(user).toBe(undefined);
  });

  it('should return names of the Starks', () => {
    var userList = users.getUserList('Winterfell');
    expect(userList).toEqual(['Jon Snow','Arya Stark']);
  });

  it('should return names of the Lannisters', () => {
    var userList = users.getUserList('Casterly Rock');
    expect(userList).toEqual(['Tyrion']);
  });
});
