let users = [];

export const addUser = (user) => {
    users.push(user);
};

export const getUsers = () => {
    return users;
};
