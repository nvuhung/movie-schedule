import React, {Component} from 'react';

export default class Header extends Component {

    render() {
        return (
            <div style={{height: 80, borderBottom: '2px solid #108ee9', backgroundColor: '#f8f8f8', lineHeight: 'normal', paddingLeft: '16px'}}>
                <div style={{ cursor: 'pointer', display: 'flex', paddingTop: 10}}>
                    <img alt={this.props.text} width="40px" height="40px" src={this.props.img} />
                    <div style={{paddingLeft: 10}}>
                        <span style={{display: 'block', color: '#690', fontSize: 14, fontWeight: 600}}>{this.props.text}</span>
                        {this.props.subText && <span>{this.props.subText}</span>}
                    </div>
                </div>
                <a onClick={() => this.props.openModal()} style={{color: '#FB4226', fontSize: 12}}>Chi tiết</a>
            </div>
        )
    }
}