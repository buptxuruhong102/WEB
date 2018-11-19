package com.xrh.mtw.controller;
import com.codegen.vo.Result;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xrh.mtw.entity.UserInfo;
import com.xrh.mtw.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 *
 * Created by mybatis plugin on 2018/11/19.
 */
@Controller
@RequestMapping("/userInfo/")
public class UserInfoController {

    @Autowired
    UserInfoService userInfoService;

    @RequestMapping("selectAll")
    @ResponseBody
    public Result<List<UserInfo>> selectAll(){
        return Result.success(userInfoService.selectAll());
    }

    @RequestMapping("select")
    @ResponseBody
    public Result<UserInfo> selectByPrimaryKey(Integer id){
        return Result.success(userInfoService.selectByPrimaryKey(id));
    }

    @RequestMapping("selectByCondition")
    @ResponseBody
    public Result<List<UserInfo>> selectByCondition(UserInfo record){
        return Result.success(userInfoService.selectByCondition(record));
    }

    @RequestMapping("count")
    @ResponseBody
    public Result<Integer> count(UserInfo record){
        return Result.success(userInfoService.count(record));
    }

    @RequestMapping("insert")
    @ResponseBody
    public Result<Integer> insertSelective(UserInfo record){
        return Result.success(userInfoService.insertSelective(record));
    }

    @RequestMapping("update")
    @ResponseBody
    public Result<Integer> updateByPrimaryKeySelective(UserInfo record){
        return Result.success(userInfoService.updateByPrimaryKeySelective(record));
    }

    @RequestMapping("deleteByCondition")
    @ResponseBody
    public Result<Integer> deleteByCondition(UserInfo record){
        return Result.success(userInfoService.deleteByCondition(record));
    }

    @RequestMapping("delete")
    @ResponseBody
    public Result<Integer> deleteByPrimaryKey(Integer id){
        return Result.success(userInfoService.deleteByPrimaryKey(id));
    }


    @RequestMapping("selectByPage")
    @ResponseBody
    public PageInfo selectByPage(UserInfo userInfo,int pageNum, int pageSize){
        PageHelper.startPage(pageNum, pageSize); // 核心分页代码
        List<UserInfo> list =  userInfoService.selectByCondition(userInfo);
        PageInfo pageInfo = new PageInfo(list);
        return pageInfo;
    }

}
