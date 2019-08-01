import React, {Component} from 'react';
import { Container, Form } from './styles';
import logo from '../../assets/logo.png';
import CompareList from '../../components/CompareList';
import api from '../../services/api'
import moment from 'moment'


class Main extends Component{

  state = {
    repositoryError: false,
    repositoryInput:'',
    repositories: [],
    loading: false,
  }

  handleAddRepository = async (e) =>{
    e.preventDefault();

    try {
      const { data: repository } = await api.get(`/repos/${this.state.repositoryInput}`);

      repository.lastCommit = moment(repository.pushed_at).fromNow();

      this.setState({
        repositoryInput:'',
        repositories: [...this.state.repositories , repository],
        repositoryError: false
      })
    } catch (err) {
      this.setState({ repositoryError: true })
    }finally {
      this.setState({ loading: false });
    }

  }

  render(){
    return(
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form withError={this.state.repositoryError} onSubmit={this.handleAddRepository}>
          <input type="text" placeholder="usuário/repositorio"
          value={this.state.repositoryInput}
          onChange={e => this.setState({ repositoryInput: e.target.value })}
        />
          <button type="submit">{this.state.loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}</button>
        </Form>

        <CompareList repositories={this.state.repositories}/>
      </Container>
    );
  }
}


export default Main;
