package com.xrh.mtw.controller;
import com.codegen.vo.Result;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xrh.mtw.entity.Role;
import com.xrh.mtw.service.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 *
 * Created by mybatis plugin on 2018/12/04.
 */
@Controller
@RequestMapping("/api/role")
public class RoleController {

    @Autowired
    private IRoleService roleService;


    @RequestMapping("/findAll")
    @ResponseBody
    public Result<List<Role>> queryAll(){
        return Result.success(roleService.queryAll());
    }

    @RequestMapping("/find")
    @ResponseBody
    public Result<Role> queryByPrimaryKey(Integer id){
        return Result.success(roleService.queryByPrimaryKey(id));
    }

    @RequestMapping("/findByCondition")
    @ResponseBody
    public Result<List<Role>> queryByCondition(Role record){
        return Result.success(roleService.queryByCondition(record));
    }

    @RequestMapping("/count")
    @ResponseBody
    public Result<Integer> count(Role record){
        return Result.success(roleService.count(record));
    }

    @RequestMapping("/save")
    @ResponseBody
    public Result<Integer> addSelective(@RequestBody Role record){
        return Result.success(roleService.addSelective(record));
    }

    @RequestMapping("/modify")
    @ResponseBody
    public Result<Integer> modifyByPrimaryKeySelective(@RequestBody Role record){
        return Result.success(roleService.modifyByPrimaryKeySelective(record));
    }

    @RequestMapping("/removeByCondition")
    @ResponseBody
    public Result<Integer> removeByCondition(Role record){
        return Result.success(roleService.removeByCondition(record));
    }

    @RequestMapping("/remove")
    @ResponseBody
    public Result<Integer> removeByPrimaryKey(Integer id){
        return Result.success(roleService.removeByPrimaryKey(id));
    }

    @RequestMapping("/findByPage")
    @ResponseBody
    public Result<PageInfo> findByPage(Role role,int pageNum, int pageSize){
        PageHelper.startPage(pageNum, pageSize); // 核心分页代码
        List<Role> list =  roleService.queryByCondition(role);
        PageInfo pageInfo = new PageInfo(list);
        return Result.success(pageInfo);
    }

}
