/*
 * TOP SECRET
 * Copyright 2006-2015 Transsion.com All right reserved. This software is the
 * confidential and proprietary information of Transsion.com ("Confidential
 * Information"). You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered
 * into with Transsion.com.
 */
package com.codegen.generator;

import com.codegen.vo.Page;
import org.mybatis.generator.api.dom.java.*;
import org.mybatis.generator.codegen.mybatis3.javamapper.elements.AbstractJavaMapperMethodGenerator;

import java.util.Set;
import java.util.TreeSet;


/** 
 * ClassName:SelectByPageMethodGenerator <br/> 
 * Date:     2018年10月22日 下午2:58:28 <br/> 
 * @author   fenglibin1982@163.com
 * @Blog     http://blog.csdn.net/fenglibing
 * @version  
 * @see       
 */
public class SelectByPageMethodGenerator extends AbstractJavaMapperMethodGenerator {
    public SelectByPageMethodGenerator() {
        super();
    }
    @Override
    public void addInterfaceElements(Interface interfaze) {
        Set<FullyQualifiedJavaType> importedTypes = new TreeSet<FullyQualifiedJavaType>();
        importedTypes.add(FullyQualifiedJavaType.getNewListInstance());

        Method method = new Method();
        method.setVisibility(JavaVisibility.PUBLIC);

        FullyQualifiedJavaType returnType = FullyQualifiedJavaType
                .getNewListInstance();
        FullyQualifiedJavaType listType;
        listType = new FullyQualifiedJavaType(
                introspectedTable.getBaseRecordType());

        importedTypes.add(listType);
        returnType.addTypeArgument(listType);
        method.setReturnType(returnType);
        method.setName("selectByPage");
        FullyQualifiedJavaType pageType = new FullyQualifiedJavaType(Page.class.getName());
        importedTypes.add(pageType);
        method.addParameter(new Parameter(pageType, "page"));

        context.getCommentGenerator().addGeneralMethodComment(method,
                introspectedTable);

        addMapperAnnotations(interfaze, method);

        if (context.getPlugins().clientSelectAllMethodGenerated(method,
                interfaze, introspectedTable)) {
            interfaze.addImportedTypes(importedTypes);
            interfaze.addMethod(method);
        }
    }
    public void addMapperAnnotations(Interface interfaze, Method method) {
    }
}
