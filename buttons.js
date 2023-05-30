let pmset = false;

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
    if(!pmset)
    {let dscore = document.getElementById('Score');
    dscore.value = 9800000;}
}

document.getElementById('AAorBelow').onclick = function(){
    if(!pmset)
    {let dscore = document.getElementById('Score');
    dscore.value = 9700000;}
}

//Allows user to get the chart name faster for editing existing charts
document.getElementById('SearchChart').onclick = function(){
    let element = document.getElementById('fillchart');
    let name = element.value;
    let list = []; 
    let chartrank = 0; //return the idx of that element in all[i] for edit

    for (let i = 0; i < all.length; i++) //To obtain similar chart name
    {
        if (all[i].chartn.substring(0,name.length) == String(name)) 
        {
            list.push(all[i]);
            chartrank = i + 1;
        }
    }

    if(list.length == 1) //Only one output
    {
        let dchart = document.getElementById('ChartName');
        let dchartconst = document.getElementById('ChartConst');
        let dscore = document.getElementById('Score');
        let drank = document.getElementById('ranker');

        dchart.value = list[0].chartn;
        dchartconst.value = list[0].chartconst;
        dscore.value = list[0].score;
        drank.value = chartrank;
    }
    else if(list.length == 0) alert("No result");
    else //Multiple output
    {
        let popup = ``;
        for (let i = 0; i < list.length; i++) 
        {
            popup += list[i] + `\n`;
        }
        alert(popup);
    }
}