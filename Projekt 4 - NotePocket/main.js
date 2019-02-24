let notes =[];
if(localStorage.getItem("testObject")===null){          
    localStorage.setItem('testObject', JSON.stringify(notes));
}

document.addEventListener( "DOMContentLoaded", () => {    
    let form = document.getElementById( "form" );
    form.addEventListener( "submit", function( e ) {
        e.preventDefault();
        let json = toJSONString( this );
    }, false);
});

var retrievedObject = localStorage.getItem('testObject'); 
notes = JSON.parse(retrievedObject);
showNotes();

function showNotes(){                           
let wrapper = document.getElementById("wrapper"); 
for(i=1;i<wrapper.childElementCount;i++){      
    wrapper.removeChild[i];
}
let ids=0;
notes.forEach(element => {                         
    let note = document.createElement("div");
    note.className = "note "+element.color;
    note.id=ids++;

    if(element.priority==1){                       
        note.style.order=1;
    }
    let noteTitle = document.createElement('textarea'); 
    noteTitle.className="noteTitle";
    noteTitle.value = element.title;
    noteTitle.disabled=true;

    
    let noteDesc = document.createElement('textarea'); 
    noteDesc.className="noteDesc";
    noteDesc.value = element.description;
    noteDesc.disabled=true;

    let noteFooter= document.createElement('footer');   
    noteFooter.className="noteFooter";
    noteFooter.appendChild(document.createTextNode("Last modified:"+element.date));

    let noteCheck = document.createElement('input');  
    noteCheck.type='checkbox';
    if(element.priority==1){
        noteCheck.checked=true;
    }
    else{
        noteCheck.checked=false;
    }
    noteCheck.disabled=true;

    let noteEdit = document.createElement('button');       
    noteEdit.innerText="Edit";
    noteEdit.onclick=(e)=>                             
    {
        e.target.parentNode.parentNode.childNodes[0].disabled=false; 
        e.target.parentNode.parentNode.childNodes[1].disabled=false;
        e.target.parentNode.childNodes[3].disabled=false;
        noteSave.hidden=false;
        noteEdit.hidden=true;
    };
    let noteSave = document.createElement('button');           
    noteSave.innerText="Save";
    noteSave.hidden=true;
    noteSave.onclick = (e)=>                                   
    {           
        parentDiv=e.target.parentNode.parentNode;
        noteSave.hidden=true;
        noteEdit.hidden=false;
        notes[note.id].title=parentDiv.childNodes[0].value;     
        notes[note.id].description=parentDiv.childNodes[1].value;
        if(e.target.parentNode.childNodes[3].checked==true){
            notes[note.id].priority=1;
        }
        else{
            notes[note.id].priority=2;            
        }
        parentDiv.childNodes[0].disabled=true;
        parentDiv.childNodes[1].disabled=true;
        e.target.parentNode.childNodes[3].disabled=true;
        notes[note.id].date= new Date();
        localStorage.setItem('testObject', JSON.stringify(notes)); 
        showNotes();
    }

    note.appendChild(noteTitle);                       
    note.appendChild(noteDesc);
    noteFooter.appendChild(noteEdit);
    noteFooter.appendChild(noteSave);
    noteFooter.appendChild(noteCheck);
    note.appendChild(noteFooter);

    let flag= true;
    wrapper.childNodes.forEach(e=>{
        if(e.id==note.id){
            flag=false;
            }
        })
    if(flag){
        wrapper.appendChild(note);                             
    }
});
}


function toJSONString( form ) {            

    let obj = {};
    let elements = form.querySelectorAll( "input, select, textarea" ); 
    for( var i = 0; i < elements.length; ++i ) {                       
        let element = elements[i];
        let name = element.name;
        let value;
        if(element.type =="checkbox"){
            if(element.checked== true){
                 value = 1;
            }   
            else{ value = 2;}
        }
        else{
             value = element.value;
        }
        if( name ) {
            obj[ name ] = value;
        }
    }
    obj["color"]= form.parentNode.className.split(' ')[1];
    console.log(obj["color"]);
    obj["date"] = new Date();
    notes.push(obj)                                             
    localStorage.setItem('testObject', JSON.stringify(notes));
    showNotes();                                                
}


function changeColor(e){                                        
    let parent = e.parentNode.parentNode.parentNode.parentNode;
    parent.classList.remove("blue");
    parent.classList.remove("black");
    parent.classList.remove("red");
    parent.classList.remove("yellow");
    parent.classList.remove("green");
    parent.classList.add(e.className.split(' ')[1]);
}