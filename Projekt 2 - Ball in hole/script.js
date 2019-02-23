let ball= document.querySelector("#Ball");
let container = document.getElementsByClassName("container")[0];
let holes = [];
let gameStart=false;
let score = 0;
let speedX = 0, speedY = 0;
let posX = 20, posY = 20;
window.addEventListener('deviceorientation', changeLocation)

function start()   // Start the game
{                                              
    gameStart=true;
    spawnHoles();                      
    moveBall();
                         
    console.log("Game started.")
    document.getElementById("start").hidden=true;

    counter = document.createElement('span');                
    counter.classList.add("counter");
    counter.innerHTML="Score: "+score;
    container.appendChild(counter);
}

function restart() // Restart the game
{                                 
    gameStart=true;
    for(i=container.childElementCount;i>0;i--)
    { 
        if(container.childNodes[i].nodeName=="DIV")
        {
            if(container.childNodes[i].id!=="Ball")
            {
                container.removeChild(container.childNodes[i])
            }
        }
    }

    score = 0;
    counter.innerHTML="Score: "+score;   
    holes=[];
    posX = 20, posY = 20;
    spawnHoles();             
    moveBall();                  
    console.log("Game started.")
    document.getElementById("restart").hidden=true;
}

function changeLocation(e)
{           
    console.log(e);
    speedX=e.gamma/45
    speedY=e.beta/45
}

function moveBall()      // Move the ball function
{                 
    
    if(posX+speedX<window.innerWidth-50 && posX+speedX>0){  
        posX+=speedX;
        ball.style.left=posX+'px';        
    }
    if(posY+speedY<window.innerHeight-50 && posY+speedY>0){
        posY+=speedY;
        ball.style.top=posY+'px';        
    }
                                                    
    for(i=0;i<holes.length;i++)     // Check ball collision with holes
    {
        if(posY<Math.floor(holes[i].style.top.slice(0,-2))+50&&posY>holes[i].style.top.slice(0,-2))
        {
            if(posX>holes[i].style.left.slice(0,-2)&&posX<Math.floor(holes[i].style.left.slice(0,-2))+50)
            {
                if(holes[i].classList.contains("winHole"))
                {
                    holes[i].classList.remove("winHole");
                    holes.forEach(e=>{if(e.classList.contains("tempHole"))
                    {
                        e.classList.remove("tempHole");
                        e.classList.add("hole");
                    }})
                    holes[i].classList.add("tempHole");
                    score++
                    counter.innerHTML="Score: "+score;
                    randomWinHole(i);
                }
                else if(holes[i].classList.contains("hole"))     // Game over
                {     
                    gameStart=false;
                    document.getElementById("restart").hidden=false;
                }
        }
    }
    };

    if(gameStart==true)
    {
        window.requestAnimationFrame(moveBall)
    }
}

function spawnHoles()     // Creating lose holes
{                                
    for(i=2;i<(window.innerWidth/100);i++)
    {
        let hole = document.createElement('div');
        hole.classList.add("hole");
        hole.style.left=100*i+Math.random()*75-95+'px';
        hole.style.top=Math.random()*(window.innerHeight-95)/2+'px';
        holes.push(hole);
        container.appendChild(hole);
    }

    for(i=2;i<(window.innerWidth/100);i++)
    {
        let hole = document.createElement('div');
        hole.classList.add("hole");
        hole.style.left=100*i+Math.random()*75-95+'px';
        hole.style.top=Math.random()*(window.innerHeight)/2+window.innerHeight/2-100+'px';
        holes.push(hole);
        container.appendChild(hole);
    }
    checkHoles();
    randomWinHole(1);
}

function checkHoles()       // Check holes(removoing duplicate holes)
{                                     
    for(i=0;i<holes.length-1;i++)
    {                          
        for(j=i+1;j<holes.length;j++)
        {
            if(holes[j].style.left.slice(0,-2)>holes[i].style.left.slice(0,-2)+75
            &&holes[j].style.top.slice(0,-2)>holes[i].style.top.slice(0,-2)+75)
            {
                holes[j].style.top=holes[j].style.top.slice(0,-2)+50+'px';
                holes[j].style.left=holes[j].style.left.slice(0,-2)+50+'px';
            }
        }
    }
}

function randomWinHole(i)    // Creating win hole in random location
{                                 
    let winHole = Math.floor(Math.random()*holes.length);
    if(winHole ==i&&i<holes.length){i++;}    
    else{i--;}
    holes[winHole].classList.remove("hole");
    holes[winHole].classList.add("winHole")

}