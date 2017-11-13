import React, {Component} from 'react';
import {Menu, Dropdown} from 'antd';
import Header from '../Header';
import CinemaModal from './CinemaModal';

export default class Cinema extends Component {

    state = {
        isShowModal: false
    }

    onClick(key) {
        this.props.onChange(this.props.cinemas.find((c) => c.cinema_id === Number(key)));
    }

    getMenuItem() {
        return (
            <Menu
                style={{maxHeight: 'calc(100vh - 120px)', overflow: 'auto'}}
                onClick={({key}) => this.onClick(key)} 
                selectedKeys={[this.props.cinemaSelected ? this.props.cinemaSelected.cinema_id.toString() : '']}>
                {
                    this.props.cinemas.map((item) => 
                        <Menu.Item key={item.cinema_id} >
                            <div style={{ display: '-webkit-box' }}>
                                <img alt={item.film_name} width="40" src={item.cinema_image} />
                                <div style={{marginLeft: 10}}>
                                    <strong>{item.cinema_name}</strong>
                                    <p>{item.cinema_address}</p>
                                </div>
                            </div>
                        </Menu.Item>)
                }
            </Menu>
        );
    }

    render() {
        const headerContent = this.props.cinemaSelected;
        return (
            <div>
                <CinemaModal data={headerContent} closeModal={() => this.setState({isShowModal: false})} visible={this.state.isShowModal} />
                
                <Dropdown overlay={this.getMenuItem()}>
                    <div>
                        {
                            headerContent && <Header
                                                openModal={() => this.setState({isShowModal: true})}
                                                text={headerContent.cinema_name} 
                                                subText={headerContent.cinema_address} 
                                                img={headerContent.cinema_image} />
                        }
                    </div>
                </Dropdown>
            </div>
        )

    }
}