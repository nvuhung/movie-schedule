import React, {Component} from 'react';
import {Modal, Tooltip, Carousel} from 'antd';
import './FilmModal.css'

const fontWeight = {fontWeight: 500}
export default class FilmModal extends Component {

    state = {
        detail: null,
    }

    handleCancel = (e) => {
        this.setState({detail: null});
        this.props.closeModal();
    }

    async getFilmDetail(filmId) {
        const detail = await (await fetch(`${process.env.REACT_APP_HOST_URL}/get-film-detail?filmId=${filmId}`)).json();
        this.setState({detail: detail});
    }

    getYoutube(youtubeId) {
        if(!youtubeId) {
            return (<div></div>);
        }
        let link = `https://www.youtube.com/embed/${youtubeId}`;
        return (
            <div style={{ width: '100%', height: 300}}>
                <iframe title={link} className="player" type="text/html" width="100%" height="100%"
                    src={link}
                    frameBorder="0"/>
            </div>
        );
    }

    render() {
        const filmId = this.props.data && this.props.data.film_id;
        this.props.visible && !this.state.detail && this.getFilmDetail(filmId);

        const settings = {
            customPaging: (i) => {
              return <a><img alt="" height="25" width="25" src={this.state.detail.list_image_view[i]} /></a>
            },
            dots: true, 
            dotsClass: 'slick-dots slick-thumb',
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        return (
            <Modal
                title={this.props.data && this.props.data.film_name}
                footer={null}
                visible={this.props.visible}
                onCancel={() => this.handleCancel()}>

                {
                    this.state.detail && 
                    <div>
                        <div style={{ display: '-webkit-box' }}>
                            <img alt={this.state.detail.film_name} width="120" src={this.state.detail.poster} />
                            <div style={{marginLeft: 10}}>
                                <p><span style={fontWeight}>Ngày phát hành:</span> {this.state.detail.publish_date}</p>
                                <p><span style={fontWeight}>Thời lượng:</span> {this.state.detail.film_duration} phút</p>
                                <p><span style={fontWeight}>Định dạng:</span> {this.state.detail.film_version}</p>
                                <p><span style={fontWeight}>Điểm IMDB:</span> {this.state.detail.imdb_point}</p>

                                <p><span style={fontWeight}>Thể loại:</span> {this.state.detail.film_category}</p>
                                <p><span style={fontWeight}>Quốc gia SX:</span> {this.state.detail.film_country}</p>
                                <p><span style={fontWeight}>Đạo diễn:</span> {this.state.detail.film_director}</p>
                                <p style={{width: 360}}><span style={fontWeight}>Diễn viên:</span> 
                                    {
                                        this.state.detail.list_actor.map(
                                            (artist, index) => 
                                            <Tooltip key={artist.artist_id} title={'Vào vai: ' + artist.char_name}>
                                                <span style={{cursor: 'pointer'}}>{index ? ', ' : ' '} {artist.artist_name}</span>
                                            </Tooltip>
                                        )
                                    }
                                </p>
                            </div>
                        </div>
                        
                        <p style={{marginTop: 5}}><span style={fontWeight}>Nội dung:</span></p> 
                        <p style={{whiteSpace: 'pre-wrap'}} dangerouslySetInnerHTML={{__html: this.state.detail.film_description_web_short}}></p>

                        <p style={{margin: '5px 0px'}}><span style={fontWeight}>Trailer và Hình ảnh:</span></p> 

                        {this.getYoutube(this.state.detail.list_trailer && this.state.detail.list_trailer[0] && this.state.detail.list_trailer[0].youtube_id)}

                        <div style={{ marginTop: 20 }}>
                            {
                                this.state.detail.list_image_view &&
                                <Carousel {...settings}>
                                    {
                                        this.state.detail.list_image_view
                                                        .map(img => 
                                                            <div key={img}><img width="100%" height="300" alt={this.props.data.film_name} src={img.replace('http', 'https')} /></div>)
                                    }
                                </Carousel>
                            }
                        </div>
                    </div>
                }

            </Modal>
        )

    }
}