import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import { getArticles } from '../actions';

class Articles extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
    }

    componentDidMount() {
        const { dispatch} = this.props;
        dispatch(getArticles());
    }

    handleChange(e) {
        const target = e.target;
        const { name, value } = target;

        this.setState({
            [name]: value
        });
    }

    search() {
        const { authors, title, edition } = this.state;
        if (!title && !authors) {
            return;
        }
        
        const query = {};
        if (title) { 
            query.title = title;
        }
        if (authors) { 
            // TO DO
        }
        dispatch(getArticles(query));
    }

    render() {
        const { articles } = this.props;
        const { history } = this.props;
        
        return (
            <div className="articles-page">
                <h1>Articles</h1>

                <div className="filters">
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Title</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" name="title" onChange={this.handleChange} />
                    </InputGroup>
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Authors</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" name="authors" onChange={this.handleChange} />
                    </InputGroup>
                    <div className="buttons">
                        <Button size="sm" onClick={this.search}>Search</Button>
                        <Button size="sm" onClick={() => history.push('/articles/new')}>New Article</Button>
                    </div>
                </div>

                <Table responsive>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Long Description</th>
                            <th>Last Modified</th>
                            <th>Authors</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            articles.map(article => (
                                <tr>
                                    <td>{article.title}</td>
                                    <td>{article.short_description}</td>
                                    <td>{article.long_description}</td>
                                    <td>{article.updated_at}</td>
                                    <td>To Be Implemented</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ articles: state.articles });

export default connect(mapStateToProps)(Articles);
