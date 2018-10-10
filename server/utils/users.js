
class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        let user = { id, name, room };
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        this.users.forEach((cv, index, array) => {
            if (cv.id === id) {
                this.users.splice(index, 1);
            }
        });
    }

    getUser(id) {
        var user = this.users.filter((el, index, array) => { 
            return el.id === id.toString();
        });
        return user[0];
    }

    getUserList(room) {
        var users = this.users.filter((user) => {
            return user.room === room;
        });

        var namesArray = users.map((user) => {
            return user.name;
        });

        return namesArray;
    }
}

// let test = new Users();
// test.addUser(1, 'Mike', 'One');
// test.addUser(2, 'Simon', 'One');
// test.removeUser(1);


module.exports = { Users };