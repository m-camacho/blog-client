import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Col, FormControl, InputGroup, Row } from 'react-bootstrap';
import Select from 'react-select';
import { getArticle, createArticle, updateArticle } from '../actions/articles';
import { getAuthors } from '../actions/authors';

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
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.save = this.save.bind(this);
    }

    componentDidMount() {
        const { dispatch, match } = this.props;
        dispatch(getAuthors()); // This could be optimized
        if (match.params.id) {
            dispatch(getArticle(match.params.id));
        }
    }

    componentWillReceiveProps(newProps) {
        const { article, authors } = newProps;
        if (article && article.authors) {
            const articleAuthors = article.authors.map(authorID => {
                const found = authors.find(author => author['_id'] === authorID)
                return { value: found['_id'], label: found.name };
            });
            this.setState({ 
                ...article,
                authors: articleAuthors,
            })
        } else {
            this.setState({ 
                ...article,
                authors: [],
            })
        }
    }

    handleChange(e) {
        const target = e.target;
        const { name, value } = target;
        this.setState({
            [name]: value
        });
    }

    handleSelectChange(selectedOptions) {
        this.setState({ authors: selectedOptions});
    }

    async save() {
        const { dispatch, history } = this.props;
        const { _id, title, short_description, long_description } = this.state;

        console.log(this.state);
        try {
            const authors = this.state.authors.map(author => author.value);
            if (_id) {
                await dispatch(updateArticle({ _id, title, short_description, long_description, authors }));
            } else {
                await dispatch(createArticle({ title, short_description, long_description, authors }));
            }
            history.push('/articles');
        } catch(error) {
            console.log(error);
        }
    }

    render() {
        const { authors, history, match } = this.props;
        const options = authors.map(author => ({ value: author['_id'], label: author.name }));
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
                        <div>
                            Authors: 
                            <Select 
                                isMulti
                                value={this.state.authors}
                                options={options}
                                onChange={this.handleSelectChange}
                            />
                        </div>
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
    authors: state.authors,
    article: state.article,
});

export default connect(mapStateToProps)(UpsertArticle);
