
const h1 = document.querySelector(".title")
console.dir(h1)
// console.log(player.name)

// 3.3
function handleTitleClick(){
    // console.log("title was clicked!");
    // h1.style.color = "blue"
    //3.6
    // if(h1.style.color === "blue") {
    //     h1.style.color = "tomato"
    // }else {
    //     h1.style.color = "blue";
    // }
    
    //3.7
    const clickedClass = "active";
    // if(h1.className === clickedClass) {
    //     h1.className = "";
    // } else {
    //     h1.className = clickedClass;
    // }
    
    //3.8
    // if(h1.classList.contains(clickedClass)) {
    //     h1.classList.remove(clickedClass);
    // } else {
    //     h1.classList.add(clickedClass);
    // }
    h1.classList.toggle("active");
}

// function handleMouseEnter() {
//     console.log("mouse is here!")
//     h1.textContent = "mouse is here!"
// }

// function handleMouseLeave() {
//     h1.textContent = "mouse is gone!"
// }

// function handleWindowResize() {
//     document.body.style.backgroundColor = "tomato"
// }
// 함수가 실행되지않도록 ()를 넣지않는것이 포인트
h1.addEventListener("click", handleTitleClick);
// h1.addEventListener("mouseenter", handleMouseEnter)
// h1.addEventListener("mouseleave", handleMouseLeave)



// //3.5
// window.addEventListener("resize", handleWindowResize);