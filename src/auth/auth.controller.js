    import Psychologist from '../psychologist/psychologist.model.js'
    import { checkPassword, encrypt } from '../../utils/encrypt.js'
    import { generateJwt } from '../../utils/jwt.js'

    export const test = (req, res)=>{
        console.log('test is running')
        return res.send({message: 'Test is running'})
    }

    export const register = async(req, res)=>{
        try{
            let data = req.body
            let psychologist = new Psychologist(data)

            psychologist.password = await encrypt(psychologist.password)
            
            
            await psychologist.save()
            return res.send({message: `Registered successfully `})
        }catch(err){
            console.error(err)
            return res.status(500).send({message: 'General error with registering user', err})
        }
    }

    export const login = async(req, res)=>{
        try{
        let { email, password } = req.body
        let psychologist = await Psychologist.findOne({ email}) 
        
        if(psychologist && await checkPassword(psychologist.password, password)) {
            
            if (!email || !password) {
  return res.status(400).send({ message: 'Email and password are required' });
}

                let loggedPsychologist = { 
                    id: psychologist._id,
                    name: psychologist.name,
                    username: psychologist.username,
                }

                let token = await generateJwt(loggedPsychologist)

                return res.send(
                    {
                        message: `Welcome`,
                        loggedPsychologist,
                        token
                    }
                )
            }
            return res.status(400).send({message: 'Wrong email or password'})
        }catch(err){
            console.error(err)
            return res.status(500).send({message: 'General error with login function'})
        }
    }