document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems);
  });

// Function that listen the scroll in axis Y
window.addEventListener("scroll", (event) => {
  let scroll = this.scrollY;
  console.log(scroll);
  if (scroll >= 100) {
    document.getElementById("btnScrollTop").classList.add("btnScrollTopShow");
    document.getElementById("btnScrollTop").classList.remove("btnScrollTopHide");
    document.getElementById("btnScrollTop").style.pointerEvents = "initial";
  }
  else if(scroll < 100){
    document.getElementById("btnScrollTop").classList.remove("btnScrollTopShow");
    document.getElementById("btnScrollTop").classList.add("btnScrollTopHide");     
    document.getElementById("btnScrollTop").style.pointerEvents = "none"; 
  }
});

// Function to go to the Top of the page
var scrollToTopBtn = document.getElementById("scrollToTopBtn");
var rootElement = document.documentElement
function scrollToTop() {
// Scroll to top logic
rootElement.scrollTo({
  top: 0,
  behavior: "smooth"
})
}
scrollToTopBtn.addEventListener("click", scrollToTop)