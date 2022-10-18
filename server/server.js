import express from "express"
import fs from "fs"
import path from "path"
import React from "react"
import ReactDOMServer from "react-dom/server"
import Wrapper from "../src/Wrapper/Wrapper"
import { StaticRouter } from "react-router-dom/server";

const PORT= 3000
const app= express()
app.use('^/$', (req, res)=> {
    fs.readFile("./build/index.html", "utf8", (err, data)=> {
        if(err) {
            console.log(err)
            return res.status(500).send("An error occurred");
        }
        const context= {}
        return res.send(
            data.replace(
              '<div id="root" class="suiorjhioeeasas"></div>',
              `<div id="root" class="suiorjhioeeasas">${ReactDOMServer.renderToString(<StaticRouter location={req.url} context={context}>
                <Wrapper />
            </StaticRouter>)}</div>`
            )
          );
    })
    
})
app.use(express.static(path.resolve(__dirname, '..', 'build')))



app.listen(PORT, ()=>console.log( "Server run on port "+ PORT))