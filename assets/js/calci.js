var buttons=document.getElementsByTagName("BUTTON");
var display=document.getElementById("text");
var op1=0;
var op2=0;
var op;

 for(var i=0;i<buttons.length;i++) 
{ 
buttons[i].addEventListener("click",function(){
   var value=this.getAttribute("data-value");
    if(value=='AC')
       { display.innerHTML=" ";
       value=" ";
       }
    if(value=='+'||value=='-'||value=='*'||value=='/'||value=='%')
      {
       op1=parseFloat(display.innerHTML); 
        op=value;    
       display.innerHTML=" ";
       value="";
       
      }
    if(value=='=')
        {  
            op2=parseFloat(display.innerHTML);
      
            var result;
            if(op=='%')
             result=op1/10;
            else
            result=eval(op1+" "+ op +" "+op2);
         
            
            display.innerHTML=result
        }
    else
      {
          
        display.innerHTML+=value;
     
      }  
});
                            }
                            