
class Users {
    constructor() {
        this.users = [];
    }
    addUser(id, name, room) {
        let user = { id, name, room };
        this.users.push(user);
        return user;
    }


    // MAKE THIS FUNCTION WORK
    // look at .findIndex()
    removeUser(id) {
        this.users.forEach((cv, index, array) => {
            if(cv.id === id){

            }
        });
        // this.users.splice();
    }

    getUser(id) {

    }

    getUserList(room) {

    }
}

let test = new Users();
test.addUser(1, 'Mike', 'One');
test.addUser(2, 'Simon', 'One');
test.removeUser(2);

module.exports = { Users };