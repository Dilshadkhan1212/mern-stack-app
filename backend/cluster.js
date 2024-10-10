
const cluster = require('cluster');
const http = require('http');
const os = require('os');
const express = require("express");

// get the num of cpus
const numCPUs = os.cpus().length;
console.log(numCPUs);

if(cluster.isMaster){
    // fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
     // Listen for worker exit events
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    console.log('Starting a new worker');
    cluster.fork(); // Replace the dead worker with a new one
  });
}else{
   const app=express();
   const PORT=5000;
   app.get('/',(req,res)=>{
    return res.json({message:`hello from express server ${process.pid}`});
   });

   app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
   })
   
}