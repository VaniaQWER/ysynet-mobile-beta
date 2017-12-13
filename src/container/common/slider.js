import { Component } from 'react';
import { ListView } from 'antd-mobile';
import { OrderList, Invoice } from '../../constants';
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
    // 模拟 ajax
    setTimeout(() => {
      let data = [];
      switch (this.url) {
        case 'order':
          data = OrderList;
          break;
        case 'invoice':
          data = Invoice;
          break;  
        default:
          break;
      }
      const sectionName = `${pageIndex}:`;
      dataBlobs[sectionName] = sectionName;
      sectionIDs.push(sectionName);
      rowIDs[pageIndex] = [];
      for (let i=0; i<this.NUM_ROWS_PER_SECTION; i++) {
        const row = data[i];
        rowIDs[pageIndex].push(data[i].id);
        dataBlobs[data[i].id] = row;
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
    }, 600)
  }
  onRefresh = () => {
    //console.log(this.dataSource)
    this.setState({ refreshing: true, pageIndex: 0, isLoading: true, sectionIDs: [], rowIDs: [], dataBlobs: {}});
    // simulate initial Ajax
    this.genData();
  }
}

export default Slider;