const expect = require('expect');
const { Users } = require('./users');



describe('Users class functions', () => {

    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: 1,
            name:'keshar',
            room: 'sbs'
        },{
            id:2,
            name:'harendra',
            room: 'mis'
        },{
            id:3,
            name:'ajay',
            room:'sbs'
        }
    ]
    })



    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'keshar',
            room: 'sbs'
        };

        var resUser = users.addUser(user.id,user.name,user.room);

        expect(users.users).toEqual([user]);
    });

    it('should return names for sbs', () => {
        var userList = users.getUserList('sbs');

        expect(userList).toEqual(['keshar','ajay']);
    });

    it('should return names for mis', () => {
        var userList = users.getUserList('mis');

        expect(userList).toEqual(['harendra']);
    });

    it('should return a user by id', () => {
        var user = users.getUser(3);
        var record = {
            id:3,
            name: 'ajay',
            room: 'sbs' 
        };
        expect(user).toEqual(record);
    });

    it('should remove a user', () => {
        var user = users.getUser(1);
        var rmUser = users.removeUser(1);
        var remainingUsers = [{
            id:2,
            name:'harendra',
            room: 'mis'
        },{
            id:3,
            name:'ajay',
            room:'sbs'
        }
    ]


        expect(rmUser).toEqual(user);

        
        expect(users.users).toEqual(remainingUsers); 
        
    });
    
    it('should not remove a user', () => {
        var user = users.getUser(5);
        var rmUser = users.removeUser(5);
        var remainingUsers = [{
            id:2,
            name:'harendra',
            room: 'mis'
        },{
            id:3,
            name:'ajay',
            room:'sbs'
        }
    ]


        expect(rmUser).toNotExist();

        
        expect(users.users).toNotEqual(remainingUsers); 
    })

})