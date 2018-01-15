export class User {
    public id: number;
    public name: string;
    public age: number;
    public static Create(id: number, name: string, age: number): User {
        var user = new User();
        user.id = id;
        user.name = name;
        user.age = age;
        return user;
    }

    public static CreateFromUser(user: User): User {
        return Object.assign(new User(), user);
        // var newUser = new User();
        // newUser.id = user.id;
        // newUser.name = user.name;
        // newUser.age = user.age;
        // return newUser;
    }
    public toString(): string {
        return `id = ${this.id}, name = ${this.name}, age = ${this.age}`;
    }
}