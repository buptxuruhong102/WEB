package com.xrh.mtw.service.impl;

import com.xrh.mtw.service.IUserInfoService;
import com.xrh.mtw.entity.UserInfo;
import com.xrh.mtw.dao.UserInfoMapper;
import com.codegen.vo.Page;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import org.apache.ibatis.annotations.Param;

/**
 *
 * Created by mybatis plugin on 2018/12/03.
 */
@Service
public class UserInfoService implements IUserInfoService{

	@Autowired
    private UserInfoMapper userInfoMapper;
    
    @Override 
    public int removeByPrimaryKey(Integer id){
        return userInfoMapper.deleteByPrimaryKey(id);
    }

    @Override 
    public int add(UserInfo record){
        return userInfoMapper.insert(record);
    }

    @Override 
    public int addSelective(UserInfo record){
        return userInfoMapper.insertSelective(record);
    }

    @Override 
    public UserInfo queryByPrimaryKey(Integer id){
        return userInfoMapper.selectByPrimaryKey(id);
    }

    @Override 
    public int modifyByPrimaryKeySelective(UserInfo record){
        return userInfoMapper.updateByPrimaryKeySelective(record);
    }

    @Override 
    public int modifyByPrimaryKey(UserInfo record){
        return userInfoMapper.updateByPrimaryKey(record);
    }

    @Override 
    public List<UserInfo> queryByCondition(UserInfo record){
        return userInfoMapper.selectByCondition(record);
    }

    @Override 
    public List<UserInfo> queryAll(){
        return userInfoMapper.selectAll();
    }

    @Override 
    public Integer count(UserInfo record){
        return userInfoMapper.count(record);
    }

    @Override 
    public int removeByCondition(UserInfo record){
        return userInfoMapper.deleteByCondition(record);
    }

}
