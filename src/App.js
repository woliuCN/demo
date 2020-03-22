import React ,{useEffect, useState}from 'react';
import './App.css';
import TreeSelect from './components/treeSelect';
import Content from './components/content';
import {getAllTableData,getSearchTableData,getSearchTableDataByclickNode} from './api/request';
function App() {
  const [tableData,setTableData] = useState([]);
  useEffect(()=>{
    refreshTableData()
  },[])
  //模糊搜索
  const searching = (model,enable)=>{
    getSearchTableData(model,enable)
    .then(data=>{
      setTableData(data)
    })
    .catch((err)=>{
      throw new Error(err);
    })  
  }
  //点击节点查询
  const searchTableDataByclickNode = (param)=>{
    if(param==='救灾物品'){
      refreshTableData();
    }else{
      getSearchTableDataByclickNode(param)
      .then(data=>{
        setTableData(data)
      })
      .catch((err)=>{
        throw new Error(err);
      })  
    }
  }
  //更新数据
  const refreshTableData = ()=>{
    getAllTableData().then((data)=>{
      setTableData(data)
    })
  }
  return (
    <div className="App">
     <aside>
       <TreeSelect searchTableDataByclickNode={searchTableDataByclickNode}/>
     </aside>
     <main>
       <Content tableData={tableData} searching={searching} refreshTableData={refreshTableData}/>
     </main>
    </div>
  );
}

export default App;
