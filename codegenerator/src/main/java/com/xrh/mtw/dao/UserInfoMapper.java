package com.xrh.mtw.dao;

import com.xrh.mtw.entity.UserInfo;
import java.util.List;

public interface UserInfoMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(UserInfo record);

    int insertSelective(UserInfo record);

    UserInfo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(UserInfo record);

    int updateByPrimaryKey(UserInfo record);

    List<UserInfo> selectByCondition(UserInfo record);

    List<UserInfo> selectAll();

    Integer count(UserInfo record);

    int deleteByCondition(UserInfo record);
}