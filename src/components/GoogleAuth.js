import React from "react";
import { connect } from 'react-redux'
import { signIn, signOut } from '../actions'


class GoogleAuth extends React.Component {

    componentDidMount() {
        // Essa arrow function apenas é chamada depois que essa requisição retornar alguma resposta
        window.gapi.load('client:auth2', () => {
            // Essa é uma função assíncrona que faz uma requiição para os servidores do google. init retorna uma promise
            window.gapi.client.init({
                clientId: '920586133762-0k6s21ba0ih9t83gekta67ubtg34s26p.apps.googleusercontent.com',
                scope: 'email'
            // Quando obter a resposta executa o then    
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance()
                this.onAuthChange(this.auth.isSignedIn.get())
                //Ouvinte de evento para mudar o texto dinamicamente sem ter que recarregar a página
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            //Esse argumento é um id próprio que será usado para a criação de streams
            this.props.signIn(this.auth.currentUser.get().getId())
        } else {
            this.props.signOut()
        }
    }

    onSignInClick = () => {
        this.auth.signIn()
    }

    onSignOutClick = () => {
        this.auth.signOut()
    }

    renderAuthButton() {
        if(this.props.isSignedIn === null) {
            return null
        } else if (this.props.isSignedIn) {

            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            )
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                <i className="google icon" />
                Sign In with Google
            </button>
            )
        }
    }

    render () {
        return (
            <div>{this.renderAuthButton()}</div>
        )
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth)