import React from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {

    componentDidMount() {
        // Fetching its own data
        this.props.fetchStream(this.props.match.params.id)
    }

    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues)
    }

    render() {

        if (!this.props.stream) {
            return <div>Loading...</div> 
        }
            //{{ title: 'titulo inicial', description: 'descrição inicial'}}
            // props.stream é um objeto com titulo e descricao 
        return (
            <div>
                <h3>Edit Stream</h3>

                <StreamForm 
                // Desestruturando apenas os dados relevantes, deixando de fora o id da stream e o userId
                initialValues={{title: this.props.stream.title, description: this.props.stream.description}} 
                onSubmit={this.onSubmit} />
            </div>
        )
    }

}

// ownProps dá acesso às propriedades do StreamEdit, no caso as props que o <Route> do react-router passa para o componente
const mapStateToProps = (state, ownProps) => {
    //stream: state.stream.filter(el => el === ownProps.match.params.id)
    return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit)