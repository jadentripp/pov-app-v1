module.exports={
    createQuestion: async (req, res) => {
      try { const db = req.app.get('db')
        const [question]= await db.questions.create_question(user_id, question)
        return res.status(200).send('Question created')}
        catch{
            return res.status(500).send('Question not created.')
        }
    },
    
}