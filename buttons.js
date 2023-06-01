let pmset = false;
let on = true;

//Sets score to PM if PM radio is true
document.getElementById('PM').onclick = function()
{
    let dscore = document.getElementById('Score');
    dscore.value = 10000000;
    pmset = true;
}

//Highlights for edit when pm is clicked before
document.getElementById('FR').onclick = function()
{
    if(pmset)
    {
        document.getElementById('Score').select();
        pmset = false;
    }
    
}

//TC
document.getElementById('TC').onclick = function()
{
    if(pmset)
    {
        let dscore = document.getElementById('Score');
        dscore.value = '';
        pmset = false;
    }
}

//TL
document.getElementById('TL').onclick = function()
{
    if(pmset)
    {
        let dscore = document.getElementById('Score');
        dscore.value = '';
        pmset = false;
    }
}

// random shit
// document.getElementById('delete').onclick = function(){
//     console.log('10.888888888888');
//     let ans = String(10.888888888);
//     ans = ans.substring(0,5);
//     console.log(ans - 2);   
// }

document.getElementById('EX+').onclick = function(){
    if(!pmset)
    {let dscore = document.getElementById('Score');
    dscore.value = 9900000;}
}

document.getElementById('EX').onclick = function(){
    let dscore = document.getElementById('Score');
    let pmval = document.getElementById('PM');
    pmval.checked = false;
    dscore.value = 9800000;
}

document.getElementById('AAorBelow').onclick = function(){
    let dscore = document.getElementById('Score');
    let pmval = document.getElementById('PM');
    pmval.checked = false;
    dscore.value = 9700000;
}

//Allows user to get the chart name faster for editing existing charts
document.getElementById('SearchChart').onclick = function(){
    let element = document.getElementById('fillchart');
    let name = element.value;
    let list = []; 

    for (let i = 0; i < all.length; i++) //To obtain similar chart name
    {
        if (all[i].chartn.substring(0,name.length) == String(name)) 
        {
            list.push({rank: i+1, info: all[i]}); 
            //rank = current chart rank
        }
    }

    if(list.length == 1) //Only one output
    {
        let dchart = document.getElementById('ChartName');
        let dchartconst = document.getElementById('ChartConst');
        let dscore = document.getElementById('Score');
        let drank = document.getElementById('ranker');

        dchart.value = list[0].info.chartn;
        dchartconst.value = list[0].info.chartconst;
        dscore.value = list[0].info.score;
        drank.value = list[0].rank;
    }
    else if(list.length == 0) alert("No result");
    else //Multiple output
    {
        let popup = ``;
        for (let i = 0; i < list.length; i++) 
        {
            popup += `Rank ${list[i].rank}:` + list[i].info.chartn + `\n`;
        }
        let r = prompt(popup + "\nInsert the rank of your chart:");
        if(r != '')
        {
            let dchart = document.getElementById('ChartName');
            let dchartconst = document.getElementById('ChartConst');
            let dscore = document.getElementById('Score');
            let drank = document.getElementById('ranker');

            dchart.value = list[r - 1].info.chartn;
            dchartconst.value = list[r - 1].info.chartconst;
            dscore.value = list[r - 1].info.score;
            drank.value = list[r - 1].rank;
        }
    }
}

//Transition animation
function showhide(v){
    if(v || !on) 
    {
        document.getElementById("showbutton").src = "./img/btn-hide.png";
        document.getElementById("ctable").style.marginRight = "0px";
        on = true;
    }
    else
    {
        document.getElementById("showbutton").src = "./img/btn-show.png";
        document.getElementById("ctable").style.marginRight = "-500px";
        on = false;
    }
}
