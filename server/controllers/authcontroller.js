const bcrypt = require('bcryptjs')

module.exports={
    register: async (req,res)=>{
        const db = req.app.get('db')
        const {username, password} = req.body
        const [result] = await db.auth.check_username(username)
        if(result){
            return res.status(409).send('Username is use')
        }  
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const [user] = await db.auth.register_user(username, hash)
        delete user.password
        req.session.user = user
        return res.status(200).send(req.session.user)
    },
    login:async (req,res)=>{
        const db = req.app.get('db')
        const {username, password} = req.body
        const [user] = await db.auth.check_username(username)
        if(!user){
            return res.status(401).send("User not found.")
        }
        const isAuthenticated = bcrypt.compareSync(password, user.password)
        if(!isAuthenticated){
          return res.status(401).send('Password incorrect.')
        }
         delete user.password
         req.session.user = user  
        return res.status(200).send(req.session.user)
    },
    logout: async (req,res)=>{
        req.session.destroy()
        res.sendStatus(200)
    },
    getUser: async (req, res) =>{
    const {user} = req.session
    if(!user){
        return res.status(511).send('User not logged in.')
    }
    }
}