/*====================MENU SHOW Y HIDDEN====================*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/*====================MENU SHOW ====================*/
/*Validate if constant exists*/
/*.addEventListener : Registra un evento a un objeto en específico 
Element.classList = devuelve una colección activa de DOMTokenList de los atributos de clase del elemento.

*/
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*====================MENU HIDDEN ====================*/
/*Validate if constant exists*/
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
/* 
El método querySelectorAll() de un Element 
devuelve una NodeList estática (no viva) que 
representa una lista de elementos del documento que 
coinciden con el grupo de selectores indicados.
*/
const navList = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  //cuando nosotros le vamos click en nav__link, nosotros eliminamos la  class show-menu
  navMenu.classList.remove("show-menu");
}
navList.forEach((n) => n.addEventListener("click", linkAction)); //forEach() ejecuta la función indicada una vez por cada elemento del array

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName("skills__constent "),
  skillsHeader = document.querySelectorAll(".skills__header")

function toggleSkills() {
  let itemClass = this.parentNode.className

  for (i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = "skills__constent skills__close";
  }
  if (itemClass === "skills__constent skills__close") {
    this.parentNode.className = "skills__constent skills__open";
  }
}
skillsHeader.forEach((el) =>{
el.addEventListener('click', toggleSkills)
})

/*==================== Swiper ====================*/

let swiper = new Swiper(".portfolio__container", {
  cssMode: true,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  }
});

/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
  const nav = document.getElementById('header')
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL UP ====================*/ 
    function scrollUp(){
      const scrollUp = document.getElementById('scroll-up');
      // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
      if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scrollup')
  }
  window.addEventListener('scroll', scrollUp)

/*==================== QUALIFICATION TABS ====================*/

/*==================== QUALIFICATION TABS ====================*/

/*==================== SERVICES MODAL ====================*/

/*==================== QUALIFICATION TABS ====================*/
