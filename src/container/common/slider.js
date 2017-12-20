import { Component } from 'react';
import { ListView } from 'antd-mobile';
//import { OrderList, Invoice,EquipmentList,WorkOrder } from '../../constants';
import { fetchData } from '../../utils';
import querystring from 'querystring';
/**
 * @file 滑动刷新 构造方法
 */
class Slider extends Component {
  constructor(props) {
    super(props)
    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];
    this.NUM_ROWS_PER_SECTION = 5;
    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });
    this.dataBlobs = {};
    this.sectionIDs = [];
    this.rowIDs = [];
    this.dataSource = dataSource;
  }
  genData = (query, callback) => {
    let { pageIndex, isMore } = this.state;
    this.setState({ isLoading: true });
      fetchData({
        url:`/${this.url}?pagesize=${this.NUM_ROWS_PER_SECTION}&page=${query ? 1 : pageIndex}&${querystring.stringify(this.searchName)}&${querystring.stringify(query)}`,
        error:(err)=>{
          console.log(err)
        },
        success: (res) =>{
          let data = res.result;
          if (data.length > 0) {
            const sectionName = `${pageIndex}:`;
            this.dataBlobs[sectionName] = sectionName;
            this.sectionIDs.push(sectionName);
            this.rowIDs[pageIndex-1] = [];
            const pageSize = data.length > this.NUM_ROWS_PER_SECTION ? this.NUM_ROWS_PER_SECTION : data.length; 
            for (let i=0; i<pageSize; i++) {
              const row = data[i];
              this.rowIDs[pageIndex-1].push(data[i].RN);
              this.dataBlobs[data[i].RN] = row;
            }
            if (data.length < 5) {
              isMore = false;
            }
          } else {
            this.sectionIDs = [];
            this.rowIDs = [];
            this.dataBlobs = {};
          }
          this.setState({
            dataSource: this.dataSource.cloneWithRowsAndSections(this.dataBlobs, this.sectionIDs, this.rowIDs),
            isLoading: false,
            pageIndex: query ? 1 : pageIndex + 1,
            refreshing: false,
            isMore
          });
          if (typeof callback === 'function') {
            callback();
          }
        }
      }) 
  }
  onRefresh = (callback) => {
    this.setState({ 
      refreshing: true, 
      pageIndex: 1, 
      isLoading: true,
    });
    // 清空
    this.sectionIDs = [];
    this.rowIDs = [];
    this.dataBlobs = {};
    // // simulate initial Ajax
    this.genData();
    if (typeof callback === 'function') {
      callback();
    }
  }
}

export default Slider;