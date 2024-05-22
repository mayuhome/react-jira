import { useEffect, useState } from 'react';
import { SearchPanel } from './search-panel';
import { List } from './list';
import * as qs from 'qs';
import { cleanObject, useDebounce, useMount } from 'utils';

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
    // 定义参数状态
    const [param, setParam] = useState({
        name: '',
        personId: ''
    });
    const debounceParam = useDebounce(param, 2000);
    // 列表状态
    const [list, setList] = useState([]);

    // 用户列表状态
    const [users, setUsers] = useState([]);

    // 接口调用
    useEffect(() => {
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async response => {
            if(response.ok){
                setList(await response.json());
            }
        })
    }, [debounceParam]);

    useMount(() => {
        fetch(`${apiUrl}/users`).then(async response => {
            if(response.ok){
                setUsers(await response.json());
            }
        })
    });

    return (<div>
        <SearchPanel param={param} setParam={setParam} users={users} setUsers={setUsers}/>
        <List list={list} users={users}/>
    </div>)
}