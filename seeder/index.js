console.log('start seeding');
import { faker } from '@faker-js/faker';
import { createUser } from './user.js';
import { createPost } from './post.js';
import mysql from 'mysql';
import { makeLikes } from './functions.js'

const usersCount = 10;
const postsCount = 50;

console.log(makeLikes(usersCount));
/*
likes: {
    l:[1,7,6,9,8],
    d: [2,3,4,10]
}

*/

const users = faker.helpers.multiple(createUser, {
    count: usersCount,
});

const posts = faker.helpers.multiple(createPost, {
    count: postsCount,
});

posts.forEach(p => {
    p.user_id = faker.number.int({ min: 1, max: usersCount });
    p.votes = JSON.stringify(makeLikes(usersCount));
})



//connection

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sock_net'
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

let sql;

sql = 'DROP TABLE IF EXISTS posts ;'

con.query(sql, (err) => {
    if (err) {
        console.log('Posts drop error', err)
    } else {
        console.log('Posts table dropped')
    }
});

sql = 'DROP TABLE IF EXISTS users ;'

con.query(sql, (err) => {
    if (err) {
        console.log('user drop error', err)
    } else {
        console.log('user table dropped')
    }
});

sql = `
CREATE TABLE users (
  id int(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name varchar(100) NOT NULL UNIQUE,
  email varchar(100) NOT NULL UNIQUE,
  password char(32) NOT NULL,
  role enum('user','admin','gold','bot') NOT NULL DEFAULT 'user',
  avatar text DEFAULT NULL,
  created_at date NOT NULL,
  status enum('banned','verified','registered') NOT NULL DEFAULT 'registered',
  online tinyint(3) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`
con.query(sql, (err) => {
    if (err) {
        console.log('table create error')
    } else {
        console.log('table created')
    }
})

sql = `
CREATE TABLE posts (
    id int(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    content text NOT NULL,
    created_at date NOT NULL,
    updated_at date NOT NULL,
    votes text NOT NULL,
    user_id int(10) UNSIGNED DEFAULT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

`;

con.query(sql, (err) => {
    if (err) {
        console.log('Posts table create error')
    } else {
        console.log('posts created')
    }
})

sql = `
INSERT INTO users
(name, email, password, role, avatar, created_at, status, online)
VALUES ?
`;
con.query(sql, [users.map(user => [user.name, user.email, user.password, user.role, user.avatar, user.created_at, user.status, user.online])], (err) => {
    if (err) {
        console.log('user table seed error')
    } else {
        console.log('user table seeded')
    }
})

sql = `
INSERT INTO posts
(content, created_at, updated_at, votes, user_id)
VALUES ?
`;

con.query(sql, [posts.map(post => [post.content, post.created_at, post.updated_at, post.votes, post.user_id])], (err) => {
    if (err) {
        console.log('posts table seed error')
    } else {
        console.log('posts table seeded')
    }
})


con.end(); // atjungia 
