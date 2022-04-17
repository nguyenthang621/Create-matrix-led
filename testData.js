const $=document.querySelector.bind(document)
const $$=document.querySelectorAll.bind(document)

const bodyTable=$(".body__table")
const btnConvert=$(".btn__convert")
const btnDelete=$(".btn__delete")
const btnDone=$(".btn__done")

const btnSetting=$(".setting__matrix")
const showHex=$(".show__hex")
const boxResult=$(".result")
const titleCopyDone=$(".title__copy__done")
const btnTurnOn=$(".switch")
const bi=$(".bi")
var str0='00000000'
var str1='B11111111' 
var row =8;
var col =8;
var isDown = false;
var results =[];
var arraySquareActive=[];
var sophantu=col*row/8;
var squares;


const appConvert = {
      isNight:true,

      handleEvents: function(event) {

// handle when click on square:
   $$("td").forEach((td)=>{
         td.onclick = function(){
            td.classList.toggle("bgc");
         }
   })

// button convert:
   btnConvert.onclick=()=>{
         results=[]
         arraySquareActive=[]
         appConvert.createArray()
         appConvert.getIdSquareActive();
         appConvert.convert();
         appConvert.render();
         appConvert.notCopied();
      }
// button delete:
      btnDelete.onclick=()=>{
         appConvert.removeSquareActive()
         appConvert.notCopied();
      }
// button done:
      btnDone.onclick=()=>{
         arraySquareActive=[];
         results=[];
         appConvert.setupSquare()
         appConvert.notCopied();
         btnDelete.click()
         appConvert.changeTable(row,col);
         sophantu=row*col/8

      }

// button setting:
      btnSetting.onclick=(e)=>{
         if (e.target.className=='setting__matrix'  || e.target.className=='fa-solid fa-gear'){
            $(".box__setting").classList.toggle("hide");
         }
      }
      // copy hex:
      
      showHex.onclick=function(e){
         if (e.target.innerText!=""){
            navigator.clipboard.writeText(e.target.innerText);
            appConvert.copied();
         }
      }

      // button turn light:       
      btnTurnOn.onclick=function(){
            this.isNight=!this.isNight
            if (this.isNight!==false){
                bi.classList.toggle("slideBi")
               document.documentElement.style.setProperty("--color-dark","#eea650")
               document.documentElement.style.setProperty("--color-dark-fade","rgba(0, 0, 0)")
               document.documentElement.style.setProperty("--color-background","rgba(0, 0, 0, 0.5)")
            }
            if (this.isNight==false){
                bi.classList.toggle("slideBi")
                document.documentElement.style.setProperty("--color-dark","#000")
               document.documentElement.style.setProperty("--color-dark-fade","rgba(170, 170, 170)")
               document.documentElement.style.setProperty("--color-background","rgba(255, 255, 255, 0.8)")

            }
        }


// end handle events.
   
   },
// function createTable:
      createTable:function(row,col){
         var idColum=0;
      for (let i=0; i<row; i++){
         var Tr = document.createElement("tr"); // tao row hang
         Tr.setAttribute("id-row",i);  
         bodyTable.appendChild(Tr);  // them vao bodyTable 
         for (let j=0; j<col;j++){
            if(idColum>=8){
               idColum=0;
            }
            var Td = document.createElement("Td");
            Td.setAttribute("id-col",idColum);
            Tr.appendChild(Td);
            idColum+=1;


            bodyTable.onmousedown= function(){
               appConvert.mousedown(Td);
            }
            bodyTable.onmousemove= function(e){
               appConvert.mousemove(e); 
            }
            document.onmouseup= function(){
               appConvert.mouseup(Td);
            }
         
         }
      }
      squares=$$("td");
   },


   removeAllElementTD: function(row,col){
      for (let i=0; i<row; i++){
         var Tr = document.createElement("tr"); // tao row hang
         Tr.setAttribute("id-row",i);  
         bodyTable.innerHTML=''  // them vao bodyTable 
         for (let j=0; j<col;j++){
            var Td = document.createElement("Td");
            // Td.setAttribute("id-col",j);  
            Tr.innerHTML=''
         }
      }
   },
// function set color for element:

      setColor:function(td){
      td.classList.add("bgc");
   },
   
   
// function mouse down:
   mousedown:function(element) {
      if (isDown === false) {
          isDown = true;
      }
   },
// function mouse move:
   mousemove:function(element) {
      if (isDown === true) {
         element.target.classList.add("bgc");
      }
   },
// function mouse up:
   mouseup:function(element) {
      if (isDown === true) {
          isDown = false;
      }
   },

//fun tao mang array:
   createArray:function(){
      results=[];
      for (let i=0;i<sophantu; i++){
         arraySquareActive.push([])
         results.push(str0)
      }
   },


// fun get id square actived:

   getIdSquareActive:function(){
      console.log(sophantu);
      var count=0;
      for (let i=0;i<sophantu;i++){
            for (let j=0;j<8;j++){
               console.log(count);
               if(squares[count].className =="bgc"){
                  arraySquareActive[i].push(parseInt(squares[count].getAttribute("id-col")));
               }
               count+=1;
            }
      }
      console.log(sophantu);
      console.log(arraySquareActive);
 
   },

//function change char in string:
   setCharAt:function(str,index,chr) {
      if(index > str.length-1) return str;
      return str.substring(0,index) + chr + str.substring(index+1);
   },

// function convert array nhi phan:
   convert:function(){
      results.forEach((item,index) =>{
         arraySquareActive[index].forEach((e)=>{
            results[index]=appConvert.setCharAt(results[index],e,'1')
         })
      })
    
   },

// delete All:
      removeSquareActive:function(){
         for (let i=0; i<row;i++){
            let a=$$("tr")[i]  // lay ra hang thu i 
            let allElementsTD=a.childNodes  // array phan tu hang i
            allElementsTD.forEach((square, index)=>{
               if (square.className==="bgc"){
                  square.classList.remove("bgc");
                  boxResult.innerHTML='';
               }
            })
         }
      },

// setting Square:
      setupSquare:function(){
         appConvert.removeAllElementTD(row, col);
         row=$(".row").value
         col=$(".col").value
         if (row>0&& col % 8===0){
            appConvert.start()
         }
         else{
            alert("cột phải chia hết cho 8 nha, nhập lại đê");
         }
      },

// fun show title copied:
      copied:function(){
         boxResult.style.border = '1px solid green';
         titleCopyDone.classList.remove("display_none")
      },
// fun hide title copied:
      notCopied:function(){
         boxResult.style.border = 'none';
         titleCopyDone.classList.add("display_none")
      },

// function change table:

      changeTable:function(row,col){
         console.log(col+":",col*30 + "px");
         $(".container__table").style.width = col*30 + "px";
         $(".container__table").style.height = row*20  + "px";
      },

// render:
   render:function(){
      var chia=row/8;
      boxResult.innerHTML = results.map(function(item,index){
         if ((index+1)%chia==0){
            return 'B'+item+'<br>'
         }
         else{
            return 'B'+item
         }
      }).join(",")
   },


   start:function(){
      appConvert.createArray();
      appConvert.createTable(row,col);
      appConvert.handleEvents(); 
   }
   
}

appConvert.start();












