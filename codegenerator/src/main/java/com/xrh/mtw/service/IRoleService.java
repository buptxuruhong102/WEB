package com.xrh.mtw.service;

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
public interface IRoleService {
     int removeByPrimaryKey(Integer id);

     int add(Role record);

     int addSelective(Role record);

     Role queryByPrimaryKey(Integer id);

     int modifyByPrimaryKeySelective(Role record);

     int modifyByPrimaryKey(Role record);

     List<Role> queryByCondition(Role record);

     List<Role> queryAll();

     Integer count(Role record);

     int removeByCondition(Role record);

}
