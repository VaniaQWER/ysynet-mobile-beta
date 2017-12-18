import { Component } from 'react';
import { ListView } from 'antd-mobile';
//import { OrderList, Invoice,EquipmentList,WorkOrder } from '../../constants';
import { fetchData } from '../../utils';
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
    this.dataSource = dataSource;
  }
  genData = (callback) => {
    let { pageIndex, sectionIDs, rowIDs, dataBlobs, isMore } = this.state;
    this.setState({ isLoading: true });
      fetchData({
        url:this.url,
        error:(err)=>{
          console.log(err)
        },
        success: (res) =>{
          let data = res.result;
          const sectionName = `${pageIndex}:`;
          dataBlobs[sectionName] = sectionName;
          sectionIDs.push(sectionName);
          rowIDs[pageIndex] = [];
          const pageSize = data.length > this.NUM_ROWS_PER_SECTION ? this.NUM_ROWS_PER_SECTION : data.length; 
          for (let i=0; i<pageSize; i++) {
            const row = data[i];
            rowIDs[pageIndex].push(data[i].RN);
            dataBlobs[data[i].RN] = row;
          }
          if (pageIndex > 3) {
            isMore = false;
          }
          this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
            isLoading: false,
            pageIndex: pageIndex + 1,
            sectionIDs,
            refreshing: false,
            isMore,
            rowIDs,
            dataBlobs
          });
          if (typeof callback === 'function') {
            callback();
          }
        }
      }) 
  }
  onRefresh = () => {
    //console.log(this.dataSource)
    this.setState({ refreshing: true, pageIndex: 0, isLoading: true, sectionIDs: [], rowIDs: [], dataBlobs: {}});
    // simulate initial Ajax
    this.genData();
  }
}

export default Slider;