package com.codegen.service.impl;

import com.alibaba.fastjson.JSON;
import com.codegen.service.CodeGenerator;
import com.codegen.service.CodeGeneratorManager;
import com.codegen.util.DataUtil;
import com.codegen.util.FileUtil;
import com.codegen.util.StringUtils;
import com.google.common.base.CaseFormat;
import freemarker.template.Configuration;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;

import java.io.File;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Controller层 代码生成器 Created by zhh on 2017/09/20.
 */
public class WebGenerator extends CodeGeneratorManager implements CodeGenerator {
    private static List<Map<String, String>> allTableList = new ArrayList<>();

    @Override
    public void genCode(String tableName) {
        String modelName = StringUtils.tableNameConvertUpperCamel(tableName);
        Configuration cfg = getFreemarkerConfiguration();
        String customMapping = "/";
        String modelNameUpperCamel = modelName;
        String modelNameLowerCamel = CaseFormat.UPPER_CAMEL.to(CaseFormat.LOWER_CAMEL, modelNameUpperCamel);

        Map<String, Object> data = DataUtil.getDataMapInit(tableName, modelName, modelNameUpperCamel);
        data.put("allColumnsList",allColumnsList);

        Map<String, String> tableInfo = new HashMap<>();
        tableInfo.put("modelNameUpperCamel", modelNameUpperCamel);
        tableInfo.put("modelNameLowerCamel", modelNameLowerCamel);
        allTableList.add(tableInfo);
        data.put("allTableList",allTableList);

        logger.info("=====================模版数据:============================");
        logger.info(JSON.toJSONString(data));
        logger.info("=================================================");
        try {

            //获取所有模版文件
            ResourceLoader loader = new DefaultResourceLoader();
            Resource resource = loader.getResource("classpath:generator/template/web");
            File file = resource.getFile();
            List<String> paths = FileUtil.listAllFiles(file, file.getName());
            for(String path: paths){
                String targetPath = path.replace("modelNameUpperCamel",modelNameUpperCamel)
                        .replace("modelNameLowerCamel",modelNameLowerCamel);
                System.out.println(path);

                File controllerFile = new File(PROJECT_PATH + WEB_PATH  + customMapping
                        + targetPath);
                if (!controllerFile.getParentFile().exists()) {
                    controllerFile.getParentFile().mkdirs();
                }
                cfg.getTemplate(path).process(data, new FileWriter(controllerFile));
                logger.info(controllerFile + "生成成功!");
            }
        } catch (Exception e) {
            throw new RuntimeException("Controller 生成失败!", e);
        }
    }

    public static void main(String[] args) throws Exception{
        System.out.println("web......");
        //获取所有模版文件
        ResourceLoader loader = new DefaultResourceLoader();
        Resource resource = loader.getResource("classpath:generator/template/web");
        File file = resource.getFile();
        System.out.println(file.getName());
        List<String> paths = FileUtil.listAllFiles(file, file.getName());
        for(String path: paths){
            System.out.println(path);
        }
    }

}
