import React from "react";
import {Field, reduxForm} from 'redux-form'

class StreamForm extends React.Component {

    renderError ({error, touched}) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">
                        {error}
                    </div>
                </div>
            )
        }
    }

    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
                {this.renderError(meta)}
            </div>
        )
    }

    onSubmit = (formValues) => {
        //callback passada para saber o que disparar ao fazer submit
        this.props.onSubmit(formValues)
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput}
                label="Adicione o título"
                />
                <Field name="description" component={this.renderInput } 
                label="Adicione a descrição"
                />
                <button className="ui button primary">Submit</button>
            </form>
        )
    }
}

const validate = (formValues) => {
    const error = {}

    if (!formValues.title) {
        error.title = 'Você deve adicionar algum título'
    }

    if (!formValues.description) {
        error.description = "Você deve adicionar alguma descrição"
    }

    return error
}

export default reduxForm({
    form: 'streamForm',
    validate: validate
})(StreamForm)
