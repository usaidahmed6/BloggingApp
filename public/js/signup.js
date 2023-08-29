import { auth, createUserWithEmailAndPassword, db, doc, setDoc } from "../config/Firebase.js"


// loader get by id method 
const spinner = document.getElementById("spinner");

const Signup = () => {
    spinner.setAttribute("class", "spinner-dis-inline-block")
    const userFName = document.getElementById('userFName').value
    const userLName = document.getElementById('userLName').value
    const userEmail = document.getElementById('userEmail').value
    const userPassword = document.getElementById('userPassword').value
    const repeatedPassword = document.getElementById('repeatedPassword').value
    // console.log(userFName, userLName, userEmail, userPassword, repeatedPassword);

    if (!userFName || !userLName || !userEmail || !userPassword || !repeatedPassword) {
        swal("Oops !", "please fill out this fields", "error");
        spinner.setAttribute("class", "spinner-dis-none");
        return false

    }
    else if (userPassword != repeatedPassword) {
        swal("Oops !", "Password is not match for repeated password", "error");
        spinner.setAttribute("class", "spinner-dis-none");
        return false
    }
    else {
        spinner.setAttribute("class", "spinner-dis-inline-block");
        createUserWithEmailAndPassword(auth, userEmail, userPassword)
            .then((userCredential) => {
                spinner.setAttribute("class", "spinner-dis-inline-block");
                const user = userCredential.user;
                // console.log('uid========>', user.uid);
                const uid = user.uid

                const userObj = {
                    userFName,
                    userLName,
                    userEmail,
                    userImage: "https://firebasestorage.googleapis.com/v0/b/food-app-vanilla-javascript.appspot.com/o/ItemsImages%2Fimages1.png?alt=media&token=2e11a6bf-c586-4a64-aa3c-da1cadf1428c",
                    uid
                }
                // console.log('object ======>', userObj);

                setDoc(doc(db, "users", uid), userObj).then(() => {
                    swal("welcome ", "Blogging App", "success");
                    setTimeout(() => {
                        window.location.replace('/')
                    }, 2000)
                })

            })
            .catch((error) => {
                swal("Oops", error.message, "error");
                spinner.setAttribute("class", "spinner-dis-none");
            })

    }
}

window.Signup = Signup