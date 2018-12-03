package com.xrh.mtw.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

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
    public String login(@RequestBody Map<String, String> map, HttpServletRequest request, Model model){
        String userName = map.get("userName");
        String password = map.get("password");
        String type = map.get("type");

        if(password.equals("888888") && userName.equals("admin")){
            model.addAttribute("status","ok");
            model.addAttribute("currentAuthority","admin");
            request.getSession().setAttribute("userName", userName);
        }else if(password.equals("123456") && userName.equals("user")){
            model.addAttribute("status","ok");
            model.addAttribute("currentAuthority","user");
            request.getSession().setAttribute("userName", userName);
        }else {
            model.addAttribute("status","error");
            model.addAttribute("currentAuthority","guest");
        }
        model.addAttribute("type",type);

        return null;
    }

    @RequestMapping("/webSiteMan/api/currentUser")
    public String currentUser(HttpServletRequest request, HttpServletResponse response, Model model){
        Object name = request.getAttribute("pin");

        model.addAttribute("userid","00000001");
        model.addAttribute("name",name);
        model.addAttribute("notifyCount","0");

        return "";
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
