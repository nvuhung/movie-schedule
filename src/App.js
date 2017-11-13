import React, {Component} from 'react';
import moment from 'moment';
import 'moment/locale/vi'
import {Layout, Menu, Row, Col, Spin} from 'antd';
import Data from './Data';
import './App.css';

import Film from './components/Film/Film';
import Cinema from './components/Cinema/Cinema';
import Session from './components/Session/Session';

moment.locale('vi');

const { Content, Sider } = Layout;

const dateMenu = Array(7).fill().map((e, i)=> {
  let date = moment().add(i, 'day');
  return {
    id: date.format('YYYYMMDD'),
    text: date.format('dddd - DD/MM/YYYY')
  }
});

const HOST_URL = process.env.REACT_APP_HOST_URL;
class App extends Component {

  state = {
    loading: false,
    listCinemas: Data.listCinemas,
    listSessions: null,
    listShowingFilms: [],
    filmSelected: null,
    dateSelected: [dateMenu[0].id]
  };

  componentDidMount() {
    this.fetchShowingFilms();

    this.state.listCinemas.forEach(cinema => cinema.selected = cinema.cinemas[0]);
  }

  async fetchSession(filmId) {
    this.setState({ loading: true });
    const startDate = dateMenu[0].id;
    const endDate = dateMenu.slice(-1)[0].id;
    const listSessions = await (await fetch(`${HOST_URL}/get-session?filmId=${filmId}&startDate=${startDate}&endDate=${endDate}`)).json();
    this.setState({listSessions: listSessions, loading: false});
  }

  async fetchShowingFilms() {
    const listShowingFilms = await (await fetch(`${HOST_URL}/get-list-showing-films`)).json();
    this.setState({listShowingFilms: listShowingFilms, filmSelected: listShowingFilms[0]});
    this.fetchSession(listShowingFilms[0].film_id);
  }

  getSession(cinemaId, dateId) {
    const listSessions = this.state.listSessions;
    return (listSessions && listSessions[cinemaId] && listSessions[cinemaId][dateId]) || [];
  }

  onChangeCinema(index, cinema) {
    let listCinemas = this.state.listCinemas;
    listCinemas[index].selected = cinema;
    this.setState({listCinemas: listCinemas})
  }

  onChangeFilm(film) {
    this.setState({filmSelected: film});
    this.fetchSession(film.film_id);
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Content style={{ padding: '10px 50px' }}>
          <Spin spinning={this.state.loading} size="large">
            <Layout style={{ background: '#fff' }}>
              <Sider width={300} style={{ background: '#fff' }}>

                <Film filmSelected={this.state.filmSelected} onChange={(item) => this.onChangeFilm(item)} films={this.state.listShowingFilms} />

                <Menu
                  onClick={({key}) => this.setState({dateSelected: [key]})}
                  defaultSelectedKeys={this.state.dateSelected}
                  style={{ textTransform: 'capitalize', lineHeight: 0 }}>
                  {
                    dateMenu.map((date) => 
                        <Menu.Item 
                          style={{lineHeight: '80px'}}
                          className="MenuItem" 
                          key={date.id}>
                          <span>{date.text}</span>
                        </Menu.Item>)
                  }
                </Menu>

              </Sider>

              <Content>
                <Row>
                  {
                    this.state.listCinemas.map((cinema, index) => (
                      <Col key={cinema.p_cinema_id} span={8}>
                        <Cinema cinemas={cinema.cinemas} cinemaSelected={this.state.listCinemas[index].selected} onChange={(item) => this.onChangeCinema(index, item) }></Cinema>
                        {
                          this.state.listSessions && 
                          (<Menu 
                            style={{ lineHeight: 0 }}
                            selectedKeys={this.state.dateSelected}>
                            {
                              dateMenu.map((date) => 
                                  <Menu.Item
                                    style={{lineHeight: 'normal', overflow: 'auto'}}
                                    className="MenuItem" 
                                    key={date.id}>
                                    <Session sessions={this.getSession(cinema.selected.cinema_id, date.id)} />
                                  </Menu.Item>)
                            }
                          </Menu>)
                        }
                      </Col>
                    ))
                  }
                </Row>
              </Content>

            </Layout>
          </Spin>
        </Content>
      </Layout>
    );
  }
}

export default App;
