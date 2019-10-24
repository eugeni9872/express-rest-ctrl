var faker = require('faker');

function getRandomData(){
    let users = []
    for(let a=0; a < 999; a++){
        users.push({
            id: a,
            name: faker.name.findName(),
            email: faker.internet.email(),
            address: faker.address.streetAddress(),
            bio: faker.lorem.sentence(),
            image: faker.image.avatar()
        })
    }
    return users;
}

class User {
    constructor(){
        this.users = getRandomData()
        this.index = this.index.bind(this)
        this.update = this.update.bind(this)
        this.add = this.add.bind(this)
        this.delete = this.delete.bind(this)

    }
    index(req,res){
        res.send(this.users)
    }

    update(req,res) {
        let id = Number(req.params.id);
        let userToUpdate = req.body //TODO: Delete the id from the payload
        //Modify the user
        this.users = this.users.map(user => {
            return user.id === id ? {...user, ...userToUpdate}: user
        })
        //Find the user
        let user = this.users.find(user => user.id === id)
        res.send(user)
    }
    
    add(req,res) {
        let body = req.body;
        this.users.push(body)
        res.send(body)
    }

    delete(req,res) {
        let id = Number(req.params.id);
        this.users = this.users.filter(user => user.id !== id)
        res.send(this.users)
    }
}

module.exports = User
//module.exports = {User} //Also can be used
