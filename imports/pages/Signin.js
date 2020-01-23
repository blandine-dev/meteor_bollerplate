import React, {useState} from 'react'
import {Form, Button, Container} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data'


function Signin(props){
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const signin = () => {
        Meteor.loginWithPassword(email, password)
    }

    const logout = () => Meteor.logout()


    return(
            <Container>
                <h1>Connectez-vous!</h1>
                {!props.current_user ?
                    <Form onSubmit={signin}>
                        <Form.Input value={email} onChange={(e, {value}) => setEmail(value)} label="Email" type="email" placeholder="ex: toto@yopmail.com" />
                        <Form.Input value={password} onChange={(e, {value}) => setPassword(value)} label="Mot de passe" type="password" />
                        <Button disabled={!email || !password} color="blue">M'inscrire</Button>
                        <Link to='/signup'>
                            <Button size="mini">Créer un compte</Button>
                        </Link>
                    </Form>
                :
                    <div>
                    <p>Vous êtes déjà connecté</p>
                    <Button onClick={logout} color="red">Se déconnecter</Button>
                    </div>
                }
            </Container>
    )
}


export default withTracker(()=>{
    const current_user = Meteor.user()
    return {
        current_user
    }
})(Signin)