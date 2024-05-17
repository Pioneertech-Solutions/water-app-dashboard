class User {
  constructor(args = {})
  {
    this.uid = args.uid;
    this.email = args.email;
    this.username = args.email.split("@")[0];
  }
}

export default User;
