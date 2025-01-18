import express from "express"
import pg from "pg"
import { nanoid } from "nanoid"
import env from "dotenv"
const app= express()
const port= 3000
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
env.config();

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });
  db.connect();

  const getRootDomain = (url) => {
    try {
        const hostname = new URL(url).hostname;
        const parts = hostname.split('.');
        if (parts.length > 2) {
            return parts.slice(-2).join('.');
        }
        return hostname;
    } catch (error) {
        console.error('Invalid URL:', error);
        return null;
    }
};

app.get("/", async (req,res)=>{
    try{
        const result= await db.query(`select domain, bigurl, shorturl from urldata`)
    res.render("index.ejs", {links:result.rows })
    }
    catch(err){
        res.send(err)
    }
})

app.get("/shorten", (req,res)=>{
    res.render("shorting.ejs")
})


app.get("/link/:sid", async (req, res) => {
    try {
        const sid = req.params.sid;
        const result = await db.query(`SELECT bigurl FROM urldata WHERE shorturl = $1`, [sid]);
        if (result.rows.length > 0) {
            const data = result.rows[0];
            res.redirect(data.bigurl);
        } else {
            res.status(404).send("Short URL not found.");
        }
    } catch (err) {
        console.error("Error in /link/:sid route:", err);
        res.status(500).send("An error occurred. Please try again later.");
    }
});

app.post("/shorten",async (req,res)=>{
 try{
   let URL= req.body.url;
   let domain= getRootDomain(URL);
   const sid= nanoid(6);
   const result= await db.query(`insert into urldata (domain, bigurl, shorturl) VALUES ($1,$2,$3)`,[domain, URL, sid]);
   res.redirect("/")
 }catch{
    res.redirect("/")
 }
})


app.listen(port, ()=>{
    console.log(`app listening on http://localhost:${port}`)
})
