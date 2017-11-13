import React, {Component} from 'react';
import {Menu, Dropdown} from 'antd';
import Header from '../Header';
import FilmModal from './FilmModal';

export default class Film extends Component {

    state = {
        isShowModal: false
    }

    onClick(key) {
        this.props.onChange(this.props.films.find((f) => f.film_id === Number(key)));
    }

    getMenuItem() {
        return (
            <Menu
                style={{height: 'calc(100vh - 120px)', overflow: 'auto'}}
                onClick={({key}) => this.onClick(key)} 
                selectedKeys={[this.props.filmSelected ? this.props.filmSelected.film_id.toString() : '']}>
                {
                    this.props.films.map((item) => 
                        <Menu.Item key={item.film_id} >
                            <div style={{ display: '-webkit-box' }}>
                                <img alt={item.film_name} width="80" src={item.poster_thumb} />
                                <div style={{margin: 10}}>
                                    <strong>{item.film_name}</strong>
                                    <p>Thời lượng: {item.film_duration} phút</p>
                                    <p>Định dạng: {item.film_version}</p>
                                    <p>Điểm IMDB: {item.imdb_point}</p>
                                </div>
                            </div>
                        </Menu.Item>)
                }
            </Menu>
        );
    }

    render() {
        const headerContent = this.props.filmSelected;
        return (
            <div>
                <FilmModal data={headerContent} closeModal={() => this.setState({isShowModal: false})} visible={this.state.isShowModal} />

                <Dropdown overlay={this.getMenuItem()}>
                    <div>
                        {
                            headerContent && <Header
                                                openModal={() => this.setState({isShowModal: true})}
                                                text={headerContent.film_name} 
                                                subText={headerContent.film_duration + ' phút - IMDB: ' + headerContent.imdb_point} 
                                                img={headerContent.poster_thumb} />
                        }
                    </div>
                </Dropdown>
            </div>  
        )

    }
}