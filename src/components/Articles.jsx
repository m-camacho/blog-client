import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { getArticles, deleteArticle } from '../actions';
import { isNullOrUndefined } from '../utils';

class Articles extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this);
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
        const { authors, title } = this.state;
        const { dispatch} = this.props;

        if (isNullOrUndefined(title) && !authors) return;
        
        const query = {};
        if (title) query.title = title;
        if (authors) { 
            // TO DO
        }
        dispatch(getArticles(query));
    }

    deleteArticle(articleId) {
        const { dispatch} = this.props;
        dispatch(deleteArticle(articleId));
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
                            <th className="actions">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            articles.map(article => (
                                <tr key={article['_id']}>
                                    <td>{article.title}</td>
                                    <td>{article.short_description}</td>
                                    <td>{article.long_description}</td>
                                    <td>{moment(article.updated_at).format('YYYY MM DD [at] HH:mm')}</td>
                                    <td>To Be Implemented</td>
                                    <td className="actions">
                                        <Button size="sm" onClick={() => history.push(`/articles/edit/${article['_id']}`)}>
                                            <FontAwesomeIcon icon={faPencilAlt} />
                                        </Button>
                                        <Button size="sm" variant="danger" onClick={() => this.deleteArticle(article['_id'])}>
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </Button>
                                    </td>
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
