import { auth, collection, db, getDocs, onAuthStateChanged } from "../config/Firebase.js"


const userUid = JSON.parse(localStorage.getItem('userBlogUid'));
const spinner = document.getElementById("spinner");
const myCard = document.getElementById('myCard')
const usar = document.getElementById('usar')
const cardblogcont = document.getElementById('cardblogcont')
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
    BlogDetail()

};

const BlogDetail = async () => {
    spinner.setAttribute("class", "spinner-dis-inline-block")
    const querySnapshot = await getDocs(collection(db, "blogs"));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        const blogData = doc.data()
        if (userUid == blogData.uid) {
            // console.log('data=======>', blogData);

            const cardBody = `
        <div class="border">
            <div class="cardblog">
                <img src=${blogData.userImage} alt="" class="userimg">
                <div class="content">
                    <h4>${blogData.title}</h4>
                    <h6 class="color-light">${blogData.userName}</h6>
                </div>
            </div>


            <div>
                <p class="color-light my-2">${blogData.description}</p>
            </div>
        </div>
            `

            myCard.innerHTML += cardBody;

            const userinformation = ` 
             <div class="username">
              <h4>${blogData.userName}</h4>
            </div>
            <img src=${blogData.userImage} alt="" class="carduserimg">`

            usar.innerHTML = userinformation;

            const name = `<h1 class="myBlogHeading my-4 mx-4"> All from ${blogData.userName}</h1>`
            cardblogcont.innerHTML = name
        }
    });
    spinner.setAttribute("class", "spinner-dis-none");
}
window.BlogDetail = BlogDetail;