// let chart = {
//     chartn: undefined,
//     score: 0,
//     status: 0
// }

var all = [];

document.getElementById('ChartConst').onblur = function(){
    let dchartconst = document.getElementById('ChartConst');
    if(dchartconst.value > 12.0 || dchartconst.value <= 0) 
    {
        alert("Invalid Chart Constant! (Range: 1 - 12)");
        dchartconst.value = '';
    }
}

document.getElementById('enterscore').onclick = function(){

    let dchart = document.getElementById('ChartName'); //all html data
    let dchartconst = document.getElementById('ChartConst');
    let dscore = document.getElementById('Score');
    let dstatus;
    let ddiff;

    let tl = document.getElementById('TL'); //Chart Status
    let fr = document.getElementById('FR');
    let tc = document.getElementById('TC');
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

    let pst = document.getElementById('pst'); //Difficulty
    let prs = document.getElementById('prs');
    let ftr = document.getElementById('ftr');
    let byd = document.getElementById('byd');

    if(pst.checked == true) ddiff = pst.value;
    else if(prs.checked == true) ddiff = prs.value;
    else if(ftr.checked == true) ddiff = ftr.value;
    else if(byd.checked == true) ddiff = byd.value;

    let potential = Number(dchartconst.value);
    if(pm.checked == true) potential += 2;
    else if(dscore.value >= 9800000) potential += 1 + ((Number(dscore.value)-9800000)/200000);
    else potential += ((Number(dscore.value)-9500000)/300000);

    if(potential < 0) potential = 0;

    console.log(potential);

    if(dchart.value === "" || dscore.value === "" 
    || dchartconst === "") 
    {
        alert("Missing Information");
        return;
    }

    all.push({chartn: dchart.value, chartconst: dchartconst.value,
        score: dscore.value, status: dstatus, ptt: potential, diff: ddiff});

    dchart.value = '';
    dchartconst.value = '';

    all.sort(function(a,b){
        if(Number(a.ptt) > Number(b.ptt)) return -1;
        if(Number(a.ptt) < Number(b.ptt)) return 1;
        else return 0;
    }); //-1 if flip

    console.log(all[all.length-1]);
    let list = document.getElementById('list');

    list.innerHTML = ``;

    all.forEach(function(c,idx){
        list.innerHTML += `
        <tr>
            <td><span id="byd">${idx+1}</span></td>
            <td>${c.chartn}</td>
            <td>${c.diff}</td>
            <td>${c.chartconst}</td>
            <td>${c.score}</td>
            <td>${c.status}</td>
            <td>${c.ptt}</td>
        </tr>`;
    })

    console.log(all);

}

document.getElementById('PM').onclick = function()
{
    let dscore = document.getElementById('Score');
    dscore.value = 10000000;
}
