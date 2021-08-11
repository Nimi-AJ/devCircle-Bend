export const users = new Map();
console.log(users);
//save user socket ID and name
export const userJoin = (socketId, userName, userId) => {
    let item = [socketId, userName];
    users.set(userId, item);

    return //
}

export const userLeave = (userId) => {
    if(users.has(userId)){
        let item = users.get(userId)
        users.delete(userId);
        return item;
    }

}

export const getUserSocket = (userId) => {
    if(users.has(userId)){
        let item = users.get(userId);
        return item
    }
}