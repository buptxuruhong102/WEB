package ${controllerPackage};
import ${modelPackage}.${modelNameUpperCamel};
import ${servicePackage}.I${modelNameUpperCamel}Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import com.github.pagehelper.PageInfo;
import com.github.pagehelper.PageHelper;
import ${resultClassPath};
import ${pageClassPath};

import java.util.List;

import org.apache.ibatis.annotations.Param;

/**
 *
 * Created by ${author} on ${date}.
 */
@Controller
@RequestMapping("/api/${baseRequestMapping}")
public class ${modelNameUpperCamel}Controller {

    @Autowired
    private I${modelNameUpperCamel}Service ${modelNameLowerCamel}Service;

<#--	<#list controllerMethodsList as serviceMethod>
${serviceMethod!''}
	</#list>-->

    @RequestMapping("/findAll")
    @ResponseBody
    public Result<List<${modelNameUpperCamel}>> queryAll(){
        return Result.success(${modelNameLowerCamel}Service.queryAll());
    }

    @RequestMapping("/find")
    @ResponseBody
    public Result<${modelNameUpperCamel}> queryByPrimaryKey(Integer id){
        return Result.success(${modelNameLowerCamel}Service.queryByPrimaryKey(id));
    }

    @RequestMapping("/findByCondition")
    @ResponseBody
    public Result<List<${modelNameUpperCamel}>> queryByCondition(${modelNameUpperCamel} record){
        return Result.success(${modelNameLowerCamel}Service.queryByCondition(record));
    }

    @RequestMapping("/count")
    @ResponseBody
    public Result<Integer> count(${modelNameUpperCamel} record){
        return Result.success(${modelNameLowerCamel}Service.count(record));
    }

    @RequestMapping("/save")
    @ResponseBody
    public Result<Integer> addSelective(@RequestBody ${modelNameUpperCamel} record){
        return Result.success(${modelNameLowerCamel}Service.addSelective(record));
    }

    @RequestMapping("/modify")
    @ResponseBody
    public Result<Integer> modifyByPrimaryKeySelective(@RequestBody ${modelNameUpperCamel} record){
        return Result.success(${modelNameLowerCamel}Service.modifyByPrimaryKeySelective(record));
    }

    @RequestMapping("/removeByCondition")
    @ResponseBody
    public Result<Integer> removeByCondition(${modelNameUpperCamel} record){
        return Result.success(${modelNameLowerCamel}Service.removeByCondition(record));
    }

    @RequestMapping("/remove")
    @ResponseBody
    public Result<Integer> removeByPrimaryKey(Integer id){
        return Result.success(${modelNameLowerCamel}Service.removeByPrimaryKey(id));
    }

    @RequestMapping("/findByPage")
    @ResponseBody
    public Result<PageInfo> findByPage(${modelNameUpperCamel} ${modelNameLowerCamel},int pageNum, int pageSize){
        PageHelper.startPage(pageNum, pageSize); // 核心分页代码
        List<${modelNameUpperCamel}> list =  ${modelNameLowerCamel}Service.queryByCondition(${modelNameLowerCamel});
        PageInfo pageInfo = new PageInfo(list);
        return Result.success(pageInfo);
    }

}
