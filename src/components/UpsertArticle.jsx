import React, { Component } from 'react';
import { Button, Col, Form, FormControl, InputGroup, Row, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getArticle } from '../actions';

class UpsertArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            short_description: '',
            long_description: '',
            authors: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
    }

    componentDidMount() {
        const { dispatch, match} = this.props;
        if (match.params.id) {
            dispatch(getArticle(match.params.id));
        }
    }

    componentWillReceiveProps(newProps) {
        const { article } = newProps;
        this.setState({ ...article })
    }

    handleChange(e) {
        const target = e.target;
        const { name, value } = target;
        this.setState({
            [name]: value
        });
    }

    save() {
        const { dispatch, history } = this.props;
        const { _id, title, short_description, long_description } = this.state;

        console.log(this.state);
    }

    render() {
        const { authors, history, match } = this.props;
        return (
            <div className="upsert-article-page">
                <h1>{ match.params.id ? 'Update Article' : 'Create new Article'}</h1>
                <Row>
                    <Col>
                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Title</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                aria-label="Small"
                                aria-describedby="inputGroup-sizing-sm"
                                name="title"
                                defaultValue={this.state.title}
                                onChange={this.handleChange}
                            />
                        </InputGroup>
                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Description</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                aria-label="Small"
                                aria-describedby="inputGroup-sizing-sm"
                                name="short_description"
                                defaultValue={this.state.short_description}
                                onChange={this.handleChange}
                            />
                        </InputGroup>
                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Long Description</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                aria-label="Small"
                                aria-describedby="inputGroup-sizing-sm"
                                name="long_description"
                                defaultValue={this.state.long_description}
                                onChange={this.handleChange}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <div className="buttons">
                    <Button size="sm" onClick={this.save} >Save</Button>
                    <Button size="sm" onClick={() => { history.push('/articles') }}>Cancel</Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ 
    article: state.article
});

export default connect(mapStateToProps)(UpsertArticle);
