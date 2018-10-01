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

});