import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD9GtM2h3tZXXF7dx5SPE8kBJWM0BnNG84",
  authDomain: "gaming-blog-5617f.firebaseapp.com",
  projectId: "gaming-blog-5617f",
  storageBucket: "gaming-blog-5617f.firebasestorage.app",
  messagingSenderId: "764185589233",
  appId: "1:764185589233:web:ffc7ac25dd49d64238c050",
  measurementId: "G-BFC36XR0XF"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app; 