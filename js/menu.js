const openMenu = document.querySelector("#open_menu");
const closeMenu = document.querySelector("#close_menu");
const aside = document.querySelector("aside");

/* This code is adding an event listener to the `openMenu` element, which listens for a "click" event.
When the element is clicked, the function inside the arrow function is executed. This function adds
the CSS class "aside_visible" to the `aside` element, making it visible on the page. */
openMenu.addEventListener("click", () => {
    aside.classList.add("aside_visible");
})

/* This code is adding an event listener to the `closeMenu` element, which listens for a "click" event.
When the element is clicked, the function inside the arrow function is executed. This function
removes the CSS class "aside_visible" from the `aside` element, making it invisible on the page. */
closeMenu.addEventListener("click", () => {
    aside.classList.remove("aside_visible");
})

/* This code is adding an event listener to each element in the `botonesCategorias` array. When any of
these elements are clicked, the function inside the arrow function is executed. This function
removes the CSS class "aside_visible" from the `aside` element, making it invisible on the page. */
botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside_visible");
}))
    