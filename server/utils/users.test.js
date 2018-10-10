const expect = require('expect');
const { Users } = require('./users.js');

describe('Users', () => {
    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'starWars'
        },
        {
            id: '2',
            name: 'Jen',
            room: 'starTrek'
        },
        {
            id: '3',
            name: 'Brad',
            room: 'starWars'
        }];
    });

    it('should add new user', () => {
        let users = new Users();

        let user = {
            id: '123',
            name: 'Mike',
            room: 'starWars'
        };

        let resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);

    });

    it('should remove a user', () => {
        users.removeUser('2');
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        users.removeUser(NaN);
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        let user = users.getUser('2');
        expect(user).toBe(users.users[1]);
    });

    it('should not find user', () => {
        let user = users.getUser('asd');
        expect(user).toBeFalsy();
    });

    it('should return names for starWars room', () => {
        let userList = users.getUserList('starWars');

        expect(userList).toEqual(['Mike', 'Brad']);
    });

    it('should return names for starTrek room', () => {
        let userList = users.getUserList('starTrek');

        expect(userList).toEqual(['Jen']);
    });

});