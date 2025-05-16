const { auth, googleProvider } = require("../../src/firebase/firebaseConfig");
const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithCredential,
  GoogleAuthProvider,
} = require("firebase/auth");

async function registerWithEmailPassword(req, res) {
  const { email, password } = req.body;
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    res
      .status(201)
      .json({ uid: userCredential.user.uid, email: userCredential.user.email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function loginWithEmailPassword(req, res) {
  const { email, password } = req.body;
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    res
      .status(200)
      .json({ uid: userCredential.user.uid, email: userCredential.user.email });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

async function loginWithGoogle(req, res) {
  const { idToken } = req.body;
  try {
    const credential = GoogleAuthProvider.credential(idToken);
    const userCredential = await signInWithCredential(auth, credential);
    res
      .status(200)
      .json({ uid: userCredential.user.uid, email: userCredential.user.email });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

module.exports = {
  registerWithEmailPassword,
  loginWithEmailPassword,
  loginWithGoogle,
};