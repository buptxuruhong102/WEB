package com.xrh.mtw.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by xuruhong on 2018/3/31.
 */
@Controller
@RequestMapping("")
public class DefaultController {

    @RequestMapping("/api/login/account")
    @ResponseBody
    public Map<String, Object> login(@RequestBody Map<String, String> map, HttpServletRequest request){
        Map<String, Object>  model = new HashMap<>();
        String userName = map.get("userName");
        String password = map.get("password");
        String type = map.get("type");

        if(password.equals("888888") && userName.equals("admin")){
            model.put("status","ok");
            model.put("currentAuthority","admin");
            request.getSession().setAttribute("userName", userName);
        }else if(password.equals("123456") && userName.equals("user")){
            model.put("status","ok");
            model.put("currentAuthority","user");
            request.getSession().setAttribute("userName", userName);
        }else {
            model.put("status","ok");
            model.put("currentAuthority","guest");
        }
        model.put("type",type);

        return model;
    }

    @RequestMapping("/webSiteMan/api/currentUser")
    @ResponseBody
    public Map<String, Object> currentUser(HttpServletRequest request, HttpServletResponse response){
        Map<String, Object>  model = new HashMap<>();
        Object name = request.getAttribute("pin");

        model.put("userid","00000001");
        model.put("name","xuruhong");
        model.put("notifyCount","0");

        return model;
    }

    @RequestMapping(value = "/api/rule")
    public String rule(HttpServletRequest request,String no, Model model){
        System.out.println("no=" + no);
        Object name = request.getSession().getAttribute("userName");
        List<Map<String, Object>> dataList = new ArrayList<>();

        Map<String, Object> data1 = new HashMap();
        data1.put("key","1");
        data1.put("webSiteCode","1");
        data1.put("webSiteName","站点1");
        data1.put("createTime","2018-04-02 10:10:10");
        dataList.add(data1);

        Map<String, Object> data2 = new HashMap();
        data2.put("key","2");
        data2.put("webSiteCode","2");
        data2.put("webSiteName","站点2");
        data2.put("createTime","2018-04-02 12:12:12");
        dataList.add(data2);


        Map<String, Object> pagination = new HashMap();
        pagination.put("total",2);
        pagination.put("pageSize",10);
        pagination.put("current",1);

        model.addAttribute("list",dataList);
        model.addAttribute("pagination",pagination);
        return null;
    }

    @RequestMapping(value = "/api/addRule", method = RequestMethod.POST)
    public String addRule(@RequestBody Map<String, String> map, Model model){
        System.out.println("webSiteName=" + map.get("webSiteName"));

        model.addAttribute("success","true");
        return null;
    }

    @RequestMapping(value = "/api/selectData")
    public String selectData(HttpServletRequest request,String no, Model model){
        List<Map<String, Object>> dataList = new ArrayList<>();

        Map<String, Object> data1 = new HashMap();
        data1.put("webSiteCode","1");
        data1.put("webSiteName","站点1");
        dataList.add(data1);

        Map<String, Object> data2 = new HashMap();
        data2.put("webSiteCode","2");
        data2.put("webSiteName","站点2");
        dataList.add(data2);

        model.addAttribute("list",dataList);
        return null;
    }

}
