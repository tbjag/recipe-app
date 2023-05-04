import { Role } from "@prisma/client";
const users = [
  {
    firstName: "Theo",
    lastName: "J",
    email: "test@gmail.com",
    role: Role.ADMIN,
  },
  {
    firstName: "Trevor",
    lastName: "H",
    email: "test2@gmail.com",
    role: Role.ADMIN,
  },
  {
    firstName: "Anne",
    lastName: "J",
    email: "test3@gmail.com",
    role: Role.WRITER,
  },
  {
    firstName: "Thomas",
    lastName: "J",
    email: "test4@gmail.com",
    role: Role.BASIC,
  },
  {
    firstName: "Jonas",
    lastName: "L",
    email: "test5@gmail.com",
    role: Role.BASIC,
  },
];

export { users };
