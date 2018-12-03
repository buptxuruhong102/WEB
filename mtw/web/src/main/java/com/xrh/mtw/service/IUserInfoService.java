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
 * Created by mybatis plugin on 2018/12/03.
 */
public interface IUserInfoService {
     int removeByPrimaryKey(Integer id);

     int add(UserInfo record);

     int addSelective(UserInfo record);

     UserInfo queryByPrimaryKey(Integer id);

     int modifyByPrimaryKeySelective(UserInfo record);

     int modifyByPrimaryKey(UserInfo record);

     List<UserInfo> queryByCondition(UserInfo record);

     List<UserInfo> queryAll();

     Integer count(UserInfo record);

     int removeByCondition(UserInfo record);

}
