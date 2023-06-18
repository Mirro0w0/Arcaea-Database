//all chart data
var all = [];
var set = new Set();

    /*
        chartn: dchart.value
        chartconst: dchartconst.value,
        score: dscore.value
        status: dstatus
        ptt: potential
        diff: ddiff
    */

//Score Calulation
function scoreCalculation(constant, score, pm)
{
    let potential = Number(constant);
    if(pm === true) potential += 2;
    else if(score >= 9800000) potential += 1 + ((Number(score)-9800000)/200000);
    else potential += ((Number(score)-9500000)/300000);

    if(potential < 0) potential = 0;

    return potential;
}

function editInfo(rk, obj, hashvalue){
    //the hashvalue here is the new data

    /*
        chartn: dchart.value
        chartconst: dchartconst.value,
        score: dscore.value
        status: dstatus
        ptt: potential
        diff: ddiff
    */

    let change = '';
    if(all[rk].chartn !== obj.chartn) change += `Title: ${all[rk].chartn} ——> ${obj.chartn}\n`;
    if(all[rk].chartconst !== obj.chartconst) change += `Constant: ${all[rk].chartconst} ——> ${obj.chartconst}\n`;
    if(all[rk].score !== obj.score) change += `Score: ${all[rk].score} ——> ${obj.score}\n`;
    if(all[rk].status !== obj.status) change += `Status: ${all[rk].status} ——> ${obj.status}\n`;
    if(all[rk].diff !== obj.diff) change += `Difficulty: ${all[rk].diff} ——> ${obj.diff}\n`;

    let oldhashvalue = all[rk].chartn + all[rk].diff;
        
    if(change === ''){alert("No change"); return;}

    let yesno = confirm(`Replacing chart at Rank ${rk+1}: ${all[rk].chartn}\n` + change);
    if(yesno)
    {
        // all[rk] = obj;
        if(hashvalue !== oldhashvalue) 
        {
            if(set.has(hashvalue)) {alert(`${obj.chartn} (${obj.diff}) already exists!`); return;}
            else
            {
                set.add(hashvalue);
                set.delete(oldhashvalue);
            }
        }
        all[rk] = obj;
        
        table();
        let clear = document.getElementById('ranker');
        clear.value = '';
        

        //document.getElementById('delimg').src = "./img/Arrow L_square_disabled.png"
    }
}

//Table Formation
const table = function tableFormation()
{
    let allposition = document.getElementById('ranker').value == '' ? all.length-1 : document.getElementById('ranker').value-1;
    //insert animation
    let target = all[allposition];

    all.sort(function(a,b){
        if(Number(a.ptt) > Number(b.ptt)) return -1;
        if(Number(a.ptt) < Number(b.ptt)) return 1;
        else return 0;
    }); //-1 if flip
    //insert the chart at the bottom, then sort the whole thing back

    //console.log("all.length = " + all[all.length-1]);
    let list = document.getElementById('list');

    list.innerHTML = ``;

    all.forEach(function(c,idx){
        //document.querySelector('tbody')
        let sp = `<span`; //color span
        switch(c.status){
            case 'Pure Memory': sp += ` class="pmfont">`; break;
            case 'Full Recall': sp += ` style="color: purple;">`; break;
            case 'Track Lost': sp += ` style="color: red;>`; break;
            default: sp = ''; break;
        }

        let inserted = ``;
        if(c === target) inserted = `class="inserted"`;
        //insert animation


        list.innerHTML += `
        <tr ${inserted} onclick="chartselected(this)">
            <td><span id="byd">${idx+1}</span></td>
            <td>${c.chartn}</td>
            <td>${c.diff}</td>
            <td>${c.chartconst}</td>
            <td>${sp}${c.score}</td>
            <td>${c.ptt}</td>
        </tr>`;
        
    })
    showhide(1);
    //show the chart: extra argument (1) for hiding the list

    console.log(all);
    console.log(set);
    document.getElementById("chartcnt").innerHTML = `Chart List (Total: ${all.length})`;
}


//Checks valid Chart constant
document.getElementById('ChartConst').onblur = function(){
    let dchartconst = document.getElementById('ChartConst');
    if(dchartconst.value === '') return;
    if(dchartconst.value > 12.0 || dchartconst.value <= 0 || isNaN(dchartconst.value - 0)) 
    {
        alert("Invalid Chart Constant! (Range: 1 - 12 || Integer)");
        dchartconst.value = '';
    }
}

//Checks valid Score
document.getElementById('Score').onblur = function(){
    let dscore = document.getElementById('Score');
    if(dscore.value === '') return;
    if(dscore.value > 10002237 || dscore.value <= 0 || isNaN(dscore.value - 0)) 
    {
        alert("Invalid Score! (0 - 10,000,000+ || Integer)");
        dscore.value = '';
    }
}

//Inserts a chart to all[]
document.getElementById('enterscore').onclick = function(){

    let dchart = document.getElementById('ChartName'); //all html data
    let dchartconst = document.getElementById('ChartConst');
    let dscore = document.getElementById('Score');
    let dstatus;
    let ddiff;

    let tl = document.getElementById('TL'); //Chart Status
    let tc = document.getElementById('TC');
    let fr = document.getElementById('FR');
    let pm = document.getElementById('PM');

    if(tl.checked == true) dstatus = tl.value;
    else if(tc.checked == true) dstatus = tc.value;
    else if(fr.checked == true) dstatus = fr.value;
    else if(pm.checked == true) 
    {
        if(Number(dscore.value) < 10000000)
        {
            alert("Score and Status mismatched!");
            return;
        }
        dstatus = pm.value;
    }
    else 
    {
        alert("Missing Information");
        return;
    }

    let pst = document.getElementById('pst'); //Difficulty
    let prs = document.getElementById('prs');
    let ftr = document.getElementById('ftr');
    let byd = document.getElementById('byd');

    if(pst.checked == true) ddiff = pst.value;
    else if(prs.checked == true) ddiff = prs.value;
    else if(ftr.checked == true) ddiff = ftr.value;
    else if(byd.checked == true) ddiff = byd.value;

    let potential = scoreCalculation(dchartconst.value, dscore.value, pm.checked);


    //console.log(potential);


    if(dchart.value === "" || dscore.value === "" 
    || dchartconst === "" || ddiff === "") 
    {
        alert("Missing Information");
        return;
    }

    let hashvalue = dchart.value + ddiff;
    let rank = document.getElementById('ranker').value;
    if(rank !== '') 
    {
        let obj = {chartn: dchart.value, chartconst: dchartconst.value,
            score: dscore.value, status: dstatus, ptt: potential, diff: ddiff};
        editInfo(rank-1, obj, hashvalue); 
        return;
    }
    else
    {
        if(set.has(hashvalue)) {alert(`${dchart.value} (${ddiff}) already exists!`); return;}
        else set.add(hashvalue);
        //check repeated charts
    }

    all.push({chartn: dchart.value, chartconst: dchartconst.value,
        score: dscore.value, status: dstatus, ptt: potential, diff: ddiff});

    // dchart.value = '';
    // dchartconst.value = '';

    table();
}