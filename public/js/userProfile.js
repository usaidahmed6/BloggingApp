import { auth, db, doc, getDoc, getDownloadURL, onAuthStateChanged, ref, signOut, storage, updateDoc, uploadBytes } from "../config/Firebase.js";


const myCard = document.getElementById('myCard');
const nav_right = document.getElementById('nav-right');

window.addEventListener("load", (event) => {
    spinner.setAttribute("class", "spinner-dis-inline-block")
    onAuthStateChanged(auth, async (user) => {

        if (!user) {
            spinner.setAttribute("class", "spinner-dis-none");
            window.location.replace('/screens/login.html')
            return false;
        }
        const uid = user.uid
        // console.log(uid);
        const userRef = doc(db, "users", uid);
        const docSnap = await getDoc(userRef);
        const userData = docSnap.data();
        // console.log("Document data:", userData);

        const navUserName = `
        <span class="nav-item mx-4" onclick="logOutAcount()">
            Logout
        </span>
    `
        nav_right.innerHTML += navUserName


        const userFName = userData.userFName;
        const userLName = userData.userLName;
        const userProfileData = `

        <label> 
         <img src=${userData.userImage} class="card-img-top" alt="...">
         <input type="file" name="userImage" id="userImage" placeholder="chose your image">
        </label>
        <div class="card-body">
            <h5 class="card-title">${userFName} ${userLName} </h5>
            <div class="input my-4">
                <input type="password" class="form-control" placeholder="Old password">
            </div>

            <div class="input my-4">
                <input type="password" class="form-control" placeholder="Old password">
            </div>

            <div class="input my-4">
                <input type="password" class="form-control" placeholder="Old password">
            </div>
            <a href="#" class="btn btn-color" onclick="setUserImageToFirebase()">Update Profile Image</a>
        </div>
        `
        myCard.innerHTML += userProfileData

        spinner.setAttribute("class", "spinner-dis-none");
    });
});


async function setUserImageToFirebase() {
    spinner.setAttribute("class", "spinner-dis-inline-block")
    const userImage = document.getElementById('userImage').files[0];
    if (userImage == length[0]) {
        spinner.setAttribute("class", "spinner-dis-none");
        swal("Opps !", 'image not select', "error");
        return
    }
    else {
        // console.log(userImage);

        let ImageUserSet;
        try {
            const storeageRef = ref(storage, 'userImages/' + userImage.name);
            const upload = await uploadBytes(storeageRef, userImage);
            // console.log("file uploaded");
            const imageUrl = await getDownloadURL(storeageRef);
            ImageUserSet = imageUrl;
            const uid = auth.currentUser.uid
            const imageRef = doc(db, "users", uid);
            await updateDoc(imageRef, {
                userImage: ImageUserSet
            })
        } catch (err) {
            swal("Opps !", err.message, "error");
            // console.log(err.message);
            spinner.setAttribute("class", "spinner-dis-none");
        }
        // console.log(ImageUserSet);
        swal("Seccessfully image Upload", 'please reload your page', "success");
        spinner.setAttribute("class", "spinner-dis-none");

        return ImageUserSet;
    }

}


window.setUserImageToFirebase = setUserImageToFirebase



const logOutAcount = () => {
    signOut(auth).then(() => {
        swal("signOut", 'seccessfully signOut', "success");
        setTimeout(() => {
            window.location.replace('/screens/acounts.html')
        }, 2000);

    }).catch((error) => {
        const errorMessage = error.message
        swal("Oops", errorMessage, "error")

    });
}
window.logOutAcount = logOutAcount