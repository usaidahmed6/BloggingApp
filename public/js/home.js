import { auth, collection, db, doc, getDoc, getDocs, onAuthStateChanged } from "../config/Firebase.js";

const cardblogcont = document.getElementById('cardblogcont');
const spinner = document.getElementById("spinner");
const nav_right = document.getElementById("nav-right");

window.onload = function () {
    onAuthStateChanged(auth, async (user) => {
        if (!user) {
            const loginTap = ` <a class="nav-item mx-4" href="/screens/login.html">
                Login
            </a>
            `
            nav_right.innerHTML += loginTap
            return
        }
        else {
            const userTap = ` <a class="nav-item mx-4" href="/screens/userProfile.html">
            Profile
        </a>
        <a class="nav-item mx-4" href="/screens/dashBoard.html">
        DashBoard
        </a>
        `
            nav_right.innerHTML = userTap
        }
    })
    getBlogs()
};


const getBlogs = async () => {
    spinner.setAttribute("class", "spinner-dis-inline-block")
    const querySnapshot = await getDocs(collection(db, "blogs"));
    querySnapshot.forEach((doc) => {
        spinner.setAttribute("class", "spinner-dis-none");
        const blogDoc = doc.data()
        const id = doc.id
        // console.log('ok', blogDoc);
        const cardDataContent = `
           <div class="mainDiv" onclick="BlogDetail('${id}')">
             <div class="cardblog">
               <div><img src=${blogDoc.userImage} alt="" class="userimg"></div>
               <div class="content">
                   <h4>${blogDoc.title}</h4>
                   <h6 class="color-light">${blogDoc.userName}</h6>
               </div>
             </div>


              <div>
               <p class="color-light my-2">${blogDoc.description}</p>
              </div>
             </div>
           `
        cardblogcont.innerHTML += cardDataContent;
    });

};

window.getBlogs = getBlogs;


const BlogDetail = async (id) => {
    const blogDetailRef = doc(db, "blogs", id);
    const blogSnap = await getDoc(blogDetailRef);

    if (blogSnap.exists()) {
        // console.log("Document data:", blogSnap.data());
        const useruid = blogSnap.data().uid;
        //  localStorage data save (blog id)
        const userblogid = JSON.stringify(useruid);

        localStorage.setItem('userBlogUid', userblogid)

    } else {
        // docSnap.data() will be undefined in this case
        // console.log("No such document!");
        spinner.setAttribute("class", "spinner-dis-none");
    }
    window.location.href = '/screens/blogDetail.html'


    // console.log(localStorage);
}
// console.log(blogid);




window.BlogDetail = BlogDetail;



// active navbar
let nav = document.querySelector(".navigation-wrap");
window.onscroll = function () {
    if (document.documentElement.scrollTop > 20) {
        nav.classList.add("scroll-on");
    } else {
        nav.classList.remove("scroll-on");
    }
}

