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

document.getElementById('TC').onclick = function()
{
    if(pmset)
    {
        let dscore = document.getElementById('Score');
        dscore.value = '';
        pmset = false;
    }
}

document.getElementById('TL').onclick = function()
{
    if(pmset)
    {
        let dscore = document.getElementById('Score');
        dscore.value = '';
        pmset = false;
    }
}

document.getElementById('delete').onclick = function(){
    console.log('10.888888888888');
    let ans = String(10.888888888);
    ans = ans.substring(0,5);
    console.log(ans - 2);
    
}

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