

let navigation = document.body.querySelector("nav");
let navBarButton = document.body.querySelectorAll(".nav-button"); 
navigation.addEventListener("click", toggleDisplay); //可隱藏式表單(menu bar/ menu list)
navigation.addEventListener("pointerover", focusList); //游標經過時會變色，產生FOCUS的效果
navigation.addEventListener("click", openNewTab); //點擊連結則跳轉分頁

function toggleDisplay(event){ //1. 點擊介面可隱藏式表單(menu bar/ menu list) 2. 游標離開時自動隱藏

    let clickedItem = event.target.closest("li") //會點擊到<i>，所以要向上找<li>
    let childrenContainer = clickedItem.querySelector('ul');

    //加入開關可隱藏式表單(menu bar)
    if (Array.from(navBarButton).includes(clickedItem.parentNode) || Array.from(navBarButton).includes(clickedItem)) toggleBarDisplay(event); 
    
    if (event.target.tagName != 'A') return;
    if (!childrenContainer) return; // no children

    //執行功能，隱藏表單(menu list)
    clickedItem.classList.toggle("waitopen");
    childrenContainer.classList.toggle("close");
    clickedItem.addEventListener("pointerleave", autoClose);
    event.preventDefault()

    function autoClose(e){ //游標離開時自動隱藏menu
        let menu= document.body.querySelector(".menu"); 

        //在元素的子元素中移動都不會啟動
        if (clickedItem.contains(e.relatedTarget.closest("ul"))) return 

        //還在鄰近同階元素中
        if (clickedItem.parentElement != menu){ //目標的母元素不是menu的話就執行下一步(代表目標不是第一層的元素，如果前往第一層元素的兄弟元素就要清除)
            if (clickedItem.parentElement.contains(e.relatedTarget.closest("li"))) return; //游標抵達的元素為目標的母元素的子元素就跳出程式
        }
        
        clickedItem.classList.add("waitopen");
        childrenContainer.classList.add("close");
        clickedItem.removeEventListener("pointerout", autoClose);
    }


}

function toggleBarDisplay(){ //可隱藏式表單(menu bar)
    for (let item of navigation.firstElementChild.children){
        if (Array.from(navBarButton).includes(item) || item.nodeName != "LI" || item.classList.contains("logo")|| item.classList.contains("contact")) continue;
        item.classList.toggle("close");
    }

    for (let item of navBarButton){
        item.classList.toggle("close");
    }
}

function focusList(event){ //游標經過時會變色，產生FOCUS的效果

    let clickedItem = event.target.closest("li")
    let childrenContainer = clickedItem.querySelector('ul');

    //防止游標選取到ul class="menu"
    if (Array.from(event.target.classList).includes("menu") || Array.from(clickedItem.classList).includes("menu")) return
    
    if (!childrenContainer) {  // no children
        event.target.closest(".menu-item").classList.add("hover");
        if (!event.target.closest(".menu-item").classList) return;
    } else {
        clickedItem.classList.add("hover");  //本身產生FOCUS效果
        childrenContainer.classList.add("hover"); //子元素產生FOCUS效果
    }

    navigation.addEventListener("pointerout", removeFocusList);
    event.preventDefault()

    function removeFocusList(){
        clickedItem.classList.remove("hover");
        if (childrenContainer) childrenContainer.classList.remove("hover");
        navigation.removeEventListener("pointerout", removeFocusList);
    }

}

function openNewTab(event){
    let clickedItem = event.target.closest("li")
    if(clickedItem.classList.contains("contact")){
        let url = clickedItem.querySelector("a")
        window.open(url, '_blank').focus();
        event.preventDefault()
    }
}

