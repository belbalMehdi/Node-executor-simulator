const Executor = require('./executor');
const sleep = (time) => new Promise(resolve => setTimeout(resolve, time));

const preparationExecutor = new Executor(3);
const cuissonExecutor = new Executor(4);
const embalageExecutor = new Executor(2);

function run(){
    const amount = 100;
    for(let i=1; i<=amount; i++) preparerGateau(i);
    preparationExecutor.start();
}

function preparerGateau(i){
    preparationExecutor.execute(async function(){
        console.log(`Gateau ${i} en cours de préparation`);
        await sleep(2000);
        cuireGateau(i);
    });
}

function cuireGateau(i){
    cuissonExecutor.execute(async function(){
        console.log(`Gateau ${i} en cours de cuisson`);
        await sleep(3000);
        embalerGateau(i);
    });
}

function embalerGateau(i){
    embalageExecutor.execute(async function(){
        console.log(`Gateau ${i} en cours d'embalage`);
        await sleep(1000);
    });
}

run();