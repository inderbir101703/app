for(var buttons=document.getElementsByTagName("BUTTON"),display=document.getElementById("text"),op1=0,op2=0,op,i=0;i<buttons.length;i++)buttons[i].addEventListener("click",(function(){var value=this.getAttribute("data-value"),result;("AC"==value&&(display.innerHTML=" ",value=" "),"+"!=value&&"-"!=value&&"*"!=value&&"/"!=value&&"%"!=value||(op1=parseFloat(display.innerHTML),op=value,display.innerHTML=" ",value=""),"="==value)?(op2=parseFloat(display.innerHTML),result="%"==op?op1/10:eval(op1+" "+op+" "+op2),display.innerHTML=result):display.innerHTML+=value}));