

const con=require("../db/conn");



const userCtrl={

    register: async (req, res) => {
        

        // console.log(req);
    try {
        const { username, password, role } = req.body;
        console.log(username,password,role);
        const connection = await con.getConnection();

        // Check if the user already exists
        const queryExists = 'SELECT * FROM user WHERE username = ?';
        const [rowsExists] = await connection.execute(queryExists, [username]);

        if (rowsExists.length > 0) {
            connection.release();
            return res.status(200).json({ success: false, message: 'User already exists' });
        }
        let rval=(role==="ADMIN")?1:0;


      

        // If the user doesn't exist, create a new user
        const query = 'INSERT INTO user(username, password, role) VALUES(?, ?, ?)';
        const [rows] = await connection.execute(query, [username, password, rval]);
        connection.release();
        res.status(201).json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
},

AllTravelPlans: async(req,res)=>{
    try{
        const id=req.params["id"];

        console.log(id);

        const connection=await con.getConnection();
        // const query="select * from travel_plan ";
        const query=`select * from travel_plan where plan_id=${id}`
        
        const rows=await connection.execute(query);
        // console.log(rows.length);
        
        if(rows[0].length==0){
            return res.status(200).json({msg:"Not Found"})
        }
        

        console.log(rows[0][0]);
         connection.release();
        return res.status(200).json({msg:"sucesss",data:rows[0][0]});
       








    }
    catch(err){
        console.log(err);
    }
}

}






module.exports=userCtrl;