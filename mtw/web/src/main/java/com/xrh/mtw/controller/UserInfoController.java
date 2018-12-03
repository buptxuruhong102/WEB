package com.xrh.mtw.controller;
import com.codegen.vo.Result;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xrh.mtw.entity.UserInfo;
import com.xrh.mtw.service.IUserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 *
 * Created by mybatis plugin on 2018/12/03.
 */
@Controller
@RequestMapping("/userInfo")
public class UserInfoController {

    @Autowired
    private IUserInfoService userInfoService;

    @RequestMapping("/findAll")
    @ResponseBody
    public Result<List<UserInfo>> queryAll(){
        return Result.success(userInfoService.queryAll());
    }

    @RequestMapping("/find")
    @ResponseBody
    public Result<UserInfo> queryByPrimaryKey(Integer id){
        return Result.success(userInfoService.queryByPrimaryKey(id));
    }

    @RequestMapping("/findByCondition")
    @ResponseBody
    public Result<List<UserInfo>> queryByCondition(UserInfo record){
        return Result.success(userInfoService.queryByCondition(record));
    }

    @RequestMapping("/count")
    @ResponseBody
    public Result<Integer> count(UserInfo record){
        return Result.success(userInfoService.count(record));
    }

    @RequestMapping("/save")
    @ResponseBody
    public Result<Integer> addSelective(UserInfo record){
        return Result.success(userInfoService.addSelective(record));
    }

    @RequestMapping("/modify")
    @ResponseBody
    public Result<Integer> modifyByPrimaryKeySelective(UserInfo record){
        return Result.success(userInfoService.modifyByPrimaryKeySelective(record));
    }

    @RequestMapping("/removeByCondition")
    @ResponseBody
    public Result<Integer> removeByCondition(UserInfo record){
        return Result.success(userInfoService.removeByCondition(record));
    }

    @RequestMapping("/remove")
    @ResponseBody
    public Result<Integer> removeByPrimaryKey(Integer id){
        return Result.success(userInfoService.removeByPrimaryKey(id));
    }


    @RequestMapping("/findByPage")
    @ResponseBody
    public PageInfo findByPage(UserInfo userInfo,int pageNum, int pageSize){
        PageHelper.startPage(pageNum, pageSize); // 核心分页代码
        List<UserInfo> list =  userInfoService.queryByCondition(userInfo);
        PageInfo pageInfo = new PageInfo(list);
        return pageInfo;
    }

}
