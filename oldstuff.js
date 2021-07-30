class User{
    constructor(name,id){
        this.name = name; 
        this.id = id; 
        this.awake = true; 
    }
}
let usersAray = []; 

{
    var currentUserId = message.author.id;
    var name = message.author.username;
    let currentUser = new User(name, currentUserId); 
    message.channel.send('New User added! \n name = ' + currentUser.name  + '\n ID = ' + currentUser.id + '\n awake : ' + currentUser.awake);
    message.channel.send('<@'+ currentUser.id + '>');
    let newLength = usersAray.push(currentUser); 
    PingingChannel = message.channel; 

}