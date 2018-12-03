package ${controllerPackage};
import ${modelPackage}.${modelNameUpperCamel};
import ${servicePackage}.I${modelNameUpperCamel}Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
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
@RequestMapping("/${baseRequestMapping}")
public class ${modelNameUpperCamel}Controller {

    @Autowired
    private I${modelNameUpperCamel}Service ${modelNameLowerCamel}Service;

	<#list controllerMethodsList as serviceMethod>
${serviceMethod!''}
	</#list>

    @RequestMapping("/findByPage")
    @ResponseBody
    public PageInfo findByPage(${modelNameUpperCamel} ${modelNameLowerCamel},int pageNum, int pageSize){
        PageHelper.startPage(pageNum, pageSize); // 核心分页代码
        List<UserInfo> list =  ${modelNameLowerCamel}Service.queryByCondition(${modelNameLowerCamel});
        PageInfo pageInfo = new PageInfo(list);
        return pageInfo;
    }

}
