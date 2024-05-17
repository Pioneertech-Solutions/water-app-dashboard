import firebase from "../config/firebase";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import User from "../models/User";

class AuthService {
  constructor() {
    this.auth = getAuth(firebase);
  }

  async login(email, password) {
    try {
      const { user } = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      return new User({
        uid: user.uid,
        email: user.email,
      });
    } catch (error) {
      throw error;
    }
  }

  logout = () => signOut(this.auth);

  checkAuth = (callback) =>
    onAuthStateChanged(this.auth, (user) => {
      if (!user) {
        callback(null);
        return;
      }

      callback(new User({ uid: user.uid, email: user.email }));
    });
}

const authService = new AuthService();
export default authService;
