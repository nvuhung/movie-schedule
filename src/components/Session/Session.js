import React, {Component} from 'react';
import './Session.css';

export default class Session extends Component {

    render() {
        const { sessions, isLoading } = this.props;
        return (
            isLoading
                ? <a className="NoSession">Đang tải...</a>
                : sessions.length 
                        ? sessions.map(session => <a key={session} className="Session">{session}</a>)
                        : <a className="NoSession">Không có suất chiếu</a>
        )

    }
}