package com.xrh.mtw.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by xuruhong on 2018/11/18.
 */
@Controller
@RequestMapping("/demo")
public class Demo {
    @RequestMapping("/index")
    @ResponseBody
    public String index(){
      return "index";
    }
}
