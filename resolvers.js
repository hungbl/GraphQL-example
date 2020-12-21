const db = require('./db')
// Resolvers provide the instructions for turning a GraphQL operation into data. They resolve the query to data by defining resolver functions.
const Mutation = {
   createStudent:(root,args,context,info) => {
      return db.students.create({collegeId:args.collegeId,
      firstName:args.firstName,
      lastName:args.lastName})
   },

   addStudent_returns_object:(root,args,context,info) => {
      const id = db.students.create({
         collegeId:args.collegeId,
         firstName:args.firstName,
         lastName:args.lastName
      })

      return db.students.get(id)
   },

   signUp:(root,args,context,info) => {

      const {email,firstName,password} = args.input;

      const emailExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
      const isValidEmail =  emailExpression.test(String(email).toLowerCase())
      if(!isValidEmail)
      throw new Error("email not in proper format")

      if(firstName.length > 15)
      throw new Error("firstName should be less than 15 characters")

      if(password.length < 8 )
      throw new Error("password should be minimum 8 characters")
      
      return "success";
   }
}

const Query = {
   health: (root,args,context,info) => {
      return `${args.name} GraphQL server is healthy`;
   },
   students: () => {
      return db.students.list();
   },
   studentById:(root,args,context,info) => {
      return db.students.get(args.id);
   },
   setFavouriteColor:(root,args) => {
      return `Your Color is : ${args.color}`;
   }
}

const Student = {
   fullName:(root,args,context,info) => {
      return `${root.firstName}:${root.lastName}`
   },
   college:(root) => {
      return db.colleges.get(root.collegeId);
   }
}

module.exports = {Query, Student, Mutation}