import { initializeApp} from 'firebase/app';
import { getApp } from 'firebase/app';
import {getStorage, ref, uploadBytes} from 'firebase/storage';



const firebaseConfig = {
    apiKey: "AIzaSyD8CX8-C-Qi9-wAoq-HkL-eLDt6yWDG0Zs",
    authDomain: "agriconnect-web-project.firebaseapp.com",
    projectId: "agriconnect-web-project",
    storageBucket: "agriconnect-web-project.appspot.com",
    messagingSenderId: "690845882598",
    appId: "1:690845882598:web:bb8edb8e0cafbf145e8327"
}

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);


// export const uploadCoverPhoto = (file:FileList) => {
//     //console.log(storage)
//         const formData:any = new FormData()
//         formData.append('image', file[0],file[0].name)
//         const coverRef = ref(storage, `images/covers/${file[0].name}`);
//         uploadBytes(coverRef,formData).then(snapshot => {
//             console.log(snapshot);
//         })

    
// }