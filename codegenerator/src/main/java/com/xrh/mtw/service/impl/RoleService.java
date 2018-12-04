package com.xrh.mtw.service.impl;

import com.xrh.mtw.service.IRoleService;
import com.xrh.mtw.entity.Role;
import com.xrh.mtw.dao.RoleMapper;
import com.codegen.vo.Page;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import org.apache.ibatis.annotations.Param;

/**
 *
 * Created by mybatis plugin on 2018/12/04.
 */
@Service
public class RoleService implements IRoleService{

	@Autowired
    private RoleMapper roleMapper;
    
    @Override 
    public int removeByPrimaryKey(Integer id){
        return roleMapper.deleteByPrimaryKey(id);
    }

    @Override 
    public int add(Role record){
        return roleMapper.insert(record);
    }

    @Override 
    public int addSelective(Role record){
        return roleMapper.insertSelective(record);
    }

    @Override 
    public Role queryByPrimaryKey(Integer id){
        return roleMapper.selectByPrimaryKey(id);
    }

    @Override 
    public int modifyByPrimaryKeySelective(Role record){
        return roleMapper.updateByPrimaryKeySelective(record);
    }

    @Override 
    public int modifyByPrimaryKey(Role record){
        return roleMapper.updateByPrimaryKey(record);
    }

    @Override 
    public List<Role> queryByCondition(Role record){
        return roleMapper.selectByCondition(record);
    }

    @Override 
    public List<Role> queryAll(){
        return roleMapper.selectAll();
    }

    @Override 
    public Integer count(Role record){
        return roleMapper.count(record);
    }

    @Override 
    public int removeByCondition(Role record){
        return roleMapper.deleteByCondition(record);
    }

}
