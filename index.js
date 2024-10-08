const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const popupTitle = popupBox.querySelector("header p");
const closebt = popupBox.querySelector("header i");
const addbtn = popupBox.querySelector("button");
const titletag = popupBox.querySelector("input");
const desc = popupBox.querySelector("textarea");
const months =["","January", "February", "March", "April", "May", "June" ,"July", "August", "September", "October", "November", "December"];

const notes =JSON.parse(localStorage.getItem("notes")|| "[]")
let isupdate = false ,updateId;

addBox.addEventListener("click",()=>
{
   titletag.focus();
    popupBox.classList.add("show")
})
closebt.addEventListener("click", ()=>
{
    isupdate = false ;
    titletag.value = "";
    desc.value= "";
    addbtn.innerText ="Add Note";
    popupTitle.innerText ="Add New Note";
    
    popupBox.classList.remove("show")
})
function shownotes()
{
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note , index) => {
                let liTag = `<li class="note">
                  <div class="details">
                    <p>${note.title}</p>
                    <span>${note.description}
                    </span>
                  </div>
                 <div class="bottom-container">
                    <span>${note.date}</span>
                    <div class="settings">
                        <i onclick ="showMenu(this)"class="uil uil-ellipsis-h"></i>
                        <ul class ="menu">
                        <li onclick = "updateNote(${index}, '${note.title}','${note.description}')"><i class="uil uil-pen"></i>Edit</li>
                        <li onclick = "deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>
                        </ul>
                    </div>
                </div>
                </li>`;
                addBox.insertAdjacentHTML("afterend",liTag);
    });
}
shownotes();
function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    });
}
function deleteNote (noteId)
{
    let confirmdel = confirm("Are you sure you want to delete the note ??!");
    if (!confirmdel) return ;
    // console.log(noteId)
    notes.splice(noteId,1);
    localStorage.setItem("notes",JSON.stringify(notes));
    shownotes();
}
function updateNote (noteId , title,des)
{
    isupdate = true ;
    updateId = noteId;
    addBox.click();
    titletag.value = title;
    desc.value= des ;
    addbtn.innerText ="Update Note";
    popupTitle.innerText ="Update Note";
    console.log(noteId , title,desc);
}



addbtn.addEventListener("click", e =>
{
    e.preventDefault();
    let notetitle = titletag.value,
    notedesc= desc.value;

    if(notetitle || notedesc)
    {
        // Getting the day date and year

        let dateobj = new Date(),
        month =  months[dateobj.getMonth() + 1],
        day = dateobj.getDate(),
        year = dateobj.getFullYear();

        let noteinfo = 
        {
            title:notetitle , 
            description :notedesc,
            date:`${month},${day},${year}`
        }
        if(!isupdate)
        {
            
            notes.push(noteinfo);
        }
        else
        {
            isupdate = false;
            notes[updateId] = noteinfo ;
        }
        localStorage.setItem("notes",JSON.stringify(notes));
        closebt.click();
        shownotes();
    }
})