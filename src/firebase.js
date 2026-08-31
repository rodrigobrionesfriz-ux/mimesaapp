import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from 'firebase/firestore';

// La configuración web de Firebase es pública por diseño: identifica el proyecto,
// no autoriza nada. Lo que protege los datos son las reglas de Firestore
// (ver firestore.rules) y el inicio de sesión.
const firebaseConfig = {
  apiKey: 'AIzaSyBtEkT9lfbexbseGfeDFzPFPQ8vnuBwpRI',
  authDomain: 'mimesa-43bac.firebaseapp.com',
  projectId: 'mimesa-43bac',
  storageBucket: 'mimesa-43bac.firebasestorage.app',
  messagingSenderId: '106765511961',
  appId: '1:106765511961:web:39c5a218feb1533ebe2988',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const proveedorGoogle = new GoogleAuthProvider();

// Caché local persistente: la app sigue funcionando sin señal en el supermercado
// y sincroniza sola cuando vuelve la conexión.
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
});
