import { addDoc, auth, blogRef, collection, db, deleteDoc, doc, getDoc, getDocs, onAuthStateChanged, signOut, updateDoc } from "../config/Firebase.js"


const cardblogcont = document.getElementById('cardblogcont');
const nav_right = document.getElementById('nav-right');
const spinner = document.getElementById("spinner");
const Publish_btn = document.getElementById("Publish-btn");
const edit_btn = document.getElementById("edit-btn");

window.onload = function () {
    getBlogs();

}




const getBlogs = async () => {
    spinner.setAttribute("class", "spinner-dis-inline-block")
    onAuthStateChanged(auth, async (user) => {
        if (!user) {
            spinner.setAttribute("class", "spinner-dis-none");
            window.location.replace('/screens/login.html');
            return
        }
        const querySnapshotUserData = await getDocs(collection(db, "users"));
        querySnapshotUserData.forEach((doc) => {
            spinner.setAttribute("class", "spinner-dis-inline-block")
            const uid = auth.currentUser.uid;
            // console.log('user uid====>', uid);
            const userDoc = doc.data()
            const id = doc.id;

            if (userDoc.uid === uid) {
                // console.log('get user name', userDoc);
                const navUserName = `
                <a class="nav-item mx-4" href="/screens/userProfile.html">
                   ${userDoc.userFName} ${userDoc.userLName} 
                </a>

                <span class="nav-item mx-4" onclick="logOutAcount()">
                    Logout
                </span>
            `
                nav_right.innerHTML += navUserName
            }
        });
        const querySnapshotUserBlog = await getDocs(collection(db, "blogs"));
        querySnapshotUserBlog.forEach((doc) => {
            const uid = auth.currentUser.uid;
            // console.log('uid====>', uid);
            const blogDoc = doc.data()
            const id = doc.id

            if (blogDoc.uid === uid) {
                // console.log('ok', blogDoc);
                const cardDataContent = `
           <div class="mainDiv">
             <div class="cardblog">
               <div><img src=${blogDoc.userImage} alt="" class="userimg"></div>
               <div class="content">
                   <h4>${blogDoc.title}</h4>
                   <p class="color-light">${blogDoc.userName}</p>
               </div>
             </div>


              <div>
               <p class="color-light">${blogDoc.description}</p>
              </div>
              <div>
                <a class="text-style-none color-purple mx-4" onclick="deleteblog('${id}')">
                 Delete
                </a>

                <a class="text-style-none color-purple mx-4" onclick="selectEditBlog('${id}')">
                 Edit
                </a>
              </div>
            </div>
           `
                cardblogcont.innerHTML += cardDataContent
                return
            }
        });
        spinner.setAttribute("class", "spinner-dis-none");
    });
};

window.getBlogs = getBlogs


const title = document.getElementById('title')
const description = document.getElementById('description')





const addBlog = async () => {
    // console.log(title.value);
    // console.log(description.value);
    spinner.setAttribute("class", "spinner-dis-inline-block")
    const uid = auth.currentUser.uid;
    // console.log(uid);
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (!title.value || !description.value) {
        swal("Oops !", "please fill out this fields ", "error");
        spinner.setAttribute("class", "spinner-dis-none");
        return
    }
    if (docSnap.exists()) {
        spinner.setAttribute("class", "spinner-dis-inline-block")
        // console.log("Document data:", docSnap.data());
        const dataUser = docSnap.data()
        const obj = {
            userName: dataUser.userFName,
            userImage: dataUser.userImage,
            uid,
            title: title.value,
            description: description.value
        }
        await addDoc(blogRef, obj);
        swal("Booyah ! successfully Blog Publish", "Please reload your page", "success");
    } else {
        // console.log("No such document!");
        spinner.setAttribute("class", "spinner-dis-none");
    }
    spinner.setAttribute("class", "spinner-dis-none");
    title.value = '';
    description.value = ''
}
window.addBlog = addBlog





const logOutAcount = () => {
    signOut(auth).then(() => {
        swal("signOut", 'seccessfully signOut', "success");
        setTimeout(() => {
            window.location.replace('/screens/login.html')
        }, 2000);

    }).catch((error) => {
        const errorMessage = error.message
        swal("Oops", errorMessage, "error")

    });
}
window.logOutAcount = logOutAcount


const deleteblog = async (id) => {
    spinner.setAttribute("class", "spinner-dis-inline-block")
    await deleteDoc(doc(db, "blogs", id));
    swal("Seccessfully blog delete", 'please reload your page', "success");
    spinner.setAttribute("class", "spinner-dis-none");

}
window.deleteblog = deleteblog;

let edituserdocid;
const selectEditBlog = async (id) => {
    Publish_btn.setAttribute("class", "dis-none");
    edit_btn.setAttribute("class", "editBtn btn btn-Publish")
    // console.log('edit id', id);
    window.location.href = "#";
    const editRef = doc(db, "blogs", id);
    const editSnap = await getDoc(editRef);
    const editData = editSnap.data();
    // console.log(editData);
    title.value = editData.title;
    description.value = editData.description;
    // console.log('edit wala hai =========>', title.value);

    edituserdocid = id
}
window.selectEditBlog = selectEditBlog;

// console.log('edituserdocid==========>', edituserdocid);

const editBlog = async () => {
    spinner.setAttribute("class", "spinner-dis-inline-block")
    // console.log(edituserdocid);
    const id = edituserdocid
    // console.log(title.value);
    // console.log(description.value);

    const editRef = doc(db, "blogs", id);
    await updateDoc(editRef, {
        title: title.value,
        description: description.value
    })
    swal("Seccessfully blog Edit", 'please reload your page', "success");
    spinner.setAttribute("class", "spinner-dis-none");

}
window.editBlog = editBlog