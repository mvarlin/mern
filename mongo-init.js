db.createUser({
  user: "matisse",
  pwd: "linkedin",
  roles: [
    {
      role: "readWrite",
      db: "mern"
    }
  ]
});
