import React, { Component } from 'react';
import { Modal } from 'antd-mobile';
import './style.css';
class ImageModal extends Component{
    render(){
        const baseData = this.props.data;
        return (<div>
            <Modal
                visible={this.props.visible}
                transparent={this.props.transparent}
                closable={this.props.closable}
                maskClosable={this.props.maskClosable}
                onClose={this.props.onClose}
            >
                <div className={'ysy-modal-content'}>
                    <img src={baseData.src} style={{width:'100%',maxHeight:'90vw'}} alt='设备图片' onClick={this.props.onClose}/>
                    <div className={'ysy-modal-content-desc'}>
                        <dl>
                            <dt>设备名称:</dt>
                            <dd>{baseData.equipmentName}</dd>
                        </dl>
                        <dl>
                            <dt>故障描述:</dt>
                            <dd>{baseData.faultWords}</dd>
                        </dl>
                    </div>
                </div>
            </Modal>
        </div>)
    }
}
export default ImageModal;