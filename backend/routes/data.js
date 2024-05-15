const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
    try{
        const { email, password } = req.body;
        await client.connect();
        const database = client.db('Community');
        const collection = database.collection('details');
        const user = await collection.findOne({ "email":email, "password":password });
        console.log(user);
        // const user = collection.find(user => user.email === email && user.password === password);
        await client.close();
        if (user) {
          res.json({ authenticated: true ,"data":user});
        } else {
          res.json({ authenticated: false });
        }
      }catch(error){
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Server error' });
      }
    // try {
    //     let user = await User.findOne({ email: req.body.email });
    //     if (!user)
    //         return res.status(400).send("Invalid email or password");
        
    //     const validpassword = await bcrypt.compare(req.body.password, user.password)
    //     if (!validpassword) 
    //         return res.status(400).send("Invalid email or password");

    //     const secretKey = process.env.SECRET_KEY;
    //     const token = jwt.sign(
    //       { _id: user._id, name: user.name, email: user.email },
    //       secretKey
    //     );

    //     res.send(token);
    // } catch (error) {
    //     res.status(500).send(error.message);
    //     console.log(error.message);
    // }
})


module.exports = router;