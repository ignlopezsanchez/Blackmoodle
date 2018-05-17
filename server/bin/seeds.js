require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Degree = require('../models/Degree');
const Reply = require('../models/Reply');
const Subject = require('../models/Subject');
const Thread = require('../models/Thread');
const Deadline = require('../models/Deadline');
const Note = require('../models/Note');

const DBURL = process.env.MONGODB_URL;
// const DBURL = "mongodb://blackmoodle:blackmoodle90++++@ds245238.mlab.com:45238/blackmoodle";

mongoose
  .connect(DBURL)
  .then(() => {
    User.collection.drop();
    Degree.collection.drop();
    Reply.collection.drop();
    Subject.collection.drop();
    Thread.collection.drop();
    Deadline.collection.drop();
    Note.collection.drop();

    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const users = [
  {
    username: "Juan",
    email: "juan@juan.es",
    password: bcrypt.hashSync('123', 10),
    photo: "data:image/jpeg;base64,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",
    birthDate: new Date,
    gender: "Hombre",
    isTeacher: true,
    isAdmin: false,
    isVisible: true
  },
  {
    username: "Beatriz",
    email: "bea@bea.es",
    password: bcrypt.hashSync('123', 10),
    photo: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQERITEhIVFhUWFhUVFxUVFxUWFhgWFRgWGBUWFRUYHSggGRolGxgVITEhJSkrLi4uFyAzODMsNygtLisBCgoKDg0OGhAQGy0mHSUtLS8tLS0tLS0tKy0tLS0tLSstLS0tLS0tLS0tLS0tLS0rLS0tLS0tLS0tLS0tLS0tLf/AABEIAKgBKwMBIgACEQEDEQH/xAAcAAEAAwEBAQEBAAAAAAAAAAAABQYHBAMCAQj/xAA9EAACAQICBwUGBAQHAQEAAAAAAQIDEQQhBQYSMUFRYSJxgZGhBxMyUrHBI4LR8BRicuFCY5KywtLxQzP/xAAZAQEAAwEBAAAAAAAAAAAAAAAAAgMEAQX/xAAiEQEBAAICAQUBAQEAAAAAAAAAAQIRAyExEiIyQVFhBJH/2gAMAwEAAhEDEQA/ANxAAAAAAAAAAAAAAAAIjTWsWHwi/En2vkjnL+3iRuuusn8LDYpv8SS3/KufeZFicROpecndt5Xzvfi/3ncjcvqJzH7q76U9qbi7UqMVycm5PyVvv3kFU9q2NTyjRtycX/2+5WquBee1LPe2yMxOjpXyT+/kcl/XdT6axq17WKdWSp4uEabeSqQbcL/zR3x78zRcHjKdaO1TnGcecWmvQ/lpaNqJ8b8ln5lv1dxGJwFWlVi5JTylF32W1lZpkrlP1z0ZfjfQcGhNKQxVJVId0o8YyW9M7zqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHxWqqEZSe5Jt+B9kRrTiNjDy/maj5vP6HKRmGsuIdapKTecnm++1/JNeRUJaWjTW1zcmukY5JeLfoTOsmL2KdVreoyf0X3KFhcNUxVWnRha7srt2ilHOUpPhFZtvoQx/Vt76S+iq9SvWXZlOUn2YRzk+kVuXe8lvNT0RqRJ2niZqP8AlU9y6Sm85Pm/Wx5as4XDaKpXjRrVJNdvEe7zfSMW7xh0877yewGuWErPZVRxl8s4uL9SGWW1uOOnVR0FQpq0YJeGfmc+ltGU6tKVOUU015dV1Jd1la5D47T2Eg9mpXhF8myqyfS2W/aC9m2OqUMZWwlSV77m+OTlCXkpLyNSMpx2Ko/xWCxWHqKX40KM9l/POGzfw2/M1Y0cduu2XlkmXQACxUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVXX6vs06cebk/JL9S1FG9pErujHpJ+bSI5+EsPLItbMReEs96z88yc9nerklTdVWdWorq/CO+Kz65vw5EFpqkpOF9zsn+ba/QvmouJcqaae6y8ijkupGrhxltqFxMtMUa7bpNxT3Nxaa7r7T8LIs2itH1MYlLEUFGSSltdi1/k4TTvfemnvvwLrh5qSz9T5dRblY7daN2VxYqg/cNQXaSsu/gZNj5YejKTqU6tWq38ShFQvnfObTksrcN+V1mbNBXizmngKVZfiQUrHMZJS26Y+9NvEUcF2FHZx+HinFWWxapK3nFZH9CJmba/YGlTwanCCXuK1KtG3zbXu+PSozRcJK9OD5xi/NIux/ijl39vUAE1QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABRPaMu3SfKP/IvZR/aQrKm/wCWfps/qQ5Pinx/JkOk86al8tn5Sf8A2LJqZNxpPZ57is46XZlHnTuvytPI7tRNKxhPYl++BTyzeDRw3WbQnpecYxjH4pOyb+Fc2+iWZ3++oKk6axcYzf8A9NuDltb72d14cshhcJSqwnTnCMoSTTi1dNPeiOwWreEwb2Y4anKDa+NOTVtrLazfFc9xThOu2q6t0ia9HH0Zt08TGtGWfvHKkrd8VbLoT+Hr1qVKnUq1FKe6ezbZlwTVuO71PLH6NwEov8GUbJL8Oooxuum2r37jj1b1anCVWpWq1JU7v3NBvswg3eN/mk1a76vfvJ3D8pda3Z/1966YlVcDNX//AEqUor8s41H6QZo2jHejS/oh/tRi2vGPX8VSwsP/AJr3k7fPUsorwir/AJzYdXp7WFoP+SK8lY0YddMPN32kQAWKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACm+0anenT7p/8G/oXIrOvNLaoxfKVv9S/sQ5Pinx/KMM0p2ZU34P6EDUcqVS8XZrNFh1hjlHo3/u/REJiI7Vn12X++6xydxZeq0LVDXOLSjUdmuZpOFnTrRTTunyP52lhXGzRLaJ1gxFDKE3bkZ/Tq9NU93ny3Gro6le6Sv3IiNcNZKWjaDnO0qkrqlSvnOXXlBcX92jOsb7QMTTg2knLhfdfqlm/MouP0jWxdZ1sRUc5yybfBLdGKWUYrki3ix32p5crj1tNaIrzqVXWqtyqVajcpPi98nbguFuGSP6I1Kq7WCo9E16t/c/nPA1FtwtujZLv/bN39meK28M4/K7+DX9iW/cqs9q4gAtUgPCviFHLjyGExHvE3bc7X4PuObd9N1t7gA64AAAAAAAAAAAAAAAAAAAAAAAAAAAAABCa2UnLDy/lz+xNkFrbjo0qOy99RqKXjmyOfxqWHyjDtZaO9dWvK7K3Ve9fMl5ou+sFK+34NebuvK3mUrEQ39H6MqwvS/Oe5YcJhFVpprjFS/U4Xhtl2sWbVPC7dCDtwa9UxpTRrUt2TM1z1bGzGdRRtNxew+9L1ImhHO5edNaHbw0pJcUU2lTzNXDlLiyc+Pv27cBK0o9939TWvZfpHYqqDeUo2893qjIaOUkW7QONcLNb429JNnM/1zGb3H9EAi9X9LxxVGE90mu0v5l8VvH6kmXSyzcZ7LLqqti8RKVRxv8AFUcfBSt9C0QgkkkrJZJFfjhV8T45rveZP0Z7ST5kOP72v57LJp9gAsZwAAAAAAAAAAAAAAAAAAAAAAAAAAACr68a6UNF01tvarTT93TWb5bcuUF67kB1606z0cBTvN7VRrsUl8Uur+WPUyDH6z1MTUjOq+1GTbXBxvfsrglut0vzOTC4mWlKs5++Um3ebbTklwtDfZbklZI7tJaIhCm401nv2nnKVuPRE8uKXFHHk1k9dKV4Ts+tn3SV19vIqeOw9ptcGn9P/Drw1Zyio3zcLeNPL6L1PbEJShTlz/f6Ix/Hpu+Xa6ezPDqeE7pSX1LFjtEXW7dn4cSC9lKao1Y/5j9YxL845EPRMtpeu4qxidDJ0pRtvSa8HczTXHVOWH2q0F2LpyXy8L9xtsYZWe44NJYGNSEoSV004vqmRkuPcduUy6r+dNrtX5MntAbVSfu4JylLKMVvbvkjg1n0PPB15U5J2bvCXCS6M/NW8bOnXpSp294pLYvucrpJPxbL73FWtVumqmiK2FT95ON5WezG72X/AFPfv4Is/wDF33tLuK3TwtZ299ibc40YpZ8tuV7+SOzDSo0tzbvvcpOTfm/RHMctJZ4S/wBd053yudeFrWyZwue3nHd3H576xOZaV5Y7icBxYHEXyfgdpbKos1QABwAAAAAAAAAAAAAAAAAAAAAAABw6b0nHCUKlaabUFdRW+Um0oQj1lJpLvKNoXVOM6ksZpCMa2KqvbcZdqnRX+GnCLybisr+XNy3tExc4PARSXu5YulKo38sJRaXm7/lJKbtJohyXUWcUlr5raOozioypQaW7srLrF74vqipay6CVFbcW5QbSd83G+STfGN+O/nzLtTPLF0VNOMknFppp7mnk0QxzuPcWZYTLqsDq0vd1XFP4ZJruf90zrqQ7LtzckuV87eal6HbrtoqWGqWzdvhk/wDFTecW+qtKL8+JyYWWS/f74+RHk7u4lx7k1V29mtdfiLm4y9H/AGNBSMT0Jj54SsnF245q6adrrzt5mpYHWKnNLbWw3x3xf3R3jxtlsc5MpLJUtUyPOWZ+wqKavFprmmmvQ/GiNdiF1g1fo4yk6dWPWMl8UXzTMY09qvXwFX5op7UZLe1xy4M3zEVYwV5yUVzbsZ/pjHQxWKeznCEdlX4tttuxPhwty/iHLyTHH+oTVfWRVXJYqrU7KVtmWztf1PeuO6xddHY+hJKVGgpcp7MqsvCVmzONP6AlCXvcP1vDn3H7ovW/EYalTjFtwjls3s4raeXWzurdw5OG43pbxf6JnO2yYDGVaicXTcVzlGUfRpHrVSgm5SyW9s4MDo6vWcJLExs0pJqLu00nuuRmvtKcK+HpxnLYcM09zkpO7duOaITet1K6uXplWPRtfaalF9ksaZRdDbVOUU32WrW+hdcLK8V5FvHdxn5sdV7AAsUgAAAAAAAAAAAAAAAAAAAAAAAIHXfAe+wdSy7VK1aNt96T2ml1cdpeJ5YuXb2lulmvHcWJormLw+xHYX+B7K/pycPKLS74shyTeK3iusnTRldHpI4cLUujtTKMbuLspqqf7RcEqmHTt2oO66xllNd1s+9IzfBQaj3O3Wz4enqbFrFhffUakOOxK3fbIyilJbduav45S/Qh3uxZ1qPjEQuovrv5Xuv33ls0bU2qcHbJpeZXNhdqD3X9Jbn4NRJfQV1T2d9rmr/LdZWMn+qbxld9Wk1nBuL5p2PCeNxC3zm/zSO5ZnxOnc36lYdofEVpSTbI/R89mcn1JfHxlujHeRNHCSjdtWucrsSFfEpoqem6CjPat2X8XLPe/HiSWJm0fMYKtDZazaduvNEM56ppbx+27aVqVj9rB0GnfZioN/0ZLxtY+teZqVTBy6VV4rYZSfZ/pB0veUZPJO67srPya8Uyx6zVtr+Ga4SmvNR/Q823W8a9LHHdmUSFOr8L5NFv0RW2ovzKTReSJ/V/E2qbL4olxXXSPPjuLOADQxgAAAAAAAAAAAAAAAAAAAAAAABxaSoKUW+lvDh9Wdp8VI3TQdl1VSoT2ZNdSThO5F46GzO514Sd0YvGWm69zb2rIxjT9J4fErLJTcfBvL0fobVJGa+0fRTadSPNema+/kd3rKEm8bED73NPrs3712X/AKkmdWBxNpJxdr+KvvzX13biEhV2oS/pT8Ytfax5vEuLUl3/AK+t/Mu47rLajkm8dL3Qxe1k8pWvzTXOL48Oq8Ue06yRXMNi7xWeW+L5Pg/3zOv+LbSv3dz3M9GV51iXjioS35dRVpp9SGczzlj3Hid2afelMHZbiMlT2HT8/U9sRpSU973EPjcU2QyqzGV04fGKniqkluaWX5pX+rLLWxm2qSvun/xkZvPEt1Y9/wD6W3AVbyprk7/Y87mx923pcF9ul+oZxO/B1LThJdxFYepkSOjO0pR470Qw8rOSdL3CV0nzR9HLo6d6cTqNbz6AAOAAAAAAAAAAAAAAAAAAAAAAAAK7pujaT8zjwkgDLy/Ju4vgkabuRWsOA99SqR4tZd63H4COc9ruHljtSi6U5wats526NNNeDXqcFT4f6W14cPsATwqvl6tdGi8TlKN807rufAlaFT63+27wAN+Hhgz8vvEYtRI+rirn4CdckeLqHJiZAFdWRHYaF6q71+pbNFr8VdEvU/AY+Xy3cPhdsPPJEhoavaogCrDzF2fxXvRfweP6HWAbHm3yAAOAAAAAAAAAAA//2Q==",
    birthDate: new Date,
    gender: "Mujer",
    isTeacher: true,
    isAdmin: false,
    isVisible: true
  },
  {
    username: "admin",
    email: "admin@admin.es",
    password: bcrypt.hashSync('admin', 10),
    photo: "data:image/jpeg;base64,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",
    birthDate: new Date,
    gender: "Mujer",
    isTeacher: false,
    isAdmin: true,
    isVisible: true
  },
  {
    username: "Nacho",
    email: "nacho@nacho.es",
    password: bcrypt.hashSync('123', 10),
    photo: "http://res.cloudinary.com/ignlopezsanchez/image/upload/v1524816011/Project2/1524816011195.png",
    birthDate: new Date,
    gender: "Hombre",
    isTeacher: false,
    isAdmin: false,
    isVisible: true
  }];

User.create(users, (err, usersDocs) => {
  if (err) {
    throw err;
  }

  const userJuan = usersDocs[0];
  const userBea = usersDocs[1]; 
  const userAdmin = usersDocs[2]; 
  const userNacho = usersDocs[3]; 
 
  console.log(`Created users`);

  const degrees = [
    {
      name:"Grado en Tecnologías Industriales",
      photo:"data:image/jpeg;base64,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",

    },
    {
      name:"Grado en Ingeniería Informática",
      photo: "https://www.apple.com/euro/mac/home/x/generic/images/social/macbook_mac_og.png?201804200734"

    },
    {
      name:"Grado en Ingeniería Mecánica",
      photo: "https://www.apple.com/euro/mac/home/x/generic/images/social/macbook_mac_og.png?201804200734"

    },
    {
      name:"Grado en Ingeniería Eléctrica",
      photo: "https://www.apple.com/euro/mac/home/x/generic/images/social/macbook_mac_og.png?201804200734"

    },
    {
      name:"Grado en Ingeniería Química",
      photo: "https://www.apple.com/euro/mac/home/x/generic/images/social/macbook_mac_og.png?201804200734"

    },
    {
      name:"Grado en Psicología",
      photo: "https://www.apple.com/euro/mac/home/x/generic/images/social/macbook_mac_og.png?201804200734"

    },
    {
      name:"Grado en Administración y dirección de empresas",
      photo: "https://www.apple.com/euro/mac/home/x/generic/images/social/macbook_mac_og.png?201804200734"

    },
    {
      name:"Grado en Relaciones laborales",
      photo: "https://www.apple.com/euro/mac/home/x/generic/images/social/macbook_mac_og.png?201804200734"

    },
    {
      name:"Grado en Arquitectura",
      photo: "https://www.apple.com/euro/mac/home/x/generic/images/social/macbook_mac_og.png?201804200734"

    },
    {
      name:"Grado en Química",
      photo: "https://www.apple.com/euro/mac/home/x/generic/images/social/macbook_mac_og.png?201804200734"

    },
    {
      name:"Grado en Fisioterapia",
      photo: "https://www.apple.com/euro/mac/home/x/generic/images/social/macbook_mac_og.png?201804200734"

    },
    {
      name:"Grado en Medicina",
      photo: "https://www.apple.com/euro/mac/home/x/generic/images/social/macbook_mac_og.png?201804200734"

    },
    {
      name:"Grado en Geografía",
      photo: "https://www.apple.com/euro/mac/home/x/generic/images/social/macbook_mac_og.png?201804200734"

    },
    {
      name:"Grado en Topografía",
      photo: "https://www.apple.com/euro/mac/home/x/generic/images/social/macbook_mac_og.png?201804200734"

    },
    {
      name:"Grado en Bellas Artes",
      photo: "https://www.apple.com/euro/mac/home/x/generic/images/social/macbook_mac_og.png?201804200734"

    },
    {
      name:"Grado en Podologia",
      photo: "https://www.apple.com/euro/mac/home/x/generic/images/social/macbook_mac_og.png?201804200734"

    },
    {
      name:"Grado en Odontología",
      photo: "https://www.apple.com/euro/mac/home/x/generic/images/social/macbook_mac_og.png?201804200734"

    },
    {
      name:"Grado en Telecomunicaciones",
      photo: "https://www.apple.com/euro/mac/home/x/generic/images/social/macbook_mac_og.png?201804200734"

    }
  ]
  Degree.create(degrees)
  .then(degreeDocs => {
    degreeOne = degreeDocs[0];
    degreeTwo = degreeDocs[1];
    console.log("Degrees creados")
    })
    .then(()=>{
      const threads = [
        {
          _author: userJuan._id,
          title: 'First Thread',
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          date: new Date,
        },
        {
          _author: userBea._id,
          title: 'Second Thread',
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          date: new Date,
        },
        {
          _author: userBea._id,
          title: 'Third Thread',
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          date: new Date,
        },
        {
          _author: userNacho._id,
          title: 'Fourth Thread',
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          date: new Date,
        },
      ];
    
      Thread.create(threads, (err, threadDocs) => {
        if (err) { throw(err) }
        ThreadOne = threadDocs[0];
        ThreadTwo = threadDocs[1];
        ThreadThree = threadDocs[2];
        ThreadFour = threadDocs[3];
        console.log(`Created ${threadDocs.length} threads`);
      })
      .then(() =>{
        
        const deadlines = [
          {
            _author: userJuan._id,
            name: 'First Deadline',
            date: new Date,
          },
          {
            _author: userBea._id,
            name: 'Second Deadline',
            date: new Date,
          },
          {
            _author: userBea._id,
            name: 'Third Deadline',
            date: new Date,
          },
          {
            _author: userNacho._id,
            name: 'Fourth Deadline',
            date: new Date,
          },
        ];
      
        Deadline.create(deadlines, (err, deadlineDocs) => {
          if (err) { throw(err) }
          DeadlineOne = deadlineDocs[0];
          DeadlineTwo = deadlineDocs[1];
          DeadlineThree = deadlineDocs[2];
          DeadlineFour = deadlineDocs[3]; 
          console.log(`Created ${deadlineDocs.length} deadlines`);
        })
        .then(() =>{
          const notes = [
            {
              _author: userJuan._id,
              name: 'Dynamic views',
              url: "http://res.cloudinary.com/ignlopezsanchez/image/upload/v1525955491/hbs1.pdf",
            },
            {
              _author: userBea._id,
              name: 'Dynamic views',
              url: "http://res.cloudinary.com/ignlopezsanchez/image/upload/v1525955491/hbs1.pdf",
            },
            {
              _author: userBea._id,
              name: 'Dynamic views',
              url: "http://res.cloudinary.com/ignlopezsanchez/image/upload/v1525955491/hbs1.pdf",
            },
            {
              _author: userNacho._id,
              name: 'Dynamic views',
              url: "http://res.cloudinary.com/ignlopezsanchez/image/upload/v1525955491/hbs1.pdf",
            },
          ];
          Note.create(notes, (err, notesDocs) => {
            if (err) { throw(err) }
            NotesOne = notesDocs[0];
            NotesTwo = notesDocs[1];
            NotesThree = notesDocs[2];
            NotesFour = notesDocs[3];    
            console.log(`Created ${notesDocs.length} notes`);
          })

          .then(()=>{
            const subjects = [
              {
                name: "Programacion I",
                degree: degreeOne._id,
                course: 1,
                teacher: [userJuan._id, userBea._id],
                threads: [ThreadOne._id],
                deadlines: [DeadlineOne._id],
                notes: [NotesOne._id],
              },
              {
                name: "Programación de microcontrolador",
                degree: degreeOne._id,
                course: 3,
                teacher: userBea._id,
                threads: [ThreadTwo._id],
                deadlines: [DeadlineTwo._id],
                notes: [NotesTwo._id],
              },
              {
                name: "Programacion Avanzada",
                degree: degreeTwo._id,
                course: 4,
                teacher: userJuan._id,
                threads: [ThreadThree._id],
                deadlines: [DeadlineThree._id],
                notes: [NotesThree._id],

              },
              {
                name: "Patrones de diseño",
                degree: degreeTwo._id,
                course: 2,
                teacher: [userJuan._id, userBea._id],
                threads: [ThreadFour._id],
                deadlines: [DeadlineFour._id],
                notes: [NotesFour._id],

              }
            ]; 
          
            Subject.create(subjects).then(subjectDocs => {
              const subjectOne = subjectDocs[0];
              const subjectTwo = subjectDocs[1];
              const subjectThree = subjectDocs[2];
              const subjectFour = subjectDocs[3];
    
              userJuan.update({ $push: { subjects: { $each: [ subjectOne._id, subjectThree._id, subjectFour._id ] } } })
              .then(()=>userBea.update({ $push: { subjects: { $each: [ subjectOne._id, subjectTwo._id, subjectFour._id ] } } }))
              .then(()=>userAdmin.update({ $push: { subjects: { $each: [ subjectOne._id, subjectTwo._id, subjectThree._id, subjectFour._id ] } } }))
              .then(()=>userNacho.update({ $push: { subjects: { $each: [ subjectOne._id, subjectTwo._id, subjectThree._id, subjectFour._id ] } } }))
              .then(() => mongoose.connection.close())         
              console.log(`Created ${subjectDocs.length} subjects`);
            })
          })
          .catch((e) => console.log(e))
        })       
      })
    })
  })

