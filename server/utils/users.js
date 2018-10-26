class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room, roomAlias) {
    let user = { id, name, room, roomAlias };
    this.users.push(user);
    return user;
  }

  checkForDuplicateUser(name, room) {
    let numberOfDuplicates = 0;
    for (let i = 0; i < this.users.length; i += 1) {
      if (this.users[i].name === name && this.users[i].room === room) {
        numberOfDuplicates += 1;
        if(numberOfDuplicates > 1){
          return true;
        }
      }
    }
    return false;
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
    var users = this.users.filter(user => {
      return user.room === room;
    });
    var namesArray = users.map(user => {
      return user.name;
    });
    return namesArray;
  }

  getRoomList() {
    if (!this.users || this.users.length < 1) {
      return ["No active rooms."];
    }
    var roomsArray = [];
    this.users.forEach(user => {
      roomsArray.push(user.roomAlias);
    });
    return roomsArray;
  }
}

// let test = new Users();
// test.addUser(1, 'Mike', 'One');
// test.addUser(2, 'Simon', 'One');
// test.removeUser(1);

module.exports = { Users };
