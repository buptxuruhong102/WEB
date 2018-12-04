package com.xrh.mtw.dao;

import com.xrh.mtw.entity.Role;
import java.util.List;

public interface RoleMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Role record);

    int insertSelective(Role record);

    Role selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Role record);

    int updateByPrimaryKey(Role record);

    List<Role> selectByCondition(Role record);

    List<Role> selectAll();

    Integer count(Role record);

    int deleteByCondition(Role record);
}