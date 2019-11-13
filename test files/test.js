


function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}


document.querySelector('.nav_header_title').addEventListener('click',homePage);
document.querySelector('.nav_header_tierRankLogo').addEventListener('click',homePage);
document.querySelector('.foot_right').addEventListener('click',Terms);
document.querySelector('.nav_userButtons_Login').addEventListener('click',login);
document.querySelector('.nav_userButtons_about').addEventListener('click',about);

document.querySelector('.category_container_topic4').addEventListener('click',education);
//change category_container_topic to category_container_topic1,category_container_topic2,category_container_topic3,category_container_topic4,category_container_topic5 to distinguish the categories from each other
document.querySelector('.list_link').addEventListener('click',details);
// <div class = "list_link"></div> add this to each html file so it doesn't cause an error
document.querySelector('.nav_userButtons_home').addEventListener('click',homePage);
document.querySelector('.signContainer_button').addEventListener('click',login);
/* add <a href="#" class="signContainer_button"> to every html file so that it doesn't cause an error*/
function homePage(){
       document.location.href="file:///Users/ARomero/Documents/website/assets/html/landing-page.html";
   }
function homePage(){
    document.location.href="file:///Users/ARomero/Documents/website/assets/html/landing-page.html";
}
function Terms(){
    window.open("file:///Users/ARomero/Documents/website/assets/Terms.html");
    
}
function login(){
    document.location.href="file:///Users/ARomero/Documents/website/assets/html/login2.html";
}
function about(){
    document.location.href="file:///Users/ARomero/Documents/website/assets/html/about-page.html";
}
function education(){
    document.location.href="file:///Users/ARomero/Documents/website/assets/html/education.html";
}
function details(){
    document.location.href="file:///Users/ARomero/Documents/website/assets/html/list-details.html";

}

