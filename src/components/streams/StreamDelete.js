import React from "react";
import Modal from "../Modal";
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { deleteStream, fetchStream } from "../../actions";
import history from "../../history";


class StreamDelete extends React.Component {

    componentDidMount() {
        console.log('fd', this.props)
        this.props.fetchStream(this.props.match.params.id)
    }

    renderActions() {
        const id = this.props.match.params.id
        return (
            <React.Fragment>
                <button onClick={() => this.props.deleteStream(id)} className="ui button negative">Delete</button>
                <Link to={'/'} className="ui button">Cancel</Link>
            </React.Fragment>
        )
    }

    renderContent() {
        // if the mapStateToProps did not yet load the stream in, since it may take longer than to show the modal
        if (!this.props.stream) {
          this.props.fetchStream(this.props.match.params.id);
          return ('Are you sure you want to delete this stream?');
        } else {
        this.props.fetchStream(this.props.match.params.id)
          return (`Are you sure you want to delete the stream with title: ${this.props.stream.title}`);
        }
    
      }
    render() {
        return (
            <Modal
                title={"Delete Stream"}
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push('/')}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete)