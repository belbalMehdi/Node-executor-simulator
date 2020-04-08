module.exports = 

class Executor {

    constructor(size){
        this.pool = [];
        this.size = size;
        this.available = size;
        this._started = false;
    }

    execute(callback) {
        this.pool.push(callback);
        if(!this._started) this.start();
    }

    start() {
        this._started = true;
        for(let i=0; i<this.size; i++){
            this.runTask();
        }
    }

    runTask(){
        if(this.available > 0 && this.pool.length > 0) {
            this.available--;
            const func = this.pool.shift().call();
            func.then(()=>{
                if(this.available < this.size) this.available++;
                this.runTask();
            })
        }
        if(!this.pool.length) this._started = false;
    }

}
