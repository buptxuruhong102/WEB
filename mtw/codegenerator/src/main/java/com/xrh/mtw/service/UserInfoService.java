package com.xrh.mtw.service;

import com.xrh.mtw.entity.UserInfo;
import com.xrh.mtw.dao.UserInfoMapper;
import com.codegen.vo.Page;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import org.apache.ibatis.annotations.Param;

/**
 *
 * Created by mybatis plugin on 2018/11/19.
 */
@Service
public class UserInfoService {

	@Autowired
    private UserInfoMapper userInfoMapper;
    
    public int deleteByPrimaryKey(Integer id){
        return userInfoMapper.deleteByPrimaryKey(id);
    }

    public int insert(UserInfo record){
        return userInfoMapper.insert(record);
    }

    public int insertSelective(UserInfo record){
        return userInfoMapper.insertSelective(record);
    }

    public UserInfo selectByPrimaryKey(Integer id){
        return userInfoMapper.selectByPrimaryKey(id);
    }

    public int updateByPrimaryKeySelective(UserInfo record){
        return userInfoMapper.updateByPrimaryKeySelective(record);
    }

    public int updateByPrimaryKey(UserInfo record){
        return userInfoMapper.updateByPrimaryKey(record);
    }

    public List<UserInfo> selectByCondition(UserInfo record){
        return userInfoMapper.selectByCondition(record);
    }

    public List<UserInfo> selectAll(){
        return userInfoMapper.selectAll();
    }

    public Integer count(UserInfo record){
        return userInfoMapper.count(record);
    }

    public int deleteByCondition(UserInfo record){
        return userInfoMapper.deleteByCondition(record);
    }

}
