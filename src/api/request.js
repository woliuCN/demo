import { axiosInstance } from './config';

//获取所有数据
export const getAllTableData = ()=>{
    return axiosInstance.get('/');
}

//根据规格/是否启用来模糊查询
export const getSearchTableData = (model,enable)=>{
    let url = '';
    let q = sessionStorage.getItem('query')||null;
    if(enable){
        url = `/?enable=${enable}&&model_like${model}`
    }else{
        url = `/?model_like=${model}`
    }
    if(q){url+=`&q=${q}`}
    return axiosInstance.get(url);
}

//点击树结点查询
export const getSearchTableDataByclickNode = (param)=>{
    return axiosInstance.get(`/?q=${param}`);
}

//添加数据
export const addTableData = (data)=>{
    return axiosInstance.post('/',data)
}

//修改数据
export const modifyTableData = (id,data)=>{
    return axiosInstance.put(`/${id}`,data)
}

//删除数据
export const deleteTableDataItems = (id)=>{
    return axiosInstance.delete(`/${id}`)
}