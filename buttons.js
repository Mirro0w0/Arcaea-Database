let pmset = false;
let on = true; //show table = on
let lastselected = null; //blinking indication

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
    let tcval = document.getElementById('TC');
    tcval.checked = true;
    pmval.checked = false;
    pmset = false;
    dscore.value = 9800000;
}

document.getElementById('AAorBelow').onclick = function(){
    let dscore = document.getElementById('Score');
    let pmval = document.getElementById('PM');
    pmval.checked = false;
    pmset = false;
    dscore.value = 9700000;
}

//Allows user to get the chart name faster for editing existing charts
document.getElementById('SearchChart').onclick = function(){
    let element = document.getElementById('fillchart');
    let name = element.value;
    let list = []; 

    let ddiff;
    let pst = document.getElementById('pst'); //Difficulty
    let prs = document.getElementById('prs');
    let ftr = document.getElementById('ftr');
    let byd = document.getElementById('byd');

    if(pst.checked == true) ddiff = pst.value;
    else if(prs.checked == true) ddiff = prs.value;
    else if(ftr.checked == true) ddiff = ftr.value;
    else if(byd.checked == true) ddiff = byd.value;

    for (let i = 0; i < all.length; i++) //To obtain similar chart name
    {
        if (all[i].chartn.substring(0,name.length) == String(name) && ddiff === all[i].diff) 
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
            popup += `Rank ${list[i].rank}: ` + list[i].info.chartn + `\n`;
        }
        let r = prompt(popup + "\nInsert the rank of your chart: ");
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
    if(v && !on)
    {
        document.getElementById("showbutton").src = "./img/btn-hide.png";
        document.getElementById("mySidenav").style.width = "676px";

        let appear = setTimeout(() => {
            document.getElementById("showbutton").src = "./img/btn-show.png";
            document.getElementById("mySidenav").style.width = "0px";
        }, 4000);

        appear;
    }
    else if(v || !on) 
    {
        document.getElementById("showbutton").src = "./img/btn-hide.png";
        document.getElementById("mySidenav").style.width = "676px";
        on = true;
    }
    else
    {
        document.getElementById("showbutton").src = "./img/btn-show.png";
        document.getElementById("mySidenav").style.width = "0px";
        on = false;
    }
}

//Editing charts by clicking on the table row
function chartselected(rownum){
    document.getElementById('deletescore').disabled = false;
    //console.log("delete on: " + document.getElementById('deletescore').disabled);
    let idx = rownum.rowIndex-1;
    if(all.length == 0) return; //empty chart list
    if(lastselected === null)
    {
        rownum.classList.toggle("selected");
        lastselected = rownum;
    }
    else{
        lastselected.classList.remove("selected");
        rownum.classList.remove("inserted");
        rownum.classList.toggle("selected");
        lastselected = rownum;
    }

    let dchart = document.getElementById('ChartName');
    let dchartconst = document.getElementById('ChartConst');
    let dscore = document.getElementById('Score');
    let drank = document.getElementById('ranker');

    dchart.value = all[idx].chartn;
    dchartconst.value = all[idx].chartconst;
    dscore.value = all[idx].score;
    drank.value = idx+1;

    let ddiff = all[idx].diff;
    switch(ddiff){
        case "Beyond": 
            let byd = document.getElementById('byd');
            byd.checked = true;
            break;
        case "Future":
            let ftr = document.getElementById('ftr');
            ftr.checked = true;
            break;
        case "Present":  
            let prs = document.getElementById('prs');
            prs.checked = true;
            break;
        case "Past":
            let pst = document.getElementById('pst');
            pst.checked = true;
            break;
    }
}